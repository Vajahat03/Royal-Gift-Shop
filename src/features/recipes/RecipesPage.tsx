import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Package, 
  TrendingUp,
  X,
  Gift
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { GiftRecipe } from '../../types';
import { Item3DPreview } from '../../components/ui/Item3DPreview';
import { TiltGlareCard } from '../../components/ui/TiltGlareCard';

export function RecipesPage() {
  const { recipes, materials, addRecipe, updateRecipe, deleteRecipe } = useGiftShopStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<GiftRecipe | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sellingPrice, setSellingPrice] = useState(49.99);
  const [recipeItems, setRecipeItems] = useState<{ material_id: string; quantity_required: number }[]>([
    { material_id: materials[0]?.id || '', quantity_required: 1 }
  ]);

  const handleDeleteRecipe = (id: string, recipeName: string) => {
    if (window.confirm(`Are you sure you want to delete recipe "${recipeName}"?`)) {
      deleteRecipe(id);
      if (editingRecipe?.id === id) {
        setIsModalOpen(false);
        setEditingRecipe(null);
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingRecipe(null);
    setName('');
    setDescription('');
    setSellingPrice(50.00);
    setRecipeItems(materials.length > 0 ? [{ material_id: materials[0].id, quantity_required: 1 }] : []);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (recipe: GiftRecipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setDescription(recipe.description || '');
    setSellingPrice(recipe.selling_price);
    setRecipeItems(recipe.items.map(i => ({ material_id: i.material_id, quantity_required: i.quantity_required })));
    setIsModalOpen(true);
  };

  const handleAddItemRow = () => {
    if (materials.length > 0) {
      setRecipeItems([...recipeItems, { material_id: materials[0].id, quantity_required: 1 }]);
    }
  };

  const handleRemoveItemRow = (index: number) => {
    setRecipeItems(recipeItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: 'material_id' | 'quantity_required', value: any) => {
    const updated = [...recipeItems];
    updated[index] = { ...updated[index], [field]: value };
    setRecipeItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || recipeItems.length === 0) return;

    if (editingRecipe) {
      updateRecipe(editingRecipe.id, name, description, Number(sellingPrice), recipeItems);
    } else {
      addRecipe(name, description, Number(sellingPrice), recipeItems);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#2B181E]">Gift Recipe Management</h1>
          <p className="text-xs text-[#7A6269]">
            Define multi-material bill of materials (BOM), measure capacity, and calculate profit margins.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#9E2A47] text-white font-bold text-xs shadow-[0_4px_14px_rgba(158,42,71,0.35)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-[#D49B4B]/40"
        >
          <Plus className="w-4 h-4 text-amber-300 group-hover:rotate-90 transition-transform" />
          <span>+ Create New Recipe</span>
        </button>
      </div>

      {/* Recipes Cards Grid */}
      {recipes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-[#F3E3DC] p-12 text-center shadow-parisian">
          <Sparkles className="w-12 h-12 text-[#9E2A47] mx-auto mb-3 opacity-60" />
          <h2 className="text-base font-bold text-[#2B181E] font-serif">No Gift Recipes Created</h2>
          <p className="text-xs text-[#7A6269] max-w-sm mx-auto mt-1 mb-4">
            Combine multiple raw materials (e.g. teddy bear + chocolate + wooden box + wrapping paper) into automated craftable hampers.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#9E2A47] text-white text-xs font-bold rounded-2xl shadow-[0_4px_14px_rgba(158,42,71,0.3)] hover:bg-[#7E1F38] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            + Create First Recipe
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => {
          const capacity = recipe.production_capacity || 0;
          const costToMake = recipe.cost_to_make || 0;
          const profit = recipe.selling_price - costToMake;
          const margin = recipe.profit_margin || 0;

          return (
            <TiltGlareCard 
              key={recipe.id} 
              className="bg-white rounded-3xl border border-[#F3E3DC] shadow-parisian hover:border-[#D49B4B]/70 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold font-serif text-[#2B181E]">{recipe.name}</h2>
                    <p className="text-xs text-[#7A6269] line-clamp-2 mt-1">{recipe.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenEdit(recipe)}
                      className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FFF9F5] hover:text-[#9E2A47] transition"
                      title="Edit Recipe"
                    >
                      <Edit3 className="w-4 h-4 text-[#9E2A47]" />
                    </button>
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id, recipe.name)}
                      className="p-1.5 rounded-xl text-[#7A6269] hover:bg-[#FDEDEE] hover:text-[#D64550] transition"
                      title="Delete Recipe"
                    >
                      <Trash2 className="w-4 h-4 text-[#D64550]" />
                    </button>
                  </div>
                </div>

                {/* Capacity Gauge Banner */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  capacity > 0 
                    ? 'bg-[#EAF7F1] border-[#1F8A65]/30' 
                    : 'bg-[#FDEDEE] border-[#D64550]/30'
                }`}>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6269] block">
                      Production Capacity
                    </span>
                    <div className="text-base font-extrabold text-[#2B181E]">
                      {capacity} <span className="text-xs font-normal">units ready to craft</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-[#7A6269]">
                    Limiting item:
                    <strong className="block text-[#2B181E] truncate max-w-[120px]">{recipe.limiting_material}</strong>
                  </div>
                </div>

                {/* Bill of Materials Table with miniature 3D models */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6269] block">
                    Required Materials (BOM)
                  </span>
                  <div className="space-y-1.5">
                    {recipe.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FFF9F5] border border-[#F3E3DC]">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-lg bg-white border border-[#F3E3DC] overflow-hidden flex-shrink-0">
                            <Item3DPreview name={it.material?.name || 'Material'} className="w-full h-full" />
                          </div>
                          <span className="font-semibold text-[#2B181E]">{it.material?.name || 'Material'}</span>
                        </div>
                        <span className="font-mono text-[#9E2A47] font-bold">
                          {it.quantity_required} {it.material?.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Financials */}
              <div className="p-4 bg-[#FFF9F5] border-t border-[#F3E3DC] grid grid-cols-3 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#7A6269] block">Price</span>
                  <span className="font-bold text-[#2B181E]">${recipe.selling_price.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A6269] block">BOM Cost</span>
                  <span className="font-bold text-[#7A6269]">${costToMake.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A6269] block">Margin</span>
                  <span className="font-bold text-[#1F8A65]">+{margin}%</span>
                </div>
              </div>
            </TiltGlareCard>
          );
        })}
      </div>
      )}

      {/* Recipe Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-lavender-200 shadow-soft-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <h2 className="text-lg font-bold font-display text-charcoal-900">
                {editingRecipe ? 'Edit Gift Recipe' : 'Create Gift Recipe'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Recipe / Gift Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Deluxe Rose & Teddy Hamper"
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300"
                />
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Retail Selling Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={sellingPrice}
                  onChange={e => setSellingPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Boutique presentation details..."
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              {/* Recipe Items (BOM) */}
              <div className="space-y-2 pt-2 border-t border-lavender-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-charcoal-900">Materials Required (BOM) *</label>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="flex items-center space-x-1 text-xs font-semibold text-lavender-600 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Material</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {recipeItems.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-cream-50 p-2.5 rounded-2xl border border-lavender-100">
                      <select
                        value={item.material_id}
                        onChange={e => handleItemChange(idx, 'material_id', e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-lavender-200 rounded-xl text-xs text-charcoal-900"
                      >
                        {materials.map(m => (
                          <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
                        ))}
                      </select>

                      <div className="w-24">
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          required
                          value={item.quantity_required}
                          onChange={e => handleItemChange(idx, 'quantity_required', parseFloat(e.target.value) || 1)}
                          className="w-full px-2.5 py-1.5 bg-white border border-lavender-200 rounded-xl text-xs text-right font-mono"
                          placeholder="Qty"
                        />
                      </div>

                      {recipeItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-lavender-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-charcoal-800 hover:bg-lavender-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-lavender-500 text-white font-semibold shadow-soft hover:bg-lavender-600 transition"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
