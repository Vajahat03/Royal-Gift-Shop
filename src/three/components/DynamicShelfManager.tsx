import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useGiftShopStore } from '../../hooks/useStore';
import { materials } from '../materials/materials';
import { 
  WoodenGiftBox, 
  TeddyBear, 
  HotwheelsCar, 
  JewelryBouquet, 
  MensAccessoriesDisplay,
  AestheticFlowerBouquet,
  AestheticGiftBox
} from './Decorations';

interface DynamicShelfManagerProps {
  onSelectItem: (materialId: string) => void;
}

// Interactive 3D Floating Shelf Tag (ONLY displays item name — Price, quantity & history show in modal on tap/click)
function DynamicItemTag({
  name,
  materialId,
  position,
  onSelect
}: {
  name: string;
  materialId: string;
  position: [number, number, number];
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html center distanceFactor={10}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(materialId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onSelect(materialId);
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          tabIndex={0}
          className={`group flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-tight whitespace-nowrap shadow-soft transition-all duration-200 cursor-pointer pointer-events-auto border backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold-400 ${
            hovered
              ? 'bg-charcoal-900 text-white border-gold-400 scale-110 shadow-glow -translate-y-0.5'
              : 'bg-white/95 text-charcoal-900 border-lavender-200 hover:bg-lavender-50'
          }`}
          title={`Tap to inspect price, remaining stock & customer usage history for ${name}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[11px]">{name}</span>
        </button>
      </Html>
    </group>
  );
}

// 3D Miniature Item representation based on keyword matching
function ShelfItemModel({ name, category, index }: { name: string; category?: string; index: number }) {
  const lower = (name + ' ' + (category || '')).toLowerCase();

  // 1. AESTHETIC FLOWER BOUQUETS (Inspired by Image 3: Roses, Tulips, Sunflowers, Peonies)
  if (lower.includes('rose') || (lower.includes('crimson') && lower.includes('bouquet'))) {
    return <AestheticFlowerBouquet flowerType="rose" wrapStyle="kraft" scale={0.72} />;
  }
  if (lower.includes('tulip')) {
    return <AestheticFlowerBouquet flowerType="tulip" wrapStyle="blush" scale={0.72} />;
  }
  if (lower.includes('sunflower')) {
    return <AestheticFlowerBouquet flowerType="sunflower" wrapStyle="kraft" scale={0.72} />;
  }
  if (lower.includes('peony') || lower.includes('blossom') || (lower.includes('flower') && lower.includes('vase'))) {
    return <AestheticFlowerBouquet flowerType="peony" wrapStyle="vase" scale={0.7} />;
  }
  if (lower.includes('bouquet') || lower.includes('flower') || lower.includes('floral')) {
    return <AestheticFlowerBouquet flowerType="rose" wrapStyle="blush" scale={0.72} />;
  }

  // 2. AESTHETIC GIFT BOXES & CURATED HAMPERS (Inspired by Images 1 & 2)
  if (lower.includes('stack') || lower.includes('pastel')) {
    return <AestheticGiftBox style="stackedPastel" scale={0.68} />;
  }
  if (lower.includes('botanical') || lower.includes('pattern') || lower.includes('vintage') || lower.includes('packaging')) {
    return <AestheticGiftBox style="floralPattern" scale={0.75} />;
  }
  if (lower.includes('hamper') || lower.includes('curated')) {
    return <AestheticGiftBox style="openHamper" scale={0.72} />;
  }
  if (lower.includes('kraft')) {
    return <AestheticGiftBox style="kraftMinimal" scale={0.75} />;
  }

  // 3. Teddy Bears: Cluster of at least 2 to 3 different bears
  if (lower.includes('teddy') || lower.includes('bear') || lower.includes('plush')) {
    const colors: ('honey' | 'cream' | 'blush' | 'mocha' | 'babyBlue')[] = ['honey', 'cream', 'blush', 'mocha', 'babyBlue'];
    return (
      <group>
        <TeddyBear 
          scale={0.52} 
          furColor={colors[index % colors.length]} 
          bowColor={index % 2 === 0 ? 'gold' : 'lavender'} 
          position={[0, 0, 0.04]}
        />
        <TeddyBear 
          scale={0.42} 
          furColor={colors[(index + 1) % colors.length]} 
          bowColor="crimson" 
          position={[0.22, 0, -0.04]}
        />
        <TeddyBear 
          scale={0.38} 
          furColor={colors[(index + 2) % colors.length]} 
          bowColor="emerald" 
          position={[-0.22, 0, -0.04]}
        />
      </group>
    );
  }

  if (lower.includes('hotwheel') || lower.includes('car') || lower.includes('toy')) {
    const colors: ('red' | 'blue' | 'gold' | 'green')[] = ['red', 'blue', 'gold', 'green'];
    return <HotwheelsCar color={colors[index % colors.length]} showBlisterCard={true} />;
  }

  if (lower.includes('box') || lower.includes('wooden') || lower.includes('chest')) {
    const woods: ('mahogany' | 'teak' | 'rosewood' | 'darkCarved')[] = ['mahogany', 'teak', 'rosewood', 'darkCarved'];
    return (
      <WoodenGiftBox 
        size={[0.48, 0.32, 0.38]} 
        woodType={woods[index % woods.length]} 
        hasCurvedLid={index % 2 === 0} 
      />
    );
  }

  if (lower.includes('watch') || lower.includes('wallet') || lower.includes('belt')) {
    return <MensAccessoriesDisplay />;
  }

  if (lower.includes('chain') || lower.includes('bracelet') || lower.includes('jewelry') || lower.includes('ring')) {
    return <JewelryBouquet scale={0.5} />;
  }

  if (lower.includes('perfume') || lower.includes('fragrance') || lower.includes('cologne') || lower.includes('scent')) {
    return (
      <group>
        <mesh material={materials.glass} position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.22, 0.38, 0.18]} />
        </mesh>
        <mesh material={materials.perfumeAmber} position={[0, 0.18, 0]}>
          <boxGeometry args={[0.18, 0.3, 0.14]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.44, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        </mesh>
      </group>
    );
  }

  // Default Luxury Boutique Gift Parcel
  const parcelTones = [materials.giftBlush, materials.giftLavender, materials.giftPurple, materials.woodTeak];
  return (
    <group>
      <mesh material={parcelTones[index % parcelTones.length]} position={[0, 0.16, 0]} castShadow>
        <boxGeometry args={[0.42, 0.32, 0.36]} />
      </mesh>
      <mesh material={materials.ribbonGold} position={[0, 0.16, 0]}>
        <boxGeometry args={[0.43, 0.06, 0.37]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.33, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
      </mesh>
    </group>
  );
}

// Available shelf slots pre-distributed across boutique fixtures filling empty spaces:
// Front Wall (z=-4.1), The Royal Gift Counter (x=4.9), Center Island Table, and Left Wall
const SHELF_SLOTS: Array<{
  position: [number, number, number];
  tagOffset: [number, number, number];
  rotation?: [number, number, number];
}> = [
  // 1. Velvet Crimson & Blush Rose Bouquet (Front Wall Upper Shelf Left)
  { position: [-2.6, 5.25, -4.1], tagOffset: [0, 0.75, 0.2] },
  // 2. Spring Coral & Lilac Tulip Bouquet (Front Wall Upper Shelf Mid-Left)
  { position: [-1.2, 5.25, -4.1], tagOffset: [0, 0.75, 0.2] },
  // 3. Golden Sunshine & Chamomile Bouquet (Front Wall Upper Shelf Mid-Right)
  { position: [1.2, 5.25, -4.1], tagOffset: [0, 0.75, 0.2] },
  // 4. Luxury Atelier Peony & Blossom Bouquet (Front Wall Upper Shelf Right)
  { position: [2.6, 5.25, -4.1], tagOffset: [0, 0.75, 0.2] },

  // 5. Pastel Silk Ribbon Stacked Gift Boxes (Front Wall Credenza Top Left)
  { position: [-1.4, 2.32, -3.9], tagOffset: [0, 0.75, 0.2] },
  // 6. Vintage Floral Botanical Packaging Box (Front Wall Credenza Top Right)
  { position: [1.4, 2.32, -3.9], tagOffset: [0, 0.75, 0.2] },
  // 7. Aesthetic Curated Luxe Gift Hamper (Right Wall: The Royal Gift Counter)
  { position: [4.9, 1.95, -0.05], tagOffset: [-0.2, 0.7, 0], rotation: [0, -Math.PI / 2, 0] },
  // 8. Minimalist Kraft Ribbon Keepsake Box (Front Wall Mid Shelf Center)
  { position: [0.0, 3.85, -4.1], tagOffset: [0, 0.75, 0.2] },

  // Additional slots for any new products added by the user in inventory
  { position: [4.9, 3.25, -2.4], tagOffset: [-0.2, 0.7, 0], rotation: [0, -Math.PI / 2, 0] },
  { position: [4.9, 3.25, 2.4], tagOffset: [-0.2, 0.7, 0], rotation: [0, -Math.PI / 2, 0] },
  { position: [0.95, 0.95, 0.4], tagOffset: [0, 0.75, 0.1] },
  { position: [-0.95, 0.95, -0.4], tagOffset: [0, 0.75, 0.1] },
  { position: [-5.0, 4.5, -2.0], tagOffset: [0.2, 0.65, 0], rotation: [0, Math.PI / 2, 0] },
  { position: [-5.0, 4.5, 2.0], tagOffset: [0.2, 0.65, 0], rotation: [0, Math.PI / 2, 0] },
];

const DEFAULT_SHOP_FIXTURE_IDS = new Set([
  'mat-necklace',
  'mat-earring',
  'mat-bracelet',
  'mat-watch',
  'mat-belt',
  'mat-sunglasses',
  'mat-hotwheels',
  'mat-scrunchies',
  'mat-facemask',
  'mat-wipes',
  'mat-perfume',
  'mat-tumbler',
  'mat-teddy',
  'mat-small-teddy',
  'mat-big-teddy',
  'mat-keychain-teddy',
  'mat-wooden-box',
  'mat-wrapping-paper',
  'mat-jewelry-bouquet',
  'mat-mens-gift-set',
  'mat-rose-bouquet',
  'mat-tulip-bouquet',
  'mat-sunflower-bouquet',
  'mat-peony-bouquet',
  'mat-stacked-box',
  'mat-botanical-box',
  'mat-curated-hamper',
  'mat-kraft-box'
]);

export function DynamicShelfManager({ onSelectItem }: DynamicShelfManagerProps) {
  const { materials: allMaterials } = useGiftShopStore();

  // Filter for newly added or user-created materials outside the permanent architectural displays
  const dynamicItems = (allMaterials || []).filter(m => !DEFAULT_SHOP_FIXTURE_IDS.has(m.id));

  if (dynamicItems.length === 0) {
    return null;
  }

  return (
    <group>
      {dynamicItems.map((mat, idx) => {
        // Assign stably to one of the available shelf slots
        const slot = SHELF_SLOTS[idx % SHELF_SLOTS.length];

        // Position of the 3D item
        const [px, py, pz] = slot.position;
        // Position of the floating interactive name tag
        const tagPos: [number, number, number] = [
          px + slot.tagOffset[0],
          py + slot.tagOffset[1],
          pz + slot.tagOffset[2]
        ];

        return (
          <group key={mat.id}>
            {/* 3D Physical Item placed in the boutique space */}
            <group position={[px, py, pz]} rotation={slot.rotation || [0, 0, 0]}>
              <ShelfItemModel name={mat.name} category={mat.category} index={idx} />
            </group>

            {/* Interactive 3D Name Tag (Tap/click opens price, stock left & customer history) */}
            <DynamicItemTag
              name={mat.name}
              materialId={mat.id}
              position={tagPos}
              onSelect={onSelectItem}
            />
          </group>
        );
      })}
    </group>
  );
}
