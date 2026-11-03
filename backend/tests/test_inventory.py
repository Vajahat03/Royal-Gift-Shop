import sys
import unittest
from pathlib import Path

# Add project root to sys.path
root_dir = Path(__file__).resolve().parent.parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

from fastapi.testclient import TestClient
from backend.app.main import app

class TestInventoryIntegration(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.created_mat_id = None

    def test_01_create_material(self):
        payload = {
            "name": "Phase 2 Royal Artisan Teddy",
            "unit": "Pieces",
            "minimum_stock": 5.0,
            "unit_cost": 35.0,
            "description": "Handmade silk bow teddy for phase 2 verification",
            "category": "Keepsakes & Toys",
            "initial_stock": 10.0,
            "is_active": True
        }
        res = self.client.post("/api/inventory/materials", json=payload)
        self.assertEqual(res.status_code, 201, f"Failed create material: {res.text}")
        data = res.json()
        self.assertIn("id", data)
        self.assertEqual(data["name"], payload["name"])
        self.assertIsNotNone(data["balance"])
        self.assertEqual(data["balance"]["physical_quantity"], 10.0)
        self.assertEqual(data["balance"]["reserved_quantity"], 0.0)
        self.assertEqual(data["balance"]["available_quantity"], 10.0)
        TestInventoryIntegration.created_mat_id = data["id"]
        print(f"Created material: {data['id']} with stock 10.0")

    def test_02_verify_opening_movement(self):
        mat_id = TestInventoryIntegration.created_mat_id
        res = self.client.get(f"/api/inventory/movements?material_id={mat_id}")
        self.assertEqual(res.status_code, 200)
        movements = res.json()
        self.assertGreaterEqual(len(movements), 1)
        self.assertEqual(movements[0]["movement_type"], "initial_stock")
        self.assertEqual(movements[0]["quantity"], 10.0)
        print("Verified initial_stock movement in ledger.")

    def test_03_increase_stock(self):
        mat_id = TestInventoryIntegration.created_mat_id
        payload = {
            "quantity": 5.0,
            "reason": "Restocked 5 artisan teddies from supplier",
            "reference": "RESTOCK-INV-771"
        }
        res = self.client.post(f"/api/inventory/materials/{mat_id}/increase-stock", json=payload)
        self.assertEqual(res.status_code, 200, f"Increase stock failed: {res.text}")
        data = res.json()
        self.assertEqual(data["previous_quantity"], 10.0)
        self.assertEqual(data["added_quantity"], 5.0)
        self.assertEqual(data["new_quantity"], 15.0)
        self.assertEqual(data["material"]["balance"]["physical_quantity"], 15.0)
        print("Stock increased: 10.0 + 5.0 = 15.0")

    def test_04_decrease_stock(self):
        mat_id = TestInventoryIntegration.created_mat_id
        payload = {
            "quantity": 3.0,
            "reason": "Boutique showcase sample display",
            "reference": "SAMPLE-01"
        }
        res = self.client.post(f"/api/inventory/materials/{mat_id}/decrease-stock", json=payload)
        self.assertEqual(res.status_code, 200, f"Decrease stock failed: {res.text}")
        data = res.json()
        self.assertEqual(data["previous_quantity"], 15.0)
        self.assertEqual(data["deducted_quantity"], 3.0)
        self.assertEqual(data["new_quantity"], 12.0)
        self.assertEqual(data["material"]["balance"]["physical_quantity"], 12.0)
        print("Stock decreased: 15.0 - 3.0 = 12.0")

    def test_05_prevent_negative_stock(self):
        mat_id = TestInventoryIntegration.created_mat_id
        payload = {
            "quantity": 999.0,
            "reason": "Excessive deduction should fail",
        }
        res = self.client.post(f"/api/inventory/materials/{mat_id}/decrease-stock", json=payload)
        self.assertEqual(res.status_code, 400, "Should have rejected deduction that exceeds stock")
        print("Negative stock deduction correctly blocked!")

    def test_06_stock_adjustment(self):
        mat_id = TestInventoryIntegration.created_mat_id
        payload = {
            "new_physical": 20.0,
            "reason": "Quarterly stock audit count correction"
        }
        res = self.client.post(f"/api/inventory/materials/{mat_id}/adjust", json=payload)
        self.assertEqual(res.status_code, 200, f"Adjustment failed: {res.text}")
        data = res.json()
        self.assertEqual(data["previous_quantity"], 12.0)
        self.assertEqual(data["difference"], 8.0)
        self.assertEqual(data["new_quantity"], 20.0)
        self.assertEqual(data["material"]["balance"]["physical_quantity"], 20.0)
        print("Manual stock audit adjustment succeeded: adjusted to 20.0")

    def test_07_fuzzy_search(self):
        res = self.client.get("/api/inventory/materials/search?q=artisan+teddy")
        self.assertEqual(res.status_code, 200)
        results = res.json()
        self.assertGreaterEqual(len(results), 1)
        self.assertTrue(any(r["id"] == TestInventoryIntegration.created_mat_id for r in results))
        print("Fuzzy search successfully matched 'artisan teddy'.")

    def test_08_low_stock_query(self):
        # With stock at 20, threshold of 25 should flag it as low stock
        res = self.client.get("/api/inventory/low-stock?threshold=25")
        self.assertEqual(res.status_code, 200)
        items = res.json()
        self.assertTrue(any(i["material"]["id"] == TestInventoryIntegration.created_mat_id for i in items))
        print("Low stock detection verified.")

    def test_09_cleanup_delete_material(self):
        mat_id = TestInventoryIntegration.created_mat_id
        res = self.client.delete(f"/api/inventory/materials/{mat_id}")
        self.assertEqual(res.status_code, 200)
        
        # Verify it no longer exists
        res_get = self.client.get(f"/api/inventory/materials/{mat_id}")
        self.assertEqual(res_get.status_code, 404)
        print("Test material cleanly deleted after verification.")

if __name__ == "__main__":
    unittest.main()
