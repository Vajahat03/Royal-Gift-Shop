import React, { useState } from 'react';
import {
  Truck,
  Plus,
  Search,
  Calendar,
  DollarSign,
  Package,
  FileText,
  Trash2,
  X,
  CheckCircle2,
  Info,
  Sparkles
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import confetti from 'canvas-confetti';
import { Item3DPreview } from '../../components/ui/Item3DPreview';

interface RestockingPageProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

interface RestockFormItem {
  material_name: string;
  quantity: number;
  unit_cost: number;
}

export function RestockingPage({ isModalOpen, setIsModalOpen }: RestockingPageProps) {
  const { restocks, materials, createRestock, addMaterial } = useGiftShopStore();
  const [search, setSearch] = useState('');

  // Restock Form State
  const [supplierName, setSupplierName] = useState('');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [notes, setNotes] = useState('');
  const [itemsData, setItemsData] = useState<RestockFormItem[]>([
    {
      material_name: materials[0]?.name || '',
      quantity: 10,
      unit_cost: materials[0]?.unit_cost || 5
    }
  ]);

  const handleAddItemRow = () => {
    setItemsData([
      ...itemsData,
      { material_name: '', quantity: 10, unit_cost: 0 }
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    setItemsData(itemsData.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof RestockFormItem, value: any) => {
    const updated = [...itemsData];
    updated[index] = { ...updated[index], [field]: value };

    // If user typed an existing material name, auto-fill unit cost for convenience
    if (field === 'material_name') {
      const match = materials.find(m => m.name.toLowerCase() === String(value).trim().toLowerCase());
      if (match && match.unit_cost > 0) {
        updated[index].unit_cost = match.unit_cost;
      }
    }

    setItemsData(updated);
  };

  const totalCalculatedCost = itemsData.reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierName.trim() || itemsData.length === 0) return;

    // Resolve materials: link existing material by name or auto-register new material if not in catalog
    const resolvedItems: { material_id: string; quantity: number; unit_cost: number }[] = [];

    for (const item of itemsData) {
      const trimmedName = item.material_name.trim();
      if (!trimmedName) continue;

      let mat = materials.find(m => m.name.toLowerCase() === trimmedName.toLowerCase());

      // Auto-register new material if user entered a custom name
      if (!mat) {
        mat = addMaterial({
          name: trimmedName,
          unit: 'Pieces',
          minimum_stock: 5,
          unit_cost: item.unit_cost,
          category: 'General',
          description: `Added via restock from ${supplierName}`,
          is_active: true
        }, 0);
      }

      resolvedItems.push({
        material_id: mat.id,
        quantity: item.quantity,
        unit_cost: item.unit_cost
      });
    }

    if (resolvedItems.length === 0) {
      alert('Please enter at least one valid material name to restock.');
      return;
    }

    createRestock(supplierName, invoiceRef, notes, resolvedItems);
    setIsModalOpen(false);

    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#9E2A47', '#D49B4B', '#5E1B2E', '#FDF4E7', '#1F8A65']
      });
    } catch {}

    // Reset form
    setSupplierName('');
    setInvoiceRef('');
    setNotes('');
    setItemsData([{ material_name: materials[0]?.name || '', quantity: 10, unit_cost: materials[0]?.unit_cost || 5 }]);
  };

  const filteredRestocks = restocks.filter(r =>
    r.supplier_name.toLowerCase().includes(search.toLowerCase()) ||
    (r.invoice_reference && r.invoice_reference.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#2B181E]">Restocking Management</h1>
          <p className="text-xs text-[#7A6269]">
            Record supplier deliveries, update unit costs, and atomically replenish physical inventory balances.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#9E2A47] text-white font-bold text-xs shadow-[0_4px_14px_rgba(158,42,71,0.35)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#D49B4B]/40"
        >
          <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
          <span>+ Record Supplier Restock</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#F3E3DC] shadow-parisian">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#7A6269]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search restock by supplier, invoice #..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
          />
        </div>
      </div>

      {/* Restocking History List Table */}
      <div className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F3E3DC] bg-[#FFF9F5] text-[11px] font-bold uppercase tracking-wider text-[#7A6269]">
                <th className="py-3.5 px-6">Restock Date</th>
                <th className="py-3.5 px-4">Supplier & Reference</th>
                <th className="py-3.5 px-4">Items Received</th>
                <th className="py-3.5 px-4 text-right">Total Cost</th>
                <th className="py-3.5 px-6">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3E3DC]/60 text-xs text-[#2B181E]">
              {filteredRestocks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#7A6269]">
                    No supplier restocks logged yet. Click "New Supplier Restock" to add.
                  </td>
                </tr>
              ) : (
                filteredRestocks.map(restock => (
                  <tr key={restock.id} className="hover:bg-[#FFF9F5]/70 transition">
                    <td className="py-4 px-6 font-mono text-xs text-[#7A6269]">
                      {new Date(restock.restock_date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#2B181E]">{restock.supplier_name}</div>
                      <div className="text-[11px] font-mono text-[#7A6269]">
                        {restock.invoice_reference || 'No Ref'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        {restock.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <span className="font-bold text-[#1F8A65] font-mono">+{item.quantity}</span>
                            <span className="text-[#2B181E]">{item.material?.name || 'Material'} ({item.material?.unit})</span>
                            <span className="text-[10px] text-[#7A6269]">@ ${item.unit_cost.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-[#2B181E]">
                      ${restock.total_cost.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-[#7A6269] text-[11px]">
                      {restock.notes || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Restock Intake Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-lavender-200 shadow-soft-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-charcoal-900">New Supplier Restock</h2>
                <p className="text-[11px] text-charcoal-800/70">Enter material details manually to replenish inventory balances</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Datalist for fast autocomplete suggestions (optional helper, no dropdown force) */}
            <datalist id="materials-suggestions">
              {materials.map(m => (
                <option key={m.id} value={m.name} />
              ))}
            </datalist>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-charcoal-800 block mb-1">Supplier Name *</label>
                  <input
                    type="text"
                    required
                    value={supplierName}
                    onChange={e => setSupplierName(e.target.value)}
                    placeholder="e.g. Floral Wholesale Co."
                    className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-charcoal-800 block mb-1">Invoice / PO Reference</label>
                  <input
                    type="text"
                    value={invoiceRef}
                    onChange={e => setInvoiceRef(e.target.value)}
                    placeholder="e.g. INV-2026-904"
                    className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Restock Items List: Manual Material Entry + Distinct Labeled Inputs Below */}
              <div className="space-y-3 pt-2 border-t border-lavender-100">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-bold text-charcoal-900 block text-xs">Materials to Replenish</label>
                    <span className="text-[10px] text-charcoal-800/60">Type the material name manually and specify quantity & unit cost below</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="flex items-center space-x-1 text-xs font-semibold text-lavender-600 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Material</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {itemsData.map((item, idx) => (
                    <div key={idx} className="bg-[#FFF9F5] p-3.5 rounded-2xl border border-[#F3E3DC] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#2B181E] text-xs">
                            Item #{idx + 1}
                          </span>
                          {item.material_name.trim() && (
                            <span className="text-[10px] bg-[#FDF4E7] text-[#9E2A47] border border-[#D49B4B]/30 px-2 py-0.2 rounded-full font-bold">
                              Live 3D Preview Active
                            </span>
                          )}
                        </div>
                        {itemsData.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItemRow(idx)}
                            className="text-[#D64550] hover:text-rose-700 text-xs flex items-center space-x-1"
                            title="Remove this item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      {/* 1. Manual Material Name Input + 3D Preview */}
                      <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#F3E3DC] overflow-hidden flex-shrink-0 shadow-xs">
                          <Item3DPreview name={item.material_name} className="w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <label className="font-semibold text-[#2B181E] block mb-1 text-[11px]">
                            Material Name (Enter manually) *
                          </label>
                          <input
                            type="text"
                            required
                            list="materials-suggestions"
                            value={item.material_name}
                            onChange={e => handleItemChange(idx, 'material_name', e.target.value)}
                            placeholder="Type material name (e.g. Insulated Tumbler, Teddy Bear, Ribbon...)"
                            className="w-full px-3 py-2 bg-white border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-xs text-[#2B181E] font-medium"
                          />
                        </div>
                      </div>

                      {/* 2. The Two Number Boxes Moved Below and Clearly Labeled */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="font-semibold text-[#2B181E] block mb-1 text-[11px]">
                            Quantity to Restock (Pieces/Units) *
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.1"
                            required
                            value={item.quantity}
                            onChange={e => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white border border-[#F3E3DC] rounded-xl text-xs text-right font-mono focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
                            placeholder="e.g. 10"
                          />
                          <span className="text-[10px] text-[#7A6269] block mt-0.5">
                            Number of units received
                          </span>
                        </div>

                        <div>
                          <label className="font-semibold text-[#2B181E] block mb-1 text-[11px]">
                            Unit Purchase Cost ($) *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={item.unit_cost}
                            onChange={e => handleItemChange(idx, 'unit_cost', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-white border border-[#F3E3DC] rounded-xl text-xs text-right font-mono focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
                            placeholder="e.g. 14.00"
                          />
                          <span className="text-[10px] text-[#7A6269] block mt-0.5">
                            Supplier price per single item
                          </span>
                        </div>
                      </div>

                      {/* Line Subtotal */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#F3E3DC] text-[11px]">
                        <span className="text-[#7A6269]">Subtotal for this material:</span>
                        <span className="font-bold text-[#2B181E] font-mono">
                          ${(item.quantity * item.unit_cost).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation Display */}
              <div className="flex justify-between items-center p-3.5 rounded-2xl bg-cream-100 border border-lavender-200 text-xs">
                <div>
                  <span className="font-bold text-charcoal-900 block">Total Invoice Cost</span>
                  <span className="text-[10px] text-charcoal-800/60">Calculated automatically across all items</span>
                </div>
                <span className="font-extrabold text-charcoal-900 font-mono text-base">
                  ${totalCalculatedCost.toFixed(2)}
                </span>
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Restock Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Batch quality inspected, good condition"
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#F3E3DC]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9E2A47] text-white font-semibold shadow-[0_4px_14px_rgba(158,42,71,0.3)] hover:bg-[#7E1F38] transition"
                >
                  Confirm Restock & Update Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
