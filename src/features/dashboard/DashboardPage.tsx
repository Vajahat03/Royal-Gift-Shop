import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight,
  Boxes,
  Truck,
  DollarSign,
  Plus,
  RefreshCw,
  Trash2,
  Dice5,
  Crown,
  Eye,
  Gift
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { NavTab } from '../../components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import confetti from 'canvas-confetti';
import { BoutiqueShowcaseDashboard } from '../../three/components/BoutiqueShowcaseDashboard';

interface DashboardPageProps {
  onNavigate: (tab: NavTab) => void;
  onOpenNewOrder: () => void;
  onOpenNewRestock: () => void;
}

export function DashboardPage({ onNavigate, onOpenNewOrder, onOpenNewRestock }: DashboardPageProps) {
  const { 
    materials, 
    balances, 
    customers, 
    orders, 
    recipes, 
    movements,
    settings,
    clearAllData,
    resetToCleanTesting,
    addSampleProduct,
    addCustomer
  } = useGiftShopStore();

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Metrics calculations
  const totalPhysicalQuantity = balances.reduce((sum, b) => sum + b.physical_quantity, 0);
  const totalAvailableQuantity = balances.reduce((sum, b) => sum + b.available_quantity, 0);
  const totalReservedQuantity = balances.reduce((sum, b) => sum + b.reserved_quantity, 0);

  const pendingOrders = orders.filter(o => ['draft', 'confirmed', 'reserved', 'in_production'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total_amount, 0);

  // Inventory total valuation
  const inventoryValue = balances.reduce((sum, b) => {
    const mat = materials.find(m => m.id === b.material_id);
    return sum + (b.physical_quantity * (mat?.unit_cost || 0));
  }, 0);

  // Low stock items
  const lowStockBalances = balances.filter(b => {
    const mat = materials.find(m => m.id === b.material_id);
    return mat && b.available_quantity <= mat.minimum_stock;
  });

  // Material stock chart data
  const stockChartData = balances.slice(0, 10).map(b => {
    const mat = materials.find(m => m.id === b.material_id);
    return {
      name: mat?.name ? (mat.name.length > 14 ? mat.name.slice(0, 12) + '...' : mat.name) : 'Item',
      fullName: mat?.name || 'Item',
      available: b.available_quantity,
      reserved: b.reserved_quantity,
      unit: mat?.unit || ''
    };
  });

  const recentOrders = orders.slice(0, 5);
  const recentMovements = movements.slice(0, 6);

  // Quick Action Handlers with Animations
  const handleAddSampleProduct = () => {
    const newProduct = addSampleProduct();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#F3BA2F', '#8873B5', '#EBAEB8', '#C9B8E8']
      });
    } catch {}
    showToast(`✨ Added "${newProduct.name}"! It is now auto-labeled on a 3D shelf!`);
  };

  const handleAddTestCustomer = () => {
    const testNames = ['Lady Eleanor Vance', 'Duke Julian Sterling', 'Princess Camille', 'Baron Montgomery', 'Countess Vivienne'];
    const chosen = testNames[Math.floor(Math.random() * testNames.length)] + ` #${Math.floor(Math.random() * 900 + 100)}`;
    addCustomer({
      name: chosen,
      phone: '+1 (555) ' + Math.floor(Math.random() * 899 + 100) + '-' + Math.floor(Math.random() * 8999 + 1000),
      email: `${chosen.toLowerCase().replace(/[^a-z0-9]/g, '.')}@luxurygifts.com`,
      address: '77 Royal Crescent, Beverly Hills',
      notes: 'VIP customer created for live order testing'
    });
    showToast(`👤 Created test customer: ${chosen}!`);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all catalog products, orders, and ledger for a 100% clean blank testing slate?')) {
      clearAllData();
      showToast('🧹 All data cleared! You now have a 100% clean slate.');
    }
  };

  const handleResetCatalog = () => {
    resetToCleanTesting();
    showToast('🔄 Reset to clean starter boutique catalog with zero orders & clean ledger!');
  };

  return (
    <div className="space-y-8 pb-14">
      {/* Toast Notification Popup */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gold-400/50 backdrop-blur-md flex items-center space-x-3 transform animate-bounce">
          <Sparkles className="w-5 h-5 text-gold-400 animate-spin" />
          <span className="text-xs font-bold tracking-wide">{notification}</span>
          <button 
            onClick={() => setNotification(null)}
            className="text-gray-400 hover:text-white text-sm font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* =========================================================================
          EXACT 3D ARTISANAL BOUTIQUE SHOWCASE & KPI DASHBOARD (Match to reference)
          Includes Top 4 KPI Cards, 3-Tier Rotating Stand & Spotlight Pedestal
          ========================================================================= */}
      <BoutiqueShowcaseDashboard onNavigate={onNavigate} />

      {/* Welcome Banner with Pop-up Quick Action Buttons */}
      <div className="relative overflow-hidden bg-parisian-banner bg-parisian-radial p-6 sm:p-9 rounded-3xl text-white shadow-parisian border border-[#D49B4B]/30">
        {/* Subtle champagne gold radial glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-[#D49B4B]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-extrabold tracking-widest uppercase backdrop-blur-md text-[#D49B4B] border border-[#D49B4B]/30 flex items-center space-x-1.5 shadow-sm">
                <Crown className="w-3 h-3 text-[#D49B4B]" />
                <span>The Royal Gift Atelier</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#1F8A65] animate-ping" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white drop-shadow-sm">
              {settings.shopName}
            </h1>
            <p className="text-xs sm:text-sm text-[#FDF4E7]/90 max-w-xl leading-relaxed">
              Clean testing environment active. Every product added in Inventory dynamically receives a 3D label on the boutique shelves automatically.
            </p>
          </div>

          {/* Primary Interactive Pop-Up Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenNewOrder}
              className="group px-5 py-2.5 rounded-2xl bg-[#9E2A47] text-white font-bold text-xs shadow-[0_4px_14px_rgba(158,42,71,0.35)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2 cursor-pointer border border-[#D49B4B]/40"
            >
              <ShoppingBag className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Create New Order</span>
            </button>

            <button
              onClick={onOpenNewRestock}
              className="group px-5 py-2.5 rounded-2xl bg-white/10 border border-[#D49B4B]/30 text-white font-bold text-xs hover:bg-white/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-2 backdrop-blur-md cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#D49B4B] group-hover:-translate-x-0.5 transition-transform" />
              <span>Restock Materials</span>
            </button>

            <button
              onClick={() => onNavigate('inventory')}
              className="group px-4 py-2.5 rounded-2xl bg-[#D49B4B]/20 border border-[#D49B4B]/40 text-[#FDF4E7] font-bold text-xs hover:bg-[#D49B4B]/35 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center space-x-1.5 backdrop-blur-md cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
              <span>Add Custom Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Testing Dock & Live Sandbox Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#F3E3DC] shadow-parisian">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F3E3DC]/60 mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#9E2A47] animate-pulse" />
            <h2 className="text-sm font-bold text-[#2B181E] font-serif">
              Interactive Testing & Sandbox Controls
            </h2>
            <span className="text-[10px] bg-[#FDF4E7] text-[#9E2A47] border border-[#D49B4B]/20 px-2 py-0.5 rounded-full font-bold">
              Instant Simulation
            </span>
          </div>
          <span className="text-xs text-[#7A6269]">
            Fabricated data cleared. Test live features with one click:
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Pop-Up Button: Add Test Product */}
          <button
            onClick={handleAddSampleProduct}
            className="group p-3 rounded-2xl bg-[#FFF9F5] border border-[#F3E3DC] hover:border-[#D49B4B] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FDF4E7] flex items-center justify-center text-[#9E2A47] group-hover:scale-110 transition-transform shadow-xs">
              <Dice5 className="w-4 h-4 text-[#9E2A47]" />
            </div>
            <span className="text-xs font-bold text-[#2B181E]">+ Test Product</span>
            <span className="text-[10px] text-[#7A6269]">Auto-placed on 3D shelf</span>
          </button>

          {/* Pop-Up Button: Add Test Customer */}
          <button
            onClick={handleAddTestCustomer}
            className="group p-3 rounded-2xl bg-[#FFF9F5] border border-[#F3E3DC] hover:border-[#D49B4B] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FDF4E7] flex items-center justify-center text-[#9E2A47] group-hover:scale-110 transition-transform shadow-xs">
              <Users className="w-4 h-4 text-[#9E2A47]" />
            </div>
            <span className="text-xs font-bold text-[#2B181E]">+ Test Customer</span>
            <span className="text-[10px] text-[#7A6269]">Ready for orders</span>
          </button>

          {/* Pop-Up Button: Reset to Starter Catalog */}
          <button
            onClick={handleResetCatalog}
            className="group p-3 rounded-2xl bg-[#EAF7F1] border border-[#1F8A65]/30 hover:border-[#1F8A65] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#1F8A65] group-hover:rotate-180 transition-transform duration-500 shadow-xs">
              <RefreshCw className="w-4 h-4 text-[#1F8A65]" />
            </div>
            <span className="text-xs font-bold text-[#1F8A65]">Reset Starter Catalog</span>
            <span className="text-[10px] text-[#1F8A65]/70">Clean items (0 orders)</span>
          </button>

          {/* Pop-Up Button: Clear All Data */}
          <button
            onClick={handleClearAll}
            className="group p-3 rounded-2xl bg-[#FDEDEE] border border-[#D64550]/30 hover:border-[#D64550] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#D64550] group-hover:scale-110 transition-transform shadow-xs">
              <Trash2 className="w-4 h-4 text-[#D64550]" />
            </div>
            <span className="text-xs font-bold text-[#D64550]">Clear All (Blank)</span>
            <span className="text-[10px] text-[#D64550]/70">100% empty slate</span>
          </button>
        </div>
      </div>

      {/* Low Stock Warning Alert if any */}
      {lowStockBalances.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start space-x-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-sm font-bold text-amber-900">Low Stock Alert</h2>
            <p className="text-xs text-amber-800 mt-0.5">
              {lowStockBalances.length} material(s) have reached or fallen below safety thresholds:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {lowStockBalances.map(b => {
                const mat = materials.find(m => m.id === b.material_id);
                return (
                  <span key={b.id} className="text-xs bg-white border border-amber-300 text-amber-900 font-semibold px-2.5 py-1 rounded-xl shadow-xs">
                    {mat?.name}: {b.available_quantity} {mat?.unit} remaining (Min: {mat?.minimum_stock})
                  </span>
                );
              })}
            </div>
          </div>
          <button
            onClick={onOpenNewRestock}
            className="text-xs font-bold px-4 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition shadow-sm hover:scale-105 active:scale-95"
          >
            Restock Now
          </button>
        </div>
      )}

      {/* Grid: Production Capacity & Stock Level Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Capacity Estimator */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Gift Recipes Capacity</h2>
              <p className="text-xs text-charcoal-800/70">Craftable gift sets from available materials</p>
            </div>
            <Sparkles className="w-4 h-4 text-lavender-600" />
          </div>

          {recipes.length === 0 ? (
            <div className="p-6 text-center bg-cream-50 rounded-2xl border border-dashed border-lavender-200">
              <Gift className="w-8 h-8 text-lavender-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs font-bold text-charcoal-900">No Gift Recipes Defined</p>
              <p className="text-[11px] text-charcoal-800/60 mt-1 max-w-xs mx-auto">
                Create custom gift recipes with bills of materials to test atomic stock reservation.
              </p>
              <button
                onClick={() => onNavigate('recipes')}
                className="mt-3 px-3 py-1.5 rounded-xl bg-lavender-500 text-white text-xs font-bold hover:bg-lavender-600 transition shadow-xs hover:scale-105 active:scale-95"
              >
                + Create Recipe
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recipes.map(recipe => (
                <div key={recipe.id} className="p-3.5 rounded-2xl bg-cream-50 border border-lavender-100 hover:border-lavender-300 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-charcoal-900">{recipe.name}</span>
                    <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      (recipe.production_capacity || 0) > 0 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {recipe.production_capacity || 0} craftable
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-charcoal-800/70">
                    <span>Price: ${recipe.selling_price.toFixed(2)}</span>
                    <span>Limiting: <strong className="text-charcoal-900">{recipe.limiting_material || 'None'}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onNavigate('recipes')}
            className="w-full mt-4 text-xs font-bold text-lavender-600 hover:text-lavender-800 flex items-center justify-center space-x-1 py-2 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Manage Bill of Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Material Stock Levels Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Live Material Stock Breakdown</h2>
              <p className="text-xs text-charcoal-800/70">Available vs Reserved units (Top 10 items)</p>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-bold text-lavender-600 hover:underline flex items-center space-x-1"
            >
              <span>Full Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {stockChartData.length === 0 ? (
            <div className="h-56 flex flex-col items-center justify-center bg-cream-50 rounded-2xl border border-dashed border-lavender-200 text-center p-4">
              <Package className="w-8 h-8 text-lavender-400 mb-2 opacity-60" />
              <p className="text-xs font-bold text-charcoal-900">No Products in Inventory</p>
              <p className="text-[11px] text-charcoal-800/60 mt-1">Click below to add your first product or sample catalog.</p>
              <button
                onClick={handleAddSampleProduct}
                className="mt-3 px-4 py-2 bg-lavender-600 text-white rounded-xl text-xs font-bold hover:bg-lavender-700 transition shadow-xs hover:scale-105 active:scale-95"
              >
                + Add Test Product
              </button>
            </div>
          ) : (
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip 
                    formatter={(value: any, name: any) => [`${value} units`, name === 'available' ? 'Available Stock' : 'Reserved Stock']}
                    contentStyle={{ backgroundColor: '#FFF9F5', borderRadius: '16px', border: '1px solid #F3E3DC', boxShadow: '0 12px 32px -10px rgba(94, 27, 46, 0.12)' }}
                  />
                  <Bar dataKey="available" name="Available" fill="#9E2A47" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="reserved" name="Reserved" fill="#D49B4B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Recent Orders & Recent Stock Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Recent Orders Tested</h2>
              <p className="text-xs text-charcoal-800/70">Real-time orders created during your test session</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-lavender-600 hover:underline flex items-center space-x-1"
            >
              <span>All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-10 bg-cream-50 rounded-2xl border border-dashed border-lavender-200 p-4">
              <ShoppingBag className="w-8 h-8 text-lavender-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs font-bold text-charcoal-900">No Orders Created Yet</p>
              <p className="text-[11px] text-charcoal-800/60 mt-1 max-w-xs mx-auto">
                Fabricated orders have been wiped. Click below to test creating your first real order!
              </p>
              <button
                onClick={onOpenNewOrder}
                className="mt-3 px-4 py-2 bg-charcoal-900 text-white rounded-xl text-xs font-bold hover:bg-lavender-700 transition shadow-xs hover:scale-105 active:scale-95"
              >
                + Test New Order
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map(order => (
                <div key={order.id} className="p-3.5 rounded-2xl bg-cream-50 border border-lavender-100 flex items-center justify-between hover:border-lavender-300 transition-all">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-charcoal-900">{order.order_number}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'reserved'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-charcoal-800/70 mt-0.5">
                      {order.customer?.name || 'Walk-in Customer'} • {order.items.length} item(s)
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-charcoal-900 block">${order.total_amount.toFixed(2)}</span>
                    <span className="text-[10px] text-charcoal-800/60">{new Date(order.order_date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Stock Movement Ledger */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Stock Movements Ledger</h2>
              <p className="text-xs text-charcoal-800/70">Append-only audit trail from your live operations</p>
            </div>
            <button
              onClick={() => onNavigate('ledger')}
              className="text-xs font-bold text-lavender-600 hover:underline flex items-center space-x-1"
            >
              <span>Full Audit Trail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentMovements.length === 0 ? (
            <div className="text-center py-10 bg-cream-50 rounded-2xl border border-dashed border-lavender-200 p-4">
              <Clock className="w-8 h-8 text-lavender-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs font-bold text-charcoal-900">Ledger Audit Trail is Clean</p>
              <p className="text-[11px] text-charcoal-800/60 mt-1 max-w-xs mx-auto">
                Any orders, restocks, or manual inventory adjustments you perform will be logged here.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentMovements.map(mov => (
                <div key={mov.id} className="text-xs p-2.5 rounded-xl bg-cream-50 border border-lavender-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-charcoal-900">{mov.material?.name || 'Material'}</span>
                      <span className="text-[10px] text-charcoal-800/60 font-mono">[{mov.movement_type}]</span>
                    </div>
                    <div className="text-[11px] text-charcoal-800/70 truncate max-w-xs">{mov.notes}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold block ${
                      mov.quantity > 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                    </span>
                    <span className="text-[10px] text-charcoal-800/50">Bal: {mov.new_quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
