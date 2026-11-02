import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SHOWCASE_ITEMS, ShowcaseItem } from './boutiqueShowcaseItems';
import { Procedural3DItemModel } from '../ui-previews/proceduralModels';
import { materials } from '../materials/materials';

interface BoutiqueDisplayStandProps {
  selectedItem: ShowcaseItem | null;
  onSelectItem: (item: ShowcaseItem) => void;
  mousePos: { x: number; y: number };
  controlsRef: React.RefObject<OrbitControlsImpl>;
  items?: ShowcaseItem[];
}

export function BoutiqueDisplayStand({
  selectedItem,
  onSelectItem,
  mousePos,
  controlsRef,
  items = SHOWCASE_ITEMS
}: BoutiqueDisplayStandProps) {
  const standGroupRef = useRef<THREE.Group>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // Smooth idle rotation + cursor movement reaction
  useFrame((state, delta) => {
    if (!standGroupRef.current) return;

    // Slow idle rotation
    standGroupRef.current.rotation.y += delta * 0.18;

    // React to cursor movement (subtle tilt and rotation tracking)
    const targetTiltX = -mousePos.y * 0.12;
    const targetTiltZ = mousePos.x * 0.08;
    standGroupRef.current.rotation.x = THREE.MathUtils.damp(
      standGroupRef.current.rotation.x,
      targetTiltX,
      4,
      delta
    );
    standGroupRef.current.rotation.z = THREE.MathUtils.damp(
      standGroupRef.current.rotation.z,
      targetTiltZ,
      4,
      delta
    );
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3.8}
        maxDistance={7.5}
        minPolarAngle={Math.PI / 4.5}
        maxPolarAngle={Math.PI / 2.15}
        dampingFactor={0.06}
      />

      <group ref={standGroupRef} position={[0, -0.65, 0]}>
        {/* =====================================================================
            3-TIER LUXURY DISPLAY STAND STRUCTURE
            Ivory ceramic platforms with polished champagne gold rims & brass pillar
            ===================================================================== */}
        
        {/* Central Fluted Brass Pillar */}
        <mesh material={materials.champagneGold} position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.07, 0.11, 1.6, 24]} />
        </mesh>
        {/* Top Decorative Finial */}
        <mesh material={materials.champagneGold} position={[0, 1.62, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

        {/* Heavy Pedestal Base */}
        <mesh material={materials.shelfWood} position={[0, -0.15, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.18, 36]} />
        </mesh>
        <mesh material={materials.champagneGold} position={[0, -0.06, 0]}>
          <torusGeometry args={[1.22, 0.03, 16, 36]} />
        </mesh>

        {/* --- TIER 1 (BOTTOM, LARGEST: Radius 2.2) --- */}
        <group position={[0, 0.0, 0]}>
          <mesh material={materials.ceramicWhite} position={[0, 0.03, 0]}>
            <cylinderGeometry args={[2.2, 2.2, 0.06, 48]} />
          </mesh>
          {/* Champagne Gold Rim */}
          <mesh material={materials.champagneGold} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.21, 0.035, 16, 48]} />
          </mesh>
          {/* Subtle contact shadow disc on bottom plate */}
          <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 2.15, 36]} />
            <meshBasicMaterial color="#5E1B2E" transparent opacity={0.05} depthWrite={false} />
          </mesh>
        </group>

        {/* --- TIER 2 (MIDDLE: Radius 1.45, Y = 0.65) --- */}
        <group position={[0, 0.65, 0]}>
          <mesh material={materials.ceramicWhite} position={[0, 0.03, 0]}>
            <cylinderGeometry args={[1.45, 1.45, 0.06, 40]} />
          </mesh>
          {/* Champagne Gold Rim */}
          <mesh material={materials.champagneGold} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.46, 0.032, 16, 40]} />
          </mesh>
          <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 1.4, 32]} />
            <meshBasicMaterial color="#5E1B2E" transparent opacity={0.06} depthWrite={false} />
          </mesh>
        </group>

        {/* --- TIER 3 (TOP, COMPACT: Radius 0.85, Y = 1.25) --- */}
        <group position={[0, 1.25, 0]}>
          <mesh material={materials.ceramicWhite} position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.85, 0.85, 0.06, 32]} />
          </mesh>
          {/* Champagne Gold Rim */}
          <mesh material={materials.champagneGold} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.86, 0.03, 16, 32]} />
          </mesh>
          <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 0.82, 28]} />
            <meshBasicMaterial color="#5E1B2E" transparent opacity={0.07} depthWrite={false} />
          </mesh>
        </group>

        {/* =====================================================================
            14 MINIATURE 3D ITEMS PLACED ON TIERS
            Scaled up & prominent; hovering shows tooltip & inspection badge
            ===================================================================== */}
        {items.map(item => {
          const isSelected = selectedItem?.id === item.id;
          const isHovered = hoveredItemId === item.id;
          
          // Compute Y position based on tier
          const tierY = item.tier === 3 ? 1.30 : item.tier === 2 ? 0.70 : 0.08;
          const x = Math.cos(item.angle) * item.radius;
          const z = Math.sin(item.angle) * item.radius;

          return (
            <group
              key={item.id}
              position={[x, tierY, z]}
              rotation={[0, -item.angle + Math.PI / 2, 0]}
              scale={isHovered ? [0.82, 0.82, 0.82] : isSelected ? [0.78, 0.78, 0.78] : [0.70, 0.70, 0.70]}
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredItemId(item.id);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredItemId(null);
                document.body.style.cursor = 'auto';
              }}
            >
              {/* Gold Selection / Hover Ring */}
              {(isSelected || isHovered) && (
                <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.42, 0.54, 28]} />
                  <meshStandardMaterial
                    color={isSelected ? '#9E2A47' : '#D49B4B'}
                    emissive={isSelected ? '#9E2A47' : '#D49B4B'}
                    emissiveIntensity={0.65}
                    transparent
                    opacity={0.88}
                  />
                </mesh>
              )}

              {/* Miniature Item Model with Hover Animation */}
              <Procedural3DItemModel
                type={item.modelType}
                isHovered={isHovered || isSelected}
              />

              {/* Hover Tooltip Popup Matching Reference Image */}
              {isHovered && (
                <Html
                  center
                  position={[0, 0.85, 0]}
                  distanceFactor={7.5}
                  style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
                >
                  <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#D49B4B] shadow-2xl text-left pointer-events-none transform -translate-y-2 transition-all">
                    <div className="font-serif font-bold text-xs text-[#2B181E]">{item.name}</div>
                    <div className="text-[11px] text-[#7A6269] flex items-center space-x-1.5 mt-0.5">
                      <span className="font-semibold text-[#1F8A65]">{item.available} avail</span>
                      <span>•</span>
                      <span className="font-bold text-[#9E2A47]">${item.price}</span>
                      <span>—</span>
                      <span className="text-[#D49B4B] font-bold">Click to spotlight!</span>
                    </div>
                  </div>
                </Html>
              )}
            </group>
          );
        })}
      </group>
    </>
  );
}

export default BoutiqueDisplayStand;
