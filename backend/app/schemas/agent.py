from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class ChatMessageRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User prompt or instruction")
    conversation_id: Optional[str] = Field(default=None, description="Active conversation ID or null for new")
    language_hint: Optional[str] = Field(default=None, description="Optional language preference")

class ToolExecutionStep(BaseModel):
    tool_name: str
    arguments: Dict[str, Any]
    result: Any
    status: str = "success"

class ChatMessageResponse(BaseModel):
    conversation_id: str
    reply: str
    steps: List[ToolExecutionStep] = []
    tools_called: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ConversationMessage(BaseModel):
    id: str
    conversation_id: str
    role: str # user, model, system, tool
    content: str
    tool_calls: Optional[List[Dict[str, Any]]] = None
    tool_results: Optional[List[Dict[str, Any]]] = None
    created_at: datetime

class ConversationSummary(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime
    message_count: int = 0
