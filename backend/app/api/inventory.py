from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query, status
from backend.app.schemas.inventory import (
    MaterialCreate,
    MaterialUpdate,
    MaterialResponse,
    StockIncreaseRequest,
    StockDecreaseRequest,
    StockAdjustRequest,
    StockMovementResponse,
    LowStockResponse
)
from backend.app.services.inventory_service import inventory_service

router = APIRouter(prefix="/inventory", tags=["Inventory Management"])

@router.get("/materials", response_model=List[MaterialResponse])
async def list_materials(
    search: Optional[str] = Query(None, description="Search by material name"),
    category: Optional[str] = Query(None, description="Filter by category"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    limit: int = Query(100, ge=1, le=500),
    offset: int = Query(0, ge=0)
):
    return inventory_service.list_materials(
        search=search, 
        category=category, 
        is_active=is_active, 
        limit=limit, 
        offset=offset
    )

@router.get("/materials/search", response_model=List[MaterialResponse])
async def search_materials(
    q: str = Query(..., min_length=1, description="Fuzzy search query for materials"),
    limit: int = Query(10, ge=1, le=50)
):
    return inventory_service.search_materials_fuzzy(search_text=q, limit=limit)

@router.get("/materials/{material_id}", response_model=MaterialResponse)
async def get_material(material_id: str):
    material = inventory_service.get_material_by_id(material_id)
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Material with ID '{material_id}' not found."
        )
    return material

@router.post("/materials", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
async def create_material(data: MaterialCreate):
    try:
        return inventory_service.create_material(data)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.put("/materials/{material_id}", response_model=MaterialResponse)
async def update_material(material_id: str, updates: MaterialUpdate):
    updated = inventory_service.update_material(material_id, updates)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Material with ID '{material_id}' not found."
        )
    return updated

@router.delete("/materials/{material_id}", status_code=status.HTTP_200_OK)
async def delete_material(material_id: str):
    deleted = inventory_service.delete_material(material_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Material with ID '{material_id}' not found."
        )
    return {"success": True, "message": f"Material '{material_id}' deleted successfully."}

@router.post("/materials/{material_id}/increase-stock")
async def increase_stock(material_id: str, req: StockIncreaseRequest):
    try:
        return inventory_service.increase_stock(material_id, req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/materials/{material_id}/decrease-stock")
async def decrease_stock(material_id: str, req: StockDecreaseRequest):
    try:
        return inventory_service.decrease_stock(material_id, req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/materials/{material_id}/adjust")
async def adjust_stock(material_id: str, req: StockAdjustRequest):
    try:
        return inventory_service.adjust_stock(material_id, req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/low-stock", response_model=List[LowStockResponse])
async def get_low_stock(threshold: Optional[float] = Query(None, ge=0)):
    return inventory_service.get_low_stock_materials(threshold=threshold)

@router.get("/movements", response_model=List[StockMovementResponse])
async def get_movements(
    material_id: Optional[str] = Query(None, description="Filter movements by material"),
    limit: int = Query(50, ge=1, le=200)
):
    return inventory_service.get_stock_movements(material_id=material_id, limit=limit)

@router.get("/duplicates")
async def check_duplicates(name: str = Query(..., min_length=1)):
    return inventory_service.find_potential_duplicates(name=name)
