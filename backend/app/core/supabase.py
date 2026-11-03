from supabase import create_client, Client
from backend.app.core.config import settings

_supabase_client: Client | None = None
_supabase_admin: Client | None = None

def get_supabase_client() -> Client:
    global _supabase_client
    if _supabase_client is None:
        key = settings.SUPABASE_ANON_KEY or settings.SUPABASE_SECRET_KEY
        if not settings.SUPABASE_URL or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be configured")
        _supabase_client = create_client(settings.SUPABASE_URL, key)
    return _supabase_client

def get_supabase_admin() -> Client:
    global _supabase_admin
    if _supabase_admin is None:
        key = settings.SUPABASE_SECRET_KEY or settings.SUPABASE_ANON_KEY
        if not settings.SUPABASE_URL or not key:
            raise ValueError("SUPABASE_URL and SUPABASE_SECRET_KEY must be configured")
        _supabase_admin = create_client(settings.SUPABASE_URL, key)
    return _supabase_admin

def verify_supabase_connection() -> dict:
    try:
        client = get_supabase_admin()
        res = client.table("materials").select("count", count="exact").execute()
        return {
            "status": "connected",
            "url": settings.SUPABASE_URL,
            "materials_count": res.count
        }
    except Exception as e:
        return {
            "status": "error",
            "url": settings.SUPABASE_URL,
            "error": str(e)
        }
