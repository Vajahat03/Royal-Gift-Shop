import React from 'react';
import * as THREE from 'three';
import { materials } from '../materials/materials';

// ============================================================================
// 1. UNIQUE MULTI-COLORED TEDDY BEAR (Diverse Fur Tones, Unique Sizes & Bows)
// ============================================================================
export interface TeddyBearProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  furColor?: 'honey' | 'cream' | 'blush' | 'mocha' | 'babyBlue' | 'classic';
  bowColor?: 'gold' | 'lavender' | 'blush' | 'crimson' | 'emerald';
}

export function TeddyBear({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  furColor = 'honey',
  bowColor = 'lavender'
}: TeddyBearProps) {
  // Determine plush fur material
  const furMat = 
    furColor === 'cream' ? materials.teddyCream :
    furColor === 'blush' ? materials.teddyPink :
    furColor === 'mocha' ? materials.teddyMocha :
    furColor === 'babyBlue' ? materials.teddyBlue :
    furColor === 'classic' ? materials.teddyFur :
    materials.teddyHoney;

  // Snout is soft complementary tone
  const snoutMat = furColor === 'mocha' ? materials.teddyHoney : materials.teddySnout;

  // Ribbon bow material
  const ribbonMat = 
    bowColor === 'gold' ? materials.ribbonGold :
    bowColor === 'blush' ? materials.giftBlush :
    bowColor === 'crimson' ? materials.crownVelvet :
    bowColor === 'emerald' ? materials.wrapEmeraldGold :
    materials.giftLavender;

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* Torso */}
      <mesh material={furMat} position={[0, 0.38, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.3, 20, 20]} />
      </mesh>
      {/* Soft Tummy Patch */}
      <mesh material={snoutMat} position={[0, 0.38, 0.15]}>
        <sphereGeometry args={[0.2, 16, 16]} />
      </mesh>

      {/* Head */}
      <mesh material={furMat} position={[0, 0.78, 0]} castShadow>
        <sphereGeometry args={[0.25, 20, 20]} />
      </mesh>

      {/* Snout Muzzle */}
      <mesh material={snoutMat} position={[0, 0.73, 0.18]}>
        <sphereGeometry args={[0.11, 16, 16]} />
      </mesh>
      {/* Embroidered Nose */}
      <mesh material={materials.teddyEyes} position={[0, 0.78, 0.27]}>
        <sphereGeometry args={[0.035, 12, 12]} />
      </mesh>

      {/* Realistic Glass Bead Eyes */}
      <mesh material={materials.teddyEyes} position={[-0.08, 0.83, 0.2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
      </mesh>
      <mesh material={materials.teddyEyes} position={[0.08, 0.83, 0.2]}>
        <sphereGeometry args={[0.028, 12, 12]} />
      </mesh>

      {/* Ears with Inset */}
      <group position={[-0.17, 0.95, 0]}>
        <mesh material={furMat} castShadow>
          <sphereGeometry args={[0.08, 14, 14]} />
        </mesh>
        <mesh material={snoutMat} position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>
      </group>
      <group position={[0.17, 0.95, 0]}>
        <mesh material={furMat} castShadow>
          <sphereGeometry args={[0.08, 14, 14]} />
        </mesh>
        <mesh material={snoutMat} position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.05, 12, 12]} />
        </mesh>
      </group>

      {/* Arms (tucked resting forward on lap) */}
      <mesh material={furMat} position={[-0.22, 0.42, 0.12]} rotation={[0.6, 0.2, 0.2]} castShadow>
        <capsuleGeometry args={[0.075, 0.22, 6, 12]} />
      </mesh>
      <mesh material={furMat} position={[0.22, 0.42, 0.12]} rotation={[0.6, -0.2, -0.2]} castShadow>
        <capsuleGeometry args={[0.075, 0.22, 6, 12]} />
      </mesh>

      {/* Sitting Legs */}
      <mesh material={furMat} position={[-0.18, 0.15, 0.18]} rotation={[1.2, 0, 0.15]} castShadow>
        <capsuleGeometry args={[0.085, 0.24, 6, 12]} />
      </mesh>
      <mesh material={furMat} position={[0.18, 0.15, 0.18]} rotation={[1.2, 0, -0.15]} castShadow>
        <capsuleGeometry args={[0.085, 0.24, 6, 12]} />
      </mesh>

      {/* Paw Pads */}
      <mesh material={snoutMat} position={[-0.18, 0.17, 0.32]}>
        <circleGeometry args={[0.05, 12]} />
      </mesh>
      <mesh material={snoutMat} position={[0.18, 0.17, 0.32]}>
        <circleGeometry args={[0.05, 12]} />
      </mesh>

      {/* Chic Neck Ribbon Bow */}
      <mesh material={ribbonMat} position={[0, 0.62, 0.16]}>
        <boxGeometry args={[0.2, 0.065, 0.06]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.62, 0.19]}>
        <sphereGeometry args={[0.032, 10, 10]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 2. TRADITIONAL WOODEN GIFT BOX (Rich Woods, Brass Clasps & Corner Trim)
// ============================================================================
export interface WoodenGiftBoxProps {
  position?: [number, number, number];
  size?: [number, number, number];
  woodType?: 'mahogany' | 'teak' | 'rosewood' | 'darkCarved';
  hasCurvedLid?: boolean;
  rotation?: [number, number, number];
}

export function WoodenGiftBox({
  position = [0, 0, 0],
  size = [0.8, 0.5, 0.6],
  woodType = 'mahogany',
  hasCurvedLid = false,
  rotation = [0, 0, 0]
}: WoodenGiftBoxProps) {
  const [w, h, d] = size;
  const woodMat = 
    woodType === 'teak' ? materials.woodTeak :
    woodType === 'rosewood' ? materials.woodRosewood :
    woodType === 'darkCarved' ? materials.woodCarvedDark :
    materials.woodMahogany;

  return (
    <group position={position} rotation={rotation}>
      {/* Box Base (Carved Solid Wood) */}
      <mesh material={woodMat} position={[0, h * 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h * 0.9, d]} />
      </mesh>

      {/* Lid (Overlapping carved wood rim) */}
      {hasCurvedLid ? (
        // Traditional pirate/chest style rounded lid
        <group position={[0, h * 0.9, 0]}>
          <mesh material={woodMat} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[d * 0.5, d * 0.5, w + 0.02, 24, 1, false, 0, Math.PI]} />
          </mesh>
          {/* Brass Arch Ribs across lid */}
          {[-w * 0.35, 0, w * 0.35].map((x, i) => (
            <mesh key={i} material={materials.brassAntique} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[d * 0.51, d * 0.51, 0.04, 24, 1, false, 0, Math.PI]} />
            </mesh>
          ))}
        </group>
      ) : (
        // Flat beveled traditional heirloom lid
        <group position={[0, h * 0.92, 0]}>
          <mesh material={woodMat} castShadow>
            <boxGeometry args={[w + 0.04, h * 0.16, d + 0.04]} />
          </mesh>
          {/* Subtle Brass Inlay border around top lid */}
          <mesh material={materials.brassAntique} position={[0, h * 0.08 + 0.005, 0]}>
            <boxGeometry args={[w * 0.75, 0.01, d * 0.75]} />
          </mesh>
        </group>
      )}

      {/* Antique Brass Corner Brackets (All 4 bottom corners) */}
      {[
        [-w / 2, -d / 2],
        [w / 2, -d / 2],
        [-w / 2, d / 2],
        [w / 2, d / 2],
      ].map(([cx, cz], idx) => (
        <group key={idx} position={[cx, 0.1, cz]}>
          <mesh material={materials.brassAntique}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
          </mesh>
        </group>
      ))}

      {/* Antique Front Brass Hasp & Latch */}
      <group position={[0, h * 0.7, d / 2 + 0.02]}>
        <mesh material={materials.brassAntique}>
          <boxGeometry args={[0.08, 0.14, 0.02]} />
        </mesh>
        <mesh material={materials.brassPolished} position={[0, -0.04, 0.015]}>
          <cylinderGeometry args={[0.02, 0.02, 0.05, 12]} />
        </mesh>
      </group>

      {/* Subtle Inlaid Traditional Base Feet */}
      {[
        [-w * 0.4, -d * 0.4],
        [w * 0.4, -d * 0.4],
        [-w * 0.4, d * 0.4],
        [w * 0.4, d * 0.4],
      ].map(([fx, fz], idx) => (
        <mesh key={idx} material={materials.brassAntique} position={[fx, 0.02, fz]}>
          <cylinderGeometry args={[0.035, 0.04, 0.04, 12]} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// 3. JEWELRY BOUQUET (Dedicated Display Stand for Chains & Bracelets)
// ============================================================================
export interface JewelryBouquetProps {
  position?: [number, number, number];
  scale?: number;
}

export function JewelryBouquet({ position = [0, 0, 0], scale = 1 }: JewelryBouquetProps) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Weighted Polished Marble / White Ceramic Pedestal */}
      <mesh material={materials.ceramicWhite} position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.16, 24]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.165, 0]}>
        <cylinderGeometry args={[0.325, 0.325, 0.02, 24]} />
      </mesh>

      {/* Polished Gold Stem Tree Trunk */}
      <mesh material={materials.gold} position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.9, 16]} />
      </mesh>

      {/* Ornate Golden Display Branches (Arching out gracefully) */}
      {[
        { rot: 0, height: 0.85, reach: 0.38 },
        { rot: (Math.PI * 2) / 3, height: 0.95, reach: 0.42 },
        { rot: (Math.PI * 4) / 3, height: 0.78, reach: 0.36 },
        { rot: Math.PI / 4, height: 1.05, reach: 0.3 },
      ].map((branch, idx) => {
        const x = Math.cos(branch.rot) * branch.reach;
        const z = Math.sin(branch.rot) * branch.reach;
        return (
          <group key={idx}>
            {/* Curving Golden Branch */}
            <mesh 
              material={materials.gold} 
              position={[x * 0.5, branch.height - 0.1, z * 0.5]}
              rotation={[0.2 * Math.sin(branch.rot), branch.rot, -0.3]}
            >
              <cylinderGeometry args={[0.025, 0.03, branch.reach * 1.2, 12]} />
            </mesh>
            {/* Delicate Velvet Blossom bud at tip */}
            <mesh material={materials.giftBlush} position={[x, branch.height, z]}>
              <sphereGeometry args={[0.045, 12, 12]} />
            </mesh>

            {/* Draped Shimmering Gold Neck Chain */}
            <group position={[x, branch.height - 0.08, z]} rotation={[0.2, branch.rot, 0]}>
              <mesh material={materials.gold}>
                <torusGeometry args={[0.16, 0.012, 8, 24, Math.PI * 1.5]} />
              </mesh>
              {/* Sparkling Diamond / Rose Pendant Hanging */}
              <mesh material={materials.champagneGold} position={[0, -0.18, 0]}>
                <octahedronGeometry args={[0.045]} />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* Tiered Ring & Bracelet Velvet Cushioned Tiers around base */}
      <group position={[0, 0.32, 0]}>
        <mesh material={materials.velvetBlack} castShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.12, 24]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0, 0]}>
          <torusGeometry args={[0.245, 0.015, 8, 24]} />
        </mesh>
        {/* Layer of stacked bracelets wrapped around cushion */}
        {[-0.03, 0.03].map((y, bIdx) => (
          <mesh 
            key={bIdx} 
            material={bIdx === 0 ? materials.gold : materials.champagneGold} 
            position={[0, y, 0]}
          >
            <torusGeometry args={[0.25, 0.02, 10, 32]} />
          </mesh>
        ))}
      </group>

      {/* Decorative Floral Accent Sprigs nestled at base */}
      {[-0.18, 0.18].map((fx, i) => (
        <group key={i} position={[fx, 0.18, (i % 2 === 0 ? 0.12 : -0.12)]}>
          <mesh material={materials.plantGreen}>
            <sphereGeometry args={[0.06, 8, 8]} />
          </mesh>
          <mesh material={materials.flowerPetals} position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.05, 10, 10]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 4. ROYAL CROWN (3D Imperial Gold Crown with Velvet Cap & Sparkling Gems)
// ============================================================================
export interface RoyalCrownProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function RoyalCrown({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: RoyalCrownProps) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* 1. Base Golden Circlet Band */}
      <mesh material={materials.royalCrownGold} position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.44, 0.18, 32]} />
      </mesh>
      {/* Upper and Lower Golden Beaded Rims */}
      <mesh material={materials.royalCrownGold} position={[0, 0.19, 0]}>
        <torusGeometry args={[0.425, 0.025, 12, 32]} />
      </mesh>
      <mesh material={materials.royalCrownGold} position={[0, 0.01, 0]}>
        <torusGeometry args={[0.445, 0.025, 12, 32]} />
      </mesh>

      {/* 2. Precious Gemstones embedded in golden band */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
        const angle = (idx * Math.PI * 2) / 8;
        const gx = Math.cos(angle) * 0.435;
        const gz = Math.sin(angle) * 0.435;
        const gemMat = idx % 3 === 0 ? materials.gemRuby : idx % 3 === 1 ? materials.gemSapphire : materials.gemEmerald;
        return (
          <mesh key={idx} material={gemMat} position={[gx, 0.1, gz]}>
            <sphereGeometry args={[0.045, 12, 12]} />
          </mesh>
        );
      })}

      {/* 3. Deep Imperial Crimson Velvet Cap inside crown */}
      <mesh material={materials.crownVelvet} position={[0, 0.36, 0]} castShadow>
        <sphereGeometry args={[0.41, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
      </mesh>

      {/* 4. Eight Crown Fleur-de-lis / Crest Points */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
        const angle = (idx * Math.PI * 2) / 8;
        const px = Math.cos(angle) * 0.42;
        const pz = Math.sin(angle) * 0.42;
        return (
          <group key={idx} position={[px, 0.28, pz]} rotation={[0, -angle, 0]}>
            {/* Pointed Fleuron */}
            <mesh material={materials.royalCrownGold} position={[0, 0.08, 0]}>
              <coneGeometry args={[0.065, 0.18, 4]} />
            </mesh>
            {/* Pearl / Gem at the tip */}
            <mesh material={materials.champagneGold} position={[0, 0.18, 0]}>
              <sphereGeometry args={[0.035, 10, 10]} />
            </mesh>
          </group>
        );
      })}

      {/* 5. Golden Arches converging to top Monde & Cross */}
      {[0, Math.PI / 2].map((angle, idx) => (
        <mesh 
          key={idx} 
          material={materials.royalCrownGold} 
          position={[0, 0.44, 0]} 
          rotation={[0, angle, 0]}
        >
          <torusGeometry args={[0.34, 0.022, 10, 24, Math.PI]} />
        </mesh>
      ))}

      {/* Top Golden Monde Orb & Royal Cross */}
      <group position={[0, 0.72, 0]}>
        <mesh material={materials.royalCrownGold}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
        {/* Vertical cross bar */}
        <mesh material={materials.royalCrownGold} position={[0, 0.1, 0]}>
          <boxGeometry args={[0.028, 0.14, 0.028]} />
        </mesh>
        {/* Horizontal cross bar */}
        <mesh material={materials.royalCrownGold} position={[0, 0.11, 0]}>
          <boxGeometry args={[0.09, 0.028, 0.028]} />
        </mesh>
      </group>

      {/* Subtle Warm Regal Radiance light */}
      <pointLight position={[0, 0.5, 0]} intensity={0.9} distance={2.5} color="#FFE182" />
    </group>
  );
}

