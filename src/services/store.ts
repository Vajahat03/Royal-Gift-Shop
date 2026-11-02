import { 
  Material, 
  InventoryBalance, 
  Customer, 
  GiftRecipe, 
  Order, 
  Restock, 
  StockMovement, 
  ShopSettings,
  OrderStatus
} from '../types';

const STORAGE_KEY = 'boutique_gift_shop_data_v9_clean_zero_stock';

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat-rose-bouquet',
    name: 'Velvet Crimson & Blush Rose Bouquet',
    category: 'Flower Bouquets',
    description: 'Handcrafted boutique bouquet of velvet crimson roses, blush floribundas and eucalyptus in florist kraft wrap.',
    unit: 'Pieces',
    unit_cost: 48.00,
    minimum_stock: 5,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-tulip-bouquet',
    name: 'Spring Coral & Lilac Tulip Bouquet',
    category: 'Flower Bouquets',
    description: 'Fresh Dutch spring tulips in coral and lilac hues wrapped in pastel florist paper with satin ribbon.',
    unit: 'Pieces',
    unit_cost: 38.00,
    minimum_stock: 4,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-sunflower-bouquet',
    name: 'Golden Sunshine & Chamomile Bouquet',
    category: 'Flower Bouquets',
    description: 'Radiant golden sunflowers paired with chamomile daisies and natural rustic twine wrapping.',
    unit: 'Pieces',
    unit_cost: 42.00,
    minimum_stock: 4,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-peony-bouquet',
    name: 'Luxury Atelier Peony & Blossom Bouquet',
    category: 'Flower Bouquets',
    description: 'Voluminous romantic peonies, garden roses and fragrant herbs in a fluted ceramic vase.',
    unit: 'Pieces',
    unit_cost: 58.00,
    minimum_stock: 3,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-stacked-box',
    name: 'Pastel Silk Ribbon Stacked Gift Boxes',
    category: 'Gift Boxes',
    description: 'Triple tiered pastel gift boxes in sage, dusty rose and cream tied with champagne satin ribbon.',
    unit: 'Sets',
    unit_cost: 32.00,
    minimum_stock: 6,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-botanical-box',
    name: 'Vintage Floral Botanical Packaging Box',
    category: 'Gift Boxes',
    description: 'Luxury botanical packaging box with gold embossed foil borders and satin ribbon ties.',
    unit: 'Boxes',
    unit_cost: 24.00,
    minimum_stock: 8,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-curated-hamper',
    name: 'Aesthetic Curated Luxe Gift Hamper',
    category: 'Curated Hampers',
    description: 'Open luxury gift hamper filled with ivory crinkle shred, scented candle, silk rose and treats.',
    unit: 'Sets',
    unit_cost: 85.00,
    minimum_stock: 3,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  },
  {
    id: 'mat-kraft-box',
    name: 'Minimalist Kraft Ribbon Keepsake Box',
    category: 'Gift Boxes',
    description: 'Minimalist brown kraft aesthetic gift box tied with thick cream grosgrain ribbon.',
    unit: 'Boxes',
    unit_cost: 19.00,
    minimum_stock: 10,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
    updated_at: '2026-10-31T18:00:00Z'
  }
