import React, { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { materials } from '../materials/materials';

interface Aesthetic3DAnimatedLabelProps {
  name: string;
  materialId: string;
  position: [number, number, number];
  onSelect: (materialId: string) => void;
  floatOffset?: number;
  badge?: string;
  stemHeight?: number;
}

/**
 * Luxury 3D Animated Label
 * - Smart vertical staggering & adjustable brass stem height to prevent collision
 * - Physical 3D mounting pin & finial in brushed 24k gold
 * - Gentle harmonic 3D floating oscillation (sinusoidal y + subtle roll)
 * - Ultra-sleek frosted obsidian glassmorphism with 24k gold border and halo
 * - Glowing jewel status indicator & metallic serif typography
 * - Tap to open Stock & Customer Usage History Modal
 */
export function Aesthetic3DAnimatedLabel({
  name,
  materialId,
  position,
  onSelect,
  floatOffset = 0,
  badge,
  stemHeight = 0.08
}: Aesthetic3DAnimatedLabelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth floating oscillation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * 2.2 + floatOffset;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.032;
    groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.012;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Physical Gold Pin / Stem */}
      <mesh material={materials.gold} position={[0, -stemHeight / 2, 0]}>
        <cylinderGeometry args={[0.005, 0.005, stemHeight, 8]} />
      </mesh>
      {/* 3D Gold Base Anchor Disc */}
      <mesh material={materials.gold} position={[0, -stemHeight, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.006, 12]} />
      </mesh>
      {/* 3D Gold Spherical Finial at pin head */}
      <mesh material={materials.gold} position={[0, 0, 0]}>
        <sphereGeometry args={[0.016, 12, 12]} />
      </mesh>

      <Html center distanceFactor={8.5} zIndexRange={[hovered ? 300 : 80, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(materialId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onSelect(materialId);
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          tabIndex={0}
          className={`group relative flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[8.5px] font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer pointer-events-auto border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-amber-400 select-none ${
            hovered
              ? 'bg-neutral-950/95 text-amber-200 border-amber-300 scale-110 shadow-[0_0_20px_rgba(245,158,11,0.75)] -translate-y-0.5 z-50'
              : 'bg-neutral-900/85 text-amber-100 border-amber-400/40 shadow-[0_3px_12px_rgba(0,0,0,0.4)] hover:border-amber-300'
          }`}
          title={`Tap to view live stock details & customer history for ${name}`}
        >
          {/* Animated Jewel Pulse */}
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
          </span>

          {/* Luxury Serif Title */}
          <span className="font-serif font-semibold text-[8.5px] whitespace-nowrap bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
            {name}
          </span>

          {badge && (
            <span className="text-[7px] px-1 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-sm">
              {badge}
            </span>
          )}

          {/* Golden Sparkle Accent */}
          <span className="text-[7.5px] text-amber-400/80 group-hover:text-amber-200 transition-colors flex-shrink-0">
            ✦
          </span>
        </button>
      </Html>
    </group>
  );
}
