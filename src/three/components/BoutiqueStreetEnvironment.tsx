import React, { useMemo } from 'react';
import * as THREE from 'three';
import { materials } from '../materials/materials';

// ============================================================================
// PROCEDURAL REALISTIC PAVING & COBBLESTONE TEXTURE GENERATORS
// ============================================================================
function useStreetTextures() {
  return useMemo(() => {
    // 1. Realistic European Cobblestone Texture with Mortar & Stone Highlights
    const cobbleCanvas = document.createElement('canvas');
    cobbleCanvas.width = 512;
    cobbleCanvas.height = 512;
    const cCtx = cobbleCanvas.getContext('2d')!;

    // Dark asphalt / mortar substrate
    cCtx.fillStyle = '#1D1B22';
    cCtx.fillRect(0, 0, 512, 512);

    const rows = 16;
    const rHeight = 512 / rows;
    for (let r = 0; r < rows; r++) {
      const y = r * rHeight;
      const stagger = (r % 2) * 16;
      const bWidth = 32;
      for (let x = -32 + stagger; x < 512 + 32; x += bWidth) {
        const hash = Math.sin(r * 12.9898 + x * 78.233) * 43758.5453;
        const rand = hash - Math.floor(hash);
        const l = 24 + Math.floor(rand * 14); // Slate grey variations
        cCtx.fillStyle = `hsl(245, 10%, ${l}%)`;
        cCtx.beginPath();
        cCtx.roundRect(x + 2, y + 2, bWidth - 4, rHeight - 4, 3.5);
        cCtx.fill();

        // Subtle specular highlight on stone top edge
        cCtx.strokeStyle = `hsla(245, 10%, ${l + 14}%, 0.45)`;
        cCtx.lineWidth = 1;
        cCtx.stroke();
      }
    }

    const cobbleTex = new THREE.CanvasTexture(cobbleCanvas);
    cobbleTex.wrapS = THREE.RepeatWrapping;
    cobbleTex.wrapT = THREE.RepeatWrapping;
    cobbleTex.repeat.set(8, 8);

    // 2. Realistic Parisian Limestone Sidewalk Slabs
    const slabCanvas = document.createElement('canvas');
    slabCanvas.width = 512;
    slabCanvas.height = 512;
    const sCtx = slabCanvas.getContext('2d')!;

    // Mortar joint tone
    sCtx.fillStyle = '#A39989';
    sCtx.fillRect(0, 0, 512, 512);

    const sCols = 8;
    const sRows = 8;
    const sw = 512 / sCols;
    const sh = 512 / sRows;
    for (let r = 0; r < sRows; r++) {
      for (let c = 0; c < sCols; c++) {
        const x = c * sw;
        const y = r * sh;
        const hash = Math.sin(r * 37.1 + c * 53.7) * 43758.5453;
        const rand = hash - Math.floor(hash);
        const l = 78 + Math.floor(rand * 8); // Warm French limestone tones
        sCtx.fillStyle = `hsl(38, 24%, ${l}%)`;
        sCtx.fillRect(x + 1.5, y + 1.5, sw - 3, sh - 3);

        // Subtle organic surface stippling
        sCtx.fillStyle = `hsla(38, 18%, ${l - 5}%, 0.35)`;
        sCtx.fillRect(x + 4, y + 4, sw - 8, sh - 8);
      }
    }

    const slabTex = new THREE.CanvasTexture(slabCanvas);
    slabTex.wrapS = THREE.RepeatWrapping;
    slabTex.wrapT = THREE.RepeatWrapping;
    slabTex.repeat.set(6, 6);

    return { cobbleTex, slabTex };
  }, []);
}