,
  {
    "id": "mat-necklace",
    "name": "Royal Pendant Necklaces",
    "category": "Jewelry & Timepieces",
    "description": "18k gold layered chains with ruby, sapphire, emerald and medallion pendants on velvet bust.",
    "unit": "Pieces",
    "unit_cost": 95,
    "minimum_stock": 4,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-earring",
    "name": "Chandelier & Hoop Earrings",
    "category": "Jewelry & Timepieces",
    "description": "Tiered brass display tree with gold hoops, crystal chandelier drops, and luminous pearl earrings.",
    "unit": "Sets",
    "unit_cost": 45,
    "minimum_stock": 6,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-bracelet",
    "name": "Gold Charm Bracelets",
    "category": "Jewelry & Timepieces",
    "description": "18k gold charm bracelets, tennis bracelets and cuff bangles on velvet roll display bar.",
    "unit": "Pieces",
    "unit_cost": 65,
    "minimum_stock": 5,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-watch",
    "name": "Chronograph Luxury Watches",
    "category": "Jewelry & Timepieces",
    "description": "Gold and stainless steel chronograph timepieces presented on black velvet display cushions.",
    "unit": "Pieces",
    "unit_cost": 145,
    "minimum_stock": 3,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-belt",
    "name": "Genuine Leather Waist Belts",
    "category": "Accessories",
    "description": "Hand-burnished Italian cognac and black leather waist belts with brushed brass buckles.",
    "unit": "Pieces",
    "unit_cost": 55,
    "minimum_stock": 5,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-sunglasses",
    "name": "Designer Atelier Sunglasses",
    "category": "Accessories",
    "description": "Luxury aviator, cat-eye and tortoiseshell designer sunglasses on acrylic eyewear stand.",
    "unit": "Pieces",
    "unit_cost": 75,
    "minimum_stock": 4,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-hotwheels",
    "name": "Hot Wheels Collector Cars",
    "category": "Toys & Collectibles",
    "description": "Die-cast racing sports cars in mint collector blister card packaging on retail display rack.",
    "unit": "Pieces",
    "unit_cost": 15,
    "minimum_stock": 12,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-scrunchies",
    "name": "Velvet Scrunchies & Hairbands",
    "category": "Accessories",
    "description": "Plush velvet scrunchie tower in pastel blush, lavender and sage with padded floral headbands.",
    "unit": "Sets",
    "unit_cost": 18,
    "minimum_stock": 10,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-facemask",
    "name": "Hydrating Skincare Face Masks",
    "category": "Cosmetics & Skincare",
    "description": "Tiered foil sachet botanical face masks enriched with rosehip, lavender and 24k gold serum.",
    "unit": "Pieces",
    "unit_cost": 12,
    "minimum_stock": 15,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-wipes",
    "name": "Gentle Cleansing Wet Wipes",
    "category": "Cosmetics & Skincare",
    "description": "Softpack cleansing facial wet wipes with resealable pastel snap cap and aloe vera extract.",
    "unit": "Boxes",
    "unit_cost": 9,
    "minimum_stock": 10,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-perfume",
    "name": "French Luxury Perfumes",
    "category": "Fragrances",
    "description": "Crystal perfume flacons, vintage bulb atomizers and rose quartz cologne bottles.",
    "unit": "Pieces",
    "unit_cost": 120,
    "minimum_stock": 4,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-tumbler",
    "name": "Thermal Travel Tumblers",
    "category": "Drinkware",
    "description": "Powder-coated double-wall insulated travel tumblers with stainless steel rim and clear straw.",
    "unit": "Pieces",
    "unit_cost": 28,
    "minimum_stock": 8,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-teddy",
    "name": "Classic Honey Teddies",
    "category": "Plush & Toys",
    "description": "Handmade plush teddy bear in warm honey caramel and mocha tones with satin ribbon bow.",
    "unit": "Pieces",
    "unit_cost": 35,
    "minimum_stock": 6,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-small-teddy",
    "name": "Small Cuddle Teddies",
    "category": "Plush & Toys",
    "description": "Small cuddle teddy bears in cream, blush pink and baby blue nestled in wicker baskets.",
    "unit": "Pieces",
    "unit_cost": 25,
    "minimum_stock": 8,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-big-teddy",
    "name": "Giant Royal Plush Bears",
    "category": "Plush & Toys",
    "description": "Large and giant heirloom plush bears in dark mocha, snowy cream and pastel baby blue.",
    "unit": "Pieces",
    "unit_cost": 65,
    "minimum_stock": 4,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-keychain-teddy",
    "name": "Keychain Mini Teddies",
    "category": "Plush & Toys",
    "description": "Mini pocket teddy bears with gold keyrings and delicate satin ribbon collars.",
    "unit": "Pieces",
    "unit_cost": 14,
    "minimum_stock": 12,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-wooden-box",
    "name": "Carved Heirloom Wooden Gift Boxes",
    "category": "Gift Packaging",
    "description": "Traditional solid mahogany, teak and rosewood keepsake boxes with brass latches.",
    "unit": "Boxes",
    "unit_cost": 48,
    "minimum_stock": 6,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-wrapping-paper",
    "name": "Luxury Gift Wrapping Papers",
    "category": "Gift Packaging",
    "description": "Rolls and hanging sheets of foiled emerald, navy, burgundy, champagne and lilac wrapping paper.",
    "unit": "Rolls",
    "unit_cost": 16,
    "minimum_stock": 15,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-jewelry-bouquet",
    "name": "Royal Gold Jewelry Bouquet",
    "category": "Jewelry & Timepieces",
    "description": "Imperial jewelry display tree holding 18k gold chains, charm bracelets and gemstone pendants.",
    "unit": "Sets",
    "unit_cost": 175,
    "minimum_stock": 2,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  },
  {
    "id": "mat-mens-gift-set",
    "name": "Men's Executive Gift Set",
    "category": "Gift Boxes",
    "description": "Curated executive display with luxury gold watch, full-grain leather wallet and coiled belt.",
    "unit": "Sets",
    "unit_cost": 195,
    "minimum_stock": 2,
    "is_active": true,
    "created_at": "2026-10-15T10:00:00Z",
    "updated_at": "2026-10-31T18:00:00Z"
  }];