// ============================================================================
// 5. LUXURY PERFUME COLLECTION (Diverse Flacons, Atomizers, Jewel Tints & Sizes)
// ============================================================================
export interface LuxuryPerfumesProps {
  position?: [number, number, number];
}

export function LuxuryPerfumes({ position = [0, 0, 0] }: LuxuryPerfumesProps) {
  return (
    <group position={position}>
      {/* 1. Tall Emerald Crystal Flacon (Eau de Parfum) */}
      <group position={[-0.7, 0, 0]}>
        <mesh material={materials.glass} position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.26, 0.54, 0.18]} />
        </mesh>
        <mesh material={materials.perfumeEmerald} position={[0, 0.24, 0]}>
          <boxGeometry args={[0.2, 0.44, 0.14]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.59, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        </mesh>
      </group>

      {/* 2. Vintage Bulb Atomizer (Rounded Ribbed Flacon with Fabric Squeeze Bulb) */}
      <group position={[-0.24, 0, 0]}>
        {/* Spherical Crystal Body */}
        <mesh material={materials.glass} position={[0, 0.22, 0]} castShadow>
          <sphereGeometry args={[0.19, 20, 20]} />
        </mesh>
        <mesh material={materials.perfumeAmber} position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
        {/* Gold Spray Atomizer Neck & Nozzle */}
        <mesh material={materials.gold} position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
        </mesh>
        <mesh material={materials.gold} position={[0.08, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.02, 0.08, 12]} />
        </mesh>
        {/* Vintage Silk Squeeze Bulb on side */}
        <mesh material={materials.giftBlush} position={[-0.14, 0.38, 0]} rotation={[0, 0, 0.4]}>
          <sphereGeometry args={[0.07, 14, 14]} />
        </mesh>
      </group>

      {/* 3. Sleek Rose Quartz Square Crystal Bottle */}
      <group position={[0.24, 0, 0]}>
        <mesh material={materials.glass} position={[0, 0.24, 0]} castShadow>
          <boxGeometry args={[0.3, 0.44, 0.3]} />
        </mesh>
        <mesh material={materials.perfumeRose} position={[0, 0.2, 0]}>
          <boxGeometry args={[0.24, 0.34, 0.24]} />
        </mesh>
        {/* Brushed Gold Beveled Stopper Cap */}
        <mesh material={materials.champagneGold} position={[0, 0.51, 0]}>
          <boxGeometry args={[0.16, 0.14, 0.16]} />
        </mesh>
      </group>

      {/* 4. Sapphire Cologne Cylindrical Flacon */}
      <group position={[0.7, 0, 0]}>
        <mesh material={materials.glass} position={[0, 0.26, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.5, 20]} />
        </mesh>
        <mesh material={materials.perfumeSapphire} position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.4, 16]} />
        </mesh>
        <mesh material={materials.steel} position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 6. HOT WHEELS DIE-CAST SPORTS CARS (Display Stand, Blister Packs, Vibrant Finishes)
