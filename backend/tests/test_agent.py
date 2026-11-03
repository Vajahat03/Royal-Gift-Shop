import sys
import unittest
from pathlib import Path

# Fix Windows console UTF-8 printing for emojis
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Add project root to sys.path
root_dir = Path(__file__).resolve().parent.parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.inventory_service import inventory_service
from backend.app.schemas.inventory import MaterialCreate

class TestAgentFoundation(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.conversation_id = None
        
        # Seed an item for testing
        cls.test_mat = inventory_service.create_material(
            MaterialCreate(
                name="Royal Scented Candle",
                unit="Pieces",
                minimum_stock=4.0,
                unit_cost=15.0,
                initial_stock=12.0,
                category="Fragrances",
                description="Lavender & vanilla aromatherapy candle"
            )
        )
        print(f"Seeded test item: {cls.test_mat['name']} (ID: {cls.test_mat['id']}) with stock 12.0")

    @classmethod
    def tearDownClass(cls):
        if hasattr(cls, 'test_mat') and cls.test_mat:
            inventory_service.delete_material(cls.test_mat["id"])
            print("Cleaned up test material.")

    def test_01_conversational_query_english(self):
        payload = {
            "message": "What is the available stock of Royal Scented Candle?"
        }
        res = self.client.post("/api/agent/chat", json=payload)
        self.assertEqual(res.status_code, 200, f"Chat failed: {res.text}")
        data = res.json()
        self.assertIn("reply", data)
        self.assertIn("conversation_id", data)
        TestAgentFoundation.conversation_id = data["conversation_id"]
        
        reply = data["reply"]
        print(f"Agent Reply (English): {reply}")
        self.assertTrue("12" in reply or "Royal Scented Candle" in reply)

    def test_02_conversational_hinglish_stock_addition(self):
        conv_id = TestAgentFoundation.conversation_id
        payload = {
            "conversation_id": conv_id,
            "message": "Royal Scented Candle mein 5 units badha do"
        }
        res = self.client.post("/api/agent/chat", json=payload)
        self.assertEqual(res.status_code, 200, f"Hinglish chat failed: {res.text}")
        data = res.json()
        reply = data["reply"]
        print(f"Agent Reply (Hinglish): {reply}")
        
        # Verify in database that stock increased from 12 to 17
        updated = inventory_service.get_material_by_id(TestAgentFoundation.test_mat["id"])
        phys = updated["balance"]["physical_quantity"]
        self.assertEqual(phys, 17.0, f"Expected 17.0 in database, found {phys}")
        print(f"Verified database: Physical stock is now {phys} (12 + 5 = 17)")

    def test_03_conversational_follow_up(self):
        conv_id = TestAgentFoundation.conversation_id
        payload = {
            "conversation_id": conv_id,
            "message": "Ab total kitna available hai?"
        }
        res = self.client.post("/api/agent/chat", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()
        reply = data["reply"]
        print(f"Agent Follow-up Reply: {reply}")
        self.assertTrue("17" in reply)

    def test_04_conversation_history_persistence(self):
        conv_id = TestAgentFoundation.conversation_id
        res = self.client.get(f"/api/agent/conversations/{conv_id}/messages")
        self.assertEqual(res.status_code, 200)
        messages = res.json()
        self.assertGreaterEqual(len(messages), 6) # 3 user + 3 model
        print(f"Verified conversation persistence: {len(messages)} messages recorded.")

if __name__ == "__main__":
    unittest.main()
