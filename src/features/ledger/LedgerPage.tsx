import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  SlidersHorizontal, 
  ArrowDownRight, 
  ArrowUpRight, 
  RefreshCw, 
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { MovementType } from '../../types';
import { Item3DPreview } from '../../components/ui/Item3DPreview';
import { TiltGlareCard } from '../../components/ui/TiltGlareCard';

export function LedgerPage() {
  const { movements, materials } = useGiftShopStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [inspectedMovId, setInspectedMovId] = useState<string | null>(movements[0]?.id || null);

  const movementTypes = [
    'All',
    'initial_stock',
    'restock',
    'reservation',
    'reservation_release',
    'production_consumption',
    'material_return',
    'manual_adjustment',
  ];

  const filteredMovements = movements.filter(m => {
    const matName = m.material?.name || '';
    const matchesSearch = matName.toLowerCase().includes(search.toLowerCase()) ||
                          (m.reference && m.reference.toLowerCase().includes(search.toLowerCase())) ||
                          (m.notes && m.notes.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === 'All' || m.movement_type === typeFilter;
    const matchesMat = materialFilter === 'All' || m.material_id === materialFilter;
    return matchesSearch && matchesType && matchesMat;
  });

  const getBadgeStyle = (type: MovementType) => {
    switch (type) {
      case 'restock':
      case 'initial_stock':
        return 'bg-[#EAF7F1] text-[#1F8A65] border-[#1F8A65]/30';
      case 'production_consumption':
        return 'bg-[#FDEDEE] text-[#D64550] border-[#D64550]/30';
      case 'reservation':
        return 'bg-[#FDF4E7] text-[#9E2A47] border-[#D49B4B]/30';
      case 'reservation_release':
      case 'material_return':
        return 'bg-[#FDF4E7] text-[#D49B4B] border-[#D49B4B]/30';
      default:
        return 'bg-[#FEF6E7] text-[#C87D20] border-[#C87D20]/30';
    }
  };

  const activeInspectedMovement = movements.find(m => m.id === inspectedMovId) || movements[0] || null;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-serif text-[#2B181E]">Stock Movement Ledger</h1>
            <span className="flex items-center space-x-1 text-[11px] font-bold text-[#9E2A47] bg-[#FDF4E7] border border-[#D49B4B]/30 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E2A47]" />
              <span>Immutable Audit Trail</span>
            </span>
          </div>
          <p className="text-xs text-[#7A6269] mt-1">
            Every material transaction, reservation, deduction, restock, and audit change is permanently preserved.
          </p>
        </div>
      </div>

      {/* Live 3D Material Inspector Spotlight for Selected/Hovered Row */}
      {activeInspectedMovement && (
        <TiltGlareCard className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F3E3DC] shadow-parisian flex flex-col md:flex-row items-center gap-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#FFF9F5] to-[#FDF4E7] border border-[#F3E3DC] overflow-hidden flex-shrink-0 shadow-xs">
            <Item3DPreview 
              name={activeInspectedMovement.material?.name || 'Material'} 
              description={activeInspectedMovement.material?.description}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D49B4B]">3D Material Inspector</span>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getBadgeStyle(activeInspectedMovement.movement_type)}`}>
                {activeInspectedMovement.movement_type.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold font-serif text-[#2B181E]">
              {activeInspectedMovement.material?.name || 'Selected Material'}
            </h2>
            <p className="text-xs text-[#7A6269] max-w-xl">
              {activeInspectedMovement.notes || 'Transaction recorded into the append-only ledger.'}
            </p>
            <div className="text-[11px] text-[#7A6269] pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span>Timestamp: <strong className="text-[#2B181E]">{new Date(activeInspectedMovement.created_at).toLocaleString()}</strong></span>
              <span>Operator: <strong className="text-[#2B181E]">{activeInspectedMovement.created_by}</strong></span>
              <span>Reference: <strong className="font-mono text-[#9E2A47]">{activeInspectedMovement.order?.order_number || activeInspectedMovement.reference || '—'}</strong></span>
            </div>
          </div>
          <div className="text-center md:text-right px-4 py-2 bg-[#FFF9F5] rounded-2xl border border-[#F3E3DC]">
            <span className="text-[10px] text-[#7A6269] uppercase font-bold block">Delta Shift</span>
            <span className={`font-mono font-extrabold text-xl ${
              activeInspectedMovement.quantity > 0 ? 'text-[#1F8A65]' : 'text-[#D64550]'
            }`}>
              {activeInspectedMovement.quantity > 0 ? `+${activeInspectedMovement.quantity}` : activeInspectedMovement.quantity}
            </span>
            <span className="text-[10px] text-[#7A6269] block">
              {activeInspectedMovement.previous_quantity} → <strong>{activeInspectedMovement.new_quantity}</strong>
            </span>
          </div>
        </TiltGlareCard>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#F3E3DC] shadow-parisian flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#7A6269]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by material, order #, restock ref, or notes..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Movement Type Filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl px-3 py-2 text-[#2B181E] focus:outline-none"
          >
            {movementTypes.map(t => (
              <option key={t} value={t}>Type: {t}</option>
            ))}
          </select>

          {/* Material Filter */}
          <select
            value={materialFilter}
            onChange={e => setMaterialFilter(e.target.value)}
            className="text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl px-3 py-2 text-[#2B181E] focus:outline-none"
          >
            <option value="All">All Materials</option>
            {materials.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F3E3DC] bg-[#FFF9F5] text-[11px] font-bold uppercase tracking-wider text-[#7A6269]">
                <th className="py-3.5 px-6">Timestamp & User</th>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Movement Type</th>
                <th className="py-3.5 px-4 text-right">Quantity Change</th>
                <th className="py-3.5 px-4 text-right">Balance Shift</th>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-6">Audit Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3E3DC]/60 text-xs text-[#2B181E]">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#7A6269]">
                    No movements found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredMovements.map(mov => {
                  const isPositive = mov.quantity > 0;
                  const isSelected = mov.id === inspectedMovId;

                  return (
                    <tr 
                      key={mov.id} 
                      onClick={() => setInspectedMovId(mov.id)}
                      onMouseEnter={() => setInspectedMovId(mov.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FFF9F5]' : 'hover:bg-[#FFF9F5]/60'
                      }`}
                    >
                      <td className="py-3.5 px-6">
                        <div className="font-mono text-xs text-[#2B181E]">
                          {new Date(mov.created_at).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-[#7A6269]">By {mov.created_by}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#FFF9F5] border border-[#F3E3DC] overflow-hidden flex-shrink-0">
                            <Item3DPreview name={mov.material?.name || 'Material'} className="w-full h-full" />
                          </div>
                          <div>
                            <span className="font-bold text-[#2B181E] block">
                              {mov.material?.name || 'Material'}
                            </span>
                            <span className="text-[10px] text-[#7A6269]">
                              Unit: {mov.material?.unit}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getBadgeStyle(mov.movement_type)}`}>
                          {mov.movement_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-sm">
                        <span className={isPositive ? 'text-[#1F8A65]' : 'text-[#D64550]'}>
                          {isPositive ? `+${mov.quantity}` : mov.quantity}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-xs">
                        <span className="text-[#7A6269]">{mov.previous_quantity}</span>
                        <span className="mx-1 text-[#7A6269]/40">→</span>
                        <strong className="text-[#2B181E]">{mov.new_quantity}</strong>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#9E2A47]">
                        {mov.order?.order_number || mov.reference || '—'}
                      </td>
                      <td className="py-3.5 px-6 text-[#7A6269] text-[11px] max-w-xs truncate">
                        {mov.notes || '—'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LedgerPage;
