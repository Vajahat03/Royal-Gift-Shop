import React from 'react';
import { materials } from '../materials/materials';

export function BackWall() {
  return (
    <group position={[0, 0, -4.9]} rotation={[0, Math.PI, 0]}>
      {/* Wall Corners */}
      <mesh material={materials.wallCream} position={[-5.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>
      <mesh material={materials.wallCream} position={[5.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>

      {/* Main Structural Facade with Modern Architectural Slat Panels */}
      <mesh material={materials.wallCream} position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[11.0, 7.0, 0.6]} />
      </mesh>

      {/* Modern Inset Architectural Paneling in Soft Lavender */}
      <mesh material={materials.wallLavender} position={[-3.0, 3.5, 0.28]}>
        <boxGeometry args={[3.8, 5.6, 0.08]} />
      </mesh>
      <mesh material={materials.wallLavender} position={[3.0, 3.5, 0.28]}>
        <boxGeometry args={[3.8, 5.6, 0.08]} />
      </mesh>

      {/* Rear High Transom Windows (Clerestory windows) looking into upper shelves */}
      {[-3.0, 3.0].map((x, idx) => (
        <group key={idx} position={[x, 5.2, 0]}>
          <mesh material={materials.gold} position={[0, 0, 0.32]}>
            <boxGeometry args={[2.8, 1.2, 0.08]} />
          </mesh>
          <mesh material={materials.glass} position={[0, 0, 0.33]}>
            <boxGeometry args={[2.6, 1.0, 0.04]} />
          </mesh>
        </group>
      ))}

      {/* Rear Restock & Staff Delivery Door with Gold Handle and Canopy */}
      <group position={[0, 1.8, 0.2]}>
        {/* Door Frame */}
        <mesh material={materials.gold} position={[0, 0, 0.1]}>
          <boxGeometry args={[2.0, 3.4, 0.1]} />
        </mesh>
        {/* Door Leaf (Charcoal / Muted Purple with Gold Kickplate) */}
        <mesh material={materials.foundation} position={[0, 0, 0.12]}>
          <boxGeometry args={[1.8, 3.2, 0.06]} />
        </mesh>
        {/* Gold Kickplate */}
        <mesh material={materials.gold} position={[0, -1.2, 0.16]}>
          <boxGeometry args={[1.7, 0.6, 0.04]} />
        </mesh>
        {/* Gold Lever Handle */}
        <mesh material={materials.gold} position={[0.65, 0, 0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.25, 8]} />
        </mesh>
        {/* Modern Overhead Service Canopy */}
        <mesh material={materials.foundation} position={[0, 1.85, 0.5]}>
          <boxGeometry args={[2.6, 0.1, 0.9]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 1.9, 0.5]}>
          <boxGeometry args={[2.62, 0.02, 0.92]} />
        </mesh>
        {/* Service Light */}
        <mesh material={materials.warmGlow} position={[0, 1.75, 0.5]}>
          <sphereGeometry args={[0.08, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}