export const INITIAL_BALANCES: InventoryBalance[] = [
  { id: 'bal-1', material_id: 'mat-rose-bouquet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-2', material_id: 'mat-tulip-bouquet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-3', material_id: 'mat-sunflower-bouquet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-4', material_id: 'mat-peony-bouquet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-5', material_id: 'mat-stacked-box', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-6', material_id: 'mat-botanical-box', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-7', material_id: 'mat-curated-hamper', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-8', material_id: 'mat-kraft-box', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-9', material_id: 'mat-necklace', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-10', material_id: 'mat-earring', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-11', material_id: 'mat-bracelet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-12', material_id: 'mat-watch', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-13', material_id: 'mat-belt', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-14', material_id: 'mat-sunglasses', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-15', material_id: 'mat-hotwheels', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-16', material_id: 'mat-scrunchies', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-17', material_id: 'mat-facemask', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-18', material_id: 'mat-wipes', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-19', material_id: 'mat-perfume', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-20', material_id: 'mat-tumbler', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-21', material_id: 'mat-teddy', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-22', material_id: 'mat-small-teddy', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-23', material_id: 'mat-big-teddy', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-24', material_id: 'mat-keychain-teddy', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-25', material_id: 'mat-wooden-box', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-26', material_id: 'mat-wrapping-paper', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-27', material_id: 'mat-jewelry-bouquet', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' },
  { id: 'bal-28', material_id: 'mat-mens-gift-set', physical_quantity: 0, reserved_quantity: 0, available_quantity: 0, updated_at: '2026-10-31T18:00:00Z' }
];

export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_RECIPES: GiftRecipe[] = [];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_MOVEMENTS: StockMovement[] = [];

export const INITIAL_SETTINGS: ShopSettings = {
  shopName: 'Petite Maison Gift Boutique',
  currencySymbol: '$',
  taxRate: 8.5,
  address: '108 Rue de Luxe, Paris / Beverly Hills',
  phone: '+1 (800) 555-GIFT',
  email: 'concierge@petitemaisonboutique.com'
};

interface StoreState {
  materials: Material[];
  balances: InventoryBalance[];
  customers: Customer[];
  recipes: GiftRecipe[];
  orders: Order[];
  restocks: Restock[];
  movements: StockMovement[];
  settings: ShopSettings;
}

