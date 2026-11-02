import React from 'react';
import { materials } from '../materials/materials';

export function BuildingBase() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Lower Platform / Pavement (16 x 14) */}
      <mesh material={materials.pavement} position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[16.5, 0.4, 14.5]} />
      </mesh>

      {/* Gold Inlay Edge Border around Platform */}
      <mesh material={materials.gold} position={[0, 0.21, 0]}>
        <boxGeometry args={[16.2, 0.02, 14.2]} />
      </mesh>
      {/* Inner curb cutout */}
      <mesh material={materials.pavement} position={[0, 0.22, 0]}>
        <boxGeometry args={[16.0, 0.02, 14.0]} />
      </mesh>

      {/* Front Entrance Staircase / Steps */}
      <mesh material={materials.wallLavender} position={[0, 0.12, 5.5]} receiveShadow>
        <boxGeometry args={[4.2, 0.24, 1.2]} />
      </mesh>
      <mesh material={materials.pavement} position={[0, 0.24, 5.2]} receiveShadow>
        <boxGeometry args={[3.6, 0.24, 0.8]} />
      </mesh>
    </group>
  );
}
