import React from 'react';
import { materials } from '../materials/materials';
import { 
  TeddyBear, 
  WoodenGiftBox, 
  ChocolateDisplay, 
  FlowerBouquet,
  TopiaryPlanter
} from './Decorations';

export function ShopInteriorShell() {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Hardwood Parquet Interior Floor */}
      <mesh material={materials.interiorFloor} position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[11.2, 0.04, 9.6]} />
      </mesh>

      {/* Velvet Carpet Runner (Royal Wine Velvet Runner leading from entrance) */}
      <mesh material={materials.crownVelvet} position={[0, 0.005, 1.2]}>
        <boxGeometry args={[1.8, 0.008, 5.2]} />
      </mesh>
      {/* Gold Fringe border on carpet */}
      {[-0.91, 0.91].map((x, i) => (
        <mesh key={i} material={materials.gold} position={[x, 0.01, 1.2]}>
          <boxGeometry args={[0.02, 0.009, 5.2]} />
        </mesh>
      ))}

      {/* Decorative Marble Medallion in Entryway */}
      <mesh material={materials.ceramicWhite} position={[0, 0.012, 3.2]}>
        <cylinderGeometry args={[1.5, 1.5, 0.02, 32]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.022, 3.2]}>
        <torusGeometry args={[1.5, 0.025, 8, 32]} />
      </mesh>

      {/* 2. Open Diorama Top Cornice / Crown Moldings (Leaves top open for dollhouse camera view) */}
      {/* Front Wall Top Cornice */}
      <mesh material={materials.shelfWood} position={[0, 6.8, -4.6]}>
        <boxGeometry args={[11.2, 0.16, 0.35]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 6.72, -4.5]}>
        <boxGeometry args={[11.22, 0.04, 0.08]} />
      </mesh>
      {/* Left Wall Top Cornice */}
      <mesh material={materials.shelfWood} position={[-5.3, 6.8, 0]}>
        <boxGeometry args={[0.35, 0.16, 9.4]} />
      </mesh>
      <mesh material={materials.gold} position={[-5.2, 6.72, 0]}>
        <boxGeometry args={[0.08, 0.04, 9.42]} />
      </mesh>
      {/* Right Wall Top Cornice */}
      <mesh material={materials.shelfWood} position={[5.3, 6.8, 0]}>
        <boxGeometry args={[0.35, 0.16, 9.4]} />
      </mesh>
      <mesh material={materials.gold} position={[5.2, 6.72, 0]}>
        <boxGeometry args={[0.08, 0.04, 9.42]} />
      </mesh>

      {/* Cross Beam for Chandelier Mount */}
      <mesh material={materials.gold} position={[0, 6.7, 0]}>
        <boxGeometry args={[10.6, 0.06, 0.06]} />
      </mesh>

      {/* 3. Center Boutique Circular Pedestal Table */}
      <group position={[0, 0, 0]}>
        {/* Tier 1 Table Base */}
        <mesh material={materials.wallLavender} position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[1.5, 1.6, 0.9, 32]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.92, 0]}>
          <cylinderGeometry args={[1.55, 1.55, 0.05, 32]} />
        </mesh>

        {/* Tier 2 Pedestal in Polished Marble */}
        <mesh material={materials.ceramicWhite} position={[0, 1.35, 0]} castShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.8, 24]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 1.76, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.04, 24]} />
        </mesh>

        {/* Centerpiece Display on Center Island: Trio of Charming Bears (Never a single bear!) */}
        <group position={[0, 1.8, 0]}>
          {/* Snowy Cream Cuddle Bear (Center) */}
          <TeddyBear 
            position={[0, 0, 0.05]} 
            scale={0.76} 
            furColor="cream" 
            bowColor="gold" 
          />
          {/* Honey Caramel Companion Bear (Right) */}
          <TeddyBear 
            position={[0.32, -0.04, -0.1]} 
            scale={0.62} 
            furColor="honey" 
            bowColor="emerald" 
            rotation={[0, -0.4, 0]} 
          />
          {/* Soft Blush Pink Bear (Left) */}
          <TeddyBear 
            position={[-0.32, -0.04, -0.1]} 
            scale={0.58} 
            furColor="blush" 
            bowColor="lavender" 
            rotation={[0, 0.4, 0]} 
          />
        </group>

        {/* Traditional Carved Teak Wooden Box on lower table */}
        <WoodenGiftBox 
          position={[0.7, 0.95, 0.3]} 
          size={[0.48, 0.32, 0.36]} 
          woodType="teak" 
          hasCurvedLid={true} 
        />

        {/* Traditional Mahogany Box on other side */}
        <WoodenGiftBox 
          position={[-0.7, 0.95, 0.2]} 
          size={[0.5, 0.34, 0.38]} 
          woodType="mahogany" 
        />

        {/* Gourmet Chocolate & Truffle Display */}
        <ChocolateDisplay position={[0, 0.95, -0.65]} />

        {/* Fresh Rose Floral Bouquet on lower tier */}
        <FlowerBouquet position={[0.65, 0.95, -0.4]} scale={0.55} />
      </group>

      {/* 4. Luxury Corner Architectural Columns (Corner pillars of the diorama) */}
      {[
        [-5.1, -4.3],
        [5.1, -4.3],
        [-5.1, 4.3],
        [5.1, 4.3],
      ].map(([cx, cz], i) => (
        <group key={i} position={[cx, 3.4, cz]}>
          <mesh material={materials.ceramicWhite} castShadow>
            <cylinderGeometry args={[0.22, 0.25, 6.8, 24]} />
          </mesh>
          <mesh material={materials.gold} position={[0, 3.3, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 24]} />
          </mesh>
          <mesh material={materials.gold} position={[0, -3.3, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 24]} />
          </mesh>
        </group>
      ))}

      {/* 5. Topiary Planters in Urns at Open Entrance Boundary */}
      <TopiaryPlanter position={[-2.4, 0, 3.8]} />
      <TopiaryPlanter position={[2.4, 0, 3.8]} />

      {/* 6. Grand Tiered Chandelier (Imperial Gold & Glowing Glass Orbs) */}
      <group position={[0, 5.2, 0]}>
        {/* Central Suspension Rod */}
        <mesh material={materials.gold} position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 8]} />
        </mesh>

        {/* Main Glowing Opal Globe */}
        <mesh material={materials.warmGlow}>
          <sphereGeometry args={[0.42, 24, 24]} />
        </mesh>
        <mesh material={materials.gold}>
          <torusGeometry args={[0.55, 0.025, 8, 32]} />
        </mesh>

        {/* Satellite Glowing Globes on Arms */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, idx) => {
          const gx = Math.cos(angle) * 0.9;
          const gz = Math.sin(angle) * 0.9;
          return (
            <group key={idx}>
              {/* Curved Arm */}
              <mesh material={materials.gold} position={[gx * 0.5, 0, gz * 0.5]} rotation={[0, -angle, 0]}>
                <boxGeometry args={[0.8, 0.02, 0.02]} />
              </mesh>
              {/* Satellite Globe */}
              <mesh material={materials.warmGlow} position={[gx, -0.05, gz]}>
                <sphereGeometry args={[0.18, 16, 16]} />
              </mesh>
              <pointLight position={[gx, -0.05, gz]} intensity={0.4} distance={3.5} color="#FFE6C7" />
            </group>
          );
        })}
      </group>
    </group>
  );
}
