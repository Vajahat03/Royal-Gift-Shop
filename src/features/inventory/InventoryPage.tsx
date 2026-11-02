import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  Package, 
  ArrowUpDown, 
  History, 
  X,
  Sparkles,
  LayoutGrid,
  List,
  Camera,
  UploadCloud,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { Material, MaterialUnit } from '../../types';
import confetti from 'canvas-confetti';
import { ItemStockModal } from '../../components/modals/ItemStockModal';

export function InventoryPage() {
  const { materials, balances, addMaterial, updateMaterial, deleteMaterial, adjustInventory } = useGiftShopStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedStockModalMatId, setSelectedStockModalMatId] = useState<string | null>(null);
  const [shelfNotification, setShelfNotification] = useState<string | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [adjustingMaterial, setAdjustingMaterial] = useState<{ id: string; name: string; currentPhysical: number; currentReserved: number } | null>(null);

  // Form states for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    unit: 'Pieces' as MaterialUnit,
    minimum_stock: 5,
    unit_cost: 0,
    category: 'General',
    description: '',
    initialStock: 0,
    image_url: ''
  });

  // Form states for Manual Adjustment
  const [adjustData, setAdjustData] = useState({
    newPhysical: 0,
    reason: ''
  });

  const categories = ['All', ...Array.from(new Set(materials.map(m => m.category)))];

  const filteredBalances = balances.filter(b => {
    const mat = materials.find(m => m.id === b.material_id);
    if (!mat) return false;
    const matchesSearch = mat.name.toLowerCase().includes(search.toLowerCase()) || 
                          mat.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || mat.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData(prev => ({ ...prev, image_url: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  // Direct card upload handler so shopkeeper can click on any card image to upload a real photo immediately!
  const handleDirectCardUpload = (matId: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateMaterial(matId, { image_url: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      unit: 'Pieces',
      minimum_stock: 5,
      unit_cost: 0,
      category: 'General',
      description: '',
      initialStock: 0,
      image_url: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (mat: Material) => {
    setEditingMaterial(mat);
    setFormData({
      name: mat.name,
      unit: mat.unit,
      minimum_stock: mat.minimum_stock,
      unit_cost: mat.unit_cost,
      category: mat.category,
      description: mat.description || '',
      initialStock: 0,
      image_url: mat.image_url || ''
    });
  };

  const handleSaveMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingMaterial) {
      updateMaterial(editingMaterial.id, {
        name: formData.name,
        unit: formData.unit,
        minimum_stock: Number(formData.minimum_stock),
        unit_cost: Number(formData.unit_cost),
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url
      });
      setEditingMaterial(null);
    } else {
      const created = addMaterial({
        name: formData.name,
        unit: formData.unit,
        minimum_stock: Number(formData.minimum_stock),
        unit_cost: Number(formData.unit_cost),
        category: formData.category,
        description: formData.description,
        image_url: formData.image_url,
        is_active: true
      }, Number(formData.initialStock));

      setIsAddModalOpen(false);

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#9E2A47', '#D49B4B', '#5E1B2E', '#FDF4E7', '#1F8A65']
        });
      } catch {}

      setShelfNotification(`🎉 "${created.name}" was added! Its 3D label has been automatically positioned on the boutique shelf.`);
      setTimeout(() => setShelfNotification(null), 7000);
    }
  };

  const handleDeleteMaterial = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from your boutique inventory?`)) {
      deleteMaterial(id);
      if (editingMaterial?.id === id) {
        setEditingMaterial(null);
      }
      setShelfNotification(`🗑️ "${name}" has been deleted from inventory.`);
      setTimeout(() => setShelfNotification(null), 5000);
    }
  };

  const handleOpenAdjust = (matId: string, name: string, phys: number, res: number) => {
    setAdjustingMaterial({ id: matId, name, currentPhysical: phys, currentReserved: res });
    setAdjustData({ newPhysical: phys, reason: '' });
  };

  const handleSaveAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingMaterial) return;

    const res = adjustInventory(adjustingMaterial.id, Number(adjustData.newPhysical), adjustData.reason);
    if (!res.success) {
      alert(res.message);
      return;
    }
    setAdjustingMaterial(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#2B181E]">Inventory Management</h1>
          <p className="text-xs text-[#7A6269]">
            Control raw materials, physical balances, reservations, and unit costs. Any product added here is automatically labeled in 3D on the boutique shelves!
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#9E2A47] text-white font-bold text-xs shadow-[0_4px_14px_rgba(158,42,71,0.35)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#D49B4B]/40"
        >
          <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Auto-Shelf Live Feedback Banner */}
      {shelfNotification && (
        <div className="bg-gradient-to-r from-[#1F8A65] to-[#9E2A47] text-white px-5 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>{shelfNotification}</span>
          </div>
          <button 
            onClick={() => setShelfNotification(null)}
            className="text-white hover:text-amber-200 text-sm font-bold ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter, Search, and View Mode Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#F3E3DC] shadow-parisian flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#7A6269]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search material by name or category..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#9E2A47] flex-shrink-0" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-xs bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl px-3 py-2 text-[#2B181E] focus:outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* View Mode Toggle: Grid with 3D Previews vs Detailed Table */}
          <div className="flex items-center bg-[#FFF9F5] p-1 rounded-xl border border-[#F3E3DC]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#9E2A47] text-white shadow-xs'
                  : 'text-[#7A6269] hover:text-[#2B181E]'
              }`}
              title="3D Luxury Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table'
                  ? 'bg-[#9E2A47] text-white shadow-xs'
                  : 'text-[#7A6269] hover:text-[#2B181E]'
              }`}
              title="Compact Audit Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          LUXURY 3D CARD GRID VIEW (Single-Context WebGL Portaling)
          ===================================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBalances.length === 0 ? (
            <div className="col-span-full py-12 text-center text-[#7A6269] bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian">
              No materials found matching criteria.
            </div>
          ) : (
            filteredBalances.map(bal => {
              const mat = materials.find(m => m.id === bal.material_id);
              if (!mat) return null;
              const isLow = bal.available_quantity <= mat.minimum_stock;
              const isHovered = hoveredCardId === bal.id;

              return (
                <div
                  key={bal.id}
                  className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian hover:border-[#D49B4B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div 
                    onMouseEnter={() => setHoveredCardId(bal.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="p-4"
                  >
                    {/* Real Product Image Window - Uploaded Shop Photo or Quick Upload Action */}
                    <div 
                      className="relative w-full h-44 rounded-2xl bg-gradient-to-b from-[#FFF9F5] via-[#FDF4E7]/40 to-[#F7EFE9] border border-[#F3E3DC] overflow-hidden mb-3 group-hover:border-[#D49B4B]/60 transition-all shadow-inner flex items-center justify-center"
                    >
                      {mat.image_url ? (
                        <div 
                          className="relative w-full h-full group/img cursor-pointer"
                          onClick={() => setSelectedStockModalMatId(mat.id)}
                          title="Click to view details & stock history"
                        >
                          <img
                            src={mat.image_url}
                            alt={mat.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          />
                          {/* Quick change photo button on hover */}
                          <label 
                            onClick={(e) => e.stopPropagation()} 
                            className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-black/75 hover:bg-[#9E2A47] text-white text-[10px] font-bold backdrop-blur-sm shadow-md cursor-pointer flex items-center space-x-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
                            title="Change product photo"
                          >
                            <Camera className="w-3 h-3 text-[#D49B4B]" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleDirectCardUpload(mat.id, file);
                              }}
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none">
                          <div className="w-10 h-10 rounded-2xl bg-white/90 border border-[#F3E3DC] flex items-center justify-center text-[#9E2A47] shadow-xs mb-2">
                            <ImageIcon className="w-5 h-5 text-[#9E2A47]" />
                          </div>
                          <span className="text-xs font-serif font-bold text-[#2B181E]">
                            No Photo Yet
                          </span>
                          
                          {/* Quick Upload from Files or Camera */}
                          <div className="flex items-center space-x-2 mt-2">
                            <label className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FDF4E7] border border-[#F3E3DC] hover:border-[#D49B4B] text-[10px] font-bold text-[#2B181E] shadow-xs cursor-pointer flex items-center space-x-1 transition hover:scale-105 active:scale-95">
                              <UploadCloud className="w-3 h-3 text-[#9E2A47]" />
                              <span>Files</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDirectCardUpload(mat.id, file);
                                }}
                              />
                            </label>

                            <label className="px-2.5 py-1 rounded-lg bg-[#9E2A47] hover:bg-[#7E1F38] text-white text-[10px] font-bold shadow-xs cursor-pointer flex items-center space-x-1 transition hover:scale-105 active:scale-95">
                              <Camera className="w-3 h-3 text-[#F5C469]" />
                              <span>Camera</span>
                              <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleDirectCardUpload(mat.id, file);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      <span className="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[#9E2A47] border border-[#F3E3DC] shadow-xs pointer-events-none">
                        {mat.category}
                      </span>
                      {isLow && (
                        <span className="absolute top-2 right-2 text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-[#FDEDEE] text-[#D64550] border border-[#D64550]/30 shadow-xs flex items-center space-x-1 pointer-events-none">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          <span>Low Stock</span>
                        </span>
                      )}
                    </div>

                    {/* Material Title & Description */}
                    <div>
                      <h3 
                        onClick={() => setSelectedStockModalMatId(mat.id)}
                        className="font-bold font-serif text-sm text-[#2B181E] tracking-tight group-hover:text-[#9E2A47] transition-colors truncate cursor-pointer"
                      >
                        {mat.name}
                      </h3>
                      <p className="text-[11px] text-[#7A6269] line-clamp-1 mt-0.5">
                        {mat.description || 'Artisanal gift inventory item'}
                      </p>
                    </div>

                    {/* Stock Metrics Breakdown */}
                    <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#F3E3DC]/60 text-center">
                      <div className="bg-[#FFF9F5] p-1.5 rounded-xl border border-[#F3E3DC]/60">
                        <span className="text-[9px] text-[#7A6269] uppercase font-bold block">Physical</span>
                        <span className="font-mono font-bold text-xs text-[#2B181E]">{bal.physical_quantity}</span>
                      </div>
                      <div className="bg-[#FFF9F5] p-1.5 rounded-xl border border-[#F3E3DC]/60">
                        <span className="text-[9px] text-[#7A6269] uppercase font-bold block">Reserved</span>
                        <span className="font-mono font-bold text-xs text-[#9E2A47]">{bal.reserved_quantity}</span>
                      </div>
                      <div className={`p-1.5 rounded-xl border ${isLow ? 'bg-[#FDEDEE] border-[#D64550]/30' : 'bg-[#EAF7F1] border-[#1F8A65]/30'}`}>
                        <span className="text-[9px] text-[#7A6269] uppercase font-bold block">Available</span>
                        <span className={`font-mono font-bold text-xs ${isLow ? 'text-[#D64550]' : 'text-[#1F8A65]'}`}>
                          {bal.available_quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#7A6269] mt-2.5">
                      <span>Unit Cost: <strong className="text-[#2B181E]">${mat.unit_cost.toFixed(2)}</strong></span>
                      <span>Min: <strong className="text-[#2B181E]">{mat.minimum_stock} {mat.unit}</strong></span>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-4 py-2.5 bg-[#FFF9F5]/70 border-t border-[#F3E3DC] flex items-center justify-between">
                    <button
                      onClick={() => handleOpenAdjust(mat.id, mat.name, bal.physical_quantity, bal.reserved_quantity)}
                      className="px-3 py-1 rounded-xl bg-white hover:bg-[#FDF4E7] text-[#2B181E] border border-[#F3E3DC] text-[11px] font-semibold transition hover:scale-105 active:scale-95"
                      title="Manually adjust physical stock count"
                    >
                      Audit Count
                    </button>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleOpenEdit(mat)}
                        className="p-1.5 rounded-xl text-[#7A6269] hover:bg-white hover:text-[#9E2A47] transition hover:scale-110 active:scale-95"
                        title="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#9E2A47]" />
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(mat.id, mat.name)}
                        className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FDEDEE] hover:text-[#D64550] transition hover:scale-110 active:scale-95"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#D64550]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* =====================================================================
          DETAILED AUDIT TABLE VIEW (With Inline 3D Thumbnails)
          ===================================================================== */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F3E3DC] bg-[#FFF9F5] text-[11px] font-bold uppercase tracking-wider text-[#7A6269]">
                  <th className="py-3.5 px-6">Material Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Physical Stock</th>
                  <th className="py-3.5 px-4 text-right">Reserved</th>
                  <th className="py-3.5 px-4 text-right">Available</th>
                  <th className="py-3.5 px-4 text-right">Unit Cost</th>
                  <th className="py-3.5 px-4 text-center">Safety Level</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3E3DC]/60 text-xs text-[#2B181E]">
                {filteredBalances.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#7A6269]">
                      No materials found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBalances.map(bal => {
                    const mat = materials.find(m => m.id === bal.material_id);
                    if (!mat) return null;
                    const isLow = bal.available_quantity <= mat.minimum_stock;

                    return (
                      <tr key={bal.id} className="hover:bg-[#FFF9F5]/70 transition">
                        <td className="py-3 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-xl bg-[#FFF9F5] border border-[#F3E3DC] overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {mat.image_url ? (
                                <img src={mat.image_url} alt={mat.name} className="w-full h-full object-cover" />
                              ) : (
                                <Package className="w-5 h-5 text-[#9E2A47]" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-[#2B181E]">{mat.name}</div>
                              <div className="text-[11px] text-[#7A6269] max-w-xs truncate">{mat.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#FDF4E7] text-[#9E2A47] border border-[#D49B4B]/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                            {mat.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-medium">
                          {bal.physical_quantity} <span className="text-[10px] text-[#7A6269]">{mat.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-[#9E2A47] font-semibold">
                          {bal.reserved_quantity} <span className="text-[10px] text-[#7A6269]">{mat.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold">
                          <span className={isLow ? 'text-[#D64550]' : 'text-[#1F8A65]'}>
                            {bal.available_quantity}
                          </span>
                          <span className="text-[10px] text-[#7A6269] ml-1">{mat.unit}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          ${mat.unit_cost.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isLow ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#FDEDEE] text-[#D64550] border border-[#D64550]/30 text-[10px] font-bold">
                              <AlertTriangle className="w-3 h-3 text-[#D64550]" />
                              <span>Low (Min: {mat.minimum_stock})</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EAF7F1] text-[#1F8A65] border border-[#1F8A65]/30 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-[#1F8A65]" />
                              <span>Adequate</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-right space-x-1.5">
                          <button
                            onClick={() => handleOpenAdjust(mat.id, mat.name, bal.physical_quantity, bal.reserved_quantity)}
                            className="px-2.5 py-1 rounded-xl bg-[#FFF9F5] hover:bg-[#FDF4E7] text-[#2B181E] border border-[#F3E3DC] text-[11px] font-semibold transition"
                            title="Manually adjust physical stock count"
                          >
                            Audit Count
                          </button>
                          <button
                            onClick={() => handleOpenEdit(mat)}
                            className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FDF4E7] hover:text-[#9E2A47] transition"
                            title="Edit product"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-[#9E2A47]" />
                          </button>
                          <button
                            onClick={() => handleDeleteMaterial(mat.id, mat.name)}
                            className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FDEDEE] hover:text-[#D64550] transition"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-[#D64550]" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Material Modal */}
      {(isAddModalOpen || editingMaterial) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B181E]/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#F3E3DC] shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3E3DC] pb-3">
              <h2 className="text-lg font-bold font-serif text-[#2B181E]">
                {editingMaterial ? 'Edit Material' : 'Add New Material'}
              </h2>
              <button 
                onClick={() => { setIsAddModalOpen(false); setEditingMaterial(null); }}
                className="p-1 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMaterial} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-[#2B181E] block mb-1">Material Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Silk Ribbon Bow, Lavender Bouquet"
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 text-[#2B181E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2B181E] block mb-1">Unit of Measure</label>
                  <select
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value as MaterialUnit })}
                    className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                  >
                    <option value="Pieces">Pieces</option>
                    <option value="Metres">Metres</option>
                    <option value="Sets">Sets</option>
                    <option value="Grams">Grams</option>
                    <option value="Boxes">Boxes</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#2B181E] block mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Packaging, Confections"
                    className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#2B181E] block mb-1">Unit Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.unit_cost}
                    onChange={e => setFormData({ ...formData, unit_cost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2B181E] block mb-1">Min. Stock Alert Level</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minimum_stock}
                    onChange={e => setFormData({ ...formData, minimum_stock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                  />
                </div>
              </div>

              {!editingMaterial && (
                <div>
                  <label className="font-semibold text-[#2B181E] block mb-1">Initial Opening Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.initialStock}
                    onChange={e => setFormData({ ...formData, initialStock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                  />
                </div>
              )}

              {/* Product Photo Upload Section (Files or Live Camera) */}
              <div className="space-y-2 bg-[#FFF9F5] p-3 rounded-2xl border border-[#F3E3DC]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2B181E] block">Product Image</span>
                  {formData.image_url && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      className="text-[10px] text-[#D64550] hover:underline font-bold"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                {formData.image_url ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#F3E3DC] group">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <label className="px-3 py-1.5 bg-white text-[#2B181E] text-[11px] font-bold rounded-xl cursor-pointer hover:bg-[#FDF4E7] shadow-md flex items-center space-x-1">
                        <UploadCloud className="w-3.5 h-3.5 text-[#9E2A47]" />
                        <span>Change File</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                      </label>
                      <label className="px-3 py-1.5 bg-[#9E2A47] text-white text-[11px] font-bold rounded-xl cursor-pointer hover:bg-[#7E1F38] shadow-md flex items-center space-x-1">
                        <Camera className="w-3.5 h-3.5 text-[#F5C469]" />
                        <span>Take Photo</span>
                        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageFileChange} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-[#D49B4B]/60 bg-white hover:bg-[#FDF4E7] cursor-pointer transition text-center group">
                      <UploadCloud className="w-5 h-5 text-[#9E2A47] group-hover:scale-110 transition-transform mb-1" />
                      <span className="font-bold text-[11px] text-[#2B181E]">Choose from Files</span>
                      <span className="text-[9px] text-[#7A6269]">JPG, PNG, WebP</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                    </label>

                    <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-[#D49B4B]/60 bg-white hover:bg-[#FDF4E7] cursor-pointer transition text-center group">
                      <Camera className="w-5 h-5 text-[#9E2A47] group-hover:scale-110 transition-transform mb-1" />
                      <span className="font-bold text-[11px] text-[#2B181E]">Take Photo / Camera</span>
                      <span className="text-[9px] text-[#7A6269]">Device camera / webcam</span>
                      <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageFileChange} />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-[#2B181E] block mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional details..."
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F3E3DC]">
                {editingMaterial ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteMaterial(editingMaterial.id, editingMaterial.name)}
                    className="px-3 py-1.5 rounded-xl text-[#D64550] hover:bg-[#FDEDEE] font-semibold text-xs flex items-center space-x-1.5 transition"
                    title="Delete this material permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Product</span>
                  </button>
                ) : <div />}

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setEditingMaterial(null); }}
                    className="px-4 py-2 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5] font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#9E2A47] text-white font-semibold shadow-[0_4px_14px_rgba(158,42,71,0.3)] hover:bg-[#7E1F38] transition"
                  >
                    Save Material
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Stock Adjustment Modal with Mandatory Audit Trail Reason */}
      {adjustingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B181E]/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#F3E3DC] shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#F3E3DC] pb-3">
              <div>
                <h2 className="text-lg font-bold font-serif text-[#2B181E]">Manual Stock Audit</h2>
                <p className="text-[11px] text-[#7A6269]">{adjustingMaterial.name}</p>
              </div>
              <button 
                onClick={() => setAdjustingMaterial(null)}
                className="p-1 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAdjust} className="space-y-3.5 text-xs">
              <div className="bg-[#FFF9F5] p-3 rounded-2xl border border-[#F3E3DC] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#7A6269]">Current Physical Stock:</span>
                  <strong className="text-[#2B181E]">{adjustingMaterial.currentPhysical}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6269]">Currently Reserved:</span>
                  <strong className="text-[#9E2A47]">{adjustingMaterial.currentReserved}</strong>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#2B181E] block mb-1">New Verified Physical Count *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  min={adjustingMaterial.currentReserved}
                  value={adjustData.newPhysical}
                  onChange={e => setAdjustData({ ...adjustData, newPhysical: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9E2A47]/30 font-mono text-sm text-[#2B181E]"
                />
                <span className="text-[10px] text-[#7A6269] mt-0.5 block">
                  Cannot be lower than reserved stock ({adjustingMaterial.currentReserved}).
                </span>
              </div>

              <div>
                <label className="font-semibold text-[#2B181E] block mb-1">Audit Adjustment Reason *</label>
                <textarea
                  rows={2}
                  required
                  value={adjustData.reason}
                  onChange={e => setAdjustData({ ...adjustData, reason: e.target.value })}
                  placeholder="e.g. Physical inventory count discrepancy, damaged item disposal"
                  className="w-full px-3 py-2 bg-[#FFF9F5] border border-[#F3E3DC] rounded-xl focus:outline-none text-[#2B181E]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#F3E3DC]">
                <button
                  type="button"
                  onClick={() => setAdjustingMaterial(null)}
                  className="px-4 py-2 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9E2A47] text-white font-semibold shadow-[0_4px_14px_rgba(158,42,71,0.3)] hover:bg-[#7E1F38] transition"
                >
                  Confirm & Write to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 3D Item Stock & History Modal Popup */}
      {selectedStockModalMatId && (
        <ItemStockModal
          materialId={selectedStockModalMatId}
          onClose={() => setSelectedStockModalMatId(null)}
        />
      )}
    </div>
  );
}

export default InventoryPage;
