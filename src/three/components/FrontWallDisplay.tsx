import React from 'react';
import { materials } from '../materials/materials';
import { 
  WoodenGiftBox, 
  LuxuryPerfumes, 
  HotwheelsCar, 
  TeddyBear, 
  ChocolateDisplay, 
  WrappingPaperStation,
  AestheticFlowerBouquet,
  AestheticGiftBox
} from './Decorations';
import { Aesthetic3DAnimatedLabel } from './Aesthetic3DAnimatedLabel';

interface FrontWallDisplayProps {
  onSelectItem: (materialId: string) => void;
}

export function FrontWallDisplay({ onSelectItem }: FrontWallDisplayProps) {
  return (
    <group position={[0, 0, -4.6]}>
      {/* Architectural Wall Backdrop */}
      <mesh material={materials.wallCream} position={[0, 3.5, 0]}>
        <boxGeometry args={[9.4, 7.0, 0.2]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 3.5, 0.05]}>
        <boxGeometry args={[9.5, 7.05, 0.04]} />
      </mesh>

      {/* Main Boutique Credenza Base in Warm Lavender & Walnut Top */}
      <mesh material={materials.wallLavender} position={[0, 1.1, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 2.2, 1.2]} />
      </mesh>
      <mesh material={materials.interiorFloor} position={[0, 2.24, 0.6]}>
        <boxGeometry args={[9.0, 0.08, 1.3]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 2.28, 1.25]}>
        <boxGeometry args={[9.02, 0.04, 0.04]} />
      </mesh>

      {/* =========================================================================
          SHELF TIER 3 (UPPER FLOATING SHELF - y = 5.2): PERFUMES & BOUQUETS
          ========================================================================= */}
      <group position={[0, 5.2, 0.5]}>
        <mesh material={materials.interiorFloor} position={[0, 0, 0]}>
          <boxGeometry args={[8.2, 0.07, 0.75]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.38]}>
          <boxGeometry args={[8.22, 0.08, 0.03]} />
        </mesh>
        {/* Under-shelf Warm LED Strip */}
        <mesh material={materials.ledStripGlow} position={[0, -0.04, 0.2]}>
          <boxGeometry args={[8.0, 0.015, 0.04]} />
        </mesh>

        {/* 1. French Luxury Perfumes Collection (Apex Center) */}
        <LuxuryPerfumes position={[0, 0.04, 0]} />
        <Aesthetic3DAnimatedLabel 
          name="French Perfumes" 
          materialId="mat-perfume" 
          position={[0, 1.18, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.1}
          stemHeight={0.34} 
        />

        {/* 2. Velvet Crimson & Blush Rose Bouquet (Left - High) */}
        <AestheticFlowerBouquet flowerType="rose" wrapStyle="kraft" position={[-2.8, 0.04, 0]} scale={0.75} />
        <Aesthetic3DAnimatedLabel 
          name="Crimson Roses" 
          materialId="mat-rose-bouquet" 
          position={[-2.8, 1.05, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.3}
          stemHeight={0.26} 
        />

        {/* 3. Spring Coral & Lilac Tulip Bouquet (Mid-Left - Low) */}
        <AestheticFlowerBouquet flowerType="tulip" wrapStyle="blush" position={[-1.4, 0.04, 0]} scale={0.75} />
        <Aesthetic3DAnimatedLabel 
          name="Tulip Bouquet" 
          materialId="mat-tulip-bouquet" 
          position={[-1.4, 0.52, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.5}
          stemHeight={0.08} 
        />

        {/* 4. Golden Sunshine & Chamomile Bouquet (Mid-Right - Low) */}
        <AestheticFlowerBouquet flowerType="sunflower" wrapStyle="kraft" position={[1.4, 0.04, 0]} scale={0.75} />
        <Aesthetic3DAnimatedLabel 
          name="Sunflowers" 
          materialId="mat-sunflower-bouquet" 
          position={[1.4, 0.52, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.7}
          stemHeight={0.08} 
        />

        {/* 5. Luxury Atelier Peony & Blossom Vase Bouquet (Right - High) */}
        <AestheticFlowerBouquet flowerType="peony" wrapStyle="vase" position={[2.8, 0.04, 0]} scale={0.72} />
        <Aesthetic3DAnimatedLabel 
          name="Peony Vase" 
          materialId="mat-peony-bouquet" 
          position={[2.8, 1.05, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.9}
          stemHeight={0.26} 
        />
      </group>

      {/* =========================================================================
          SHELF TIER 2 (MID FLOATING SHELF - y = 3.8): HOTWHEELS & WOODEN GIFT BOXES
          ========================================================================= */}
      <group position={[0, 3.8, 0.5]}>
        <mesh material={materials.interiorFloor} position={[0, 0, 0]}>
          <boxGeometry args={[8.2, 0.07, 0.75]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0.38]}>
          <boxGeometry args={[8.22, 0.08, 0.03]} />
        </mesh>
        {/* Under-shelf LED Strip */}
        <mesh material={materials.ledStripGlow} position={[0, -0.04, 0.2]}>
          <boxGeometry args={[8.0, 0.015, 0.04]} />
        </mesh>

        {/* 1. HOTWHEELS SPORTS CARS SECTION */}
        <group position={[-2.6, 0.04, 0]}>
          <mesh material={materials.glass} position={[0, 0.03, 0]}>
            <boxGeometry args={[2.2, 0.04, 0.55]} />
          </mesh>
          <HotwheelsCar position={[-0.7, 0.06, 0]} color="red" />
          <HotwheelsCar position={[-0.25, 0.06, 0]} color="blue" />
          <HotwheelsCar position={[0.25, 0.06, 0]} color="gold" />
          <HotwheelsCar position={[0.7, 0.06, 0]} color="green" />
        </group>
        <Aesthetic3DAnimatedLabel 
          name="Hot Wheels Cars" 
          materialId="mat-hotwheels" 
          position={[-2.6, 0.75, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.2} 
        />

        {/* 2. MINIMALIST KRAFT RIBBON GIFT BOX (Center - Slightly Raised) */}
        <AestheticGiftBox style="kraftMinimal" position={[0, 0.04, 0]} scale={0.78} />
        <Aesthetic3DAnimatedLabel 
          name="Kraft Gift Box" 
          materialId="mat-kraft-box" 
          position={[0, 0.85, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.4}
          stemHeight={0.16} 
        />

        {/* 3. TRADITIONAL HEIRLOOM WOODEN GIFT BOXES */}
        <group position={[2.4, 0.04, 0]}>
          <WoodenGiftBox position={[-0.6, 0.02, 0]} size={[0.65, 0.42, 0.46]} woodType="mahogany" hasCurvedLid={true} />
          <WoodenGiftBox position={[0.15, 0.02, 0]} size={[0.5, 0.34, 0.4]} woodType="teak" />
          <WoodenGiftBox position={[0.8, 0.02, 0]} size={[0.38, 0.26, 0.32]} woodType="rosewood" hasCurvedLid={true} />
        </group>
        <Aesthetic3DAnimatedLabel 
          name="Carved Boxes" 
          materialId="mat-wooden-box" 
          position={[2.4, 0.75, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.6} 
        />
      </group>

      {/* =========================================================================
          MAIN CREDENZA COUNTER DISPLAY (y = 2.3)
          Smart Zig-Zag Altitude (High, Low, Apex, Low, High) - 0.55m vertical clearance
          ========================================================================= */}
      {/* 1. MULTI-COLOR WRAPPING PAPERS & SHEETS STATION (High) */}
      <group position={[-2.9, 2.3, 0.6]}>
        <WrappingPaperStation />
        <Aesthetic3DAnimatedLabel 
          name="Wrapping Paper" 
          materialId="mat-wrapping-paper" 
          position={[0, 1.08, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.1}
          stemHeight={0.28} 
        />
      </group>

      {/* 2. PASTEL SILK RIBBON STACKED GIFT BOXES (Low) */}
      <group position={[-1.4, 2.3, 0.6]}>
        <AestheticGiftBox style="stackedPastel" position={[0, 0.02, 0]} scale={0.75} />
        <Aesthetic3DAnimatedLabel 
          name="Pastel Boxes" 
          materialId="mat-stacked-box" 
          position={[0, 0.54, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.3}
          stemHeight={0.08} 
        />
      </group>

      {/* 3. CENTER: SIGNATURE LUXE HAMPER (Apex Center) */}
      <group position={[0, 2.3, 0.6]}>
        <WoodenGiftBox position={[0, 0.02, 0]} size={[1.5, 0.35, 0.95]} woodType="teak" />
        <TeddyBear position={[-0.4, 0.28, 0.05]} scale={0.62} furColor="blush" bowColor="gold" rotation={[0, 0.2, 0]} />
        <TeddyBear position={[-0.1, 0.28, -0.05]} scale={0.58} furColor="honey" bowColor="lavender" rotation={[0, -0.2, 0]} />
        <ChocolateDisplay position={[0.38, 0.28, 0]} />
        <Aesthetic3DAnimatedLabel 
          name="Luxe Hamper" 
          materialId="mat-curated-hamper" 
          position={[0, 1.20, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.5}
          stemHeight={0.34} 
        />
      </group>

      {/* 4. VINTAGE FLORAL BOTANICAL PACKAGING BOX (Low) */}
      <group position={[1.4, 2.3, 0.6]}>
        <AestheticGiftBox style="floralPattern" position={[0, 0.02, 0]} scale={0.8} />
        <Aesthetic3DAnimatedLabel 
          name="Botanical Box" 
          materialId="mat-botanical-box" 
          position={[0, 0.54, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.7}
          stemHeight={0.08} 
        />
      </group>

      {/* 5. TRADITIONAL WOODEN CHESTS (High) */}
      <group position={[2.9, 2.3, 0.6]}>
        <WoodenGiftBox position={[-0.35, 0.02, -0.1]} size={[0.75, 0.48, 0.5]} woodType="darkCarved" hasCurvedLid={true} />
        <WoodenGiftBox position={[0.45, 0.02, 0.05]} size={[0.58, 0.38, 0.42]} woodType="mahogany" />
        <Aesthetic3DAnimatedLabel 
          name="Carved Chests" 
          materialId="mat-wooden-box" 
          position={[0, 1.08, 0.2]} 
          onSelect={onSelectItem} 
          floatOffset={0.9}
          stemHeight={0.28} 
        />
      </group>
    </group>
  );
}
