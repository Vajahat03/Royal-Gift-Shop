export type MaterialUnit = 'Pieces' | 'Metres' | 'Sets' | 'Grams' | 'Boxes' | 'Rolls';

export interface Material {
  id: string;
  name: string;
  unit: MaterialUnit;
  minimum_stock: number;
  unit_cost: number;
  description?: string;
  category: string;
  is_active: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryBalance {
  id: string;
  material_id: string;
  physical_quantity: number;
  reserved_quantity: number;
  available_quantity: number; // calculated: physical - reserved
  updated_at: string;
  material?: Material;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  total_orders?: number;
  total_spent?: number;
}

export interface GiftRecipeItem {
  id: string;
  recipe_id: string;
  material_id: string;
  quantity_required: number;
  created_at: string;
  material?: Material;
}

export interface GiftRecipe {
  id: string;
  name: string;
  description?: string;
  selling_price: number;
  is_active: boolean;
  items: GiftRecipeItem[];
  created_at: string;
  updated_at: string;
  production_capacity?: number;
  limiting_material?: string;
  cost_to_make?: number;
  profit_margin?: number;
}

export type OrderStatus = 'draft' | 'confirmed' | 'reserved' | 'in_production' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'partially_paid' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  recipe_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  recipe?: GiftRecipe;
}

export interface OrderMaterial {
  id: string;
  order_id: string;
  order_item_id: string;
  material_id: string;
  expected_quantity: number;
  actual_quantity: number;
  created_at: string;
  material?: Material;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  order_date: string;
  expected_delivery_date?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number;
  notes?: string;
  items: OrderItem[];
  materials_breakdown: OrderMaterial[];
  customer?: Customer;
  created_at: string;
  updated_at: string;
}

export interface RestockItem {
  id: string;
  restock_id: string;
  material_id: string;
  quantity: number;
  unit_cost: number;
  subtotal: number;
  material?: Material;
}

export interface Restock {
  id: string;
  supplier_name: string;
  restock_date: string;
  invoice_reference?: string;
  total_cost: number;
  notes?: string;
  items: RestockItem[];
  created_at: string;
}

export type MovementType = 
  | 'initial_stock' 
  | 'restock' 
  | 'reservation' 
  | 'reservation_release' 
  | 'production_consumption' 
  | 'material_return' 
  | 'manual_adjustment';

export interface StockMovement {
  id: string;
  material_id: string;
  movement_type: MovementType;
  quantity: number; // positive or negative
  previous_quantity: number;
  new_quantity: number;
  order_id?: string;
  restock_id?: string;
  reference?: string;
  notes?: string;
  created_by: string;
  created_at: string;
  material?: Material;
  order?: { order_number: string };
}

export interface ShopSettings {
  shopName: string;
  currencySymbol: string;
  taxRate: number;
  address: string;
  phone: string;
  email: string;
}
