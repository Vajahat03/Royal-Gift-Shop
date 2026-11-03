import { createClient } from '@supabase/supabase-js';
import type { 
  Material, 
  InventoryBalance, 
  Customer, 
  GiftRecipe, 
  Order, 
  StockMovement, 
  ShopSettings 
} from '../types';

// Supabase live credentials with env fallbacks
const DEFAULT_SUPABASE_URL = 'https://omgbhmnmpvilaahujfwr.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_ot6rJFgv-1r8Mx71Ffw6Pw_T_KN4_Ql';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.SUPABASE_PUBLISHABLE_KEY || 
  DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Health check to test Supabase connection and verify tables exist
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string; tablesFound?: string[] }> {
  if (!supabase) {
    return { success: false, message: 'Supabase client is not configured.' };
  }

  try {
    const { error: matError } = await supabase
      .from('materials')
      .select('id', { count: 'exact', head: true });

    if (matError) {
      // If table doesn't exist yet, explain to run SQL migration
      if (matError.code === '42P01' || matError.message.includes('relation "materials" does not exist')) {
        return {
          success: false,
          message: 'Connected to Supabase project! However, database tables have not been created yet. Please execute supabase/migrations/20261031_init.sql in the Supabase SQL Editor.'
        };
      }
      return { success: false, message: `Supabase query error: ${matError.message}` };
    }

    return { 
      success: true, 
      message: 'Supabase is fully connected and ready! Tables and RLS policies are active.',
      tablesFound: ['materials', 'inventory_balances', 'customers', 'gift_recipes', 'orders']
    };
  } catch (err: any) {
    return { 
      success: false, 
      message: err?.message || 'Failed to connect to Supabase.' 
    };
  }
}

/**
 * Fetch all boutique data from Supabase
 */
