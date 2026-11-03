from typing import Optional, List, Dict, Any
from backend.app.services.inventory_service import inventory_service
from backend.app.schemas.inventory import (
    MaterialCreate,
    MaterialUpdate,
    StockIncreaseRequest,
    StockDecreaseRequest,
    StockAdjustRequest
)

def _resolve_material_id(material_name_or_id: str) -> Optional[str]:
    """Helper to resolve a name, slug or id into a material id."""
    clean = material_name_or_id.strip()
    
    # Try direct id lookup
    direct = inventory_service.get_material_by_id(clean)
    if direct:
        return direct["id"]
        
    # Try fuzzy match
    matches = inventory_service.search_materials_fuzzy(clean, limit=1)
    if matches:
        return matches[0]["id"]
        
    return None

def search_inventory(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    """
    Search the gift shop inventory for products or raw materials matching a name, keyword, or category.
    Use this to inspect available items, check current stock numbers, or find an item ID before modifying it.
    """
    materials = inventory_service.search_materials_fuzzy(query, limit=limit)
    results = []
    for m in materials:
        bal = m.get("balance") or {}
        results.append({
            "id": m["id"],
            "name": m["name"],
            "category": m.get("category", "General"),
            "physical_quantity": bal.get("physical_quantity", 0.0),
            "reserved_quantity": bal.get("reserved_quantity", 0.0),
            "available_quantity": bal.get("available_quantity", 0.0),
            "unit": m.get("unit", "Pieces"),
            "unit_cost": m.get("unit_cost", 0.0),
            "minimum_stock": m.get("minimum_stock", 5.0)
        })
    return results

def get_material_details(material_name_or_id: str) -> Dict[str, Any]:
    """
    Retrieve full inventory and balance details for a specific material or gift product by its exact or partial name or ID.
    Returns current physical stock, reserved stock, available quantity, unit cost, and category.
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Product or material '{material_name_or_id}' was not found in inventory."}
        
    mat = inventory_service.get_material_by_id(mat_id)
    bal = mat.get("balance") or {}
    return {
        "id": mat["id"],
        "name": mat["name"],
        "category": mat.get("category", "General"),
        "description": mat.get("description", ""),
        "unit": mat.get("unit", "Pieces"),
        "unit_cost": mat.get("unit_cost", 0.0),
        "minimum_stock": mat.get("minimum_stock", 5.0),
        "physical_quantity": bal.get("physical_quantity", 0.0),
        "reserved_quantity": bal.get("reserved_quantity", 0.0),
        "available_quantity": bal.get("available_quantity", 0.0),
        "is_active": mat.get("is_active", True)
    }

def get_low_stock_alerts(threshold: Optional[float] = None) -> List[Dict[str, Any]]:
    """
    Check which materials or products are currently running low on stock (available stock <= minimum stock).
    Optional threshold overrides the default per-item minimum stock check.
    """
    low_items = inventory_service.get_low_stock_materials(threshold=threshold)
    alerts = []
    for item in low_items:
        mat = item["material"]
        alerts.append({
            "id": mat["id"],
            "name": mat["name"],
            "available_quantity": item["available_quantity"],
            "minimum_stock": item["minimum_stock"],
            "shortage": item["shortage"],
            "unit": mat.get("unit", "Pieces")
        })
    return alerts

def check_stock_movements(material_name_or_id: Optional[str] = None, limit: int = 20) -> List[Dict[str, Any]]:
    """
    Inspect the audit history of stock changes (restocks, consumptions, manual adjustments).
    Optionally filter by a specific product name or ID.
    """
    mat_id = None
    if material_name_or_id:
        mat_id = _resolve_material_id(material_name_or_id)
        
    movements = inventory_service.get_stock_movements(material_id=mat_id, limit=limit)
    return [
        {
            "material_id": m["material_id"],
            "movement_type": m["movement_type"],
            "quantity": m["quantity"],
            "previous_quantity": m["previous_quantity"],
            "new_quantity": m["new_quantity"],
            "reference": m.get("reference"),
            "notes": m.get("notes"),
            "created_at": m["created_at"]
        }
        for m in movements
    ]

def add_new_material(
    name: str, 
    unit: str = "Pieces", 
    minimum_stock: float = 5.0, 
    unit_cost: float = 0.0, 
    initial_stock: float = 0.0, 
    category: str = "General", 
    description: str = ""
) -> Dict[str, Any]:
    """
    Add a brand new item, raw material, or gift product to the shop inventory catalog.
    If the item already exists, do not call this tool; instead, use increase_inventory_stock.
    """
    # Check duplicates first
    dups = inventory_service.find_potential_duplicates(name)
    if dups:
        exact = [d for d in dups if d["reason"] == "Exact name match"]
        if exact:
            return {
                "error": f"An item with the name '{name}' already exists in inventory (ID: {exact[0]['material']['id']}). Use increase_inventory_stock to add more units."
            }
            
    req = MaterialCreate(
        name=name,
        unit=unit,
        minimum_stock=minimum_stock,
        unit_cost=unit_cost,
        initial_stock=initial_stock,
        category=category,
        description=description,
        is_active=True
    )
    created = inventory_service.create_material(req)
    bal = created.get("balance") or {}
    return {
        "success": True,
        "message": f"Successfully created new product '{created['name']}'.",
        "id": created["id"],
        "name": created["name"],
        "initial_stock": bal.get("physical_quantity", 0.0),
        "unit": created["unit"],
        "unit_cost": created["unit_cost"]
    }

def increase_inventory_stock(
    material_name_or_id: str, 
    quantity: float, 
    reason: str = "Stock addition via AI agent", 
    reference: Optional[str] = None
) -> Dict[str, Any]:
    """
    Increase the physical stock quantity of an existing material or product.
    IMPORTANT: This ADDS the quantity to existing stock (e.g., previous 12 + added 15 = new stock 27).
    Never use this to replace stock with a lower number; use adjust_inventory_count for audit corrections.
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Item '{material_name_or_id}' was not found in inventory. Would you like to add it as a new product first?"}
        
    try:
        req = StockIncreaseRequest(quantity=quantity, reason=reason, reference=reference)
        res = inventory_service.increase_stock(mat_id, req)
        mat = res["material"]
        return {
            "success": True,
            "material_name": mat["name"],
            "previous_stock": res["previous_quantity"],
            "added_quantity": res["added_quantity"],
            "new_stock": res["new_quantity"],
            "unit": mat["unit"],
            "reason": reason
        }
    except Exception as e:
        return {"error": str(e)}

def decrease_inventory_stock(
    material_name_or_id: str, 
    quantity: float, 
    reason: str = "Stock deduction via AI agent", 
    reference: Optional[str] = None
) -> Dict[str, Any]:
    """
    Deduct a specified quantity from an existing material or product.
    Enforces that stock can never drop below zero or below reserved order units.
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Item '{material_name_or_id}' was not found in inventory."}
        
    try:
        req = StockDecreaseRequest(quantity=quantity, reason=reason, reference=reference)
        res = inventory_service.decrease_stock(mat_id, req)
        mat = res["material"]
        return {
            "success": True,
            "material_name": mat["name"],
            "previous_stock": res["previous_quantity"],
            "deducted_quantity": res["deducted_quantity"],
            "new_stock": res["new_quantity"],
            "unit": mat["unit"],
            "reason": reason
        }
    except Exception as e:
        return {"error": str(e)}

def adjust_inventory_count(
    material_name_or_id: str, 
    new_physical_stock: float, 
    reason: str
) -> Dict[str, Any]:
    """
    Adjust / correct the physical stock balance of an item to an exact count following a manual count or stock audit.
    Requires a specific audit reason (e.g. 'Physical inventory count found 18 instead of 20').
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Item '{material_name_or_id}' was not found in inventory."}
        
    try:
        req = StockAdjustRequest(new_physical=new_physical_stock, reason=reason)
        res = inventory_service.adjust_stock(mat_id, req)
        mat = res["material"]
        return {
            "success": True,
            "material_name": mat["name"],
            "previous_stock": res["previous_quantity"],
            "adjusted_stock": res["new_quantity"],
            "difference": res["difference"],
            "unit": mat["unit"],
            "reason": reason
        }
    except Exception as e:
        return {"error": str(e)}

def update_material_info(
    material_name_or_id: str,
    new_name: Optional[str] = None,
    unit: Optional[str] = None,
    minimum_stock: Optional[float] = None,
    unit_cost: Optional[float] = None,
    description: Optional[str] = None,
    category: Optional[str] = None
) -> Dict[str, Any]:
    """
    Update metadata attributes of a material or product (e.g., name, purchase cost, unit, category, description).
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Item '{material_name_or_id}' was not found in inventory."}
        
    try:
        updates = MaterialUpdate(
            name=new_name,
            unit=unit,
            minimum_stock=minimum_stock,
            unit_cost=unit_cost,
            description=description,
            category=category
        )
        updated = inventory_service.update_material(mat_id, updates)
        return {
            "success": True,
            "material": updated
        }
    except Exception as e:
        return {"error": str(e)}

def delete_material_record(material_name_or_id: str, confirmation: bool = False) -> Dict[str, Any]:
    """
    Delete or archive a material from the catalog.
    IMPORTANT: Destructive action. If confirmation is False, the agent must ask the user for confirmation before executing.
    """
    mat_id = _resolve_material_id(material_name_or_id)
    if not mat_id:
        return {"error": f"Item '{material_name_or_id}' was not found in inventory."}
        
    mat = inventory_service.get_material_by_id(mat_id)
    if not confirmation:
        return {
            "requires_confirmation": True,
            "message": f"Are you sure you want to permanently delete '{mat['name']}' (Current stock: {mat['balance']['physical_quantity']} {mat['unit']})? Please confirm to proceed.",
            "material_id": mat_id,
            "material_name": mat["name"]
        }
        
    success = inventory_service.delete_material(mat_id)
    return {
        "success": success,
        "message": f"Successfully deleted '{mat['name']}' from the inventory catalog."
    }

ALL_AGENT_TOOLS = [
    search_inventory,
    get_material_details,
    get_low_stock_alerts,
    check_stock_movements,
    add_new_material,
    increase_inventory_stock,
    decrease_inventory_stock,
    adjust_inventory_count,
    update_material_info,
    delete_material_record
]
