import React from 'react';
import * as THREE from 'three';
import { materials } from '../materials/materials';
import { 
  TeddyBear,
  NecklaceDisplayStand,
  EarringDisplayStand,
  HotwheelsCarRack,
  ScrunchiesAndHairbandsStand,
  BraceletDisplayStand,
  SunglassesDisplay,
  SkincareFaceMasksRack,
  CleansingWetWipesPack
} from './Decorations';
import { Aesthetic3DAnimatedLabel } from './Aesthetic3DAnimatedLabel';

interface LeftWallRacksProps {
  onSelectItem: (materialId: string) => void;
}

// 3D Woven Wicker Basket with Linen Lining
function WickerBasket({ 
  size = [1.2, 0.35, 0.9], 
  position = [0, 0, 0] 
}: { 
  size?: [number, number, number]; 
  position?: [number, number, number];
}) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      <mesh material={materials.wickerBasket} position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>
      <mesh material={materials.basketLining} position={[0, h / 2 + 0.02, 0]}>
        <boxGeometry args={[w - 0.06, h, d - 0.06]} />
      </mesh>
      <mesh material={materials.gold} position={[0, h, 0]}>
        <boxGeometry args={[w + 0.03, 0.03, d + 0.03]} />
      </mesh>
    </group>
  );
}

// 3D Insulated Thermal Tumbler
function RealisticTumbler({ 
  position = [0, 0, 0], 
  bodyColor = '#E8B4B8' 
}: { 
  position?: [number, number, number]; 
  bodyColor?: string;
}) {
  const powderCoatMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(bodyColor),
    roughness: 0.45,
    metalness: 0.15,
  });

  return (
    <group position={position}>
      <mesh material={powderCoatMat} position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.1, 0.7, 24]} />
      </mesh>
      <mesh material={materials.steel} position={[0, 0.71, 0]}>
        <cylinderGeometry args={[0.132, 0.132, 0.04, 24]} />
      </mesh>
      <mesh material={materials.glass} position={[0, 0.74, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.03, 24]} />
      </mesh>
      <mesh material={materials.glass} position={[0.04, 0.88, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 12]} />
      </mesh>
      <mesh material={materials.steel} position={[-0.14, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.16, 0.02, 8, 16]} />
      </mesh>
    </group>
  );
}

// 3D Watch on Velvet Display Pillow
function RealisticWatch({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh material={materials.velvetBlack} position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[0.3, 0.16, 0.3]} />
      </mesh>
      <mesh material={materials.shelfWood} position={[0, 0.09, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.32]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.19, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.03, 24]} />
      </mesh>
      <mesh material={materials.ceramicWhite} position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.01, 24]} />
      </mesh>
      <mesh material={materials.gold} position={[0.12, 0.19, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
      </mesh>
    </group>
  );
}

