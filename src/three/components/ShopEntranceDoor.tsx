import React from 'react';
import { materials } from '../materials/materials';
import { TopiaryPlanter } from './Decorations';

export function ShopEntranceDoor({ doorOpenAngle = 0 }: { doorOpenAngle?: number }) {
  return (
    <group position={[0, 0, 4.8]}>
      {/* Entrance Portal Frame */}
      <mesh material={materials.wallCream} position={[-2.8, 3.2, 0]} castShadow>
        <boxGeometry args={[1.2, 6.4, 0.4]} />
      </mesh>
      <mesh material={materials.wallCream} position={[2.8, 3.2, 0]} castShadow>
        <boxGeometry args={[1.2, 6.4, 0.4]} />
      </mesh>
      <mesh material={materials.wallCream} position={[0, 5.8, 0]} castShadow>
        <boxGeometry args={[6.8, 1.2, 0.4]} />
      </mesh>

      {/* Boutique Signboard Above Entrance Door */}
      <group position={[0, 5.8, 0.25]}>
        <mesh material={materials.foundation}>
          <boxGeometry args={[5.2, 0.9, 0.08]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.04]}>
          <boxGeometry args={[5.3, 0.95, 0.02]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.06]}>
          <boxGeometry args={[4.4, 0.35, 0.04]} />
        </mesh>
      </group>

      {/* Gold Inner Door Arch Frame */}
      <mesh material={materials.gold} position={[0, 2.5, 0]}>
        <boxGeometry args={[3.6, 4.2, 0.08]} />
      </mesh>

      {/* Double Glass Doors (with opening angle animation support) */}
      {/* Left Door */}
      <group position={[-1.7, 2.5, 0]} rotation={[0, -doorOpenAngle, 0]}>
        <mesh material={materials.glass} position={[0.85, 0, 0]}>
          <boxGeometry args={[1.7, 4.0, 0.04]} />
        </mesh>
        <mesh material={materials.gold} position={[1.55, 0, 0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        </mesh>
      </group>

      {/* Right Door */}
      <group position={[1.7, 2.5, 0]} rotation={[0, doorOpenAngle, 0]}>
        <mesh material={materials.glass} position={[-0.85, 0, 0]}>
          <boxGeometry args={[1.7, 4.0, 0.04]} />
        </mesh>
        <mesh material={materials.gold} position={[-1.55, 0, 0.05]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        </mesh>
      </group>

      {/* Flanking Topiary Planters */}
      <TopiaryPlanter position={[-2.4, 0.3, 0.8]} />
      <TopiaryPlanter position={[2.4, 0.3, 0.8]} />
    </group>
  );
}
