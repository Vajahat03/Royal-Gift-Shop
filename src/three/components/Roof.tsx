import React from 'react';
import { materials } from '../materials/materials';

export function Roof({ isCutaway = false, liftOffset = 0 }: { isCutaway?: boolean; liftOffset?: number }) {
  if (isCutaway) return null;

  return (
    <group position={[0, 7.1 + liftOffset, 0]}>
      {/* Main Flat Roof Slab */}
      <mesh material={materials.wallCream} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[12.4, 0.4, 10.4]} />
      </mesh>

      {/* Parapet Wall / Cornice in Lavender & Gold */}
      <mesh material={materials.wallLavender} position={[0, 0.35, 0]}>
        <boxGeometry args={[12.6, 0.3, 10.6]} />
      </mesh>
      {/* Gold Crown Molding Trim */}
      <mesh material={materials.gold} position={[0, 0.52, 0]}>
        <boxGeometry args={[12.7, 0.06, 10.7]} />
      </mesh>

      {/* Central Architectural Glass Skylight / Atrium */}
      <group position={[0, 0.25, 0.5]}>
        {/* Atrium Raised Curb */}
        <mesh material={materials.wallCream} position={[0, 0.15, 0]}>
          <boxGeometry args={[6.2, 0.3, 4.4]} />
        </mesh>
        {/* Brass Skylight Mullion Grid */}
        <mesh material={materials.gold} position={[0, 0.45, 0]}>
          <boxGeometry args={[6.1, 0.08, 4.3]} />
        </mesh>
        {/* Glass Skylight Panes */}
        <mesh material={materials.glass} position={[0, 0.46, 0]}>
          <boxGeometry args={[5.9, 0.04, 4.1]} />
        </mesh>
      </group>

      {/* Decorative Rooftop Architecture (Sleek minimalist boutique mechanical screen) */}
      <mesh material={materials.foundation} position={[-4.2, 0.5, -3.2]}>
        <boxGeometry args={[1.8, 0.6, 1.8]} />
      </mesh>
      <mesh material={materials.gold} position={[-4.2, 0.82, -3.2]}>
        <boxGeometry args={[1.85, 0.04, 1.85]} />
      </mesh>
    </group>
  );
}
