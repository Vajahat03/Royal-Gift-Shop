import React, { useState } from 'react';
import { 
  X, 
  Package, 
  History, 
  Calendar, 
  ShoppingBag, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { store } from '../../services/store';
import { Item3DPreview } from '../ui/Item3DPreview';

interface ItemStockModalProps {
  materialId: string | null;
  onClose: () => void;
  onQuickRestock?: (materialId: string) => void;
}

export function ItemStockModal({ materialId, onClose, onQuickRestock }: ItemStockModalProps) {
  if (!materialId) return null;

  const data = store.getItemStockAndHistory(materialId);
  const { material, balance, movements, months } = data;

  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'history'>('overview');

  if (!material) return null;

  const filteredMovements = movements.filter(m => {
    if (selectedMonth === 'All Months') return true;
    return m.monthLabel === selectedMonth;
  });

  const totalConsumedInFilter = filteredMovements
    .filter(m => m.movement_type === 'production_consumption')
    .reduce((sum, m) => sum + Math.abs(m.quantity), 0);

  const isLowStock = balance.available <= material.minimum_stock;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B181E]/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-[#F3E3DC] shadow-soft-lg space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Modal Header with Live 3D Item Preview */}
        <div className="flex items-start justify-between border-b border-[#F3E3DC] pb-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#FFF9F5] to-[#FDF4E7] border border-[#F3E3DC] overflow-hidden flex-shrink-0 shadow-xs">
              <Item3DPreview name={material.name} description={material.description} className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9E2A47] bg-[#FDF4E7] border border-[#D49B4B]/30 px-2.5 py-0.5 rounded-full">
                  {material.category}
                </span>
                {isLowStock && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#D64550] bg-[#FDEDEE] border border-[#D64550]/30 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3 text-[#D64550]" />
                    <span>Low Stock Alert</span>
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold font-serif text-[#2B181E] mt-1">
                {material.name}
              </h2>
              <p className="text-xs text-[#7A6269]">{material.description || 'Artisanal boutique product'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Stock Overview vs Consumption History */}
        <div className="flex space-x-1 bg-[#FFF9F5] p-1 rounded-2xl border border-[#F3E3DC]">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
              activeSubTab === 'overview'
                ? 'bg-white text-[#2B181E] shadow-sm font-bold'
                : 'text-[#7A6269] hover:text-[#2B181E]'
            }`}
          >
            Real-Time Stock
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 ${
              activeSubTab === 'history'
                ? 'bg-[#9E2A47] text-white shadow-sm font-bold'
                : 'text-[#7A6269] hover:text-[#2B181E]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Usage & Customer Order History</span>
          </button>
        </div>

        {/* --- VIEW 1: REAL-TIME STOCK OVERVIEW --- */}
        {activeSubTab === 'overview' && (
          <div className="space-y-4">
            {/* Live Balances Banner */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-cream-50 rounded-2xl border border-lavender-100 text-center">
                <span className="text-[10px] uppercase font-bold text-charcoal-800/60 block">Physical On-Hand</span>
                <span className="text-2xl font-bold font-mono text-charcoal-900 block mt-1">
                  {balance.physical}
                </span>
                <span className="text-[10px] text-charcoal-800/60">{material.unit} in shop</span>
              </div>

              <div className="p-3.5 bg-lavender-50/70 rounded-2xl border border-lavender-200 text-center">
                <span className="text-[10px] uppercase font-bold text-lavender-700 block">Reserved in Orders</span>
                <span className="text-2xl font-bold font-mono text-lavender-700 block mt-1">
                  {balance.reserved}
                </span>
                <span className="text-[10px] text-charcoal-800/60">committed units</span>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">Available to Sell</span>
                <span className="text-2xl font-bold font-mono text-emerald-800 block mt-1">
                  {balance.available}
                </span>
                <span className="text-[10px] text-charcoal-800/60">ready for orders</span>
              </div>
            </div>

            {/* Quick Properties */}
            <div className="bg-cream-50/80 p-4 rounded-2xl border border-lavender-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-800/70">Unit Cost to Stock:</span>
                <strong className="text-charcoal-900 font-mono">${material.unit_cost.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-800/70">Minimum Safety Threshold:</span>
                <strong className="text-charcoal-900 font-mono">{material.minimum_stock} {material.unit}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-800/70">Total Stock Valuation:</span>
                <strong className="text-emerald-700 font-mono">${(balance.physical * material.unit_cost).toFixed(2)}</strong>
              </div>
            </div>

            {/* Jump to History Button */}
            <button
              onClick={() => setActiveSubTab('history')}
              className="w-full py-2.5 px-4 rounded-2xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 font-semibold text-xs transition flex items-center justify-center space-x-2 border border-lavender-200"
            >
              <History className="w-4 h-4" />
              <span>Inspect Month-Wise Customer Order History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* --- VIEW 2: MONTH-WISE USAGE & CUSTOMER ORDER HISTORY --- */}
        {activeSubTab === 'history' && (
          <div className="space-y-4">
            {/* Filter Bar with Month Selector */}
            <div className="flex items-center justify-between bg-cream-50 p-3 rounded-2xl border border-lavender-100 text-xs">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-lavender-600" />
                <span className="font-semibold text-charcoal-900">Filter By Month:</span>
              </div>

              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 bg-white border border-lavender-200 rounded-xl text-xs font-semibold text-charcoal-900 focus:outline-none"
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Consumption Summary Metric for Filter */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-lavender-50 border border-lavender-200 text-xs">
              <div className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-rose-500" />
                <span>Total consumed in <strong>{selectedMonth}</strong>:</span>
              </div>
              <span className="font-mono font-bold text-rose-600 text-sm">
                -{totalConsumedInFilter} {material.unit}
              </span>
            </div>

            {/* Order History Timeline Table */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
              {filteredMovements.length === 0 ? (
                <div className="text-center py-8 text-charcoal-800/60 text-xs">
                  No movements or customer orders recorded in {selectedMonth}.
                </div>
              ) : (
                filteredMovements.map(mov => {
                  const isConsumed = mov.movement_type === 'production_consumption';
                  const isRestock = mov.movement_type === 'restock' || mov.movement_type === 'initial_stock';

                  return (
                    <div 
                      key={mov.id} 
                      className="p-3 rounded-2xl bg-cream-50 border border-lavender-100 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-charcoal-900">
                            {mov.customerName}
                          </span>
                          <span className="font-mono text-[10px] text-lavender-700 font-bold bg-lavender-100 px-2 py-0.5 rounded-full">
                            {mov.orderNumber}
                          </span>
                        </div>
                        <div className="text-[11px] text-charcoal-800/80">
                          {mov.notes}
                        </div>
                        <div className="text-[10px] text-charcoal-800/50">
                          {mov.dateObj.toLocaleDateString()} at {mov.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className={`font-mono font-extrabold text-sm block ${
                          mov.quantity > 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                        </span>
                        <span className="text-[10px] text-charcoal-800/50">
                          Bal: {mov.new_quantity}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-lavender-100 flex items-center justify-between">
          <span className="text-[11px] text-charcoal-800/60 font-mono">
            ID: {material.id}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-charcoal-900 text-white rounded-xl text-xs font-semibold hover:bg-lavender-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