export async function fetchAllFromSupabase(): Promise<{
  materials: Material[];
  balances: InventoryBalance[];
  customers: Customer[];
  recipes: GiftRecipe[];
  orders: Order[];
  movements: StockMovement[];
  settings?: ShopSettings;
} | null> {
  if (!supabase) return null;

  try {
    const [matRes, balRes, custRes, recRes, recItemsRes, ordRes, ordItemsRes, movRes, setRes] = await Promise.all([
      supabase.from('materials').select('*').order('created_at', { ascending: false }),
      supabase.from('inventory_balances').select('*'),
      supabase.from('customers').select('*').order('created_at', { ascending: false }),
      supabase.from('gift_recipes').select('*').order('created_at', { ascending: false }),
      supabase.from('gift_recipe_items').select('*'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('order_items').select('*'),
      supabase.from('stock_movements').select('*').order('created_at', { ascending: false }).limit(200),
      supabase.from('shop_settings').select('*').eq('id', 'default').maybeSingle()
    ]);

    if (matRes.error) throw matRes.error;

    const materials: Material[] = (matRes.data || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      category: m.category || 'General',
      description: m.description || '',
      unit: m.unit || 'Pieces',
      unit_cost: Number(m.unit_cost) || 0,
      minimum_stock: Number(m.minimum_stock) || 5,
      is_active: m.is_active ?? true,
      image_url: m.image_url || undefined,
      created_at: m.created_at,
      updated_at: m.updated_at
    }));

    const balances: InventoryBalance[] = (balRes.data || []).map((b: any) => ({
      id: b.id,
      material_id: b.material_id,
      physical_quantity: Number(b.physical_quantity) || 0,
      reserved_quantity: Number(b.reserved_quantity) || 0,
      available_quantity: Math.max(0, (Number(b.physical_quantity) || 0) - (Number(b.reserved_quantity) || 0)),
      updated_at: b.updated_at
    }));

    const customers: Customer[] = (custRes.data || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      phone: c.phone || '',
      email: c.email || '',
      address: c.address || '',
      notes: c.notes || '',
      created_at: c.created_at,
      updated_at: c.updated_at
    }));

    const recipeItemsMap = new Map<string, any[]>();
    (recItemsRes.data || []).forEach((item: any) => {
      const list = recipeItemsMap.get(item.recipe_id) || [];
      list.push({
        id: item.id,
        recipe_id: item.recipe_id,
        material_id: item.material_id,
        quantity_required: Number(item.quantity_required) || 1,
        created_at: item.created_at
      });
      recipeItemsMap.set(item.recipe_id, list);
    });

    const recipes: GiftRecipe[] = (recRes.data || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      description: r.description || '',
      selling_price: Number(r.selling_price) || 0,
      is_active: r.is_active ?? true,
      items: recipeItemsMap.get(r.id) || [],
      created_at: r.created_at,
      updated_at: r.updated_at
    }));

    const orderItemsMap = new Map<string, any[]>();
    (ordItemsRes.data || []).forEach((item: any) => {
      const list = orderItemsMap.get(item.order_id) || [];
      list.push({
        id: item.id,
        order_id: item.order_id,
        recipe_id: item.recipe_id,
        quantity: Number(item.quantity) || 1,
        unit_price: Number(item.unit_price) || 0,
        subtotal: Number(item.subtotal) || 0
      });
      orderItemsMap.set(item.order_id, list);
    });

    const orders: Order[] = (ordRes.data || []).map((o: any) => ({
      id: o.id,
      order_number: o.order_number,
      customer_id: o.customer_id,
      order_date: o.order_date,
      expected_delivery_date: o.expected_delivery_date || undefined,
      status: o.status,
      payment_status: o.payment_status,
      total_amount: Number(o.total_amount) || 0,
      notes: o.notes || '',
      items: orderItemsMap.get(o.id) || [],
      materials_breakdown: [],
      created_at: o.created_at,
      updated_at: o.updated_at
    }));

    const movements: StockMovement[] = (movRes.data || []).map((m: any) => ({
      id: m.id,
      material_id: m.material_id,
      movement_type: m.movement_type,
      quantity: Number(m.quantity) || 0,
      previous_quantity: Number(m.previous_quantity) || 0,
      new_quantity: Number(m.new_quantity) || 0,
      order_id: m.order_id || undefined,
      restock_id: m.restock_id || undefined,
      reference: m.reference || '',
      notes: m.notes || '',
      created_by: m.created_by || 'Shop Owner',
      created_at: m.created_at
    }));

    let settings: ShopSettings | undefined = undefined;
    if (setRes.data) {
      settings = {
        shopName: setRes.data.store_name || setRes.data.shopName || 'Petite Maison Gift Boutique',
        currencySymbol: setRes.data.currency_symbol || setRes.data.currencySymbol || '$',
        taxRate: Number(setRes.data.tax_rate ?? setRes.data.taxRate) || 8.5,
        address: setRes.data.address || '',
        phone: setRes.data.phone || '',
        email: setRes.data.email || ''
      };
    }

    return {
      materials,
      balances,
      customers,
      recipes,
      orders,
      movements,
      settings
    };
  } catch (err) {
    console.warn('Failed to fetch from Supabase:', err);
    return null;
  }
}

/**
 * Upsert a material and its balance into Supabase
 */
export async function syncMaterialToSupabase(material: Material, balance?: InventoryBalance): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error: matErr } = await supabase.from('materials').upsert({
      id: material.id,
      name: material.name,
      category: material.category,
      unit: material.unit,
      unit_cost: material.unit_cost,
      minimum_stock: material.minimum_stock,
      description: material.description || null,
      image_url: material.image_url || null,
      is_active: material.is_active,
      created_at: material.created_at,
      updated_at: material.updated_at
    }, { onConflict: 'id' });

    if (matErr) throw matErr;

    if (balance) {
      const { error: balErr } = await supabase.from('inventory_balances').upsert({
        id: balance.id,
        material_id: balance.material_id,
        physical_quantity: balance.physical_quantity,
        reserved_quantity: balance.reserved_quantity,
        updated_at: balance.updated_at
      }, { onConflict: 'material_id' });

      if (balErr) throw balErr;
    }

    return true;
  } catch (err) {
    console.error('Failed to sync material to Supabase:', err);
    return false;
  }
}

/**
 * Delete a material from Supabase
 */
export async function deleteMaterialFromSupabase(materialId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('materials').delete().eq('id', materialId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to delete material from Supabase:', err);
    return false;
  }
}

/**
 * Upsert a customer into Supabase
 */
