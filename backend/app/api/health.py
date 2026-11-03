from fastapi import APIRouter
from google import genai
from backend.app.core.config import settings
from backend.app.core.supabase import verify_supabase_connection

router = APIRouter(prefix="/health", tags=["Health"])

@router.get("")
async def get_health():
    # 1. Check Supabase
    supabase_status = verify_supabase_connection()
    
    # 2. Check Gemini
    gemini_status = {"status": "unconfigured"}
    if settings.GEMINI_API_KEY:
        try:
            client = genai.Client(api_key=settings.GEMINI_API_KEY)
            models = [m.name for m in client.models.list() if "flash" in m.name.lower()]
            gemini_status = {
                "status": "ready",
                "configured_model": settings.GEMINI_MODEL,
                "verified_flash_models": models[:4]
            }
        except Exception as e:
            gemini_status = {
                "status": "error",
                "error": str(e)
            }
            
    # 3. Check Google OAuth config
    google_oauth_status = {
        "client_id_configured": bool(settings.GOOGLE_CLIENT_ID),
        "client_secret_configured": bool(settings.GOOGLE_CLIENT_SECRET),
        "redirect_uri": settings.GOOGLE_REDIRECT_URI
    }

    return {
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "supabase": supabase_status,
        "gemini": gemini_status,
        "google_oauth": google_oauth_status
    }
