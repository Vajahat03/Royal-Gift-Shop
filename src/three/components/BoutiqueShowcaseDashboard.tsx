import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { 
  Box, 
  Layers, 
  ShoppingBag, 
  DollarSign, 
  RotateCw, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { SHOWCASE_ITEMS, ShowcaseItem } from './boutiqueShowcaseItems';
import { BoutiqueDisplayStand } from './BoutiqueDisplayStand';
import { BoutiqueSpotlightPedestal } from './BoutiqueSpotlightPedestal';
import { useGiftShopStore } from '../../hooks/useStore';
import { NavTab } from '../../components/layout/Navbar';
import { ItemStockModal } from '../../components/modals/ItemStockModal';
import { AnimatedNumber } from '../../components/ui/AnimatedNumber';

interface BoutiqueShowcaseDashboardProps {
  onNavigate: (tab: NavTab) => void;
}

export function BoutiqueShowcaseDashboard({ onNavigate }: BoutiqueShowcaseDashboardProps) {
  const { materials, balances, orders, movements, adjustInventory } = useGiftShopStore();
  const [selectedItemId, setSelectedItemId] = useState<string>(SHOWCASE_ITEMS[0].id);
  const [modalMaterialId, setModalMaterialId] = useState<string | null>(null);
  const [standMousePos, setStandMousePos] = useState({ x: 0, y: 0 });
  const standContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Dynamic live showcase items tied directly to real inventory balances (0 by default)
  const liveShowcaseItems = useMemo(() => {
    return SHOWCASE_ITEMS.map(item => {
      const matchedMat = materials.find(m => 
        m.id === item.materialId ||
        m.name.toLowerCase().includes(item.modelType)
      );
      const bal = matchedMat ? balances.find(b => b.material_id === matchedMat.id) : null;
      return {
        ...item,
        available: bal ? bal.available_quantity : 0
      };
    });
  }, [materials, balances]);

  const selectedItem = liveShowcaseItems.find(i => i.id === selectedItemId) || liveShowcaseItems[0];

  // Live Metric Calculations
  const totalAvailable = balances.reduce((sum, b) => sum + b.available_quantity, 0);
  const totalReserved = balances.reduce((sum, b) => sum + b.reserved_quantity, 0);
  const inventoryValue = balances.reduce((sum, b) => {
    const mat = materials.find(m => m.id === b.material_id);
    return sum + (b.physical_quantity * (mat?.unit_cost || 0));
  }, 0);
  const completedOrders = orders.filter(o => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const lowStockCount = balances.filter(b => {
    const mat = materials.find(m => m.id === b.material_id);
    return mat && b.available_quantity <= mat.minimum_stock;
  }).length;

  // Track cursor position across the 3D stand viewport
  const handleStandMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!standContainerRef.current) return;
    const rect = standContainerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setStandMousePos({ x: nx, y: ny });
  };

  const handleStandMouseLeave = () => {
    setStandMousePos({ x: 0, y: 0 });
  };

  const handleResetOrbit = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Stock updater for the spotlight pedestal
  const handleUpdateStock = (itemId: string, delta: number) => {
    const matchedItem = liveShowcaseItems.find(i => i.id === itemId);
    if (!matchedItem) return;

    // Sync to real store material balance if matched
    const matchedMat = materials.find(m => 
      m.name.toLowerCase().includes(matchedItem.modelType) ||
      m.id === matchedItem.materialId
    );
    if (matchedMat) {
      const bal = balances.find(b => b.material_id === matchedMat.id);
      if (bal) {
        const nextPhys = Math.max(bal.reserved_quantity, bal.physical_quantity + delta);
        adjustInventory(matchedMat.id, nextPhys, `Spotlight express adjustment (${delta > 0 ? '+' : ''}${delta})`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================================================
          1. TOP 4 KPI CARDS ROW (Exact match to reference layout)
          ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Signature Catalog SKUs */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="bg-white rounded-3xl p-5 border border-[#F3E3DC] shadow-parisian hover:border-[#D49B4B] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A6269]">Signature Catalog SKUs</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FDEDEE] flex items-center justify-center text-[#9E2A47] border border-[#D64550]/20 group-hover:scale-110 transition-transform">
              <Box className="w-4 h-4 text-[#9E2A47]" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2B181E]">
              14
            </span>
            <span className="text-xs font-bold text-[#9E2A47] bg-[#FDF4E7] px-2 py-0.5 rounded-full border border-[#D49B4B]/30">
              3D Models
            </span>
          </div>
          <div className="pt-2 border-t border-[#F3E3DC]/60 flex items-center justify-between text-xs">
            <span className={`${lowStockCount > 0 ? 'text-[#D64550]' : 'text-[#1F8A65]'} font-semibold`}>
              Low Stock Alerts: {lowStockCount}
            </span>
            <span className="text-[#9E2A47] font-bold group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
              <span>Inspect Vault</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 2: Total Available Units */}
        <div 
          onClick={() => onNavigate('inventory')}
          className="bg-white rounded-3xl p-5 border border-[#F3E3DC] shadow-parisian hover:border-[#1F8A65] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A6269]">Total Available Units</span>
            <div className="w-9 h-9 rounded-2xl bg-[#EAF7F1] flex items-center justify-center text-[#1F8A65] border border-[#1F8A65]/20 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4 text-[#1F8A65]" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2B181E]">
              <AnimatedNumber value={totalAvailable} />
            </span>
            <span className="text-xs text-[#7A6269]">
              in boutique
            </span>
          </div>
          <div className="pt-2 border-t border-[#F3E3DC]/60 flex items-center justify-between text-xs">
            <span className="text-[#7A6269]">
              Stock Value: <strong className="text-[#2B181E]">${inventoryValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong>
            </span>
            {/* Mini Green Sparkline Curve */}
            <svg className="w-16 h-5 text-[#1F8A65]" viewBox="0 0 64 20" fill="none">
              <path d="M2 16 Q 16 14, 28 8 T 50 10 T 62 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Orders & Ledger Events */}
        <div 
          onClick={() => onNavigate('ledger')}
          className="bg-white rounded-3xl p-5 border border-[#F3E3DC] shadow-parisian hover:border-[#D49B4B] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7A6269]">Orders & Ledger Events</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FDF4E7] flex items-center justify-center text-[#D49B4B] border border-[#D49B4B]/30 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4 text-[#9E2A47]" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2B181E]">
              <AnimatedNumber value={orders.length + movements.length} />
            </span>
            <span className="text-xs text-[#7A6269]">
              fulfilled
            </span>
          </div>
          <div className="pt-2 border-t border-[#F3E3DC]/60 flex items-center justify-between text-xs">
            <span className="text-[#7A6269]">
              Reserved in Hampers: <strong className="text-[#9E2A47]">{totalReserved}</strong>
            </span>
            <span className="text-[#9E2A47] font-bold group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
              <span>Audit Log</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 4: Boutique Sales Revenue */}
        <div 
          onClick={() => onNavigate('orders')}
          className="bg-white rounded-3xl p-5 border border-[#F3E3DC] shadow-parisian hover:border-[#D49B4B] transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold text-[#7A6269]">Boutique Sales Revenue</span>
              <span className="w-2 h-2 rounded-full bg-[#1F8A65] animate-pulse" />
            </div>
            <div className="w-9 h-9 rounded-2xl bg-[#FDF4E7] flex items-center justify-center text-[#D49B4B] border border-[#D49B4B]/30 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4 text-[#D49B4B]" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-1">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-[#2B181E]">
              ${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="pt-2 border-t border-[#F3E3DC]/60 flex items-center justify-between text-xs">
            <span className={`${totalRevenue > 0 ? 'text-[#1F8A65]' : 'text-[#7A6269]'} font-semibold flex items-center space-x-1`}>
              <span>{totalRevenue > 0 ? '+24.6% today' : 'Awaiting boutique orders'}</span>
            </span>
            {/* Mini Amber Sparkline Curve */}
            <svg className="w-16 h-5 text-[#D49B4B]" viewBox="0 0 64 20" fill="none">
              <path d="M2 18 Q 18 16, 32 10 T 52 8 T 62 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. MAIN 3D SHOWCASE SECTION (3-Tier Stand + Spotlight Pedestal)
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN (~65% width): 3D Artisanal Boutique Display Stand */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-[#F3E3DC] shadow-parisian flex flex-col justify-between">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F3E3DC]/60">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#2B181E]">
                  3D Artisanal Boutique Display Stand
                </h2>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDEDEE] text-[#9E2A47] border border-[#D64550]/20">
                  ALL 14 LIVE MODELS
                </span>
              </div>
              <p className="text-xs text-[#7A6269] mt-0.5">
                Drag to orbit the 3-tier luxury gift stand • Click any miniature 3D gift to inspect & animate
              </p>
            </div>

            <button
              onClick={handleResetOrbit}
              className="flex items-center space-x-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-[#FFF9F5] hover:bg-[#FDF4E7] text-[#2B181E] border border-[#F3E3DC] shadow-xs transition hover:scale-105 active:scale-95 self-start sm:self-auto cursor-pointer"
              title="Reset 3D camera to default view"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#D49B4B]" />
              <span>Reset Orbit</span>
            </button>
          </div>

          {/* 3D Viewport Window */}
          <div 
            ref={standContainerRef}
            onMouseMove={handleStandMouseMove}
            onMouseLeave={handleStandMouseLeave}
            className="relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-gradient-to-b from-[#FFF9F5] via-[#FDF4E7]/40 to-[#F7EFE9] border border-[#F3E3DC] overflow-hidden my-3 select-none"
          >
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 2.4, 5.2], fov: 42 }}
              gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
              className="w-full h-full"
            >
              <ambientLight intensity={1.15} />
              <directionalLight position={[4, 6, 4]} intensity={1.5} color="#FFE7CC" />
              <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#D49B4B" />
              <pointLight position={[0, 3, 0]} intensity={0.5} color="#FFFBF7" />

              <BoutiqueDisplayStand
                items={liveShowcaseItems}
                selectedItem={selectedItem}
                onSelectItem={(item) => setSelectedItemId(item.id)}
                mousePos={standMousePos}
                controlsRef={controlsRef}
              />
            </Canvas>

            {/* Bottom floating instruction pill */}
            <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#F3E3DC] text-[11px] font-bold text-[#2B181E] shadow-sm flex items-center space-x-2 pointer-events-none">
              <span>✋ Drag to Rotate Stand</span>
              <span className="text-[#D49B4B]">•</span>
              <span>👆 Click item to inspect</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (~35% width): Boutique Spotlight Pedestal */}
        <div className="lg:col-span-4 flex flex-col">
          <BoutiqueSpotlightPedestal
            item={selectedItem}
            onUpdateStock={handleUpdateStock}
            onOpenDetailsModal={(item) => {
              const matchedMat = materials.find(m => 
                m.name.toLowerCase().includes(item.modelType) ||
                m.id === item.materialId
              );
              if (matchedMat) setModalMaterialId(matchedMat.id);
            }}
          />
        </div>
      </div>

      {/* =====================================================================
          3. BOTTOM CATALOG STRIP: Quick 14-Item Selection Bar
          ===================================================================== */}
      <div className="bg-white rounded-3xl p-5 border border-[#F3E3DC] shadow-parisian">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F3E3DC]/60">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#9E2A47]" />
            <h3 className="font-serif font-bold text-sm text-[#2B181E]">
              Hover-Animated 3D Gift Showcase (Select to Spotlight)
            </h3>
          </div>
          <span className="text-[11px] text-[#7A6269]">
            Click any item to view on the Spotlight Pedestal
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {liveShowcaseItems.map(item => {
            const isSelected = selectedItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center space-y-1.5 ${
                  isSelected
                    ? 'bg-[#FDF4E7] border-[#9E2A47] shadow-sm scale-105'
                    : 'bg-[#FFF9F5] border-[#F3E3DC] hover:border-[#D49B4B] hover:scale-102'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#F3E3DC] flex items-center justify-center font-serif text-lg font-bold text-[#9E2A47]">
                  {item.name.charAt(0)}
                </div>
                <span className="text-[11px] font-bold text-[#2B181E] truncate w-full">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-[#9E2A47] font-semibold">
                  ${item.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive 3D Item Details Modal Popup */}
      {modalMaterialId && (
        <ItemStockModal
          materialId={modalMaterialId}
          onClose={() => setModalMaterialId(null)}
        />
      )}
    </div>
  );
}

export default BoutiqueShowcaseDashboard;
