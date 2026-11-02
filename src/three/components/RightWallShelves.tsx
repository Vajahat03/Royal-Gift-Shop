import React from 'react';
import { Text } from '@react-three/drei';
import { materials } from '../materials/materials';
import { 
  RoyalCrown, 
  JewelryBouquet, 
  MensAccessoriesDisplay,
  WoodenGiftBox,
  AestheticFlowerBouquet,
  AestheticGiftBox
} from './Decorations';
import { Aesthetic3DAnimatedLabel } from './Aesthetic3DAnimatedLabel';

interface RightWallShelvesProps {
  onSelectItem: (materialId: string) => void;
}

export function RightWallShelves({ onSelectItem }: RightWallShelvesProps) {
  return (
    <group position={[5.3, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Wall Panel in Warm Lavender with Gold Border */}
      <mesh material={materials.wallLavender} position={[0, 3.5, -0.2]}>
        <boxGeometry args={[7.6, 6.8, 0.1]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 3.5, -0.14]}>
        <boxGeometry args={[7.7, 6.9, 0.02]} />
      </mesh>

      {/* Decorative Wall Sconces with Warm Regal Radiance */}
      {[-2.8, 2.8].map((x, idx) => (
        <group key={idx} position={[x, 4.4, 0.2]}>
          <mesh material={materials.gold}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 12]} />
          </mesh>
          <mesh material={materials.warmGlow} position={[0, 0, 0.14]}>
            <sphereGeometry args={[0.13, 16, 16]} />
          </mesh>
          <pointLight position={[0, 0, 0.25]} intensity={0.8} distance={3} color="#FFEAC2" />
        </group>
      ))}

      {/* =========================================================================
          THE ROYAL CROWN (HOVERING ABOVE THE COUNTER WITH SPOTLIGHT)
          ========================================================================= */}
      <group position={[0, 4.5, 0.5]}>
        <RoyalCrown scale={1.15} />
        <mesh material={materials.warmGlow} position={[0, 0.5, -0.4]}>
          <ringGeometry args={[0.7, 0.85, 32]} />
        </mesh>
      </group>

      {/* =========================================================================
          "THE ROYAL GIFT" SMALL COMPACT LUXURY COUNTER
          ========================================================================= */}
      <group position={[0, 0.95, 0.65]}>
        <mesh material={materials.shelfWood} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 1.9, 0.95]} />
        </mesh>
        <mesh material={materials.wallCream} position={[0, 0, 0.49]}>
          <boxGeometry args={[2.5, 1.7, 0.04]} />
        </mesh>
        <mesh material={materials.interiorFloor} position={[0, 0.97, 0]}>
          <boxGeometry args={[2.85, 0.07, 1.05]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.99, 0.53]}>
          <boxGeometry args={[2.86, 0.04, 0.03]} />
        </mesh>

        {/* 3D EMBOSSED COUNTER SIGNAGE: "THE ROYAL GIFT" */}
        <group position={[0, 0.35, 0.52]}>
          <mesh material={materials.gold} position={[0, 0, 0]}>
            <boxGeometry args={[1.9, 0.38, 0.02]} />
          </mesh>
          <mesh material={materials.velvetBlack} position={[0, 0, 0.012]}>
            <boxGeometry args={[1.84, 0.32, 0.01]} />
          </mesh>
          <Text
            position={[0, 0, 0.022]}
            fontSize={0.13}
            color="#F3BA2F"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.12}
          >
            THE ROYAL GIFT
          </Text>
        </group>

        {/* Velvet Display Runner across counter surface */}
        <mesh material={materials.velvetBlack} position={[0, 1.01, 0]}>
          <boxGeometry args={[2.6, 0.01, 0.75]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 1.015, 0]}>
          <boxGeometry args={[2.62, 0.005, 0.02]} />
        </mesh>

        {/* --- DISPLAY ON THE ROYAL GIFT COUNTER --- */}
        {/* 1. Dedicated Jewelry Bouquet for chains & bracelets (High) */}
        <group position={[-0.8, 1.02, 0]}>
          <JewelryBouquet scale={0.88} />
          <Aesthetic3DAnimatedLabel 
            name="Jewelry Bouquet" 
            materialId="mat-jewelry-bouquet" 
            position={[0, 0.95, 0.2]} 
            onSelect={onSelectItem} 
            floatOffset={0.1}
            stemHeight={0.24} 
          />
        </group>

        {/* 2. Small Heirloom Carved Wooden Keepsake Box (Low Center) */}
        <group position={[0, 1.02, 0.1]}>
          <WoodenGiftBox size={[0.42, 0.28, 0.32]} woodType="rosewood" hasCurvedLid={true} />
          <Aesthetic3DAnimatedLabel 
            name="Trinket Box" 
            materialId="mat-wooden-box" 
            position={[0, 0.55, 0.1]} 
            onSelect={onSelectItem} 
            floatOffset={0.7}
            stemHeight={0.08} 
          />
        </group>

        {/* 3. Men's Luxury Accessories: Watches, Wallets, Belts (High Right) */}
        <group position={[0.75, 1.02, 0]}>
          <MensAccessoriesDisplay />
          <Aesthetic3DAnimatedLabel 
            name="Executive Set" 
            materialId="mat-mens-gift-set" 
            position={[0, 0.95, 0.2]} 
            onSelect={onSelectItem} 
            floatOffset={0.4}
            stemHeight={0.24} 
          />
        </group>
      </group>

      {/* Floating Side Showcase Shelves */}
      <group position={[-2.4, 3.2, 0.4]}>
        <mesh material={materials.interiorFloor}>
          <boxGeometry args={[1.8, 0.06, 0.7]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.36]}>
          <boxGeometry args={[1.82, 0.07, 0.03]} />
        </mesh>
        <AestheticFlowerBouquet flowerType="rose" wrapStyle="blush" position={[-0.45, 0.05, 0]} scale={0.65} />
        <AestheticGiftBox style="stackedPastel" position={[0.45, 0.05, 0]} scale={0.58} />
        <Aesthetic3DAnimatedLabel name="Rose & Pastel Box" materialId="mat-rose-bouquet" position={[0, 0.75, 0.2]} onSelect={onSelectItem} floatOffset={0.2} />
      </group>

      <group position={[2.4, 3.2, 0.4]}>
        <mesh material={materials.interiorFloor}>
          <boxGeometry args={[1.8, 0.06, 0.7]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.36]}>
          <boxGeometry args={[1.82, 0.07, 0.03]} />
        </mesh>
        <AestheticGiftBox style="floralPattern" position={[-0.45, 0.05, 0]} scale={0.68} />
        <AestheticFlowerBouquet flowerType="sunflower" wrapStyle="kraft" position={[0.45, 0.05, 0]} scale={0.65} />
        <Aesthetic3DAnimatedLabel name="Botanical Gift Set" materialId="mat-botanical-box" position={[0, 0.75, 0.2]} onSelect={onSelectItem} floatOffset={0.5} />
      </group>
    </group>
  );
}