class GiftShopStore {
  private state: StoreState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadFromStorage();
  }

  private loadFromStorage(): StoreState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial mock data', e);
    }

    return {
      materials: INITIAL_MATERIALS,
      balances: INITIAL_BALANCES,
      customers: INITIAL_CUSTOMERS,
      recipes: INITIAL_RECIPES,
      orders: INITIAL_ORDERS,
      restocks: [],
      movements: INITIAL_MOVEMENTS,
      settings: INITIAL_SETTINGS
    };
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn());
  }

  // --- GETTERS ---
  public getState(): StoreState {
    return this.state;
  }

  public getMaterials(): Material[] {
    return this.state.materials;
  }

  public getBalances(): InventoryBalance[] {
    return this.state.balances.map(b => {
      const material = this.state.materials.find(m => m.id === b.material_id);
      return {
        ...b,
        available_quantity: Math.max(0, b.physical_quantity - b.reserved_quantity),
        material
      };
    });
  }

  public getCustomers(): Customer[] {
    return this.state.customers.map(c => {
      const customerOrders = this.state.orders.filter(o => o.customer_id === c.id);
      const total_spent = customerOrders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.total_amount, 0);
      return {
        ...c,
        total_orders: customerOrders.length,
        total_spent
      };
    });
  }

  public getRecipes(): GiftRecipe[] {
    const balances = this.getBalances();
    return this.state.recipes.map(recipe => {
      const enrichedItems = recipe.items.map(item => ({
        ...item,
        material: this.state.materials.find(m => m.id === item.material_id)
      }));

      let minCapacity = Infinity;
      let limitingMatName = 'None';
      let costToMake = 0;

      for (const item of recipe.items) {
        const bal = balances.find(b => b.material_id === item.material_id);
        const mat = this.state.materials.find(m => m.id === item.material_id);
        if (mat) {
          costToMake += (mat.unit_cost * item.quantity_required);
        }

        const avail = bal ? bal.available_quantity : 0;
        const possible = item.quantity_required > 0 ? Math.floor(avail / item.quantity_required) : Infinity;
        if (possible < minCapacity) {
          minCapacity = possible;
          limitingMatName = mat?.name || 'Unknown';
        }
      }

      if (minCapacity === Infinity) minCapacity = 0;

      return {
        ...recipe,
        items: enrichedItems,
        production_capacity: minCapacity,
        limiting_material: limitingMatName,
        cost_to_make: Number(costToMake.toFixed(2)),
        profit_margin: recipe.selling_price > 0 ? Number((((recipe.selling_price - costToMake) / recipe.selling_price) * 100).toFixed(1)) : 0
      };
    });
  }

  public getOrders(): Order[] {
    return this.state.orders.map(order => {
      const customer = this.state.customers.find(c => c.id === order.customer_id);
      const enrichedItems = order.items.map(item => {
        let recipe = this.state.recipes.find(r => r.id === item.recipe_id);
        if (!recipe) {
          const mat = this.state.materials.find(m => m.id === item.recipe_id);
          if (mat) {
            recipe = {
              id: mat.id,
              name: mat.name,
              description: mat.description,
              selling_price: mat.unit_cost * 1.5,
              is_active: true,
              items: [],
              created_at: mat.created_at,
              updated_at: mat.updated_at
            };
          }
        }
        return {
          ...item,
          recipe
        };
      });
      const enrichedMaterials = order.materials_breakdown.map(om => ({
        ...om,
        material: this.state.materials.find(m => m.id === om.material_id)
      }));

      return {
        ...order,
        customer,
        items: enrichedItems,
        materials_breakdown: enrichedMaterials
      };
    });
  }

  public getRestocks(): Restock[] {
    return this.state.restocks.map(r => ({
      ...r,
      items: r.items.map(i => ({
        ...i,
        material: this.state.materials.find(m => m.id === i.material_id)
      }))
    }));
  }

  public getMovements(): StockMovement[] {
    return this.state.movements.map(m => {
      const material = this.state.materials.find(mat => mat.id === m.material_id);
      const order = m.order_id ? this.state.orders.find(o => o.id === m.order_id) : undefined;
      return {
        ...m,
        material,
        order: order ? { order_number: order.order_number } : undefined
      };
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // --- ITEM SPECIFIC STOCK & ORDER HISTORY ---
  public getItemStockAndHistory(materialId: string) {
    const material = this.state.materials.find(m => m.id === materialId);
    const balance = this.state.balances.find(b => b.material_id === materialId);
    const available = balance ? Math.max(0, balance.physical_quantity - balance.reserved_quantity) : 0;

    // Filter all ledger movements for this item
    const itemMovements = this.state.movements
      .filter(m => m.material_id === materialId)
      .map(m => {
        let customerName = 'Shop Inventory';
        let orderNumber = m.reference || '—';

        if (m.order_id) {
          const ord = this.state.orders.find(o => o.id === m.order_id);
          if (ord) {
            orderNumber = ord.order_number;
            const cust = this.state.customers.find(c => c.id === ord.customer_id);
            if (cust) customerName = cust.name;
          }
        }

        return {
          ...m,
          customerName,
          orderNumber,
          dateObj: new Date(m.created_at),
          monthLabel: new Date(m.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
      })
      .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

    // Extract unique months for filter
    const months = Array.from(new Set(itemMovements.map(m => m.monthLabel)));

    return {
      material,
      balance: {
        physical: balance?.physical_quantity || 0,
        reserved: balance?.reserved_quantity || 0,
        available
      },
      movements: itemMovements,
      months: ['All Months', ...months]
    };
  }

  // --- ATOMIC BUSINESS ACTIONS ---
  public addMaterial(data: Omit<Material, 'id' | 'created_at' | 'updated_at'>, initialStock = 0): Material {
    const id = `mat-${Date.now()}`;
    const newMat: Material = {
      ...data,
      id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newBal: InventoryBalance = {
      id: `bal-${Date.now()}`,
      material_id: id,
      physical_quantity: initialStock,
      reserved_quantity: 0,
      available_quantity: initialStock,
      updated_at: new Date().toISOString(),
    };

    this.state.materials.push(newMat);
    this.state.balances.push(newBal);

    if (initialStock > 0) {
      this.state.movements.push({
        id: `mov-${Date.now()}`,
        material_id: id,
        movement_type: 'initial_stock',
        quantity: initialStock,
        previous_quantity: 0,
        new_quantity: initialStock,
        reference: 'INITIAL-STOCK',
        notes: `Opening inventory for ${newMat.name}`,
        created_by: 'Shop Owner',
        created_at: new Date().toISOString(),
      });
    }

    this.save();
    return newMat;
  }

  public updateMaterial(id: string, updates: Partial<Material>): void {
    const idx = this.state.materials.findIndex(m => m.id === id);
    if (idx !== -1) {
      this.state.materials[idx] = {
        ...this.state.materials[idx],
        ...updates,
        updated_at: new Date().toISOString()
      };
      this.save();
    }
  }

  public deleteMaterial(id: string): void {
    this.state.materials = this.state.materials.filter(m => m.id !== id);
    this.state.balances = this.state.balances.filter(b => b.material_id !== id);
    this.state.recipes.forEach(r => {
      r.items = r.items.filter(it => it.material_id !== id);
    });
    this.save();
  }

  public addCustomer(data: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Customer {
    const customer: Customer = {
      ...data,
      id: `cust-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.state.customers.push(customer);
    this.save();
    return customer;
  }

  public updateCustomer(id: string, updates: Partial<Customer>): void {
    const idx = this.state.customers.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.state.customers[idx] = {
        ...this.state.customers[idx],
        ...updates,
        updated_at: new Date().toISOString()
      };
      this.save();
    }
  }

  public deleteCustomer(id: string): void {
    this.state.customers = this.state.customers.filter(c => c.id !== id);
    this.save();
  }

  public addRecipe(name: string, description: string, selling_price: number, items: { material_id: string; quantity_required: number }[]): GiftRecipe {
    const recipeId = `recipe-${Date.now()}`;
    const recipeItems = items.map((it, idx) => ({
      id: `ri-${Date.now()}-${idx}`,
      recipe_id: recipeId,
      material_id: it.material_id,
      quantity_required: it.quantity_required,
      created_at: new Date().toISOString()
    }));

    const recipe: GiftRecipe = {
      id: recipeId,
      name,
      description,
      selling_price,
      is_active: true,
      items: recipeItems,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.state.recipes.push(recipe);
    this.save();
    return recipe;
  }

  public updateRecipe(id: string, name: string, description: string, selling_price: number, items: { material_id: string; quantity_required: number }[]): void {
    const idx = this.state.recipes.findIndex(r => r.id === id);
    if (idx !== -1) {
      const recipeItems = items.map((it, i) => ({
        id: `ri-${Date.now()}-${i}`,
        recipe_id: id,
        material_id: it.material_id,
        quantity_required: it.quantity_required,
        created_at: new Date().toISOString()
      }));

      this.state.recipes[idx] = {
        ...this.state.recipes[idx],
        name,
        description,
        selling_price,
        items: recipeItems,
        updated_at: new Date().toISOString()
      };
      this.save();
    }
  }

  public deleteRecipe(id: string): void {
    this.state.recipes = this.state.recipes.filter(r => r.id !== id);
    this.save();
  }

  public calculateRequiredMaterials(items: { recipe_id: string; quantity: number }[]): { material_id: string; total_quantity: number; material_name: string; available_quantity: number; shortage: number }[] {
    const materialMap = new Map<string, number>();

    for (const item of items) {
      const recipe = this.state.recipes.find(r => r.id === item.recipe_id);
      if (!recipe) continue;

      for (const recipeItem of recipe.items) {
        const current = materialMap.get(recipeItem.material_id) || 0;
        materialMap.set(recipeItem.material_id, current + (recipeItem.quantity_required * item.quantity));
      }
    }

    const balances = this.getBalances();
    return Array.from(materialMap.entries()).map(([material_id, total_quantity]) => {
      const mat = this.state.materials.find(m => m.id === material_id);
      const bal = balances.find(b => b.material_id === material_id);
      const avail = bal ? bal.available_quantity : 0;
      const shortage = Math.max(0, total_quantity - avail);
      return {
        material_id,
        total_quantity,
        material_name: mat?.name || 'Unknown',
        available_quantity: avail,
        shortage
      };
    });
  }

  public createOrder(
    customerId: string, 
    itemsData: { recipe_id: string; quantity: number }[],
    notes = '',
    expectedDeliveryDate = '',
    autoConfirm = true
  ): Order {
    const orderId = `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(this.state.orders.length + 1).padStart(4, '0')}`;

    let totalAmount = 0;
    const orderItems = itemsData.map((item, idx) => {
      const recipe = this.state.recipes.find(r => r.id === item.recipe_id);
      const material = this.state.materials.find(m => m.id === item.recipe_id);
      const price = recipe?.selling_price || (material ? (material.unit_cost * 1.5 || 25.0) : 0);
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      return {
        id: `oi-${Date.now()}-${idx}`,
        order_id: orderId,
        recipe_id: item.recipe_id,
        quantity: item.quantity,
        unit_price: price,
        subtotal
      };
    });

    const orderMaterials: any[] = [];
    orderItems.forEach(oi => {
      const recipe = this.state.recipes.find(r => r.id === oi.recipe_id);
      const material = this.state.materials.find(m => m.id === oi.recipe_id);
      if (recipe) {
        recipe.items.forEach((ri, riIdx) => {
          orderMaterials.push({
            id: `om-${Date.now()}-${oi.id}-${riIdx}`,
            order_id: orderId,
            order_item_id: oi.id,
            material_id: ri.material_id,
            expected_quantity: ri.quantity_required * oi.quantity,
            actual_quantity: 0,
            created_at: new Date().toISOString()
          });
        });
      } else if (material) {
        orderMaterials.push({
          id: `om-${Date.now()}-${oi.id}-mat`,
          order_id: orderId,
          order_item_id: oi.id,
          material_id: material.id,
          expected_quantity: oi.quantity,
          actual_quantity: 0,
          created_at: new Date().toISOString()
        });
      }
    });

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      customer_id: customerId,
      order_date: new Date().toISOString(),
      expected_delivery_date: expectedDeliveryDate || new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'draft',
      payment_status: 'pending',
      total_amount: Number(totalAmount.toFixed(2)),
      notes,
      items: orderItems,
      materials_breakdown: orderMaterials,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.state.orders.unshift(newOrder);
    this.save();

    if (autoConfirm) {
      this.reserveOrderStock(orderId);
    }

    return newOrder;
  }

  public reserveOrderStock(orderId: string): { success: boolean; message: string } {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.status === 'confirmed' || order.status === 'reserved') {
      return { success: true, message: 'Stock already reserved' };
    }

    const aggregated = new Map<string, number>();
    for (const om of order.materials_breakdown) {
      const cur = aggregated.get(om.material_id) || 0;
      aggregated.set(om.material_id, cur + om.expected_quantity);
    }

    for (const [matId, req] of aggregated.entries()) {
      const bal = this.state.balances.find(b => b.material_id === matId);
      const avail = bal ? bal.physical_quantity - bal.reserved_quantity : 0;
      if (avail < req) {
        const mat = this.state.materials.find(m => m.id === matId);
        return {
          success: false,
          message: `Cannot reserve: Insufficient stock for ${mat?.name || 'Material'}. Required: ${req}, Available: ${avail}`
        };
      }
    }

    for (const [matId, req] of aggregated.entries()) {
      const bal = this.state.balances.find(b => b.material_id === matId);
      if (bal) {
        const prevRes = bal.reserved_quantity;
        const newRes = prevRes + req;
        bal.reserved_quantity = newRes;
        bal.updated_at = new Date().toISOString();

        this.state.movements.push({
          id: `mov-${Date.now()}-${matId}`,
          material_id: matId,
          movement_type: 'reservation',
          quantity: req,
          previous_quantity: prevRes,
          new_quantity: newRes,
          order_id: order.id,
          reference: order.order_number,
          notes: `Stock reserved for order ${order.order_number}`,
          created_by: 'Shop Owner',
          created_at: new Date().toISOString()
        });
      }
    }

    order.status = 'reserved';
    order.updated_at = new Date().toISOString();
    this.save();

    return { success: true, message: 'Stock successfully reserved' };
  }

  public releaseOrderReservation(orderId: string): { success: boolean; message: string } {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (!['confirmed', 'reserved', 'in_production'].includes(order.status)) {
      return { success: false, message: `Order status '${order.status}' does not have reserved stock` };
    }

    const aggregated = new Map<string, number>();
    for (const om of order.materials_breakdown) {
      const cur = aggregated.get(om.material_id) || 0;
      aggregated.set(om.material_id, cur + om.expected_quantity);
    }

    for (const [matId, req] of aggregated.entries()) {
      const bal = this.state.balances.find(b => b.material_id === matId);
      if (bal) {
        const prevRes = bal.reserved_quantity;
        const newRes = Math.max(0, prevRes - req);
        bal.reserved_quantity = newRes;
        bal.updated_at = new Date().toISOString();

        this.state.movements.push({
          id: `mov-${Date.now()}-${matId}`,
          material_id: matId,
          movement_type: 'reservation_release',
          quantity: -req,
          previous_quantity: prevRes,
          new_quantity: newRes,
          order_id: order.id,
          reference: order.order_number,
          notes: `Reservation released for cancelled order ${order.order_number}`,
          created_by: 'Shop Owner',
          created_at: new Date().toISOString()
        });
      }
    }

    order.status = 'cancelled';
    order.updated_at = new Date().toISOString();
    this.save();

    return { success: true, message: 'Reservation released and order cancelled' };
  }

  public completeOrder(orderId: string): { success: boolean; message: string } {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    if (order.status === 'completed') {
      return { success: true, message: 'Order already completed' };
    }

    for (const om of order.materials_breakdown) {
      const consumed = om.expected_quantity;
      const bal = this.state.balances.find(b => b.material_id === om.material_id);
      if (bal) {
        const prevPhys = bal.physical_quantity;
        const newPhys = Math.max(0, prevPhys - consumed);
        
        if (['confirmed', 'reserved', 'in_production'].includes(order.status)) {
          bal.reserved_quantity = Math.max(0, bal.reserved_quantity - consumed);
        }
        
        bal.physical_quantity = newPhys;
        bal.updated_at = new Date().toISOString();
        om.actual_quantity = consumed;

        this.state.movements.push({
          id: `mov-${Date.now()}-${om.material_id}`,
          material_id: om.material_id,
          movement_type: 'production_consumption',
          quantity: -consumed,
          previous_quantity: prevPhys,
          new_quantity: newPhys,
          order_id: order.id,
          reference: order.order_number,
          notes: `Material consumed for completed order ${order.order_number}`,
          created_by: 'Shop Owner',
          created_at: new Date().toISOString()
        });
      }
    }

    order.status = 'completed';
    order.payment_status = 'paid';
    order.updated_at = new Date().toISOString();
    this.save();

    return { success: true, message: 'Order completed and materials deducted atomically' };
  }

  public createRestock(
    supplierName: string, 
    invoiceReference: string, 
    notes: string, 
    itemsData: { material_id: string; quantity: number; unit_cost: number }[]
  ): Restock {
    const restockId = `rst-${Date.now()}`;
    let totalCost = 0;

    const items = itemsData.map((item, idx) => {
      const subtotal = item.quantity * item.unit_cost;
      totalCost += subtotal;

      const bal = this.state.balances.find(b => b.material_id === item.material_id);
      const prevPhys = bal ? bal.physical_quantity : 0;
      const newPhys = prevPhys + item.quantity;

      if (bal) {
        bal.physical_quantity = newPhys;
        bal.updated_at = new Date().toISOString();
      } else {
        this.state.balances.push({
          id: `bal-${Date.now()}-${idx}`,
          material_id: item.material_id,
          physical_quantity: newPhys,
          reserved_quantity: 0,
          available_quantity: newPhys,
          updated_at: new Date().toISOString()
        });
      }

      const mat = this.state.materials.find(m => m.id === item.material_id);
      if (mat) {
        mat.unit_cost = item.unit_cost;
        mat.updated_at = new Date().toISOString();
      }

      this.state.movements.push({
        id: `mov-${Date.now()}-${item.material_id}`,
        material_id: item.material_id,
        movement_type: 'restock',
        quantity: item.quantity,
        previous_quantity: prevPhys,
        new_quantity: newPhys,
        restock_id: restockId,
        reference: invoiceReference || `RESTOCK-${new Date().toISOString().slice(0, 10)}`,
        notes: `Restocked from ${supplierName}`,
        created_by: 'Shop Owner',
        created_at: new Date().toISOString()
      });

      return {
        id: `ri-${Date.now()}-${idx}`,
        restock_id: restockId,
        material_id: item.material_id,
        quantity: item.quantity,
        unit_cost: item.unit_cost,
        subtotal
      };
    });

    const newRestock: Restock = {
      id: restockId,
      supplier_name: supplierName,
      restock_date: new Date().toISOString(),
      invoice_reference: invoiceReference,
      total_cost: Number(totalCost.toFixed(2)),
      notes,
      items,
      created_at: new Date().toISOString()
    };

    this.state.restocks.unshift(newRestock);
    this.save();
    return newRestock;
  }

  public adjustInventory(materialId: string, newPhysical: number, reason: string): { success: boolean; message: string } {
    const bal = this.state.balances.find(b => b.material_id === materialId);
    if (!bal) return { success: false, message: 'Balance record not found' };

    if (newPhysical < bal.reserved_quantity) {
      return { success: false, message: `Physical stock (${newPhysical}) cannot be less than currently reserved quantity (${bal.reserved_quantity})` };
    }

    const prevPhys = bal.physical_quantity;
    const diff = newPhysical - prevPhys;
    bal.physical_quantity = newPhysical;
    bal.updated_at = new Date().toISOString();

    this.state.movements.push({
      id: `mov-${Date.now()}`,
      material_id: materialId,
      movement_type: 'manual_adjustment',
      quantity: diff,
      previous_quantity: prevPhys,
      new_quantity: newPhysical,
      reference: 'AUDIT-ADJUSTMENT',
      notes: reason || 'Manual audit inventory adjustment',
      created_by: 'Shop Owner',
      created_at: new Date().toISOString()
    });

    this.save();
    return { success: true, message: `Inventory adjusted from ${prevPhys} to ${newPhysical}` };
  }

  public recordMaterialReturn(orderId: string, materialId: string, returnQty: number, notes = ''): { success: boolean; message: string } {
    const order = this.state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: 'Order not found' };

    const bal = this.state.balances.find(b => b.material_id === materialId);
    if (!bal) return { success: false, message: 'Material not found' };

    const prevPhys = bal.physical_quantity;
    const newPhys = prevPhys + returnQty;
    bal.physical_quantity = newPhys;
    bal.updated_at = new Date().toISOString();

    this.state.movements.push({
      id: `mov-${Date.now()}`,
      material_id: materialId,
      movement_type: 'material_return',
      quantity: returnQty,
      previous_quantity: prevPhys,
      new_quantity: newPhys,
      order_id: orderId,
      reference: order.order_number,
      notes: notes || `Customer return for ${order.order_number}`,
      created_by: 'Shop Owner',
      created_at: new Date().toISOString()
    });

    this.save();
    return { success: true, message: `Returned ${returnQty} units back to active inventory` };
  }

  public runSpecDepletionScenario(): { message: string } {
    this.resetToDemoDefaults();

    const recipe = this.state.recipes.find(r => r.name === 'Signature Teddy & Chocolates Luxe Hamper') || this.state.recipes[0];
    const customerIds = this.state.customers.slice(0, 5).map(c => c.id);

    const createdOrders: Order[] = [];
    for (const cid of customerIds) {
      const ord = this.createOrder(cid, [{ recipe_id: recipe.id, quantity: 1 }], 'Customer order from 3D boutique catalog', '', true);
      createdOrders.push(ord);
    }

    for (const ord of createdOrders) {
      this.completeOrder(ord.id);
    }

    this.createRestock(
      'Haute Papier Imperial Suppliers', 
      'INV-SUPP-99201', 
      'Emergency restocking of gift wrapping paper', 
      [{ material_id: 'mat-giftpaper', quantity: 20, unit_cost: 2.30 }]
    );

    return {
      message: 'Spec scenario executed! 5 customer orders fulfilled, depleting materials, followed by restocking 20m of gift wrapping paper.'
    };
  }

  public resetToDemoDefaults(): void {
    this.resetToCleanTesting();
  }

  public clearAllData(): void {
    this.state = {
      materials: [],
      balances: [],
      customers: [],
      recipes: [],
      orders: [],
      restocks: [],
      movements: [],
      settings: INITIAL_SETTINGS
    };
    this.save();
  }

  public resetToCleanTesting(): void {
    this.state = {
      materials: [...INITIAL_MATERIALS],
      balances: INITIAL_BALANCES.map(b => ({ ...b })),
      customers: [],
      recipes: [],
      orders: [],
      restocks: [],
      movements: [],
      settings: INITIAL_SETTINGS
    };
    this.save();
  }

  public addSampleProduct(): Material {
    const samples = [
      { name: 'Royal Diamond Brooch', category: 'The Royal Gift', unit: 'Pieces' as const, minimum_stock: 3, unit_cost: 45.0, description: 'Artisanal 24k gold brooch with cubic zirconia crystals', initialStock: 12 },
      { name: 'Velvet Midnight Jewelry Box', category: 'The Royal Gift', unit: 'Pieces' as const, minimum_stock: 4, unit_cost: 28.0, description: 'Plush velvet heirloom presentation box with brass latch', initialStock: 15 },
      { name: 'Vintage Chronograph Gold Watch', category: 'The Royal Gift', unit: 'Pieces' as const, minimum_stock: 2, unit_cost: 95.0, description: 'Limited royal edition timepiece with cognac leather strap', initialStock: 8 },
      { name: 'Sapphire Crystal Eau De Parfum', category: 'Front Wall - Fragrances', unit: 'Pieces' as const, minimum_stock: 5, unit_cost: 65.0, description: 'Extrait de parfum in faceted crystal flacon', initialStock: 14 },
      { name: 'Emperor Plush Cuddle Teddy', category: 'Left Wall - Plush', unit: 'Pieces' as const, minimum_stock: 3, unit_cost: 32.0, description: 'Large mocha plush teddy with golden satin bow', initialStock: 10 },
      { name: 'Hot Wheels Gold Track Special', category: 'Front Wall - Collectibles', unit: 'Pieces' as const, minimum_stock: 6, unit_cost: 8.5, description: 'Die-cast metallic gold racing collector edition', initialStock: 25 },
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    return this.addMaterial({
      name: `${picked.name} #${Math.floor(Math.random() * 900 + 100)}`,
      category: picked.category,
      unit: picked.unit,
      minimum_stock: picked.minimum_stock,
      unit_cost: picked.unit_cost,
      description: picked.description,
      is_active: true
    }, picked.initialStock);
  }
}

export const store = new GiftShopStore();