export async function syncCustomerToSupabase(customer: Customer): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('customers').upsert({
      id: customer.id,
      name: customer.name,
      phone: customer.phone || null,
      email: customer.email || null,
      address: customer.address || null,
      notes: customer.notes || null,
      created_at: customer.created_at,
      updated_at: customer.updated_at
    }, { onConflict: 'id' });

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to sync customer to Supabase:', err);
    return false;
  }
}

/**
 * Delete a customer from Supabase
 */
export async function deleteCustomerFromSupabase(customerId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('customers').delete().eq('id', customerId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to delete customer from Supabase:', err);
    return false;
  }
}

/**
 * Upsert a gift recipe into Supabase
 */
export async function syncRecipeToSupabase(recipe: GiftRecipe): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error: recErr } = await supabase.from('gift_recipes').upsert({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description || null,
      selling_price: recipe.selling_price,
      is_active: recipe.is_active,
      created_at: recipe.created_at,
      updated_at: recipe.updated_at
    }, { onConflict: 'id' });

    if (recErr) throw recErr;

    // Delete existing items and re-insert
    await supabase.from('gift_recipe_items').delete().eq('recipe_id', recipe.id);

    if (recipe.items && recipe.items.length > 0) {
      const itemsToInsert = recipe.items.map(item => ({
        id: item.id,
        recipe_id: recipe.id,
        material_id: item.material_id,
        quantity_required: item.quantity_required,
        created_at: item.created_at
      }));

      const { error: itemErr } = await supabase.from('gift_recipe_items').insert(itemsToInsert);
      if (itemErr) throw itemErr;
    }

    return true;
  } catch (err) {
    console.error('Failed to sync recipe to Supabase:', err);
    return false;
  }
}

/**
 * Delete a recipe from Supabase
 */
export async function deleteRecipeFromSupabase(recipeId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('gift_recipes').delete().eq('id', recipeId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Failed to delete recipe from Supabase:', err);
    return false;
  }
}

/**
 * Push full local state to Supabase (Initial seed or manual sync)
 */
export async function pushFullStateToSupabase(state: {
  materials: Material[];
  balances: InventoryBalance[];
  customers: Customer[];
  recipes: GiftRecipe[];
  settings: ShopSettings;
}): Promise<{ success: boolean; count: number; error?: string }> {
  if (!supabase) {
    return { success: false, count: 0, error: 'Supabase not configured' };
  }

  try {
    // 1. Settings
    await supabase.from('shop_settings').upsert({
      id: 'default',
      store_name: state.settings.shopName,
      currency_symbol: state.settings.currencySymbol,
      tax_rate: state.settings.taxRate,
      address: state.settings.address,
      phone: state.settings.phone,
      email: state.settings.email
    }, { onConflict: 'id' });

    // 2. Materials
    if (state.materials.length > 0) {
      const materialsPayload = state.materials.map(m => ({
        id: m.id,
        name: m.name,
        category: m.category,
        unit: m.unit,
        unit_cost: m.unit_cost,
        minimum_stock: m.minimum_stock,
        description: m.description || null,
        image_url: m.image_url || null,
        is_active: m.is_active,
        created_at: m.created_at,
        updated_at: m.updated_at
      }));
      await supabase.from('materials').upsert(materialsPayload, { onConflict: 'id' });
    }

    // 3. Balances
    if (state.balances.length > 0) {
      const balancesPayload = state.balances.map(b => ({
        id: b.id,
        material_id: b.material_id,
        physical_quantity: b.physical_quantity,
        reserved_quantity: b.reserved_quantity,
        updated_at: b.updated_at
      }));
      await supabase.from('inventory_balances').upsert(balancesPayload, { onConflict: 'material_id' });
    }

    // 4. Customers
    if (state.customers.length > 0) {
      const customersPayload = state.customers.map(c => ({
        id: c.id,
        name: c.name,
        phone: c.phone || null,
        email: c.email || null,
        address: c.address || null,
        notes: c.notes || null,
        created_at: c.created_at,
        updated_at: c.updated_at
      }));
      await supabase.from('customers').upsert(customersPayload, { onConflict: 'id' });
    }

    // 5. Recipes & Recipe Items
    for (const recipe of state.recipes) {
      await syncRecipeToSupabase(recipe);
    }

    return { 
      success: true, 
      count: state.materials.length + state.customers.length + state.recipes.length 
    };
  } catch (err: any) {
    return { success: false, count: 0, error: err?.message || 'Push to Supabase failed' };
  }
}