// ============================================================================
// ULTRA-REALISTIC PARISIAN STREET LAMP (Wrought-Iron Scrolls & Warm Lantern)
// ============================================================================
export function RealisticParisianStreetLamp({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 1. Heavy Hexagonal Cast-Iron Pedestal with Relief Mouldings */}
      <mesh material={materials.streetLampMetal} position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.42, 0.44, 6]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.24, 0.28, 0.06, 6]} />
      </mesh>
      <mesh material={materials.streetLampMetal} position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.24, 0.46, 16]} />
      </mesh>

      {/* 2. Main Fluted Cast-Iron Column */}
      <mesh material={materials.streetLampMetal} position={[0, 2.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.13, 2.8, 16]} />
      </mesh>

      {/* 3. Decorative Rings & Acanthus Capital */}
      <mesh material={materials.brassAntique} position={[0, 3.75, 0]}>
        <torusGeometry args={[0.11, 0.022, 8, 20]} />
      </mesh>
      <mesh material={materials.streetLampMetal} position={[0, 3.92, 0]}>
        <cylinderGeometry args={[0.16, 0.085, 0.24, 16]} />
      </mesh>

      {/* 4. Horizontal Ladder Rest Bar (Authentic Parisian detail) */}
      <mesh material={materials.streetLampMetal} position={[0, 4.02, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.75, 8]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 4.02, -0.37]}>
        <sphereGeometry args={[0.035, 10, 10]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 4.02, 0.37]}>
        <sphereGeometry args={[0.035, 10, 10]} />
      </mesh>

      {/* 5. Dual Wrought-Iron S-Curve Brackets */}
      {[-1, 1].map((dir, i) => (
        <group key={i} position={[0, 4.15, dir * 0.12]}>
          <mesh material={materials.streetLampMetal} rotation={[dir * 0.4, 0, 0]}>
            <boxGeometry args={[0.03, 0.35, 0.03]} />
          </mesh>
        </group>
      ))}

      {/* 6. Hexagonal Antique Victorian Glass Lantern */}
      <mesh material={materials.streetLampMetal} position={[0, 4.35, 0]}>
        <cylinderGeometry args={[0.26, 0.18, 0.06, 6]} />
      </mesh>

      {/* Glowing Warm Glass Lantern Housing */}
      <mesh material={materials.streetLampGlass} position={[0, 4.65, 0]}>
        <cylinderGeometry args={[0.3, 0.22, 0.54, 6]} />
      </mesh>

      {/* 6 Slender Cast-Iron Corner Ribs */}
      {Array.from({ length: 6 }).map((_, idx) => {
        const angle = (idx * Math.PI) / 3;
        const rx = Math.sin(angle) * 0.24;
        const rz = Math.cos(angle) * 0.24;
        return (
          <mesh key={idx} material={materials.streetLampMetal} position={[rx, 4.65, rz]}>
            <cylinderGeometry args={[0.008, 0.012, 0.54, 6]} />
          </mesh>
        );
      })}

      {/* Internal Glowing Brass Edison Filament Bulb */}
      <mesh material={materials.warmGlow} position={[0, 4.62, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
      </mesh>

      {/* Hexagonal Tiered Copper & Brass Lantern Roof */}
      <mesh material={materials.streetLampMetal} position={[0, 4.96, 0]}>
        <coneGeometry args={[0.34, 0.18, 6]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 5.08, 0]}>
        <sphereGeometry args={[0.05, 12, 12]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 5.2, 0]}>
        <coneGeometry args={[0.02, 0.18, 8]} />
      </mesh>

      {/* Warm Incandescent Lantern Illumination (Cast Shadow) */}
      <pointLight 
        position={[0, 4.65, 0]} 
        intensity={2.2} 
        distance={9.5} 
        color="#FFAE42" 
        castShadow 
        shadow-bias={-0.002}
      />
    </group>
  );
}

