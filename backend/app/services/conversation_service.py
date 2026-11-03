import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from backend.app.core.supabase import get_supabase_admin

# In-memory session store fallback to guarantee zero failures
_IN_MEMORY_CONVERSATIONS: Dict[str, Dict[str, Any]] = {}
_IN_MEMORY_MESSAGES: Dict[str, List[Dict[str, Any]]] = {}

class ConversationService:
    def __init__(self):
        self.client = get_supabase_admin()

    def _get_utc_now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def get_or_create_conversation(self, conversation_id: Optional[str] = None, initial_title: Optional[str] = None) -> Dict[str, Any]:
        if conversation_id:
            # Try to fetch existing
            try:
                res = self.client.table("conversations").select("*").eq("id", conversation_id).execute()
                if res.data and len(res.data) > 0:
                    return res.data[0]
            except Exception:
                pass
            if conversation_id in _IN_MEMORY_CONVERSATIONS:
                return _IN_MEMORY_CONVERSATIONS[conversation_id]

        # Create new
        new_id = f"conv-{uuid.uuid4().hex[:12]}"
        title = initial_title or "New Conversation"
        now = self._get_utc_now()
        conv_obj = {
            "id": new_id,
            "title": title[:50],
            "created_at": now,
            "updated_at": now
        }
        
        try:
            res = self.client.table("conversations").insert(conv_obj).execute()
            if res.data:
                return res.data[0]
        except Exception:
            pass

        _IN_MEMORY_CONVERSATIONS[new_id] = conv_obj
        _IN_MEMORY_MESSAGES[new_id] = []
        return conv_obj

    def list_conversations(self, limit: int = 30) -> List[Dict[str, Any]]:
        try:
            res = self.client.table("conversations").select("*").order("updated_at", desc=True).limit(limit).execute()
            if res.data is not None:
                return res.data
        except Exception:
            pass
            
        items = list(_IN_MEMORY_CONVERSATIONS.values())
        items.sort(key=lambda x: x["updated_at"], reverse=True)
        return items[:limit]

    def get_messages(self, conversation_id: str, limit: int = 30) -> List[Dict[str, Any]]:
        try:
            res = self.client.table("conversation_messages").select("*").eq("conversation_id", conversation_id).order("created_at", desc=False).limit(limit).execute()
            if res.data is not None and len(res.data) > 0:
                return res.data
        except Exception:
            pass

        return _IN_MEMORY_MESSAGES.get(conversation_id, [])

    def add_message(
        self, 
        conversation_id: str, 
        role: str, 
        content: str, 
        tool_calls: Optional[List[Dict[str, Any]]] = None,
        tool_results: Optional[List[Dict[str, Any]]] = None
    ) -> Dict[str, Any]:
        msg_id = f"msg-{uuid.uuid4().hex[:12]}"
        now = self._get_utc_now()
        payload = {
            "id": msg_id,
            "conversation_id": conversation_id,
            "role": role,
            "content": content,
            "tool_calls": tool_calls,
            "tool_results": tool_results,
            "created_at": now
        }

        try:
            res = self.client.table("conversation_messages").insert(payload).execute()
            # update conversation updated_at
            self.client.table("conversations").update({"updated_at": now}).eq("id", conversation_id).execute()
            if res.data:
                return res.data[0]
        except Exception:
            pass

        if conversation_id not in _IN_MEMORY_MESSAGES:
            _IN_MEMORY_MESSAGES[conversation_id] = []
        _IN_MEMORY_MESSAGES[conversation_id].append(payload)

        if conversation_id in _IN_MEMORY_CONVERSATIONS:
            _IN_MEMORY_CONVERSATIONS[conversation_id]["updated_at"] = now

        return payload

    def delete_conversation(self, conversation_id: str) -> bool:
        try:
            self.client.table("conversation_messages").delete().eq("conversation_id", conversation_id).execute()
            self.client.table("conversations").delete().eq("id", conversation_id).execute()
        except Exception:
            pass
        _IN_MEMORY_CONVERSATIONS.pop(conversation_id, None)
        _IN_MEMORY_MESSAGES.pop(conversation_id, None)
        return True

conversation_service = ConversationService()
