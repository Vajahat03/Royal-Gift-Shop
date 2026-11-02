import React from 'react';
import { materials } from '../materials/materials';
import { GiftBox, TeddyBear, FlowerBouquet, ChocolateDisplay } from './Decorations';

export function Interior() {
  return (
    <group position={[0, 0, 0]}>
      {/* Ground Floor Hardwood Flooring */}
      <mesh material={materials.interiorFloor} position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[11.6, 0.04, 9.6]} />
      </mesh>

      {/* Decorative Marble Inlay Medallion in Entrance */}
      <mesh material={materials.ceramicWhite} position={[0, 0.05, 3.2]}>
        <cylinderGeometry args={[1.4, 1.4, 0.02, 32]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.06, 3.2]}>
        <torusGeometry args={[1.4, 0.03, 8, 32]} />
      </mesh>

      {/* Center Boutique Island Display Table (Tiered Round) */}
      <group position={[0, 0, 0.5]}>
        {/* Base Cylinder */}
        <mesh material={materials.wallLavender} position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[1.6, 1.7, 0.9, 32]} />
        </mesh>
        {/* Gold Trim */}
        <mesh material={materials.gold} position={[0, 0.9, 0]}>
          <cylinderGeometry args={[1.65, 1.65, 0.05, 32]} />
        </mesh>
        {/* Second Tier */}
        <mesh material={materials.ceramicWhite} position={[0, 1.35, 0]} castShadow>
          <cylinderGeometry args={[1.0, 1.0, 0.8, 32]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 1.76, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.04, 32]} />
        </mesh>

        {/* Displays on Center Island */}
        <TeddyBear position={[0, 1.8, 0]} scale={0.9} rotation={[0, 0.2, 0]} />
        <GiftBox position={[0.7, 0.95, 0.4]} size={[0.5, 0.5, 0.5]} boxColor="blush" rotation={[0, 0.3, 0]} />
        <GiftBox position={[-0.8, 0.95, 0.2]} size={[0.6, 0.4, 0.6]} boxColor="purple" rotation={[0, -0.4, 0]} />
        <GiftBox position={[0.2, 0.95, -0.9]} size={[0.55, 0.55, 0.55]} boxColor="lavender" rotation={[0, 0.7, 0]} />
        <FlowerBouquet position={[-0.4, 0.95, 0.8]} scale={0.7} />
        <ChocolateDisplay position={[0.5, 0.95, -0.3]} />
      </group>

      {/* Left Wall Atelier & Packaging Counter */}
      <group position={[-4.5, 0, 0]}>
        {/* Long Craft / Packaging Counter */}
        <mesh material={materials.wallCream} position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.6, 1.0, 5.5]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 1.02, 0]}>
          <boxGeometry args={[1.7, 0.05, 5.6]} />
        </mesh>

        {/* Ribbon Spool Rack Behind Counter */}
        <group position={[-0.6, 1.3, 0]}>
          <mesh material={materials.foundation} position={[0, 0.5, 0]}>
            <boxGeometry args={[0.1, 1.2, 3.2]} />
          </mesh>
          {/* Spools of colored satin ribbon */}
          {[-1.0, -0.5, 0, 0.5, 1.0].map((z, idx) => (
            <mesh 
              key={idx} 
              material={idx % 2 === 0 ? materials.giftBlush : materials.giftLavender} 
              position={[0.12, 0.8, z]} 
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
            </mesh>
          ))}
        </group>

        {/* Boxes & Craft Tools on Packaging Counter */}
        <GiftBox position={[0, 1.15, 1.5]} size={[0.7, 0.4, 0.6]} boxColor="lavender" />
        <GiftBox position={[0, 1.15, 0.6]} size={[0.5, 0.5, 0.5]} boxColor="blush" />
        <ChocolateDisplay position={[0, 1.05, -1.2]} />
      </group>

      {/* Right Wall Boutique Shelving Unit */}
      <group position={[4.6, 0, 0]}>
        {/* Main Cabinet Frame */}
        <mesh material={materials.wallLavender} position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[1.4, 4.0, 6.0]} />
        </mesh>
        {/* Gold Frame Outline */}
        <mesh material={materials.gold} position={[-0.71, 2.0, 0]}>
          <boxGeometry args={[0.04, 4.05, 6.05]} />
        </mesh>
        {/* Shelves on Right Wall */}
        {[0.8, 1.8, 2.8].map((y, idx) => (
          <group key={idx} position={[-0.4, y, 0]}>
            <mesh material={materials.gold}>
              <boxGeometry args={[0.8, 0.06, 5.6]} />
            </mesh>
            {/* Display Items on Shelves */}
            <FlowerBouquet position={[0, 0.05, -1.8]} scale={0.65} />
            <TeddyBear position={[0, 0.05, -0.6]} scale={0.7} rotation={[0, -0.5, 0]} />
            <GiftBox position={[0, 0.25, 0.8]} size={[0.45, 0.45, 0.45]} boxColor="purple" />
            <GiftBox position={[0, 0.22, 1.8]} size={[0.5, 0.4, 0.5]} boxColor="blush" />
          </group>
        ))}
      </group>

      {/* Rear Boutique Wall Storage Cabinets & Service Door */}
      <group position={[0, 0, -4.2]}>
        {/* Back Cabinets with Gold Trim */}
        <mesh material={materials.wallCream} position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[7.0, 3.6, 0.8]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 3.62, 0]}>
          <boxGeometry args={[7.1, 0.08, 0.85]} />
        </mesh>
        {/* Decorative Gift Sets on Back Counter */}
        <GiftBox position={[-2.0, 3.9, 0]} size={[0.6, 0.5, 0.5]} boxColor="blush" />
        <TeddyBear position={[0, 3.7, 0]} scale={0.8} />
        <GiftBox position={[2.0, 3.9, 0]} size={[0.6, 0.5, 0.5]} boxColor="lavender" />
      </group>

      {/* Hanging Boutique Pendant Chandelier (Glowing Glass Globe) */}
      <group position={[0, 3.8, 0.5]}>
        {/* Brass Rod */}
        <mesh material={materials.gold} position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
        </mesh>
        {/* Glowing Opal Glass Sphere */}
        <mesh material={materials.warmGlow}>
          <sphereGeometry args={[0.45, 24, 24]} />
        </mesh>
        {/* Orbit Gold Ring */}
        <mesh material={materials.gold}>
          <torusGeometry args={[0.55, 0.02, 8, 32]} />
        </mesh>
      </group>
    </group>
  );
}
