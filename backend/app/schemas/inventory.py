from datetime import datetime
from typing import Optional, Literal
from pydantic import BaseModel, Field

MaterialUnit = Literal['Pieces', 'Metres', 'Sets', 'Grams', 'Boxes', 'Rolls']

class InventoryBalanceResponse(BaseModel):
    id: str
    material_id: str
    physical_quantity: float = 0.0
    reserved_quantity: float = 0.0
    available_quantity: float = 0.0
    updated_at: datetime

class MaterialBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    unit: str = Field(default="Pieces")
    minimum_stock: float = Field(default=5.0, ge=0)
    unit_cost: float = Field(default=0.0, ge=0)
    description: Optional[str] = None
    category: str = Field(default="General")
    image_url: Optional[str] = None
    is_active: bool = True

class MaterialCreate(MaterialBase):
    initial_stock: float = Field(default=0.0, ge=0)

class MaterialUpdate(BaseModel):
    name: Optional[str] = None
    unit: Optional[str] = None
    minimum_stock: Optional[float] = Field(default=None, ge=0)
    unit_cost: Optional[float] = Field(default=None, ge=0)
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class MaterialResponse(MaterialBase):
    id: str
    created_at: datetime
    updated_at: datetime
    balance: Optional[InventoryBalanceResponse] = None

class StockIncreaseRequest(BaseModel):
    quantity: float = Field(..., gt=0, description="Quantity to add to inventory")
    reason: Optional[str] = Field(default="Stock addition via operations", description="Reason for stock increase")
    reference: Optional[str] = Field(default=None, description="Optional invoice or tracking reference")

class StockDecreaseRequest(BaseModel):
    quantity: float = Field(..., gt=0, description="Quantity to deduct from inventory")
    reason: Optional[str] = Field(default="Manual reduction or damage write-off", description="Reason for stock reduction")
    reference: Optional[str] = Field(default=None, description="Reference code")

class StockAdjustRequest(BaseModel):
    new_physical: float = Field(..., ge=0, description="New verified physical stock count")
    reason: str = Field(..., min_length=3, description="Mandatory audit reason for manual count adjustment")

class StockMovementResponse(BaseModel):
    id: str
    material_id: str
    movement_type: str
    quantity: float
    previous_quantity: float
    new_quantity: float
    reference: Optional[str] = None
    notes: Optional[str] = None
    created_by: str = "Shop Owner"
    created_at: datetime

class LowStockResponse(BaseModel):
    material: MaterialResponse
    physical_quantity: float
    reserved_quantity: float
    available_quantity: float
    minimum_stock: float
    shortage: float
