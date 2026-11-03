import uuid
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from backend.app.core.supabase import get_supabase_admin
from backend.app.schemas.inventory import (
    MaterialCreate, 
    MaterialUpdate, 
    MaterialResponse, 
    InventoryBalanceResponse,
    StockIncreaseRequest,
    StockDecreaseRequest,
    StockAdjustRequest,
    StockMovementResponse,
    LowStockResponse
)

class InventoryService:
    def __init__(self):
        self.client = get_supabase_admin()

    def _get_utc_now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def _extract_balance(self, row: dict) -> dict:
        balances = row.get("inventory_balances")
        bal_obj = None
        if isinstance(balances, dict):
            bal_obj = balances
        elif isinstance(balances, list) and len(balances) > 0:
            bal_obj = balances[0]
            
        phys = float(bal_obj.get("physical_quantity", 0)) if bal_obj else 0.0
        resv = float(bal_obj.get("reserved_quantity", 0)) if bal_obj else 0.0
        avail = max(0.0, phys - resv)
        
        return {
            "id": bal_obj.get("id") if bal_obj else str(uuid.uuid4()),
            "material_id": row["id"],
            "physical_quantity": phys,
            "reserved_quantity": resv,
            "available_quantity": avail,
            "updated_at": bal_obj.get("updated_at") if bal_obj else row["updated_at"]
        }

    def list_materials(
        self, 
        search: Optional[str] = None, 
        category: Optional[str] = None, 
        is_active: Optional[bool] = None,
        limit: int = 100,
        offset: int = 0
    ) -> List[Dict[str, Any]]:
        query = self.client.table("materials").select("*, inventory_balances(*)")
        
        if is_active is not None:
            query = query.eq("is_active", is_active)
        if category:
            query = query.eq("category", category)
        if search:
            query = query.ilike("name", f"%{search}%")
            
        query = query.order("created_at", desc=True).range(offset, offset + limit - 1)
        res = query.execute()
        
        items = []
        for row in res.data or []:
            balance_dict = self._extract_balance(row)
            row_copy = dict(row)
            row_copy.pop("inventory_balances", None)
            row_copy["balance"] = balance_dict
            items.append(row_copy)
            
        return items

    def get_material_by_id(self, material_id: str) -> Optional[Dict[str, Any]]:
        res = self.client.table("materials").select("*, inventory_balances(*)").eq("id", material_id).execute()
        if not res.data:
            return None
            
        row = res.data[0]
        balance_dict = self._extract_balance(row)
        
        row_copy = dict(row)
        row_copy.pop("inventory_balances", None)
        row_copy["balance"] = balance_dict
        return row_copy

    def search_materials_fuzzy(self, search_text: str, limit: int = 10) -> List[Dict[str, Any]]:
        clean_text = search_text.strip().lower()
        if not clean_text:
            return self.list_materials(limit=limit)
            
        all_materials = self.list_materials(limit=200)
        matches = []
        tokens = [t for t in clean_text.replace("-", " ").replace("_", " ").split() if len(t) > 1]
        
        for m in all_materials:
            name_lower = m["name"].lower()
            desc_lower = (m.get("description") or "").lower()
            cat_lower = (m.get("category") or "").lower()
            
            score = 0
            if clean_text in name_lower:
                score += 10
            if any(t in name_lower for t in tokens):
                score += 5
            if any(t in cat_lower for t in tokens):
                score += 3
            if any(t in desc_lower for t in tokens):
                score += 1
                
            if score > 0:
                matches.append((score, m))
                
        matches.sort(key=lambda x: x[0], reverse=True)
        return [m for _, m in matches[:limit]]

    def create_material(self, data: MaterialCreate) -> Dict[str, Any]:
        mat_id = f"mat-{uuid.uuid4().hex[:12]}"
        now = self._get_utc_now()
        
        mat_payload = {
            "id": mat_id,
            "name": data.name,
            "unit": data.unit,
            "minimum_stock": data.minimum_stock,
            "unit_cost": data.unit_cost,
            "description": data.description,
            "category": data.category,
            "image_url": data.image_url,
            "is_active": data.is_active,
            "created_at": now,
            "updated_at": now
        }
        
        res = self.client.table("materials").insert(mat_payload).execute()
        if not res.data:
            raise RuntimeError("Failed to insert material into Supabase")
            
        # Create inventory balance
        bal_id = f"bal-{uuid.uuid4().hex[:12]}"
        bal_payload = {
            "id": bal_id,
            "material_id": mat_id,
            "physical_quantity": data.initial_stock,
            "reserved_quantity": 0.0,
            "updated_at": now
        }
        self.client.table("inventory_balances").insert(bal_payload).execute()
        
        # Log opening stock movement if > 0
        if data.initial_stock > 0:
            mov_payload = {
                "id": f"mov-{uuid.uuid4().hex[:12]}",
                "material_id": mat_id,
                "movement_type": "initial_stock",
                "quantity": data.initial_stock,
                "previous_quantity": 0.0,
                "new_quantity": data.initial_stock,
                "reference": "INITIAL-STOCK",
                "notes": f"Opening inventory for {data.name}",
                "created_by": "Shop Owner",
                "created_at": now
            }
            self.client.table("stock_movements").insert(mov_payload).execute()
            
        return self.get_material_by_id(mat_id)

    def update_material(self, material_id: str, updates: MaterialUpdate) -> Optional[Dict[str, Any]]:
        existing = self.get_material_by_id(material_id)
        if not existing:
            return None
            
        payload = updates.model_dump(exclude_unset=True)
        if not payload:
            return existing
            
        payload["updated_at"] = self._get_utc_now()
        self.client.table("materials").update(payload).eq("id", material_id).execute()
        return self.get_material_by_id(material_id)

    def delete_material(self, material_id: str, soft_delete: bool = False) -> bool:
        existing = self.get_material_by_id(material_id)
        if not existing:
            return False
            
        if soft_delete:
            self.client.table("materials").update({"is_active": False, "updated_at": self._get_utc_now()}).eq("id", material_id).execute()
            return True
            
        # Delete dependent movements and balances
        self.client.table("stock_movements").delete().eq("material_id", material_id).execute()
        self.client.table("inventory_balances").delete().eq("material_id", material_id).execute()
        self.client.table("materials").delete().eq("id", material_id).execute()
        return True

    def increase_stock(self, material_id: str, req: StockIncreaseRequest) -> Dict[str, Any]:
        existing = self.get_material_by_id(material_id)
        if not existing:
            raise ValueError(f"Material with id '{material_id}' not found.")
            
        current_bal = existing["balance"]
        prev_phys = float(current_bal["physical_quantity"])
        new_phys = prev_phys + req.quantity
        now = self._get_utc_now()
        
        # Update balance
        self.client.table("inventory_balances").update({
            "physical_quantity": new_phys,
            "updated_at": now
        }).eq("material_id", material_id).execute()
        
        # Record stock movement
        mov_payload = {
            "id": f"mov-{uuid.uuid4().hex[:12]}",
            "material_id": material_id,
            "movement_type": "restock",
            "quantity": req.quantity,
            "previous_quantity": prev_phys,
            "new_quantity": new_phys,
            "reference": req.reference or "STOCK-IN",
            "notes": req.reason,
            "created_by": "Shop Owner",
            "created_at": now
        }
        self.client.table("stock_movements").insert(mov_payload).execute()
        
        updated = self.get_material_by_id(material_id)
        return {
            "material": updated,
            "previous_quantity": prev_phys,
            "added_quantity": req.quantity,
            "new_quantity": new_phys,
            "movement_id": mov_payload["id"]
        }

    def decrease_stock(self, material_id: str, req: StockDecreaseRequest) -> Dict[str, Any]:
        existing = self.get_material_by_id(material_id)
        if not existing:
            raise ValueError(f"Material with id '{material_id}' not found.")
            
        current_bal = existing["balance"]
        prev_phys = float(current_bal["physical_quantity"])
        reserved = float(current_bal["reserved_quantity"])
        
        if prev_phys - req.quantity < 0:
            raise ValueError(f"Cannot decrease stock by {req.quantity}. Current physical stock is only {prev_phys}.")
            
        if prev_phys - req.quantity < reserved:
            raise ValueError(
                f"Cannot decrease stock to {prev_phys - req.quantity}. {reserved} units are currently reserved for pending orders."
            )
            
        new_phys = prev_phys - req.quantity
        now = self._get_utc_now()
        
        # Update balance
        self.client.table("inventory_balances").update({
            "physical_quantity": new_phys,
            "updated_at": now
        }).eq("material_id", material_id).execute()
        
        # Record stock movement
        mov_payload = {
            "id": f"mov-{uuid.uuid4().hex[:12]}",
            "material_id": material_id,
            "movement_type": "manual_adjustment",
            "quantity": -req.quantity,
            "previous_quantity": prev_phys,
            "new_quantity": new_phys,
            "reference": req.reference or "STOCK-OUT",
            "notes": req.reason,
            "created_by": "Shop Owner",
            "created_at": now
        }
        self.client.table("stock_movements").insert(mov_payload).execute()
        
        updated = self.get_material_by_id(material_id)
        return {
            "material": updated,
            "previous_quantity": prev_phys,
            "deducted_quantity": req.quantity,
            "new_quantity": new_phys,
            "movement_id": mov_payload["id"]
        }

    def adjust_stock(self, material_id: str, req: StockAdjustRequest) -> Dict[str, Any]:
        existing = self.get_material_by_id(material_id)
        if not existing:
            raise ValueError(f"Material with id '{material_id}' not found.")
            
        current_bal = existing["balance"]
        prev_phys = float(current_bal["physical_quantity"])
        reserved = float(current_bal["reserved_quantity"])
        
        if req.new_physical < 0:
            raise ValueError("Physical stock count cannot be negative.")
            
        if req.new_physical < reserved:
            raise ValueError(
                f"New count ({req.new_physical}) is less than reserved order quantity ({reserved})."
            )
            
        diff = req.new_physical - prev_phys
        now = self._get_utc_now()
        
        # Update balance
        self.client.table("inventory_balances").update({
            "physical_quantity": req.new_physical,
            "updated_at": now
        }).eq("material_id", material_id).execute()
        
        # Record stock movement
        mov_payload = {
            "id": f"mov-{uuid.uuid4().hex[:12]}",
            "material_id": material_id,
            "movement_type": "manual_adjustment",
            "quantity": diff,
            "previous_quantity": prev_phys,
            "new_quantity": req.new_physical,
            "reference": "MANUAL-AUDIT",
            "notes": req.reason,
            "created_by": "Shop Owner",
            "created_at": now
        }
        self.client.table("stock_movements").insert(mov_payload).execute()
        
        updated = self.get_material_by_id(material_id)
        return {
            "material": updated,
            "previous_quantity": prev_phys,
            "difference": diff,
            "new_quantity": req.new_physical,
            "movement_id": mov_payload["id"]
        }

    def get_low_stock_materials(self, threshold: Optional[float] = None) -> List[Dict[str, Any]]:
        all_items = self.list_materials(is_active=True, limit=500)
        low_stock = []
        
        for item in all_items:
            bal = item["balance"]
            avail = float(bal["available_quantity"])
            min_stock = threshold if threshold is not None else float(item["minimum_stock"])
            
            if avail <= min_stock:
                shortage = max(0.0, min_stock - avail)
                low_stock.append({
                    "material": item,
                    "physical_quantity": float(bal["physical_quantity"]),
                    "reserved_quantity": float(bal["reserved_quantity"]),
                    "available_quantity": avail,
                    "minimum_stock": min_stock,
                    "shortage": shortage
                })
                
        low_stock.sort(key=lambda x: x["shortage"], reverse=True)
        return low_stock

    def get_stock_movements(self, material_id: Optional[str] = None, limit: int = 50) -> List[Dict[str, Any]]:
        query = self.client.table("stock_movements").select("*")
        if material_id:
            query = query.eq("material_id", material_id)
        query = query.order("created_at", desc=True).limit(limit)
        res = query.execute()
        return res.data or []

    def find_potential_duplicates(self, name: str) -> List[Dict[str, Any]]:
        clean_name = name.strip().lower()
        all_materials = self.list_materials(limit=200)
        duplicates = []
        
        for mat in all_materials:
            other_name = mat["name"].lower().strip()
            if other_name == clean_name:
                duplicates.append({"material": mat, "reason": "Exact name match"})
            elif clean_name in other_name or other_name in clean_name:
                duplicates.append({"material": mat, "reason": "Substring containment match"})
                
        return duplicates

inventory_service = InventoryService()