export function LeftWallRacks({ onSelectItem }: LeftWallRacksProps) {
  const columnCenters = [-3.0, -1.5, 0, 1.5, 3.0];
  const dividers = [-3.75, -2.25, -0.75, 0.75, 2.25, 3.75];
  const shelfYLevels = [0.8, 2.0, 3.2, 4.4, 5.6]; // 5 Rack levels

  return (
    <group position={[-5.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Backing Boutique Walnut Wall Panel */}
      <mesh material={materials.shelfWood} position={[0, 3.4, -0.2]}>
        <boxGeometry args={[8.0, 6.8, 0.12]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 3.4, -0.14]}>
        <boxGeometry args={[8.1, 6.9, 0.02]} />
      </mesh>

      {/* 6 Vertical Column Dividers */}
      {dividers.map((x, idx) => (
        <mesh key={idx} material={materials.shelfDivider} position={[x, 3.2, 0.45]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 6.0, 1.25]} />
        </mesh>
      ))}

      {/* 5 Horizontal Shelves with LED Lighting */}
      {shelfYLevels.map((y, idx) => (
        <group key={idx} position={[0, y, 0.45]}>
          <mesh material={materials.shelfWood} castShadow receiveShadow>
            <boxGeometry args={[7.8, 0.08, 1.25]} />
          </mesh>
          <mesh material={materials.gold} position={[0, 0, 0.63]}>
            <boxGeometry args={[7.82, 0.085, 0.03]} />
          </mesh>
          <mesh material={materials.ledStripGlow} position={[0, -0.045, 0.2]}>
            <boxGeometry args={[7.6, 0.015, 0.05]} />
          </mesh>
          <pointLight position={[0, -0.2, 0.3]} intensity={0.65} distance={2.5} color="#FFE6C7" />
        </group>
      ))}

      {/* Top Cap Board */}
      <mesh material={materials.shelfWood} position={[0, 6.3, 0.45]}>
        <boxGeometry args={[7.8, 0.1, 1.25]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 6.3, 1.08]}>
        <boxGeometry args={[7.82, 0.1, 0.03]} />
      </mesh>

      {/* =========================================================================
          LEVEL 5 (TOP RACK - y = 5.6): TUMBLERS & DESIGNER SUNGLASSES (GOGGLES)
          ========================================================================= */}
      <group position={[0, 5.68, 0.45]}>
        {/* Bay 1: Thermal Tumblers */}
        <group position={[columnCenters[0], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <RealisticTumbler position={[-0.22, 0.05, 0]} bodyColor="#E8B4B8" />
          <RealisticTumbler position={[0.22, 0.05, 0]} bodyColor="#C9A66B" />
        </group>

        {/* Bay 2: Lilac & Powder Blue Tumblers */}
        <group position={[columnCenters[1], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <RealisticTumbler position={[-0.22, 0.05, 0]} bodyColor="#C9B8E8" />
          <RealisticTumbler position={[0.22, 0.05, 0]} bodyColor="#A9C6D9" />
        </group>

        {/* Bay 3 (Center): DESIGNER SUNGLASSES (GOGGLES) STAND */}
        <group position={[columnCenters[2], 0, 0]}>
          <SunglassesDisplay position={[0, 0.04, 0]} scale={0.9} />
          <Aesthetic3DAnimatedLabel name="Designer Sunglasses" materialId="mat-sunglasses" position={[0, 0.85, 0.55]} onSelect={onSelectItem} floatOffset={0.2} />
        </group>

        {/* Bay 4: Emerald & Gold Tumblers */}
        <group position={[columnCenters[3], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <RealisticTumbler position={[-0.22, 0.05, 0]} bodyColor="#4A7C59" />
          <RealisticTumbler position={[0.22, 0.05, 0]} bodyColor="#F3BA2F" />
        </group>

        {/* Bay 5: Champagne Tumblers */}
        <group position={[columnCenters[4], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <RealisticTumbler position={[-0.22, 0.05, 0]} bodyColor="#E6CA65" />
          <RealisticTumbler position={[0.22, 0.05, 0]} bodyColor="#E8B4B8" />
        </group>

        {/* Single Centered Aesthetic Label for the Drinkware Shelf */}
        <Aesthetic3DAnimatedLabel name="Insulated Tumblers" materialId="mat-tumbler" position={[-2.25, 0.85, 0.55]} onSelect={onSelectItem} floatOffset={0.5} />
      </group>

      {/* =========================================================================
          LEVEL 4 (y = 4.4): NECKLACES, EARRINGS, BRACELETS, WATCHES & BELTS
          Smart Altitude Staggering (High, Low, High, Low, High) - 0.40m separation
          ========================================================================= */}
      <group position={[0, 4.48, 0.45]}>
        {/* Bay 1: NECKLACE STAND WITH A LOT OF NECKLACES (High) */}
        <group position={[columnCenters[0], 0, 0]}>
          <NecklaceDisplayStand position={[0, 0.02, 0]} scale={0.88} />
          <Aesthetic3DAnimatedLabel 
            name="Necklaces" 
            materialId="mat-necklace" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.1}
            stemHeight={0.24} 
          />
        </group>

        {/* Bay 2: EARRING STAND WITH A LOT OF EARRINGS (Low) */}
        <group position={[columnCenters[1], 0, 0]}>
          <EarringDisplayStand position={[0, 0.02, 0]} scale={0.92} />
          <Aesthetic3DAnimatedLabel 
            name="Earrings" 
            materialId="mat-earring" 
            position={[0, 0.55, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.3}
            stemHeight={0.08} 
          />
        </group>

        {/* Bay 3: BRACELETS T-BAR STAND (High) */}
        <group position={[columnCenters[2], 0, 0]}>
          <BraceletDisplayStand position={[0, 0.04, 0]} scale={0.92} />
          <Aesthetic3DAnimatedLabel 
            name="Bracelets" 
            materialId="mat-bracelet" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.5}
            stemHeight={0.24} 
          />
        </group>

        {/* Bay 4: LUXURY WATCHES ON VELVET PILLOWS (Low) */}
        <group position={[columnCenters[3], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <RealisticWatch position={[-0.26, 0.06, 0]} />
          <RealisticWatch position={[0.26, 0.06, 0]} />
          <Aesthetic3DAnimatedLabel 
            name="Watches" 
            materialId="mat-watch" 
            position={[0, 0.55, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.7}
            stemHeight={0.08} 
          />
        </group>

        {/* Bay 5: COILED LEATHER WAIST BELTS WITH BUCKLES (High) */}
        <group position={[columnCenters[4], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          {[-0.26, 0.26].map((bx, idx) => (
            <group key={idx} position={[bx, 0.12, 0]}>
              <mesh material={idx === 0 ? materials.leatherCognac : materials.leatherBlack} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.15, 0.15, 0.14, 20]} />
              </mesh>
              <mesh material={materials.gold} position={[0, 0.08, 0.12]}>
                <boxGeometry args={[0.1, 0.08, 0.03]} />
              </mesh>
            </group>
          ))}
          <Aesthetic3DAnimatedLabel 
            name="Waist Belts" 
            materialId="mat-belt" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.9}
            stemHeight={0.24} 
          />
        </group>
      </group>

      {/* =========================================================================
          LEVEL 3 (y = 3.2): HOTWHEELS RACK, SCRUNCHIES, FACE MASKS, WIPES & SMALL TEDDY
          Smart Altitude Staggering (High, Low, High, Low, High) - 0.40m separation
          ========================================================================= */}
      <group position={[0, 3.28, 0.45]}>
        {/* Bay 1: HOTWHEELS CAR COLLECTOR RACK (High) */}
        <group position={[columnCenters[0], 0, 0]}>
          <HotwheelsCarRack position={[0, 0.02, 0]} scale={0.88} />
          <Aesthetic3DAnimatedLabel 
            name="Hot Wheels" 
            materialId="mat-hotwheels" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.2}
            stemHeight={0.24} 
          />
        </group>

        {/* Bay 2: SCRUNCHIES & HAIRBANDS TOWER STAND (Low) */}
        <group position={[columnCenters[1], 0, 0]}>
          <ScrunchiesAndHairbandsStand position={[0, 0.02, 0]} scale={0.88} />
          <Aesthetic3DAnimatedLabel 
            name="Scrunchies" 
            materialId="mat-scrunchies" 
            position={[0, 0.55, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.4}
            stemHeight={0.08} 
          />
        </group>

        {/* Bay 3: SKINCARE FACE MASKS (Tiered Sachet Pouches - High) */}
        <group position={[columnCenters[2], 0, 0]}>
          <SkincareFaceMasksRack position={[0, 0.04, 0]} scale={0.92} />
          <Aesthetic3DAnimatedLabel 
            name="Face Masks" 
            materialId="mat-facemask" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.6}
            stemHeight={0.24} 
          />
        </group>

        {/* Bay 4: GENTLE CLEANSING WET WIPES PACK (Low) */}
        <group position={[columnCenters[3], 0, 0]}>
          <WickerBasket size={[1.3, 0.2, 0.85]} />
          <CleansingWetWipesPack position={[0, 0.06, 0]} scale={0.95} />
          <Aesthetic3DAnimatedLabel 
            name="Wet Wipes" 
            materialId="mat-wipes" 
            position={[0, 0.55, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={0.8}
            stemHeight={0.08} 
          />
        </group>

        {/* Bay 5: SMALL TEDDY BEARS (Trio of 3 Different Mini Bears - High) */}
        <group position={[columnCenters[4], 0, 0]}>
          <WickerBasket size={[1.3, 0.22, 0.85]} />
          <TeddyBear position={[-0.32, 0.08, 0]} scale={0.42} furColor="babyBlue" bowColor="gold" />
          <TeddyBear position={[0, 0.08, 0.05]} scale={0.4} furColor="blush" bowColor="crimson" />
          <TeddyBear position={[0.32, 0.08, 0]} scale={0.38} furColor="honey" bowColor="lavender" />
          {/* USER REQUEST: "Small Teddy" label */}
          <Aesthetic3DAnimatedLabel 
            name="Small Teddy" 
            materialId="mat-small-teddy" 
            position={[0, 0.95, 0.55]} 
            onSelect={onSelectItem} 
            floatOffset={1.0}
            stemHeight={0.24} 
          />
        </group>
      </group>

      {/* =========================================================================
          LEVEL 2 (y = 2.0): MEDIUM TEDDY BEARS (Clusters of 2-3 Bears!)
          USER REQUEST: "remove all this labels and add label to 3 teddies shelves, big teddy, medium and small."
          ALL individual cubicle labels removed! ONLY ONE SINGLE 3D ANIMATED "Medium Teddy" LABEL!
          ========================================================================= */}
      <group position={[0, 2.08, 0.45]}>
        {/* Bay 1: Trio of White Snow Cream, Baby Blue & Blush Pink Bears */}
        <group position={[columnCenters[0], 0, 0]}>
          <WickerBasket size={[1.3, 0.25, 0.85]} />
          <TeddyBear position={[-0.32, 0.08, 0]} scale={0.58} furColor="cream" bowColor="gold" />
          <TeddyBear position={[0, 0.08, 0.06]} scale={0.52} furColor="babyBlue" bowColor="lavender" />
          <TeddyBear position={[0.32, 0.08, -0.04]} scale={0.54} furColor="blush" bowColor="crimson" />
        </group>

        {/* Bay 2: Trio of Pastel Bears (Blush Pink, Honey Amber & Baby Blue) */}
        <group position={[columnCenters[1], 0, 0]}>
          <WickerBasket size={[1.3, 0.25, 0.85]} />
          <TeddyBear position={[-0.32, 0.08, 0]} scale={0.56} furColor="blush" bowColor="emerald" />
          <TeddyBear position={[0, 0.08, 0.06]} scale={0.58} furColor="honey" bowColor="gold" />
          <TeddyBear position={[0.32, 0.08, -0.04]} scale={0.54} furColor="babyBlue" bowColor="crimson" />
        </group>

        {/* Bay 3 (Center): Trio of Classic Bears (Warm Honey, Dark Mocha & Soft Cream) */}
        <group position={[columnCenters[2], 0, 0]}>
          <TeddyBear position={[-0.34, 0.08, 0]} scale={0.64} furColor="honey" bowColor="emerald" />
          <TeddyBear position={[0, 0.08, 0.08]} scale={0.62} furColor="cream" bowColor="gold" />
          <TeddyBear position={[0.34, 0.08, -0.04]} scale={0.6} furColor="mocha" bowColor="lavender" />
        </group>

        {/* Bay 4: Trio of Mocha Chocolate, Powder Blush & Caramel Bears */}
        <group position={[columnCenters[3], 0, 0]}>
          <TeddyBear position={[-0.32, 0.08, 0]} scale={0.65} furColor="mocha" bowColor="gold" />
          <TeddyBear position={[0, 0.08, 0.08]} scale={0.58} furColor="blush" bowColor="crimson" />
          <TeddyBear position={[0.32, 0.08, -0.04]} scale={0.56} furColor="honey" bowColor="emerald" />
        </group>

        {/* Bay 5: Trio of Soft Powder Boutique Bears (Blush, Baby Blue & Cream) */}
        <group position={[columnCenters[4], 0, 0]}>
          <TeddyBear position={[-0.32, 0.08, 0]} scale={0.62} furColor="blush" bowColor="crimson" />
          <TeddyBear position={[0, 0.08, 0.08]} scale={0.6} furColor="babyBlue" bowColor="gold" />
          <TeddyBear position={[0.32, 0.08, -0.04]} scale={0.54} furColor="cream" bowColor="lavender" />
        </group>

        {/* SINGLE 3D AESTHETIC ANIMATED LABEL FOR THE ENTIRE MEDIUM TEDDY SHELF */}
        <Aesthetic3DAnimatedLabel 
          name="Medium Teddy" 
          materialId="mat-teddy" 
          position={[0, 1.15, 0.65]} 
          onSelect={onSelectItem} 
          floatOffset={0.4}
          stemHeight={0.25} 
        />
      </group>

      {/* =========================================================================
          LEVEL 1 (LOWER RACK - y = 0.8): BIG TEDDY BEARS
          USER REQUEST: "remove all this labels and add label to 3 teddies shelves, big teddy, medium and small."
          ALL individual cubicle labels removed! ONLY ONE SINGLE 3D ANIMATED "Big Teddy" LABEL!
          ========================================================================= */}
      <group position={[0, 0.88, 0.45]}>
        {/* Bay 1: Caramel Honey Giant Bear with Cream Companion */}
        <group position={[columnCenters[0], 0, 0]}>
          <TeddyBear position={[-0.26, 0.05, -0.04]} scale={0.74} furColor="honey" bowColor="lavender" />
          <TeddyBear position={[0.26, 0.05, 0.04]} scale={0.64} furColor="cream" bowColor="crimson" />
        </group>

        {/* Bay 2: Big Snowy Cream Bear nestled with Blush Pink Bear */}
        <group position={[columnCenters[1], 0, 0]}>
          <TeddyBear position={[-0.26, 0.05, -0.04]} scale={0.76} furColor="cream" bowColor="crimson" />
          <TeddyBear position={[0.26, 0.05, 0.04]} scale={0.65} furColor="blush" bowColor="gold" />
        </group>

        {/* Bay 3 (Center): Giant Royal Mocha Bear with Honey and Blush Friends */}
        <group position={[columnCenters[2], 0, 0]}>
          <TeddyBear position={[0, 0.05, 0.08]} scale={0.82} furColor="mocha" bowColor="gold" />
          <TeddyBear position={[-0.36, 0.05, -0.06]} scale={0.68} furColor="honey" bowColor="emerald" />
          <TeddyBear position={[0.36, 0.05, -0.06]} scale={0.64} furColor="cream" bowColor="lavender" />
        </group>

        {/* Bay 4: Big Pastel Blush Bear with Mocha Friend */}
        <group position={[columnCenters[3], 0, 0]}>
          <TeddyBear position={[-0.26, 0.05, -0.04]} scale={0.74} furColor="blush" bowColor="emerald" />
          <TeddyBear position={[0.26, 0.05, 0.04]} scale={0.65} furColor="mocha" bowColor="gold" />
        </group>

        {/* Bay 5: Big Powder Blue Bear with Honey Caramel Friend */}
        <group position={[columnCenters[4], 0, 0]}>
          <TeddyBear position={[-0.26, 0.05, -0.04]} scale={0.74} furColor="babyBlue" bowColor="gold" />
          <TeddyBear position={[0.26, 0.05, 0.04]} scale={0.65} furColor="honey" bowColor="lavender" />
        </group>

        {/* SINGLE 3D AESTHETIC ANIMATED LABEL FOR THE ENTIRE BIG TEDDY SHELF */}
        <Aesthetic3DAnimatedLabel 
          name="Big Teddy" 
          materialId="mat-big-teddy" 
          position={[0, 1.15, 0.65]} 
          onSelect={onSelectItem} 
          floatOffset={0.8}
          stemHeight={0.25} 
        />
      </group>
    </group>
  );
}
