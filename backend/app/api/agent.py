from typing import Optional, List, Dict, Any
from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from backend.app.schemas.agent import (
    ChatMessageRequest,
    ChatMessageResponse,
    ConversationSummary,
    ConversationMessage
)
from backend.app.agent.executor import agent_executor
from backend.app.services.conversation_service import conversation_service

router = APIRouter(prefix="/agent", tags=["AI Operations Agent"])

@router.post("/chat", response_model=Dict[str, Any])
async def chat_with_agent(req: ChatMessageRequest):
    """
    Send an instruction or question to the AI Business Operations Agent.
    Supports English, Hindi, and Hinglish with real tool calling against live Supabase data.
    """
    try:
        res = agent_executor.execute_chat(
            message=req.message,
            conversation_id=req.conversation_id
        )
        return res
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Agent error: {str(e)}"
        )

@router.get("/conversations", response_model=List[Dict[str, Any]])
async def list_conversations(limit: int = Query(30, ge=1, le=100)):
    """List recent conversation sessions."""
    return conversation_service.list_conversations(limit=limit)

@router.get("/conversations/{conversation_id}/messages")
async def get_conversation_messages(conversation_id: str, limit: int = Query(50, ge=1, le=200)):
    """Get message history for a specific conversation."""
    return conversation_service.get_messages(conversation_id=conversation_id, limit=limit)

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    """Delete a conversation and its messages."""
    success = conversation_service.delete_conversation(conversation_id)
    return {"success": success, "conversation_id": conversation_id}
