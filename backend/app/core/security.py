import base64
import hashlib
from cryptography.fernet import Fernet
from backend.app.core.config import settings

def _get_fernet_key() -> bytes:
    # Derive a 32-byte URL-safe base64 key from SECRET_KEY
    key_hash = hashlib.sha256(settings.SECRET_KEY.encode()).digest()
    return base64.urlsafe_b64encode(key_hash)

def encrypt_token(plain_token: str) -> str:
    """Encrypt sensitive OAuth token before storing in database."""
    if not plain_token:
        return ""
    f = Fernet(_get_fernet_key())
    return f.encrypt(plain_token.encode()).decode()

def decrypt_token(encrypted_token: str) -> str:
    """Decrypt token on the backend when making Google API calls."""
    if not encrypted_token:
        return ""
    f = Fernet(_get_fernet_key())
    return f.decrypt(encrypted_token.encode()).decode()
