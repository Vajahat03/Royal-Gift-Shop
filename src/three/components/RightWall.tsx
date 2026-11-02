import React from 'react';
import { materials } from '../materials/materials';
import { FlowerBouquet, TopiaryPlanter } from './Decorations';

export function RightWall() {
  return (
    <group position={[5.9, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Wall Corners */}
      <mesh material={materials.wallCream} position={[-4.7, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>
      <mesh material={materials.wallCream} position={[4.7, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>

      {/* Wall Header */}
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

      {/* Trio of Grand Botanical Showcase Windows */}
      {[-2.8, 0, 2.8].map((x, idx) => (
        <group key={idx} position={[x, 3.0, 0]}>
          {/* Gold Arch & Mullions */}
          <mesh material={materials.gold} position={[0, 0, 0.05]}>
            <boxGeometry args={[2.4, 4.0, 0.1]} />
          </mesh>
          {/* Translucent Glass */}
          <mesh material={materials.glass} position={[0, 0, 0.06]}>
            <boxGeometry args={[2.2, 3.8, 0.04]} />
          </mesh>
          {/* Exterior Window Flower Box */}
          <group position={[0, -2.1, 0.35]}>
            {/* White Wood Planter Box */}
            <mesh material={materials.ceramicWhite} castShadow>
              <boxGeometry args={[2.3, 0.45, 0.45]} />
            </mesh>
            <mesh material={materials.gold} position={[0, 0.21, 0]}>
              <boxGeometry args={[2.35, 0.04, 0.48]} />
            </mesh>
            {/* Lush Florals */}
            <FlowerBouquet position={[-0.6, 0.1, 0]} scale={0.5} />
            <FlowerBouquet position={[0.6, 0.1, 0]} scale={0.5} />
          </group>
        </group>
      ))}

      {/* Exterior Architectural Sconces with Soft Glow */}
      {[-1.4, 1.4].map((x, idx) => (
        <group key={idx} position={[x, 4.8, 0.35]}>
          <mesh material={materials.gold}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          </mesh>
          <mesh material={materials.warmGlow} position={[0, 0, 0.1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
        </group>
      ))}

      {/* Side Planter on Pavement */}
      <TopiaryPlanter position={[0, 0.3, 1.2]} />
    </group>
  );
}