// ============================================================================
export interface HotwheelsCarProps {
  position?: [number, number, number];
  color?: 'red' | 'blue' | 'gold' | 'green';
  rotation?: [number, number, number];
  showBlisterCard?: boolean;
}

export function HotwheelsCar({
  position = [0, 0, 0],
  color = 'red',
  rotation = [0, 0, 0],
  showBlisterCard = true
}: HotwheelsCarProps) {
  const carMat = 
    color === 'blue' ? materials.hotwheelsBlue :
    color === 'gold' ? materials.hotwheelsGold :
    color === 'green' ? materials.hotwheelsGreen :
    materials.hotwheelsRed;

  return (
    <group position={position} rotation={rotation}>
      {showBlisterCard && (
        <>
          {/* Card Backing */}
          <mesh material={materials.ceramicWhite} position={[0, 0.22, -0.16]} rotation={[0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.56, 0.46, 0.02]} />
          </mesh>
          {/* Graphic flame stripe on blister card */}
          <mesh material={materials.gold} position={[0, 0.32, -0.145]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.48, 0.08, 0.005]} />
          </mesh>
          {/* Transparent Acrylic Blister Bubble */}
          <mesh material={materials.glass} position={[0, 0.1, 0]}>
            <boxGeometry args={[0.48, 0.18, 0.28]} />
          </mesh>
        </>
      )}

      {/* Aerodynamic Sports Car Chassis */}
      <group position={[0, 0.06, 0]}>
        {/* Main Sleek Body */}
        <mesh material={carMat} position={[0, 0.03, 0]} castShadow>
          <boxGeometry args={[0.44, 0.07, 0.2]} />
        </mesh>
        {/* Cockpit Canopy Glass */}
        <mesh material={materials.glass} position={[-0.03, 0.09, 0]}>
          <boxGeometry args={[0.22, 0.065, 0.16]} />
        </mesh>
        {/* Rear Aerodynamic Spoiler Wing */}
        <mesh material={carMat} position={[-0.18, 0.1, 0]}>
          <boxGeometry args={[0.04, 0.015, 0.19]} />
        </mesh>
        {/* Chrome Racing Mag Wheels */}
        {[-0.14, 0.14].map((wx, i) => (
          <React.Fragment key={i}>
            <mesh material={materials.steel} position={[wx, 0.03, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.038, 0.038, 0.024, 16]} />
            </mesh>
            <mesh material={materials.steel} position={[wx, 0.03, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.038, 0.038, 0.024, 16]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 7. MEN'S ACCESSORIES DISPLAY (Watches, Genuine Leather Wallets, Coiled Belts)
// ============================================================================
export interface MensAccessoriesDisplayProps {
  position?: [number, number, number];
}

export function MensAccessoriesDisplay({ position = [0, 0, 0] }: MensAccessoriesDisplayProps) {
  return (
    <group position={position}>
      {/* 1. Luxury Chronograph Watch on Velvet Cushion */}
      <group position={[-0.65, 0, 0]}>
        <mesh material={materials.velvetBlack} position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.34, 0.16, 0.32]} />
        </mesh>
        {/* Cognac Leather Strap */}
        <mesh material={materials.leatherCognac} position={[0, 0.09, 0]}>
          <boxGeometry args={[0.12, 0.18, 0.34]} />
        </mesh>
        {/* Gold Chronograph Casing */}
        <mesh material={materials.gold} position={[0, 0.19, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.11, 0.035, 24]} />
        </mesh>
        {/* Sapphire Crystal Glass Dial */}
        <mesh material={materials.ceramicWhite} position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.01, 24]} />
        </mesh>
      </group>

      {/* 2. Bi-Fold Genuine Leather Wallets (Stitched Cognac & Noir) */}
      <group position={[0, 0, 0]}>
        {/* Cognac Bi-Fold Wallet (slightly angled open) */}
        <group position={[-0.1, 0.04, 0]} rotation={[0, 0.2, 0]}>
          <mesh material={materials.leatherCognac} castShadow>
            <boxGeometry args={[0.38, 0.05, 0.28]} />
          </mesh>
          {/* Polished Metal Logo Plate */}
          <mesh material={materials.gold} position={[0.12, 0.028, 0.08]}>
            <boxGeometry args={[0.05, 0.005, 0.03]} />
          </mesh>
        </group>
        {/* Sleek Black Leather Slim Cardholder stacked beneath */}
        <group position={[0.16, 0.03, 0.04]} rotation={[0, -0.15, 0]}>
          <mesh material={materials.leatherBlack} castShadow>
            <boxGeometry args={[0.34, 0.035, 0.24]} />
          </mesh>
        </group>
      </group>

      {/* 3. Coiled Leather Dress Belts with Polished Buckles */}
      <group position={[0.65, 0, 0]}>
        {/* Belt 1: Rich Brown Leather Coil */}
        <group position={[-0.14, 0.09, 0]}>
          <mesh material={materials.leatherCognac} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.16, 0.16, 0.14, 24]} />
          </mesh>
          {/* Polished Gold Rectangular Buckle */}
          <mesh material={materials.gold} position={[0, 0.08, 0.13]}>
            <boxGeometry args={[0.1, 0.08, 0.03]} />
          </mesh>
        </group>
        {/* Belt 2: Midnight Black Leather Coil */}
        <group position={[0.16, 0.09, 0]}>
          <mesh material={materials.leatherBlack} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.14, 24]} />
          </mesh>
          {/* Polished Stainless Steel Buckle */}
          <mesh material={materials.steel} position={[0, 0.075, 0.12]}>
            <boxGeometry args={[0.095, 0.075, 0.03]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// ============================================================================
// 8. LUXURY WRAPPING PAPERS & MULTI-COLOR ROLLS/SHEETS
// ============================================================================
export interface WrappingPaperStationProps {
  position?: [number, number, number];
}

export function WrappingPaperStation({ position = [0, 0, 0] }: WrappingPaperStationProps) {
  const paperRolls = [
    materials.wrapEmeraldGold,
    materials.wrapRoyalNavy,
    materials.wrapBurgundy,
    materials.wrapChampagne,
    materials.wrapLilac,
    materials.giftBlush,
  ];

  return (
    <group position={position}>
      {/* 1. Multi-Tier Brass Rack Stand */}
      <mesh material={materials.gold} position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[1.8, 0.06, 0.45]} />
      </mesh>
      {/* Vertical Support Struts */}
      {[-0.85, 0.85].map((sx, i) => (
        <mesh key={i} material={materials.gold} position={[sx, 0.8, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 12]} />
        </mesh>
      ))}

      {/* 2. Vertical Paper Rolls with Different Colors & Foil Accents */}
      {[-0.65, -0.38, -0.12, 0.14, 0.4, 0.66].map((rx, idx) => (
        <group key={idx} position={[rx, 0.8, 0]}>
          {/* Main Paper Roll */}
          <mesh material={paperRolls[idx % paperRolls.length]} castShadow>
            <cylinderGeometry args={[0.095, 0.095, 1.5, 20]} />
          </mesh>
          {/* Foil Accent Band */}
          <mesh material={materials.gold} position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.098, 0.098, 0.08, 20]} />
          </mesh>
        </group>
      ))}

      {/* 3. Hanging Display Sheets / Cut Wrapping Sheets on horizontal dowel */}
      <group position={[0, 0.35, 0.18]}>
        <mesh material={materials.gold} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.015, 0.015, 1.7, 12]} />
        </mesh>
        {/* Curving Draped Paper Sheets with varied patterns */}
        {[-0.5, 0, 0.5].map((hx, idx) => (
          <mesh 
            key={idx} 
            material={paperRolls[(idx * 2) % paperRolls.length]} 
            position={[hx, -0.22, 0]} 
            rotation={[0.1, 0, 0]}
          >
            <boxGeometry args={[0.42, 0.45, 0.01]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 9. ORIGINAL DECORATIVE HELPERS (GiftBox, FlowerBouquet, Chocolates, Topiary)
// ============================================================================
export function GiftBox({
  position = [0, 0, 0],
  size = [1, 1, 1],
  boxColor = 'blush',
  rotation = [0, 0, 0]
}: {
  position?: [number, number, number];
  size?: [number, number, number];
  boxColor?: 'blush' | 'lavender' | 'purple';
  rotation?: [number, number, number];
}) {
  const boxMat =
    boxColor === 'blush' ? materials.giftBlush :
    boxColor === 'lavender' ? materials.giftLavender :
    materials.giftPurple;

  const [w, h, d] = size;

  return (
    <group position={position} rotation={rotation}>
      <mesh material={boxMat} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>
      <mesh material={boxMat} position={[0, h * 0.42, 0]} castShadow>
        <boxGeometry args={[w + 0.04, h * 0.22, d + 0.04]} />
      </mesh>
      <mesh material={materials.gold} position={[0, h * 0.52, 0]}>
        <boxGeometry args={[w + 0.045, 0.02, d + 0.045]} />
      </mesh>
      <mesh material={materials.ribbonGold} position={[0, 0, 0]}>
        <boxGeometry args={[w + 0.06, h * 0.16, d + 0.06]} />
      </mesh>
      <mesh material={materials.ribbonGold} position={[0, 0, 0]}>
        <boxGeometry args={[w * 0.16, h + 0.06, d + 0.06]} />
      </mesh>
      <group position={[0, h / 2 + 0.09, 0]}>
        <mesh material={materials.ribbonGold} position={[-0.1, 0.04, 0]} rotation={[0, 0, 0.35]}>
          <torusGeometry args={[0.1, 0.035, 10, 20]} />
        </mesh>
        <mesh material={materials.ribbonGold} position={[0.1, 0.04, 0]} rotation={[0, 0, -0.35]}>
          <torusGeometry args={[0.1, 0.035, 10, 20]} />
        </mesh>
        <mesh material={materials.ribbonGold}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export function FlowerBouquet({
  position = [0, 0, 0],
  scale = 1
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      <mesh material={materials.ceramicWhite} position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.22, 0.64, 20]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.64, 0]}>
        <torusGeometry args={[0.165, 0.018, 8, 24]} />
      </mesh>
      <mesh material={materials.plantGreen} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.32, 16, 16]} />
      </mesh>
      {[-0.12, 0, 0.12].map((x, i) => (
        <group key={i} position={[x, 0.9 + (i % 2) * 0.08, (i - 1) * 0.1]}>
          <mesh material={materials.flowerPetals}>
            <sphereGeometry args={[0.11, 12, 12]} />
          </mesh>
        </group>
      ))}
      <mesh material={materials.flowerPetals} position={[0.08, 1.05, 0.04]}>
        <sphereGeometry args={[0.12, 12, 12]} />
      </mesh>
      <mesh material={materials.giftLavender} position={[-0.08, 1.0, -0.04]}>
        <sphereGeometry args={[0.11, 12, 12]} />
      </mesh>
    </group>
  );
}

export function ChocolateDisplay({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh material={materials.gold} position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.8, 0.03, 0.55]} />
      </mesh>
      {[-0.22, 0, 0.22].map((x, i) => (
        <React.Fragment key={i}>
          <mesh material={materials.chocolate} position={[x, 0.07, -0.1]} castShadow>
            <cylinderGeometry args={[0.065, 0.075, 0.07, 12]} />
          </mesh>
          <mesh material={materials.champagneGold} position={[x, 0.08, 0.1]} castShadow>
            <sphereGeometry args={[0.065, 12, 12]} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

export function TopiaryPlanter({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh material={materials.ceramicWhite} position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.22, 0.7, 20]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.69, 0]}>
        <torusGeometry args={[0.305, 0.02, 8, 24]} />
      </mesh>
      <mesh material={materials.foundation} position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
      </mesh>
      <mesh material={materials.plantGreen} position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.42, 18, 18]} />
      </mesh>
      <mesh material={materials.plantGreen} position={[0, 1.85, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 10. AESTHETIC FLOWER BOUQUETS (Inspired by Image 3: Roses, Tulips, Sunflowers, Peonies)
// ============================================================================
export interface AestheticFlowerBouquetProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  flowerType?: 'rose' | 'tulip' | 'sunflower' | 'peony' | 'vase';
  wrapStyle?: 'kraft' | 'blush' | 'navy' | 'vase';
}

export function AestheticFlowerBouquet({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  flowerType = 'rose',
  wrapStyle = 'kraft'
}: AestheticFlowerBouquetProps) {
  const wrapMat = 
    wrapStyle === 'blush' ? materials.floristBlushWrap :
    wrapStyle === 'navy' ? materials.floristNavyWrap :
    materials.kraftPaper;

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {wrapStyle === 'vase' ? (
        // Elegant Fluted Ceramic Vase with Gold Trim
        <group position={[0, 0.32, 0]}>
          <mesh material={materials.ceramicWhite} castShadow>
            <cylinderGeometry args={[0.16, 0.22, 0.64, 20]} />
          </mesh>
          <mesh material={materials.gold} position={[0, 0.32, 0]}>
            <torusGeometry args={[0.165, 0.018, 8, 24]} />
          </mesh>
        </group>
      ) : (
        // Florist Paper Cone Wrap with Folded Collar & Satin Bow
        <group position={[0, 0.32, 0]}>
          {/* Main Tapered Paper Sleeve */}
          <mesh material={wrapMat} castShadow>
            <cylinderGeometry args={[0.32, 0.1, 0.64, 20]} />
          </mesh>
          {/* Flared Origami Collar Fold */}
          <mesh material={wrapMat} position={[0, 0.25, 0]} rotation={[0.08, 0, 0.05]}>
            <cylinderGeometry args={[0.38, 0.3, 0.16, 20]} />
          </mesh>
          {/* Tied Satin Ribbon Band & Bow */}
          <mesh material={materials.satinRibbonChampagne} position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.19, 0.19, 0.04, 16]} />
          </mesh>
          <mesh material={materials.satinRibbonChampagne} position={[0, -0.06, 0.18]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.07, 0.02, 8, 16]} />
          </mesh>
          <mesh material={materials.satinRibbonChampagne} position={[0, -0.06, 0.18]} rotation={[0, 0, -Math.PI / 4]}>
            <torusGeometry args={[0.07, 0.02, 8, 16]} />
          </mesh>
        </group>
      )}

      {/* Lush Foliage Foundation (Eucalyptus & Leafy Greens) */}
      <mesh material={materials.eucalyptusSage} position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.26, 14, 14]} />
      </mesh>

      {/* Detailed Floral Bloom Arrangements */}
      {flowerType === 'rose' && (
        <group position={[0, 0.72, 0]}>
          {/* Crimson & Blush Roses Cluster */}
          {[-0.12, 0.12, 0].map((x, i) => (
            <group key={i} position={[x, (i % 2) * 0.08, (i === 2 ? 0.1 : -0.06)]}>
              <mesh material={i % 2 === 0 ? materials.roseCrimson : materials.roseBlush} castShadow>
                <sphereGeometry args={[0.11, 14, 14]} />
              </mesh>
              {/* Petal Flange Collar */}
              <mesh material={i % 2 === 0 ? materials.roseCrimson : materials.roseBlush} position={[0, -0.02, 0]}>
                <torusGeometry args={[0.11, 0.025, 8, 16]} />
              </mesh>
            </group>
          ))}
          {/* Centerpiece Royal Rose */}
          <mesh material={materials.roseCream} position={[0, 0.16, 0.02]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          {/* Baby's Breath White Sprigs */}
          {[-0.18, 0.18, 0].map((bx, idx) => (
            <mesh key={idx} material={materials.roseCream} position={[bx, 0.12, -0.1]}>
              <sphereGeometry args={[0.035, 8, 8]} />
            </mesh>
          ))}
        </group>
      )}

      {flowerType === 'tulip' && (
        <group position={[0, 0.74, 0]}>
          {/* Slender Coral & Lilac Tulips */}
          {[-0.14, -0.05, 0.08, 0.15].map((tx, idx) => (
            <group key={idx} position={[tx, (idx % 2) * 0.08, (idx - 1.5) * 0.07]}>
              {/* Slender Stem */}
              <mesh material={materials.plantGreen} position={[0, -0.1, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
              </mesh>
              {/* Elongated Tulip Cup */}
              <mesh material={idx % 2 === 0 ? materials.tulipCoral : materials.tulipLilac} castShadow>
                <capsuleGeometry args={[0.065, 0.14, 6, 12]} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {flowerType === 'sunflower' && (
        <group position={[0, 0.72, 0]}>
          {/* Sunny Golden Sunflower Heads with Seed Centers */}
          {[-0.12, 0.12].map((sx, idx) => (
            <group key={idx} position={[sx, idx * 0.06, idx * 0.05]} rotation={[0.2, idx * 0.4 - 0.2, 0]}>
              {/* Petal Disc */}
              <mesh material={materials.sunflowerYellow} castShadow>
                <cylinderGeometry args={[0.18, 0.18, 0.03, 20]} />
              </mesh>
              {/* Dark Seed Core */}
              <mesh material={materials.sunflowerCenter} position={[0, 0.025, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
              </mesh>
            </group>
          ))}
          {/* Companion Daisy Sprigs */}
          <group position={[0, 0.18, -0.06]}>
            <mesh material={materials.sunflowerYellow}>
              <cylinderGeometry args={[0.14, 0.14, 0.025, 16]} />
            </mesh>
            <mesh material={materials.sunflowerCenter} position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.025, 12]} />
            </mesh>
          </group>
        </group>
      )}

      {(flowerType === 'peony' || flowerType === 'vase') && (
        <group position={[0, 0.72, 0]}>
          {/* Voluminous Romantic Peonies */}
          {[-0.12, 0.12, 0].map((px, idx) => (
            <group key={idx} position={[px, (idx % 2) * 0.09, (idx - 1) * 0.08]}>
              <mesh material={idx === 1 ? materials.peonyBlush : materials.roseBlush} castShadow>
                <sphereGeometry args={[0.13, 16, 16]} />
              </mesh>
              <mesh material={materials.roseCream} position={[0, 0.04, 0]}>
                <sphereGeometry args={[0.08, 12, 12]} />
              </mesh>
            </group>
          ))}
          <mesh material={materials.peonyBlush} position={[0, 0.18, 0.03]} castShadow>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ============================================================================
// 11. AESTHETIC GIFT BOXES & HAMPERS (Inspired by Images 1 & 2: Stacked Pastel, Botanical & Open Hampers)
// ============================================================================
export interface AestheticGiftBoxProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  style?: 'stackedPastel' | 'floralPattern' | 'openHamper' | 'kraftMinimal';
}

export function AestheticGiftBox({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  style = 'stackedPastel'
}: AestheticGiftBoxProps) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* 1. STACKED PASTEL GIFT BOXES (Image 1: Stack of 3 soft boxes with satin ribbon) */}
      {style === 'stackedPastel' && (
        <group>
          {/* Bottom Large Sage Green Box */}
          <mesh material={materials.boxSageGreen} position={[0, 0.16, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.72, 0.32, 0.6]} />
          </mesh>
          <mesh material={materials.boxSageGreen} position={[0, 0.32, 0]} castShadow>
            <boxGeometry args={[0.74, 0.05, 0.62]} />
          </mesh>
          {/* Vertical Ribbon on bottom box */}
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.16, 0]}>
            <boxGeometry args={[0.07, 0.34, 0.62]} />
          </mesh>

          {/* Middle Medium Dusty Rose Box */}
          <mesh material={materials.boxDustyRose} position={[0, 0.48, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.54, 0.26, 0.46]} />
          </mesh>
          <mesh material={materials.boxDustyRose} position={[0, 0.61, 0]} castShadow>
            <boxGeometry args={[0.56, 0.04, 0.48]} />
          </mesh>
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.48, 0]}>
            <boxGeometry args={[0.06, 0.28, 0.48]} />
          </mesh>

          {/* Top Small Cream Ivory Box */}
          <mesh material={materials.boxCreamGold} position={[0, 0.74, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.2, 0.34]} />
          </mesh>
          <mesh material={materials.boxCreamGold} position={[0, 0.84, 0]} castShadow>
            <boxGeometry args={[0.4, 0.035, 0.36]} />
          </mesh>
          {/* Crossing Ribbons on top box */}
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.74, 0]}>
            <boxGeometry args={[0.05, 0.22, 0.36]} />
          </mesh>
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.74, 0]}>
            <boxGeometry args={[0.4, 0.22, 0.05]} />
          </mesh>

          {/* Grand Satin Ribbon Bow on Top */}
          <group position={[0, 0.88, 0]}>
            <mesh material={materials.satinRibbonChampagne} position={[-0.06, 0.04, 0]} rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.07, 0.022, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne} position={[0.06, 0.04, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <torusGeometry args={[0.07, 0.022, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne}>
              <sphereGeometry args={[0.035, 12, 12]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 2. FLORAL PATTERN PACKAGING BOX (Inspired by Image 2 templates) */}
      {style === 'floralPattern' && (
        <group>
          {/* Deep Navy/Sage Box with Gold Filigree Rim */}
          <mesh material={materials.boxNavyFloral} position={[0, 0.22, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.62, 0.44, 0.48]} />
          </mesh>
          {/* Slip Lid */}
          <mesh material={materials.boxDustyRose} position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[0.64, 0.08, 0.5]} />
          </mesh>
          {/* Gold Foil Geometric Border Trim */}
          <mesh material={materials.gold} position={[0, 0.44, 0.252]}>
            <boxGeometry args={[0.58, 0.06, 0.005]} />
          </mesh>
          {/* Embossed Botanical Logo Medallion on Face */}
          <mesh material={materials.gold} position={[0, 0.22, 0.242]}>
            <cylinderGeometry args={[0.08, 0.08, 0.01, 20]} />
          </mesh>
          {/* Satin Ribbon Ties */}
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.22, 0]}>
            <boxGeometry args={[0.06, 0.45, 0.5]} />
          </mesh>
          <group position={[0, 0.5, 0]}>
            <mesh material={materials.satinRibbonChampagne} position={[-0.05, 0.04, 0]} rotation={[0, 0, 0.4]}>
              <torusGeometry args={[0.06, 0.02, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne} position={[0.05, 0.04, 0]} rotation={[0, 0, -0.4]}>
              <torusGeometry args={[0.06, 0.02, 8, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. OPEN CURATED LUXE HAMPER (Inspired by Image 1: Open gift hamper with shred & treats) */}
      {style === 'openHamper' && (
        <group>
          {/* Open Tray Box */}
          <mesh material={materials.boxCreamGold} position={[0, 0.16, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.85, 0.32, 0.65]} />
          </mesh>
          {/* Inner Cavity Tissue Shred Filling (Crinkle Paper Shred) */}
          <mesh material={materials.tissueShredIvory} position={[0, 0.24, 0]}>
            <boxGeometry args={[0.78, 0.14, 0.58]} />
          </mesh>

          {/* Curated Hamper Content: Mini Silk Rose Blossom */}
          <group position={[-0.22, 0.33, 0.12]}>
            <mesh material={materials.roseBlush}>
              <sphereGeometry args={[0.08, 12, 12]} />
            </mesh>
            <mesh material={materials.eucalyptusSage} position={[0, -0.04, -0.05]}>
              <boxGeometry args={[0.08, 0.02, 0.08]} />
            </mesh>
          </group>

          {/* Scented Candle / Luxury Jar inside hamper */}
          <group position={[0.22, 0.34, 0.1]}>
            <mesh material={materials.glass} castShadow>
              <cylinderGeometry args={[0.075, 0.075, 0.14, 16]} />
            </mesh>
            <mesh material={materials.gold} position={[0, 0.075, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            </mesh>
          </group>

          {/* Wrapped Treat with Ribbon */}
          <group position={[0, 0.33, -0.12]}>
            <mesh material={materials.boxDustyRose} castShadow>
              <boxGeometry args={[0.28, 0.1, 0.18]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne} position={[0, 0.01, 0]}>
              <boxGeometry args={[0.04, 0.11, 0.19]} />
            </mesh>
          </group>

          {/* Big Satin Ribbon Bow hanging over the front lip */}
          <group position={[0, 0.26, 0.34]}>
            <mesh material={materials.satinRibbonChampagne} position={[-0.06, 0.02, 0]} rotation={[0, 0, 0.4]}>
              <torusGeometry args={[0.07, 0.02, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne} position={[0.06, 0.02, 0]} rotation={[0, 0, -0.4]}>
              <torusGeometry args={[0.07, 0.02, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne}>
              <sphereGeometry args={[0.03, 10, 10]} />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. MINIMALIST KRAFT GIFT BOX (Image 1 bottom row) */}
      {style === 'kraftMinimal' && (
        <group>
          {/* Natural Brown Kraft Paper Box */}
          <mesh material={materials.kraftPaper} position={[0, 0.18, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.58, 0.36, 0.46]} />
          </mesh>
          <mesh material={materials.kraftPaper} position={[0, 0.37, 0]} castShadow>
            <boxGeometry args={[0.6, 0.05, 0.48]} />
          </mesh>
          {/* Cream Grosgrain Satin Ribbon */}
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.18, 0]}>
            <boxGeometry args={[0.06, 0.38, 0.48]} />
          </mesh>
          <mesh material={materials.satinRibbonChampagne} position={[0, 0.18, 0]}>
            <boxGeometry args={[0.6, 0.38, 0.06]} />
          </mesh>
          {/* Knot & Tails */}
          <group position={[0, 0.42, 0]}>
            <mesh material={materials.satinRibbonChampagne} position={[-0.05, 0.03, 0]} rotation={[0, 0, 0.35]}>
              <torusGeometry args={[0.06, 0.018, 8, 16]} />
            </mesh>
            <mesh material={materials.satinRibbonChampagne} position={[0.05, 0.03, 0]} rotation={[0, 0, -0.35]}>
              <torusGeometry args={[0.06, 0.018, 8, 16]} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}

// ============================================================================
// 12. NECKLACE STAND WITH A LOT OF NECKLACES (Velvet Jewelry Bust & Many Pendant Chains)
// ============================================================================
export function NecklaceDisplayStand({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Black Velvet Weighted Base */}
      <mesh material={materials.velvetBlack} position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.28, 0.06, 20]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.06, 0]}>
        <torusGeometry args={[0.245, 0.012, 8, 24]} />
      </mesh>

      {/* Velvet Neck & Shoulder Mannequin Bust */}
      <mesh material={materials.velvetBlack} position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, 0.55, 20]} />
      </mesh>
      {/* Contoured Neck */}
      <mesh material={materials.velvetBlack} position={[0, 0.64, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 0.18, 16]} />
      </mesh>

      {/* A LOT OF NECKLACES DRAPED AT STAGGERED LENGTHS */}
      {/* 1. Short Choker: 18k Gold Collar */}
      <mesh material={materials.gold} position={[0, 0.6, 0.02]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.11, 0.012, 8, 24]} />
      </mesh>

      {/* 2. Princess Length: Gold Chain with Ruby Gem Pendant */}
      <group position={[0, 0.52, 0.06]} rotation={[0.5, 0, 0]}>
        <mesh material={materials.champagneGold}>
          <torusGeometry args={[0.135, 0.01, 8, 24]} />
        </mesh>
        <mesh material={materials.gemRuby} position={[0, -0.13, 0.01]} castShadow>
          <octahedronGeometry args={[0.035, 0]} />
        </mesh>
        <mesh material={materials.gold} position={[0, -0.09, 0.01]}>
          <cylinderGeometry args={[0.008, 0.008, 0.02, 6]} />
        </mesh>
      </group>

      {/* 3. Matinee Length: Gold Chain with Sapphire Drop */}
      <group position={[0, 0.44, 0.1]} rotation={[0.55, 0, 0]}>
        <mesh material={materials.gold}>
          <torusGeometry args={[0.16, 0.01, 8, 24]} />
        </mesh>
        <mesh material={materials.gemSapphire} position={[0, -0.155, 0.01]} castShadow>
          <sphereGeometry args={[0.038, 12, 12]} />
        </mesh>
      </group>

      {/* 4. Opera Length: Layered Chain with Gold Coin Medallion */}
      <group position={[0, 0.35, 0.14]} rotation={[0.6, 0, 0]}>
        <mesh material={materials.champagneGold}>
          <torusGeometry args={[0.185, 0.009, 8, 24]} />
        </mesh>
        <mesh material={materials.gold} position={[0, -0.18, 0.01]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.008, 16]} />
        </mesh>
      </group>

      {/* 5. Deep Pendant: Emerald Crystal Teardrop */}
      <group position={[0, 0.28, 0.18]} rotation={[0.65, 0, 0]}>
        <mesh material={materials.gold}>
          <torusGeometry args={[0.21, 0.008, 8, 24]} />
        </mesh>
        <mesh material={materials.gemEmerald} position={[0, -0.2, 0.01]} castShadow>
          <coneGeometry args={[0.035, 0.07, 8]} />
        </mesh>
      </group>

      {/* 6. Side Drapes: Pearl Strand Layer */}
      <group position={[0, 0.48, 0.08]} rotation={[0.48, 0, 0]}>
        {[-0.12, -0.06, 0, 0.06, 0.12].map((px, idx) => (
          <mesh key={idx} material={materials.ceramicWhite} position={[px, -0.12 + Math.abs(px) * 0.4, 0.01]}>
            <sphereGeometry args={[0.018, 8, 8]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 13. EARRING STAND WITH A LOT OF EARRINGS (Tiered T-Bar Tree with Many Pairs)
// ============================================================================
export function EarringDisplayStand({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Solid Polished Gold Base */}
      <mesh material={materials.gold} position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.55, 0.04, 0.24]} />
      </mesh>
      {/* Central Upright Post */}
      <mesh material={materials.gold} position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.72, 12]} />
      </mesh>

      {/* 3 Horizontal Hanging Bars (Tiers for earrings) */}
      {[0.66, 0.48, 0.3].map((barY, tierIdx) => (
        <group key={tierIdx} position={[0, barY, 0]}>
          {/* Horizontal Brass Crossbar */}
          <mesh material={materials.gold}>
            <boxGeometry args={[0.58, 0.016, 0.016]} />
          </mesh>

          {/* Multiple Pairs of Hanging Earrings along the bar */}
          {[-0.22, -0.11, 0.11, 0.22].map((ex, pairIdx) => {
            const isHoop = (tierIdx + pairIdx) % 3 === 0;
            const isChandelier = (tierIdx + pairIdx) % 3 === 1;
            const isPearlDrop = (tierIdx + pairIdx) % 3 === 2;

            return (
              <group key={pairIdx} position={[ex, -0.01, 0.01]}>
                {/* Earring Hook */}
                <mesh material={materials.gold}>
                  <cylinderGeometry args={[0.004, 0.004, 0.03, 6]} />
                </mesh>

                {/* 1. Gold Hoop Earrings */}
                {isHoop && (
                  <mesh material={materials.gold} position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.035, 0.008, 8, 16]} />
                  </mesh>
                )}

                {/* 2. Sparkling Chandelier / Crystal Drop Earrings */}
                {isChandelier && (
                  <group position={[0, -0.06, 0]}>
                    <mesh material={materials.gold}>
                      <cylinderGeometry args={[0.02, 0.005, 0.04, 6]} />
                    </mesh>
                    <mesh material={materials.gemRuby} position={[-0.012, -0.03, 0]}>
                      <sphereGeometry args={[0.012, 8, 8]} />
                    </mesh>
                    <mesh material={materials.gemSapphire} position={[0.012, -0.03, 0]}>
                      <sphereGeometry args={[0.012, 8, 8]} />
                    </mesh>
                    <mesh material={materials.gemEmerald} position={[0, -0.045, 0]}>
                      <octahedronGeometry args={[0.015, 0]} />
                    </mesh>
                  </group>
                )}

                {/* 3. Luminous Pearl Drop Earrings */}
                {isPearlDrop && (
                  <group position={[0, -0.05, 0]}>
                    <mesh material={materials.gold} position={[0, 0.01, 0]}>
                      <sphereGeometry args={[0.008, 6, 6]} />
                    </mesh>
                    <mesh material={materials.ceramicWhite} position={[0, -0.025, 0]}>
                      <sphereGeometry args={[0.022, 12, 12]} />
                    </mesh>
                  </group>
                )}
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 14. HOTWHEELS CAR COLLECTOR RACK (Multi-Tier Display Stand Loaded with Cars)
// ============================================================================
export function HotwheelsCarRack({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const carColors: Array<'red' | 'blue' | 'gold' | 'green'> = ['red', 'blue', 'gold', 'green'];

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Acrylic Retail Display Shelf Rack */}
      <mesh material={materials.steel} position={[0, 0.28, -0.12]}>
        <boxGeometry args={[0.95, 0.55, 0.03]} />
      </mesh>
      {/* Side Brackets */}
      {[-0.47, 0.47].map((x, i) => (
        <mesh key={i} material={materials.steel} position={[x, 0.28, 0]}>
          <boxGeometry args={[0.02, 0.55, 0.26]} />
        </mesh>
      ))}

      {/* 2 Tier Levels of Cars in Blister Packs */}
      {[0.14, 0.4].map((tierY, tIdx) => (
        <group key={tIdx} position={[0, tierY, 0]}>
          {/* Wire Shelf Lip */}
          <mesh material={materials.gold} position={[0, 0, 0.11]}>
            <boxGeometry args={[0.92, 0.02, 0.02]} />
          </mesh>

          {/* 3 Cars per Tier */}
          {[-0.3, 0, 0.3].map((cx, cIdx) => (
            <group key={cIdx} position={[cx, 0.02, 0]} rotation={[0.08, 0, 0]}>
              {/* Blister Card Backing */}
              <mesh material={materials.ceramicWhite} position={[0, 0.12, -0.06]} castShadow>
                <boxGeometry args={[0.26, 0.24, 0.015]} />
              </mesh>
              {/* Red Header Banner on Card */}
              <mesh material={materials.hotwheelsRed} position={[0, 0.21, -0.05]}>
                <boxGeometry args={[0.25, 0.045, 0.016]} />
              </mesh>
              {/* Clear Plastic Blister Bubble */}
              <mesh material={materials.glass} position={[0, 0.05, 0.02]}>
                <boxGeometry args={[0.23, 0.09, 0.14]} />
              </mesh>
              {/* Die-Cast Car */}
              <group position={[0, 0.03, 0.02]} scale={[0.6, 0.6, 0.6]}>
                <mesh 
                  material={
                    carColors[(tIdx * 2 + cIdx) % carColors.length] === 'red' ? materials.hotwheelsRed :
                    carColors[(tIdx * 2 + cIdx) % carColors.length] === 'blue' ? materials.hotwheelsBlue :
                    carColors[(tIdx * 2 + cIdx) % carColors.length] === 'gold' ? materials.hotwheelsGold :
                    materials.hotwheelsGreen
                  }
                  position={[0, 0.03, 0]}
                  castShadow
                >
                  <boxGeometry args={[0.3, 0.06, 0.14]} />
                </mesh>
                <mesh material={materials.foundation} position={[-0.03, 0.08, 0]}>
                  <boxGeometry args={[0.15, 0.05, 0.12]} />
                </mesh>
                {/* Wheels */}
                {[-0.09, 0.09].map((wx, wIdx) => (
                  <React.Fragment key={wIdx}>
                    <mesh material={materials.steel} position={[wx, 0.03, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
                      <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
                    </mesh>
                    <mesh material={materials.steel} position={[wx, 0.03, -0.07]} rotation={[Math.PI / 2, 0, 0]}>
                      <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
                    </mesh>
                  </React.Fragment>
                ))}
              </group>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// 15. SCRUNCHIES & HAIRBANDS STAND (Velvet Tower Organizer with Headbands)
// ============================================================================
export function ScrunchiesAndHairbandsStand({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const scrunchieColors = [
    materials.giftBlush,
    materials.giftLavender,
    materials.wrapLilac,
    materials.satinRibbonChampagne,
    materials.wrapEmeraldGold
  ];

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Polished White Marble Base */}
      <mesh material={materials.ceramicWhite} position={[0, 0.025, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.05, 20]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.225, 0.01, 8, 24]} />
      </mesh>

      {/* Vertical Cylinder Column (Holding Stack of Scrunchies) */}
      <mesh material={materials.velvetBlack} position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 20]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.66, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
      </mesh>

      {/* Stack of 5 Plush Velvet Scrunchies in Pastel Colors */}
      {[0.12, 0.23, 0.34, 0.45, 0.56].map((sy, idx) => (
        <mesh key={idx} material={scrunchieColors[idx % scrunchieColors.length]} position={[0, sy, 0]} castShadow>
          <torusGeometry args={[0.13, 0.045, 12, 24]} />
        </mesh>
      ))}

      {/* Decorative Arched Hairband Headbands Sitting on Stand */}
      <group position={[0, 0.68, 0]}>
        {/* Blush Padded Headband */}
        <mesh material={materials.giftBlush} rotation={[0, 0.3, 0]}>
          <torusGeometry args={[0.14, 0.028, 10, 24, Math.PI]} />
        </mesh>
        {/* Gold & Pearl Hairband */}
        <mesh material={materials.gold} rotation={[0, -0.3, 0]}>
          <torusGeometry args={[0.15, 0.016, 8, 24, Math.PI]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 16. BRACELET DISPLAY STAND (Velvet Cylindrical T-Bar Loaded with Bangles & Chains)
// ============================================================================
export function BraceletDisplayStand({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Weighted Polished Brass Base */}
      <mesh material={materials.gold} position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.45, 0.04, 0.22]} />
      </mesh>
      {/* Upright Post */}
      <mesh material={materials.gold} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.36, 12]} />
      </mesh>

      {/* Horizontal Velvet Pillow Roll Bar */}
      <group position={[0, 0.38, 0]}>
        <mesh material={materials.velvetBlack} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.65, 20]} />
        </mesh>
        {/* Gold End Caps */}
        {[-0.33, 0.33].map((cx, i) => (
          <mesh key={i} material={materials.gold} position={[cx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.082, 0.082, 0.02, 16]} />
          </mesh>
        ))}

        {/* Multiple Bracelets Draped Across the Roll */}
        {[-0.22, -0.11, 0, 0.11, 0.22].map((bx, idx) => {
          const isBangle = idx % 2 === 0;
          return (
            <group key={idx} position={[bx, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh material={isBangle ? materials.gold : materials.champagneGold}>
                <torusGeometry args={[0.09, isBangle ? 0.012 : 0.008, 8, 20]} />
              </mesh>
              {/* Hanging Charm */}
              {!isBangle && (
                <mesh material={materials.gemRuby} position={[0, -0.095, 0]}>
                  <sphereGeometry args={[0.018, 8, 8]} />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
}

// ============================================================================
// 17. DESIGNER SUNGLASSES DISPLAY (Acrylic Eyewear Stand with 3 Pairs)
// ============================================================================
export function SunglassesDisplay({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Clear Acrylic Base */}
      <mesh material={materials.glass} position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.38, 0.04, 0.24]} />
      </mesh>
      {/* Central Acrylic Eyewear Spire */}
      <mesh material={materials.glass} position={[0, 0.32, -0.04]}>
        <boxGeometry args={[0.06, 0.6, 0.06]} />
      </mesh>

      {/* 3 Pairs of Sunglasses on Nose Bridges */}
      {[0.52, 0.34, 0.16].map((gy, idx) => {
        const frameMat = idx === 0 ? materials.gold : idx === 1 ? materials.leatherBlack : materials.woodTeak;
        return (
          <group key={idx} position={[0, gy, 0.04]}>
            {/* Nose Bridge Rest */}
            <mesh material={materials.glass} position={[0, 0, -0.04]}>
              <boxGeometry args={[0.04, 0.02, 0.08]} />
            </mesh>

            {/* Left & Right Dark Lenses */}
            <mesh material={materials.velvetBlack} position={[-0.09, 0, 0.02]}>
              <boxGeometry args={[0.13, 0.08, 0.015]} />
            </mesh>
            <mesh material={materials.velvetBlack} position={[0.09, 0, 0.02]}>
              <boxGeometry args={[0.13, 0.08, 0.015]} />
            </mesh>

            {/* Eyewear Frame Outline */}
            <mesh material={frameMat} position={[-0.09, 0, 0.02]}>
              <boxGeometry args={[0.14, 0.09, 0.012]} />
            </mesh>
            <mesh material={frameMat} position={[0.09, 0, 0.02]}>
              <boxGeometry args={[0.14, 0.09, 0.012]} />
            </mesh>
            {/* Center Bridge */}
            <mesh material={frameMat} position={[0, 0.02, 0.02]}>
              <boxGeometry args={[0.06, 0.015, 0.015]} />
            </mesh>
            {/* Folded Side Temples */}
            <mesh material={frameMat} position={[-0.16, 0, -0.06]} rotation={[0, 0.25, 0]}>
              <boxGeometry args={[0.01, 0.012, 0.14]} />
            </mesh>
            <mesh material={frameMat} position={[0.16, 0, -0.06]} rotation={[0, -0.25, 0]}>
              <boxGeometry args={[0.01, 0.012, 0.14]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ============================================================================
// 18. SKINCARE FACE MASKS & CLEANSING WET WIPES DISPLAY
// ============================================================================
export function SkincareFaceMasksRack({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const pouchTones = [materials.giftBlush, materials.gold, materials.giftLavender, materials.wrapChampagne];

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Tray Stand */}
      <mesh material={materials.ceramicWhite} position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[0.65, 0.06, 0.42]} />
      </mesh>

      {/* 4 Tiered Upright Foil Sachet Pouches */}
      {[-0.12, -0.04, 0.04, 0.12].map((pz, idx) => (
        <group key={idx} position={[0, 0.18, pz]} rotation={[-0.2, 0, 0]}>
          <mesh material={pouchTones[idx % pouchTones.length]} castShadow>
            <boxGeometry args={[0.55, 0.36, 0.025]} />
          </mesh>
          {/* Foil Header Notch & Seal */}
          <mesh material={materials.gold} position={[0, 0.16, 0.005]}>
            <boxGeometry args={[0.55, 0.03, 0.02]} />
          </mesh>
          {/* Botanical Emblem */}
          <mesh material={materials.gold} position={[0, 0.02, 0.015]}>
            <circleGeometry args={[0.045, 12]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function CleansingWetWipesPack({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Softpack Pillow Body in Pure Matte White */}
      <mesh material={materials.ceramicWhite} position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.68, 0.22, 0.44]} />
      </mesh>
      {/* Resealable Snap Cap in Pastel Lavender */}
      <mesh material={materials.giftLavender} position={[0, 0.235, 0]}>
        <boxGeometry args={[0.26, 0.03, 0.18]} />
      </mesh>
      {/* Snap Hinge Notch */}
      <mesh material={materials.gold} position={[0, 0.245, 0.08]}>
        <boxGeometry args={[0.08, 0.01, 0.02]} />
      </mesh>
    </group>
  );
}


