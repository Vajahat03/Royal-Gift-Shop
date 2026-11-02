import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ShowcaseItem } from './boutiqueShowcaseItems';
import { Procedural3DItemModel } from '../ui-previews/proceduralModels';
import { materials } from '../materials/materials';
import confetti from 'canvas-confetti';

interface BoutiqueSpotlightPedestalProps {
  item: ShowcaseItem;
  onUpdateStock: (itemId: string, delta: number) => void;
  onOpenDetailsModal?: (item: ShowcaseItem) => void;
}

function SpotlightStage({ item, isHovered }: { item: ShowcaseItem; isHovered: boolean }) {
  const modelGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!modelGroupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle floating breathing centered comfortably above pedestal
    modelGroupRef.current.position.y = -0.18 + Math.sin(t * 2.2) * 0.03;
    
    // Slow rotational yaw
    if (!isHovered) {
      modelGroupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} color="#FFE7CC" />
      <directionalLight position={[-3, 1, -2]} intensity={0.9} color="#D49B4B" />
      <pointLight position={[0, -0.1, 1.2]} intensity={0.6} color="#FFF0DC" />

      {/* Pedestal Stand shifted down for perfect whole-item visibility */}
      <mesh material={materials.champagneGold} position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.14, 36]} />
      </mesh>
      <mesh material={materials.ceramicWhite} position={[0, -0.63, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.05, 36]} />
      </mesh>
      {/* Warm contact shadow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.60, 0]}>
        <circleGeometry args={[0.72, 32]} />
        <meshBasicMaterial color="#5E1B2E" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      {/* High-Resolution Item Model - Scaled and centered to prevent top clipping */}
      <group ref={modelGroupRef} position={[0, -0.18, 0]} scale={[0.92, 0.92, 0.92]}>
        <Procedural3DItemModel type={item.modelType} isHovered={isHovered} />
      </group>
    </>
  );
}

export function BoutiqueSpotlightPedestal({
  item,
  onUpdateStock,
  onOpenDetailsModal
}: BoutiqueSpotlightPedestalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleQuickRestock = () => {
    onUpdateStock(item.id, 10);
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9E2A47', '#D49B4B', '#5E1B2E', '#FDF4E7', '#1F8A65']
      });
    } catch {}

    setToastMsg(`+10 Express Restock Added!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const pct = Math.min(100, Math.round((item.available / item.maxStock) * 100));

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F3E3DC] shadow-parisian flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F3E3DC]/60 pb-3">
        <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#9E2A47]">
          BOUTIQUE SPOTLIGHT PEDESTAL
        </span>
        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFF9F5] border border-[#F3E3DC] text-[#2B181E]">
          {item.sku}
        </span>
      </div>

      {/* 3D Showcase Box */}
      <div 
        className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#FFF9F5] via-[#FDF4E7]/50 to-[#F7EFE9] border border-[#F3E3DC] overflow-hidden select-none cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpenDetailsModal?.(item)}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.08, 3.5], fov: 36 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          className="w-full h-full pointer-events-none"
        >
          <SpotlightStage item={item} isHovered={isHovered} />
        </Canvas>

        {/* Hover Animation Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#F3E3DC] text-[10px] font-bold text-[#9E2A47] shadow-xs flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-[#D49B4B] animate-pulse" />
          <span>{isHovered ? 'Animating Live' : 'Hover 3D Model to Animate ✨'}</span>
        </div>

        {toastMsg && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1F8A65] text-white text-[11px] font-bold shadow-md animate-bounce flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>

      {/* Info & Price */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2B181E] tracking-tight">
            {item.name}
          </h3>
          <span className="font-serif font-bold text-lg sm:text-xl text-[#9E2A47]">
            ${item.price}
          </span>
        </div>
        <p className="text-xs text-[#7A6269] flex items-center space-x-1">
          <span>{item.category} •</span>
          <span className="text-[#9E2A47] font-semibold">{item.animationDesc}</span>
        </p>
      </div>

      {/* Stock Bar */}
      <div className="space-y-1.5 bg-[#FFF9F5] p-3 rounded-2xl border border-[#F3E3DC]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#7A6269] font-medium text-[11px]">Available vs Max</span>
          <span className="font-mono font-bold text-[#2B181E]">
            {item.available} / {item.maxStock} units
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#F3E3DC] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#9E2A47] to-[#7E1F38] rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center space-x-2 pt-1">
        <button
          onClick={() => onUpdateStock(item.id, -1)}
          disabled={item.available <= 0}
          className="w-10 h-10 rounded-xl bg-white hover:bg-[#FDF4E7] border border-[#F3E3DC] text-[#2B181E] font-bold flex items-center justify-center transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          title="Decrease Stock (-1)"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onUpdateStock(item.id, 1)}
          className="w-10 h-10 rounded-xl bg-white hover:bg-[#FDF4E7] border border-[#F3E3DC] text-[#2B181E] font-bold flex items-center justify-center transition active:scale-95 shadow-xs"
          title="Increase Stock (+1)"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleQuickRestock}
          className="flex-1 h-10 rounded-xl bg-[#9E2A47] hover:bg-[#7E1F38] text-white font-bold text-xs tracking-wide transition active:scale-[0.98] shadow-[0_4px_14px_rgba(158,42,71,0.3)] flex items-center justify-center space-x-1.5 cursor-pointer border border-[#D49B4B]/30"
        >
          <Plus className="w-3.5 h-3.5 text-amber-200" />
          <span>+10 Express Restock</span>
        </button>
      </div>
    </div>
  );
}

export default BoutiqueSpotlightPedestal;
