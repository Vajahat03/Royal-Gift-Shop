import uuid
from typing import Dict, Any, List, Optional
from google import genai
from google.genai import types
from backend.app.core.config import settings
from backend.app.agent.tools import ALL_AGENT_TOOLS
from backend.app.services.conversation_service import conversation_service
from backend.app.core.supabase import get_supabase_admin

SYSTEM_INSTRUCTION = """You are the AI Business Operations Agent for Petite Maison Royal Gift Boutique.

You are an intelligent, proactive business partner who manages inventory, customer records, gift recipes, orders, and business analytics.

CORE OPERATIONAL RULES:
1. Real Database Operations: Never hallucinate or invent inventory counts, prices, or ledger records. Always use your tools to inspect, query, or modify the live Supabase database.
2. Multilingual Understanding: You natively understand English, Hindi, Hinglish, colloquial Indian expressions, informal grammar, and typos.
   - Example Hindi/Hinglish:
     - "5 teddy bear add kar do" -> call tool to add or increase stock.
     - "Kitna stock bacha hai?" -> inspect available stock.
     - "Raza ka last order kya tha?" -> check order history.
     - "10 chocolates badha do" -> increase stock.
   - Respond in the same natural language and tone as the user (e.g., fluent conversational Hinglish if asked in Hinglish).
3. Precision with Stock Changes:
   - When adding units to existing stock, explain clearly: "Added X units. Previous stock: Y. New stock: Z."
   - When creating a new product, provide its name, category, initial stock, and unit cost.
   - When an action is ambiguous, ask a clarifying question before guessing.
   - For destructive actions (like deleting an item), confirm with the user first unless they explicitly instructed confirmation.
4. Transparency: Accurately summarize what actions you took, what the database returned, and what the current status is.
"""

class AgentExecutor:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = genai.Client(api_key=self.api_key) if self.api_key else None
        self.primary_model = settings.GEMINI_MODEL
        self.fallback_models = ["gemini-3.5-flash-lite", "gemini-flash-latest"]

    def _get_chat_session(self, history: List[types.Content] = None):
        config = types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION,
            tools=ALL_AGENT_TOOLS,
            temperature=0.2
        )
        
        # Try primary model first, then fallback
        models_to_try = [self.primary_model] + [m for m in self.fallback_models if m != self.primary_model]
        
        last_error = None
        for model_name in models_to_try:
            try:
                chat = self.client.chats.create(
                    model=model_name,
                    config=config,
                    history=history
                )
                return chat, model_name
            except Exception as e:
                last_error = e
                continue
                
        raise RuntimeError(f"Failed to initialize Gemini chat session: {last_error}")

    def execute_chat(
        self, 
        message: str, 
        conversation_id: Optional[str] = None
    ) -> Dict[str, Any]:
        if not self.client:
            raise RuntimeError("Gemini API key is not configured in backend.")

        # 1. Retrieve or create conversation
        conv = conversation_service.get_or_create_conversation(
            conversation_id=conversation_id,
            initial_title=message[:40]
        )
        active_conv_id = conv["id"]

        # 2. Load recent message history
        prev_messages = conversation_service.get_messages(active_conv_id, limit=20)
        formatted_history: List[types.Content] = []
        
        for msg in prev_messages:
            role = "user" if msg["role"] == "user" else "model"
            formatted_history.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=msg["content"])]
                )
            )

        # 3. Create chat session
        chat, active_model = self._get_chat_session(history=formatted_history)

        # 4. Save user message to database
        conversation_service.add_message(
            conversation_id=active_conv_id,
            role="user",
            content=message
        )

        # 5. Send message through Gemini with Automatic Tool Calling
        try:
            response = chat.send_message(message)
            reply_text = response.text or "Operation completed successfully."
        except Exception as e:
            # If 503 spike, try fallback model directly
            try:
                chat, active_model = self.client.chats.create(
                    model="gemini-3.5-flash-lite",
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                        tools=ALL_AGENT_TOOLS,
                        temperature=0.2
                    ),
                    history=formatted_history
                ), "gemini-3.5-flash-lite"
                response = chat.send_message(message)
                reply_text = response.text or "Operation completed successfully."
            except Exception as inner_e:
                reply_text = f"An error occurred while processing your request: {inner_e}"

        # 6. Save model response to database
        conversation_service.add_message(
            conversation_id=active_conv_id,
            role="model",
            content=reply_text
        )

        # 7. Audit log
        try:
            supabase_admin = get_supabase_admin()
            supabase_admin.table("ai_execution_logs").insert({
                "id": f"log-{uuid.uuid4().hex[:12]}",
                "conversation_id": active_conv_id,
                "user_prompt": message,
                "intent_detected": "agent_chat_operation",
                "tool_name": "gemini_agent_loop",
                "tool_arguments": {"model": active_model},
                "tool_result": {"reply_length": len(reply_text)},
                "status": "success"
            }).execute()
        except Exception:
            pass

        return {
            "conversation_id": active_conv_id,
            "reply": reply_text,
            "model_used": active_model
        }

agent_executor = AgentExecutor()
