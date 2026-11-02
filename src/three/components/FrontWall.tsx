import React from 'react';
import { materials } from '../materials/materials';
import { TopiaryPlanter, GiftBox, TeddyBear } from './Decorations';

export function FrontWall() {
  return (
    <group position={[0, 0, 4.9]}>
      {/* --- CORNER COLUMNS & PILASTERS (Warm Cream with Lavender Accents) --- */}
      {/* Left Corner Column */}
      <mesh material={materials.wallCream} position={[-5.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>
      {/* Left Lavender Inset */}
      <mesh material={materials.wallLavender} position={[-5.8, 3.5, 0.28]}>
        <boxGeometry args={[0.5, 6.4, 0.08]} />
      </mesh>

      {/* Right Corner Column */}
      <mesh material={materials.wallCream} position={[5.8, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 7.0, 0.6]} />
      </mesh>
      {/* Right Lavender Inset */}
      <mesh material={materials.wallLavender} position={[5.8, 3.5, 0.28]}>
        <boxGeometry args={[0.5, 6.4, 0.08]} />
      </mesh>

      {/* --- UPPER FACADE & SIGNAGE HEADER --- */}
      <mesh material={materials.wallCream} position={[0, 5.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[11.0, 2.4, 0.6]} />
      </mesh>

      {/* Grand Boutique Signboard Plaque */}
      <group position={[0, 5.6, 0.35]}>
        {/* Signboard Backing (Soft Charcoal / Muted Purple with Gold Border) */}
        <mesh material={materials.foundation} position={[0, 0, 0]} castShadow>
          <boxGeometry args={[6.8, 1.2, 0.1]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.02]}>
          <boxGeometry args={[6.9, 1.3, 0.04]} />
        </mesh>
        <mesh material={materials.foundation} position={[0, 0, 0.04]}>
          <boxGeometry args={[6.7, 1.1, 0.04]} />
        </mesh>

        {/* 3D Sign Lettering & Boutique Icon */}
        <mesh material={materials.gold} position={[0, 0.15, 0.08]}>
          <boxGeometry args={[5.2, 0.45, 0.06]} />
        </mesh>
        {/* Subtitle bar: "ARTISANAL GIFTING & LUXE WRAPPING" */}
        <mesh material={materials.gold} position={[0, -0.28, 0.08]}>
          <boxGeometry args={[3.8, 0.12, 0.04]} />
        </mesh>
        {/* Exterior Sign Gooseneck Lamps */}
        {[-2.2, 0, 2.2].map((x, idx) => (
          <group key={idx} position={[x, 0.75, 0.3]}>
            <mesh material={materials.gold}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            </mesh>
            <mesh material={materials.gold} position={[0, -0.15, 0.05]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.08, 0.15, 12]} />
            </mesh>
            <mesh material={materials.warmGlow} position={[0, -0.2, 0.05]}>
              <sphereGeometry args={[0.06, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Lower Foundation Sill */}
      <mesh material={materials.foundation} position={[0, 0.25, 0]}>
        <boxGeometry args={[11.2, 0.5, 0.65]} />
      </mesh>

      {/* --- CENTER ENTRANCE (Double Glass Doors & Gold Frame) --- */}
      <group position={[0, 2.3, 0]}>
        {/* Outer Entrance Arch Frame */}
        <mesh material={materials.gold} position={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 3.8, 0.1]} />
        </mesh>
        {/* Clear Glass Door Left */}
        <mesh material={materials.glass} position={[-0.75, 0, 0.06]}>
          <boxGeometry args={[1.4, 3.6, 0.04]} />
        </mesh>
        {/* Clear Glass Door Right */}
        <mesh material={materials.glass} position={[0.75, 0, 0.06]}>
          <boxGeometry args={[1.4, 3.6, 0.04]} />
        </mesh>

        {/* Gold Door Handles */}
        <mesh material={materials.gold} position={[-0.15, 0, 0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        </mesh>
        <mesh material={materials.gold} position={[0.15, 0, 0.15]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        </mesh>
      </group>

      {/* --- LEFT DISPLAY WINDOW --- */}
      <group position={[-3.8, 2.3, 0]}>
        {/* Window Framing */}
        <mesh material={materials.gold} position={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 3.8, 0.1]} />
        </mesh>
        {/* Architectural Glass */}
        <mesh material={materials.glass} position={[0, 0, 0.06]}>
          <boxGeometry args={[3.0, 3.6, 0.04]} />
        </mesh>
        {/* Window Display Podium Inside */}
        <mesh material={materials.wallLavender} position={[0, -1.2, -0.6]}>
          <cylinderGeometry args={[0.9, 0.9, 0.6, 24]} />
        </mesh>
        <TeddyBear position={[0, -0.85, -0.6]} scale={0.7} />
        <GiftBox position={[0.45, -0.65, -0.3]} size={[0.4, 0.35, 0.4]} boxColor="blush" />
      </group>

      {/* --- RIGHT DISPLAY WINDOW --- */}
      <group position={[3.8, 2.3, 0]}>
        {/* Window Framing */}
        <mesh material={materials.gold} position={[0, 0, 0.05]}>
          <boxGeometry args={[3.2, 3.8, 0.1]} />
        </mesh>
        {/* Architectural Glass */}
        <mesh material={materials.glass} position={[0, 0, 0.06]}>
          <boxGeometry args={[3.0, 3.6, 0.04]} />
        </mesh>
        {/* Window Display Podium Inside */}
        <mesh material={materials.wallLavender} position={[0, -1.2, -0.6]}>
          <boxGeometry args={[2.2, 0.6, 0.8]} />
        </mesh>
        <GiftBox position={[-0.5, -0.6, -0.6]} size={[0.5, 0.5, 0.5]} boxColor="purple" />
        <GiftBox position={[0.5, -0.65, -0.6]} size={[0.4, 0.4, 0.4]} boxColor="lavender" />
      </group>

      {/* --- ENTRANCE FLANKING TOPIARY PLANTERS --- */}
      <TopiaryPlanter position={[-2.2, 0.3, 1.0]} />
      <TopiaryPlanter position={[2.2, 0.3, 1.0]} />
    </group>
  );
}
