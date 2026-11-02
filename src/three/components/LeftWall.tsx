import React from 'react';
import { materials } from '../materials/materials';
import { TopiaryPlanter, GiftBox } from './Decorations';

export function LeftWall() {
  return (
    <group position={[-5.9, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Wall Corners */}
      <mesh material={materials.wallCream} position={[-4.7, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>
      <mesh material={materials.wallCream} position={[4.7, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>

      {/* Wall Upper Header */}
      <mesh material={materials.wallCream} position={[0, 6.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 2.0, 0.6]} />
      </mesh>
      {/* Lavender Header Trim */}
      <mesh material={materials.wallLavender} position={[0, 5.0, 0.28]}>
        <boxGeometry args={[8.8, 0.25, 0.08]} />
      </mesh>

      {/* Lower Foundation Wall */}
      <mesh material={materials.foundation} position={[0, 0.4, 0]}>
        <boxGeometry args={[9.2, 0.8, 0.65]} />
      </mesh>

      {/* Panoramic Artisanal Atelier Wrapping Bay Window (Double Width) */}
      <group position={[-1.2, 2.8, 0]}>
        <mesh material={materials.gold} position={[0, 0, 0.05]}>
          <boxGeometry args={[5.2, 3.8, 0.1]} />
        </mesh>
        <mesh material={materials.glass} position={[0, 0, 0.06]}>
          <boxGeometry args={[5.0, 3.6, 0.04]} />
        </mesh>
        {/* Subtle decorative window transom divider in gold */}
        <mesh material={materials.gold} position={[0, 0.9, 0.07]}>
          <boxGeometry args={[5.0, 0.05, 0.02]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.07]}>
          <boxGeometry args={[0.05, 3.6, 0.02]} />
        </mesh>
      </group>

      {/* Accent Solid Boutique Section with Mini Display Niche */}
      <group position={[3.0, 2.8, 0]}>
        <mesh material={materials.wallCream} position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 4.4, 0.58]} />
        </mesh>
        <mesh material={materials.wallLavender} position={[0, 0, 0.28]}>
          <boxGeometry args={[2.0, 4.0, 0.06]} />
        </mesh>
        {/* Boutique Niche Shadowbox Display */}
        <mesh material={materials.gold} position={[0, 0, 0.3]}>
          <boxGeometry args={[1.4, 1.8, 0.04]} />
        </mesh>
        <mesh material={materials.glass} position={[0, 0, 0.32]}>
          <boxGeometry args={[1.3, 1.7, 0.02]} />
        </mesh>
        <GiftBox position={[0, -0.2, 0.1]} size={[0.4, 0.4, 0.4]} boxColor="blush" />
      </group>

      {/* Exterior Planters */}
      <TopiaryPlanter position={[-3.2, 0.3, 1.0]} />
      <TopiaryPlanter position={[3.2, 0.3, 1.0]} />
    </group>
  );
}
