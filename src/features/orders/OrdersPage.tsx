import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Package, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  X
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { Order, OrderStatus } from '../../types';
import confetti from 'canvas-confetti';
import { Item3DPreview } from '../../components/ui/Item3DPreview';
import { TiltGlareCard } from '../../components/ui/TiltGlareCard';

interface OrdersPageProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function OrdersPage({ isCreateModalOpen, setIsCreateModalOpen }: OrdersPageProps) {
  const { 
    orders, 
    customers, 
    recipes, 
    materials, 
    balances,
    createOrder, 
    reserveOrderStock, 
    releaseOrderReservation, 
    completeOrder,
    recordMaterialReturn,
    addCustomer
  } = useGiftShopStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [returnModalOrder, setReturnModalOrder] = useState<Order | null>(null);

  // New Order Creation Form State
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id || '');
  const [orderItemsData, setOrderItemsData] = useState<{ recipe_id: string; quantity: number }[]>([
    { recipe_id: recipes[0]?.id || materials[0]?.id || '', quantity: 1 }
  ]);
  const [orderNotes, setOrderNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Material Return Form State
  const [returnData, setReturnData] = useState({
    material_id: '',
    quantity: 1,
    notes: ''
  });

  const filteredOrders = orders.filter(o => {
    const cust = customers.find(c => c.id === o.customer_id);
    const matchesSearch = o.order_number.toLowerCase().includes(search.toLowerCase()) ||
                          (cust && cust.name.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate real-time material requirements for the new order creation modal
  const requiredStockCheck = useGiftShopStore().calculateRequiredMaterials(orderItemsData);
  const hasShortage = requiredStockCheck.some(r => r.shortage > 0);

  const handleAddItemToOrder = () => {
    if (recipes.length > 0) {
      setOrderItemsData([...orderItemsData, { recipe_id: recipes[0].id, quantity: 1 }]);
    }
  };

  const handleRemoveItemFromOrder = (index: number) => {
    setOrderItemsData(orderItemsData.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: 'recipe_id' | 'quantity', value: any) => {
    const updated = [...orderItemsData];
    updated[index] = { ...updated[index], [field]: value };
    setOrderItemsData(updated);
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || orderItemsData.length === 0) return;

    if (hasShortage) {
      const confirmProceed = window.confirm(
        'Warning: There is insufficient available stock for some materials in this order. If you proceed, the stock cannot be reserved until restocked. Create as Draft?'
      );
      if (!confirmProceed) return;
    }

    createOrder(selectedCustomer, orderItemsData, orderNotes, deliveryDate, !hasShortage);
    setIsCreateModalOpen(false);
  };

  const handleCompleteOrder = (orderId: string) => {
    const res = completeOrder(orderId);
    if (res.success) {
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#9E2A47', '#D49B4B', '#5E1B2E', '#FDF4E7', '#1F8A65']
        });
      } catch (e) {}
    } else {
      alert(res.message);
    }
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order? Any reserved materials will be released.')) {
      releaseOrderReservation(orderId);
    }
  };

  const handleOpenReturnModal = (order: Order) => {
    setReturnModalOrder(order);
    const firstMat = order.materials_breakdown[0]?.material_id || materials[0]?.id || '';
    setReturnData({ material_id: firstMat, quantity: 1, notes: '' });
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder || !returnData.material_id) return;

    const res = recordMaterialReturn(
      returnModalOrder.id, 
      returnData.material_id, 
      Number(returnData.quantity), 
      returnData.notes
    );
    if (!res.success) {
      alert(res.message);
      return;
    }
    setReturnModalOrder(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#2B181E]">Order Management</h1>
          <p className="text-xs text-[#7A6269]">
            Track customer orders, real-time stock reservations, fulfillment deductions, and material returns.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#9E2A47] text-white font-bold text-xs shadow-[0_4px_14px_rgba(158,42,71,0.35)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#D49B4B]/40"
        >
          <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
          <span>New Gift Order</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#F3E3DC] shadow-parisian flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#7A6269]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search order #, customer name..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E2A47] flex-shrink-0" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl px-3 py-2 text-[#2B181E] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="reserved">Reserved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-lavender-100 bg-cream-50/70 text-[11px] font-bold uppercase tracking-wider text-charcoal-800/70">
                <th className="py-3.5 px-6">Order Details</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Lifecycle Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100/60 text-xs text-charcoal-900">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-charcoal-800/60">
                    No orders found. Click "New Gift Order" to create one.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const isCompleted = order.status === 'completed';
                  const isReserved = order.status === 'reserved' || order.status === 'confirmed';
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <tr key={order.id} className="hover:bg-cream-50/50 transition">
                      <td className="py-4 px-6">
                        <div className="font-bold text-charcoal-900 font-mono">{order.order_number}</div>
                        <div className="text-[11px] text-charcoal-800/60">
                          {new Date(order.order_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-charcoal-900">{order.customer?.name}</div>
                        <div className="text-[11px] text-charcoal-800/60">{order.customer?.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          {order.items.map((oi, i) => (
                            <div key={i} className="text-xs">
                              {oi.quantity}x {oi.recipe?.name}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-charcoal-900">
                        ${order.total_amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          isCompleted
                            ? 'bg-[#EAF7F1] text-[#1F8A65] border-[#1F8A65]/30'
                            : isReserved
                            ? 'bg-[#FDF4E7] text-[#9E2A47] border-[#D49B4B]/30'
                            : isCancelled
                            ? 'bg-[#FDEDEE] text-[#D64550] border-[#D64550]/30'
                            : 'bg-[#FEF6E7] text-[#C87D20] border-[#C87D20]/30'
                        }`}>
                          <span>{order.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setSelectedOrderForDetail(order)}
                          className="px-2.5 py-1 rounded-xl bg-[#FFF9F5] hover:bg-[#FDF4E7] text-[#9E2A47] border border-[#F3E3DC] font-semibold text-[11px] transition"
                          title="View consumption breakdown"
                        >
                          Details & BOM
                        </button>

                        {isReserved && (
                          <>
                            <button
                              onClick={() => handleCompleteOrder(order.id)}
                              className="px-3 py-1 rounded-xl bg-[#1F8A65] hover:bg-emerald-700 text-white font-semibold text-[11px] transition shadow-xs hover:scale-105 active:scale-95"
                              title="Fulfill order & deduct physical inventory atomically"
                            >
                              Fulfill & Complete
                            </button>
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="p-1 rounded-xl text-[#D64550] hover:bg-[#FDEDEE] transition"
                              title="Cancel order and release reserved stock"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {isCompleted && (
                          <button
                            onClick={() => handleOpenReturnModal(order)}
                            className="px-2.5 py-1 rounded-xl bg-[#FFF9F5] hover:bg-[#FDF4E7] text-[#2B181E] border border-[#F3E3DC] font-semibold text-[11px] transition"
                            title="Record material return from client"
                          >
                            Return
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-lavender-200 shadow-soft-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-charcoal-900">Create New Boutique Order</h2>
                <p className="text-[11px] text-charcoal-800/70">Automatic inventory reservation check enabled</p>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-charcoal-800">Select Customer *</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newCust = addCustomer({
                        name: `VIP Guest #${Math.floor(Math.random() * 899 + 100)}`,
                        phone: '+1 555-0100',
                        notes: 'Quick test customer created from order modal'
                      });
                      setSelectedCustomer(newCust.id);
                    }}
                    className="text-[11px] font-bold text-lavender-600 hover:text-lavender-800 hover:underline"
                  >
                    + Quick Add Guest
                  </button>
                </div>
                {customers.length === 0 ? (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                    <span>No customer registered.</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newCust = addCustomer({
                          name: `VIP Guest #${Math.floor(Math.random() * 899 + 100)}`,
                          phone: '+1 555-0100',
                          notes: 'Quick test customer'
                        });
                        setSelectedCustomer(newCust.id);
                      }}
                      className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-xs hover:bg-amber-700 transition shadow-xs hover:scale-105 active:scale-95"
                    >
                      + Create Walk-in Guest
                    </button>
                  </div>
                ) : (
                  <select
                    required
                    value={selectedCustomer}
                    onChange={e => setSelectedCustomer(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                  >
                    <option value="">-- Choose Customer --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.phone || c.email})</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Order Recipe & Product Items */}
              <div className="space-y-2 pt-2 border-t border-lavender-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-charcoal-900">Gift Hampers & Products *</label>
                  <button
                    type="button"
                    onClick={handleAddItemToOrder}
                    className="flex items-center space-x-1 text-xs font-bold text-lavender-600 hover:text-lavender-800 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {orderItemsData.map((item, idx) => {
                    return (
                      <div key={idx} className="flex items-center space-x-2 bg-cream-50 p-2.5 rounded-2xl border border-lavender-100">
                        <select
                          required
                          value={item.recipe_id}
                          onChange={e => handleItemChange(idx, 'recipe_id', e.target.value)}
                          className="flex-1 px-2.5 py-1.5 bg-white border border-lavender-200 rounded-xl text-xs text-charcoal-900"
                        >
                          <option value="">-- Select Product or Hamper --</option>
                          {recipes.length > 0 && (
                            <optgroup label="Gift Hampers & Recipes">
                              {recipes.map(r => (
                                <option key={r.id} value={r.id}>
                                  🎁 {r.name} — ${r.selling_price.toFixed(2)}
                                </option>
                              ))}
                            </optgroup>
                          )}
                          <optgroup label="Boutique Products (Direct Stock)">
                            {materials.map(m => (
                              <option key={m.id} value={m.id}>
                                📦 {m.name} — ${(m.unit_cost * 1.5 || 25).toFixed(2)}
                              </option>
                            ))}
                          </optgroup>
                        </select>

                        <div className="w-24">
                          <input
                            type="number"
                            min="1"
                            required
                            value={item.quantity}
                            onChange={e => handleItemChange(idx, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-2.5 py-1.5 bg-white border border-lavender-200 rounded-xl text-xs text-right font-mono"
                            placeholder="Qty"
                          />
                        </div>

                        {orderItemsData.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItemFromOrder(idx)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Automatic Stock Availability & Shortage Matrix */}
              <div className="bg-lavender-50/60 p-3.5 rounded-2xl border border-lavender-200 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-charcoal-800">
                  <span>Calculated Material Requirements</span>
                  <span className={hasShortage ? 'text-rose-600 font-extrabold' : 'text-emerald-700'}>
                    {hasShortage ? 'Stock Shortage Detected' : 'All Stock Ready'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {requiredStockCheck.map(r => (
                    <div 
                      key={r.material_id} 
                      className={`p-2 rounded-xl border flex items-center justify-between ${
                        r.shortage > 0 
                          ? 'bg-rose-50 border-rose-200 text-rose-900' 
                          : 'bg-white border-lavender-100 text-charcoal-800'
                      }`}
                    >
                      <span className="font-semibold truncate max-w-[110px]">{r.material_name}</span>
                      <span className="font-mono">
                        Req: {r.total_quantity} | Avail: {r.available_quantity}
                        {r.shortage > 0 && <span className="text-rose-600 font-bold ml-1">(-{r.shortage})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Boutique Packaging Notes</label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={e => setOrderNotes(e.target.value)}
                  placeholder="Special instructions, gift card message, delivery schedule..."
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-lavender-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-charcoal-800 hover:bg-lavender-100 font-bold transition-all hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-900 text-white font-bold shadow-soft hover:bg-lavender-600 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Confirm & Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Order Consumption & Item Breakdown Modal */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-lavender-200 shadow-soft-lg space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-charcoal-900">
                  {selectedOrderForDetail.order_number}
                </h2>
                <p className="text-[11px] text-charcoal-800/70">
                  Client: {selectedOrderForDetail.customer?.name} ({selectedOrderForDetail.customer?.email})
                </p>
              </div>
              <button 
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Items Summary */}
              <div>
                <span className="font-bold text-charcoal-900 block mb-2 uppercase text-[10px] tracking-wider">
                  Ordered Hampers
                </span>
                <div className="space-y-1.5">
                  {selectedOrderForDetail.items.map((it, i) => (
                    <div key={i} className="flex justify-between p-2.5 rounded-xl bg-cream-50 border border-lavender-100">
                      <div>
                        <strong className="text-charcoal-900">{it.recipe?.name}</strong>
                        <div className="text-[10px] text-charcoal-800/60">Qty: {it.quantity} @ ${it.unit_price.toFixed(2)}</div>
                      </div>
                      <span className="font-bold font-mono">${it.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Material Consumption Traceability with 3D Previews */}
              <div>
                <span className="font-bold text-[#2B181E] block mb-2 uppercase text-[10px] tracking-wider">
                  Traceable Material Consumption
                </span>
                <div className="space-y-1.5">
                  {selectedOrderForDetail.materials_breakdown.map((om, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF9F5] border border-[#F3E3DC]">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-white border border-[#F3E3DC] overflow-hidden flex-shrink-0">
                          <Item3DPreview name={om.material?.name || 'Material'} className="w-full h-full" />
                        </div>
                        <span className="font-semibold text-[#2B181E]">{om.material?.name || 'Material'}</span>
                      </div>
                      <div className="text-right font-mono text-[11px]">
                        <span className="text-[#7A6269]">Expected: <strong className="text-[#2B181E]">{om.expected_quantity}</strong> {om.material?.unit}</span>
                        <span className="mx-2 text-[#7A6269]">•</span>
                        <span>Actual: <strong className="text-[#1F8A65]">{om.actual_quantity}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrderForDetail.notes && (
                <div className="p-3 rounded-2xl bg-cream-100 text-charcoal-800 text-[11px]">
                  <strong>Order Notes:</strong> {selectedOrderForDetail.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Record Material Return Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-lavender-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-charcoal-900">Record Material Return</h2>
                <p className="text-[11px] text-charcoal-800/70">{returnModalOrder.order_number}</p>
              </div>
              <button 
                onClick={() => setReturnModalOrder(null)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReturn} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Returned Material *</label>
                <select
                  value={returnData.material_id}
                  onChange={e => setReturnData({ ...returnData, material_id: e.target.value })}
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                >
                  {returnModalOrder.materials_breakdown.map(om => (
                    <option key={om.material_id} value={om.material_id}>
                      {om.material?.name} (Was consumed: {om.actual_quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Quantity Returned *</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  required
                  value={returnData.quantity}
                  onChange={e => setReturnData({ ...returnData, quantity: parseFloat(e.target.value) || 1 })}
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Reason / Notes</label>
                <textarea
                  rows={2}
                  value={returnData.notes}
                  onChange={e => setReturnData({ ...returnData, notes: e.target.value })}
                  placeholder="e.g. Unopened floral packaging return, customer exchange"
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-lavender-100">
                <button
                  type="button"
                  onClick={() => setReturnModalOrder(null)}
                  className="px-4 py-2 rounded-xl text-charcoal-800 hover:bg-lavender-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-charcoal-900 text-white font-semibold shadow-soft hover:bg-lavender-700 transition"
                >
                  Process Return & Restore Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