// ============================================================================
// REALISTIC LEAFY STREET TREE (Natural Bark, Branching & Layered Foliage)
// ============================================================================
export function RealisticLeafyStreetTree({ 
  position = [0, 0, 0], 
  scale = 1,
  rotationY = 0 
}: { 
  position?: [number, number, number]; 
  scale?: number;
  rotationY?: number;
}) {
  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* 1. Cast-Iron Tree Grating with Radial Slots in Sidewalk */}
      <mesh material={materials.streetLampMetal} position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.95, 1.05, 0.06, 24]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.07, 0]}>
        <torusGeometry args={[0.92, 0.022, 8, 24]} />
      </mesh>
      {/* Soil Bed inside grate */}
      <mesh material={materials.treeBark} position={[0, 0.065, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.02, 20]} />
      </mesh>

      {/* 2. Organic Trunk with Buttress Roots & Natural Curvature */}
      <mesh material={materials.treeBark} position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.36, 1.6, 14]} />
      </mesh>
      {/* Root buttresses */}
      {[0, 2.1, 4.2].map((ang, i) => (
        <mesh key={i} material={materials.treeBark} position={[Math.sin(ang) * 0.28, 0.25, Math.cos(ang) * 0.28]} rotation={[0.4, ang, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.16, 0.5, 8]} />
        </mesh>
      ))}

      {/* Mid Trunk with Subtle Bend */}
      <mesh material={materials.treeBark} position={[0.06, 2.0, 0.04]} rotation={[0.07, 0, -0.05]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.1, 12]} />
      </mesh>

      {/* Primary Structural Branches */}
      <mesh material={materials.treeBark} position={[-0.26, 2.8, -0.12]} rotation={[0.45, 0.3, -0.42]} castShadow>
        <cylinderGeometry args={[0.11, 0.16, 1.3, 10]} />
      </mesh>
      <mesh material={materials.treeBark} position={[0.32, 2.9, 0.14]} rotation={[-0.35, -0.2, 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.17, 1.4, 10]} />
      </mesh>
      <mesh material={materials.treeBark} position={[-0.05, 3.1, 0.3]} rotation={[-0.45, 0.1, 0.1]} castShadow>
        <cylinderGeometry args={[0.09, 0.14, 1.2, 10]} />
      </mesh>

      {/* 3. Layered Organic Foliage Clumps (Natural Foliage Silhouette) */}
      {/* Lower Shaded Canopy (Deep Emerald Green) */}
      <mesh material={materials.leafDark} position={[-0.65, 3.6, -0.35]} castShadow>
        <dodecahedronGeometry args={[1.05, 1]} />
      </mesh>
      <mesh material={materials.leafDark} position={[0.72, 3.7, 0.32]} castShadow>
        <dodecahedronGeometry args={[1.15, 1]} />
      </mesh>
      <mesh material={materials.leafDark} position={[0.0, 3.4, -0.65]} castShadow>
        <dodecahedronGeometry args={[0.95, 1]} />
      </mesh>
      <mesh material={materials.leafDark} position={[-0.1, 3.5, 0.65]} castShadow>
        <dodecahedronGeometry args={[0.92, 1]} />
      </mesh>

      {/* Mid Canopy (Vibrant Lush Green) */}
      <mesh material={materials.leafMedium} position={[-0.35, 4.4, 0.2]} castShadow>
        <dodecahedronGeometry args={[1.2, 1]} />
      </mesh>
      <mesh material={materials.leafMedium} position={[0.45, 4.5, -0.25]} castShadow>
        <dodecahedronGeometry args={[1.15, 1]} />
      </mesh>
      <mesh material={materials.leafMedium} position={[-0.45, 4.3, -0.45]} castShadow>
        <dodecahedronGeometry args={[0.9, 1]} />
      </mesh>
      <mesh material={materials.leafMedium} position={[0.3, 4.6, 0.45]} castShadow>
        <dodecahedronGeometry args={[0.95, 1]} />
      </mesh>

      {/* Upper Sunlit Canopy & Tips (Lime Olive Highlights) */}
      <mesh material={materials.leafLight} position={[0.0, 5.2, 0.05]} castShadow>
        <dodecahedronGeometry args={[1.0, 1]} />
      </mesh>
      <mesh material={materials.leafLight} position={[-0.25, 5.0, -0.3]} castShadow>
        <dodecahedronGeometry args={[0.75, 1]} />
      </mesh>
      <mesh material={materials.leafLight} position={[0.25, 5.1, 0.25]} castShadow>
        <dodecahedronGeometry args={[0.78, 1]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// REALISTIC FLUTED CERAMIC URN WITH SPIRAL TOPIARY
// ============================================================================
export function RealisticTopiaryUrn({ position = [0, 0, 0], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      {/* Plinth */}
      <mesh material={materials.streetCurb} position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.55, 0.12, 0.55]} />
      </mesh>
      {/* Classical Terracotta Urn */}
      <mesh material={materials.ceramicWhite} position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.28, 0.24, 16]} />
      </mesh>
      <mesh material={materials.ceramicWhite} position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.18, 0.28, 16]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.63, 0]}>
        <torusGeometry args={[0.35, 0.02, 8, 20]} />
      </mesh>

      {/* Layered Boxwood Topiary Spheres */}
      <mesh material={materials.leafDark} position={[0, 0.96, 0]} castShadow>
        <dodecahedronGeometry args={[0.42, 1]} />
      </mesh>
      <mesh material={materials.leafMedium} position={[0, 1.55, 0]} castShadow>
        <dodecahedronGeometry args={[0.32, 1]} />
      </mesh>
      <mesh material={materials.leafLight} position={[0, 2.05, 0]} castShadow>
        <dodecahedronGeometry args={[0.22, 1]} />
      </mesh>
      <mesh material={materials.leafMedium} position={[0, 2.4, 0]} castShadow>
        <coneGeometry args={[0.15, 0.38, 8]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// SIDEWALK FLOWER PLANTER TROUGH (Aged Wood & Brass with Blooming Flowers)
// ============================================================================
export function RealisticSidewalkPlanter({ position = [0, 0, 0], width = 2.0 }: { position?: [number, number, number]; width?: number }) {
  return (
    <group position={position}>
      {/* Wood Trough Body */}
      <mesh material={materials.shelfWood} position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[width, 0.52, 0.5]} />
      </mesh>
      {/* Antique Brass Corner Plates & Top Rim */}
      <mesh material={materials.brassAntique} position={[0, 0.54, 0]}>
        <boxGeometry args={[width + 0.04, 0.04, 0.54]} />
      </mesh>
      {/* Brass feet */}
      {[-width / 2 + 0.12, width / 2 - 0.12].map((bx, i) => (
        <mesh key={i} material={materials.brassAntique} position={[bx, 0.03, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.06, 12]} />
        </mesh>
      ))}

      {/* Foliage Bed */}
      <mesh material={materials.leafDark} position={[0, 0.58, 0]}>
        <boxGeometry args={[width - 0.08, 0.12, 0.42]} />
      </mesh>

      {/* Clusters of Blooming Garden Flowers (Pastel Pink Roses, Lavender & Peonies) */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((fx, idx) => (
        <group key={idx} position={[fx * (width / 2.0), 0.68, (idx % 2 === 0 ? 0.08 : -0.08)]}>
          <mesh material={idx % 2 === 0 ? materials.flowerPetals : materials.wallLavender} castShadow>
            <sphereGeometry args={[0.09, 8, 8]} />
          </mesh>
          <mesh material={materials.leafMedium} position={[0.04, -0.05, 0]}>
            <dodecahedronGeometry args={[0.06, 0]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ============================================================================
// PARISIAN SIDEWALK BISTRO BENCH (Dark Wrought-Iron Scrolls & Teak Slats)
// ============================================================================
export function RealisticSidewalkBench({ position = [0, 0, 0], rotationY = 0 }: { position?: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Cast Iron Legs with Classic Parisian Loops */}
      {[-0.85, 0.85].map((lx, i) => (
        <group key={i} position={[lx, 0, 0]}>
          <mesh material={materials.streetLampMetal} position={[0, 0.25, -0.22]}>
            <cylinderGeometry args={[0.025, 0.035, 0.5, 8]} />
          </mesh>
          <mesh material={materials.streetLampMetal} position={[0, 0.25, 0.22]}>
            <cylinderGeometry args={[0.025, 0.035, 0.5, 8]} />
          </mesh>
          <mesh material={materials.streetLampMetal} position={[0, 0.5, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.5]} />
          </mesh>
          {/* Decorative scroll loop */}
          <mesh material={materials.streetLampMetal} position={[0, 0.28, 0]}>
            <torusGeometry args={[0.12, 0.015, 6, 16]} />
          </mesh>
        </group>
      ))}

      {/* Teak Bench Seat Slats */}
      {[-0.16, -0.06, 0.06, 0.16].map((sz, i) => (
        <mesh key={i} material={materials.woodTeak} position={[0, 0.53, sz]}>
          <boxGeometry args={[1.9, 0.03, 0.08]} />
        </mesh>
      ))}

      {/* Bench Backrest Slats */}
      {[0.72, 0.85, 0.98].map((by, i) => (
        <mesh key={i} material={materials.woodTeak} position={[0, by, -0.24]}>
          <boxGeometry args={[1.9, 0.08, 0.03]} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// MASTER COMPLETE REALISTIC BOUTIQUE STREET ENVIRONMENT
// ============================================================================
export function BoutiqueStreetEnvironment() {
  const { cobbleTex, slabTex } = useStreetTextures();

  // Create textured materials
  const texturedCobblestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: cobbleTex,
      roughness: 0.82,
      metalness: 0.08,
    });
  }, [cobbleTex]);

  const texturedSidewalkMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: slabTex,
      roughness: 0.75,
      metalness: 0.04,
    });
  }, [slabTex]);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. EXTENSIVE STREET SUB-BASE FOUNDATION */}
      <mesh material={materials.foundation} position={[0, -0.28, 3.5]} receiveShadow>
        <boxGeometry args={[42, 0.45, 32]} />
      </mesh>

      {/* 2. REALISTIC COBBLESTONE ROADWAY WITH PROCEDURAL TEXTURE */}
      <mesh material={texturedCobblestoneMat} position={[0, -0.04, 12.0]} receiveShadow>
        <boxGeometry args={[40, 0.05, 13.0]} />
      </mesh>

      {/* Road Markings / Crosswalk Granite Pavers */}
      {[-7.2, -4.8, -2.4, 0.0, 2.4, 4.8, 7.2].map((cx, idx) => (
        <mesh key={idx} material={materials.ceramicWhite} position={[cx, -0.012, 9.4]}>
          <boxGeometry args={[1.3, 0.012, 2.2]} />
        </mesh>
      ))}

      {/* Stormwater Drainage Gutter along road curb */}
      <mesh material={materials.streetLampMetal} position={[0, -0.02, 7.6]}>
        <boxGeometry args={[26, 0.02, 0.28]} />
      </mesh>

      {/* 3. ELEVATED FRENCH LIMESTONE SIDEWALK WITH TEXTURED PAVERS */}
      {/* Front Sidewalk Promenade */}
      <mesh material={texturedSidewalkMat} position={[0, 0.07, 6.2]} receiveShadow>
        <boxGeometry args={[25, 0.22, 5.0]} />
      </mesh>

      {/* Left Sidewalk Promenade */}
      <mesh material={texturedSidewalkMat} position={[-9.2, 0.07, 0.4]} receiveShadow>
        <boxGeometry args={[7.2, 0.22, 13.0]} />
      </mesh>

      {/* Right Sidewalk Promenade */}
      <mesh material={texturedSidewalkMat} position={[9.2, 0.07, 0.4]} receiveShadow>
        <boxGeometry args={[7.2, 0.22, 13.0]} />
      </mesh>

      {/* Chamfered Granite Curbs with Brass Coping */}
      {/* Front Curb */}
      <mesh material={materials.streetCurb} position={[0, 0.11, 8.7]}>
        <boxGeometry args={[25.2, 0.26, 0.24]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.24, 8.65]}>
        <boxGeometry args={[25.2, 0.02, 0.04]} />
      </mesh>
      {/* Left Curb */}
      <mesh material={materials.streetCurb} position={[-12.8, 0.11, 0.4]}>
        <boxGeometry args={[0.24, 0.26, 13.0]} />
      </mesh>
      {/* Right Curb */}
      <mesh material={materials.streetCurb} position={[12.8, 0.11, 0.4]}>
        <boxGeometry args={[0.24, 0.26, 13.0]} />
      </mesh>

      {/* Boutique Marble Entry Threshold (Front walkway leading to shop) */}
      <mesh material={materials.ceramicWhite} position={[0, 0.14, 5.0]} receiveShadow>
        <boxGeometry args={[4.4, 0.12, 1.6]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.2, 5.8]}>
        <boxGeometry args={[4.42, 0.02, 0.04]} />
      </mesh>

      {/* Cast-Iron Sidewalk Bollards with Brass Finials */}
      {[-6.5, -3.8, 3.8, 6.5].map((bx, i) => (
        <group key={i} position={[bx, 0.18, 8.5]}>
          <mesh material={materials.streetLampMetal} position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.1, 0.7, 12]} />
          </mesh>
          <mesh material={materials.brassAntique} position={[0, 0.72, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          AUTHENTIC PARISIAN STREET LAMPS (Warm Lantern Illumination)
          ========================================================================= */}
      {/* Front Left Street Lamp */}
      <RealisticParisianStreetLamp position={[-7.4, 0.18, 7.4]} />
      {/* Front Right Street Lamp */}
      <RealisticParisianStreetLamp position={[7.4, 0.18, 7.4]} />
      {/* Sidewalk Avenue Corner Lamp */}
      <RealisticParisianStreetLamp position={[-11.2, 0.18, 0.8]} />

      {/* =========================================================================
          REALISTIC SCULPTURAL LEAFY TREES (Framing the Boutique)
          ========================================================================= */}
      {/* Left Front Street Tree (Framing left side) */}
      <RealisticLeafyStreetTree position={[-8.6, 0.18, 5.8]} scale={1.08} rotationY={0.5} />

      {/* Left Avenue Tree (Deep left avenue) */}
      <RealisticLeafyStreetTree position={[-10.4, 0.18, -3.2]} scale={1.0} rotationY={1.4} />

      {/* Right Front Tree (Framing right side naturally, shifted slightly back to avoid camera blockage) */}
      <RealisticLeafyStreetTree position={[9.2, 0.18, 6.5]} scale={1.02} rotationY={-0.8} />

      {/* =========================================================================
          CYPRESS TOPIARY URNS & SIDEWALK FLOWER PLANTERS
          ========================================================================= */}
      {/* Flanking the Boutique Entrance */}
      <RealisticTopiaryUrn position={[-2.8, 0.18, 5.6]} scale={0.88} />
      <RealisticTopiaryUrn position={[2.8, 0.18, 5.6]} scale={0.88} />

      {/* Corner Urns */}
      <RealisticTopiaryUrn position={[-6.2, 0.18, 5.2]} scale={0.82} />
      <RealisticTopiaryUrn position={[6.2, 0.18, 5.2]} scale={0.82} />

      {/* Sidewalk Flower Planters */}
      <RealisticSidewalkPlanter position={[-4.8, 0.18, 8.1]} width={2.2} />
      <RealisticSidewalkPlanter position={[4.8, 0.18, 8.1]} width={2.2} />

      {/* Classic Parisian Bistro Bench under the left tree */}
      <RealisticSidewalkBench position={[-8.6, 0.18, 3.2]} rotationY={Math.PI / 2} />
    </group>
  );
}
