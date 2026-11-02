import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { materials } from '../materials/materials';
import { ProceduralModelType } from './modelResolver';

// ============================================================================
// 1. TEDDY MODEL
// ============================================================================
export function TeddyModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Joyful hop + head tilt
      groupRef.current.position.y = Math.abs(Math.sin(t * 7)) * 0.22;
      if (headRef.current) headRef.current.rotation.z = Math.sin(t * 6) * 0.18;
      if (armRef.current) armRef.current.rotation.z = Math.sin(t * 12) * 0.45 + 0.6;
    } else {
      // Gentle breathe
      groupRef.current.position.y = Math.sin(t * 2) * 0.04;
      if (headRef.current) headRef.current.rotation.z = THREE.MathUtils.damp(headRef.current.rotation.z, 0, 4, delta);
      if (armRef.current) armRef.current.rotation.z = THREE.MathUtils.damp(armRef.current.rotation.z, 0, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Torso */}
      <mesh material={materials.teddyMocha} position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.38, 16, 16]} />
      </mesh>
      {/* Belly */}
      <mesh material={materials.teddyCream} position={[0, 0.4, 0.18]}>
        <sphereGeometry args={[0.26, 14, 14]} />
      </mesh>
      {/* Bow Tie */}
      <mesh material={materials.roseCrimson} position={[0, 0.72, 0.22]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
      </mesh>

      {/* Head Group */}
      <group ref={headRef} position={[0, 0.95, 0]}>
        <mesh material={materials.teddyMocha}>
          <sphereGeometry args={[0.32, 16, 16]} />
        </mesh>
        {/* Snout */}
        <mesh material={materials.teddyCream} position={[0, -0.06, 0.22]}>
          <sphereGeometry args={[0.14, 12, 12]} />
        </mesh>
        {/* Nose & Eyes */}
        <mesh material={materials.velvetBlack} position={[0, -0.02, 0.34]}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>
        <mesh material={materials.velvetBlack} position={[-0.1, 0.06, 0.28]}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
        <mesh material={materials.velvetBlack} position={[0.1, 0.06, 0.28]}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
        {/* Ears */}
        <mesh material={materials.teddyMocha} position={[-0.24, 0.24, 0]}>
          <sphereGeometry args={[0.11, 10, 10]} />
        </mesh>
        <mesh material={materials.teddyMocha} position={[0.24, 0.24, 0]}>
          <sphereGeometry args={[0.11, 10, 10]} />
        </mesh>
      </group>

      {/* Waving Right Arm */}
      <mesh ref={armRef} material={materials.teddyMocha} position={[0.38, 0.52, 0]}>
        <capsuleGeometry args={[0.1, 0.25, 6, 10]} />
      </mesh>
      {/* Left Arm */}
      <mesh material={materials.teddyMocha} position={[-0.38, 0.52, 0]}>
        <capsuleGeometry args={[0.1, 0.25, 6, 10]} />
      </mesh>
      {/* Legs */}
      <mesh material={materials.teddyMocha} position={[-0.2, 0.1, 0.15]} rotation={[Math.PI / 4, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.26, 6, 10]} />
      </mesh>
      <mesh material={materials.teddyMocha} position={[0.2, 0.1, 0.15]} rotation={[Math.PI / 4, 0, 0]}>
        <capsuleGeometry args={[0.12, 0.26, 6, 10]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 2. NECKLACE MODEL
// ============================================================================
export function NecklaceModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pendantRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      groupRef.current.rotation.y += delta * 1.8;
      if (pendantRef.current) {
        pendantRef.current.rotation.z = Math.sin(t * 8) * 0.25;
        pendantRef.current.scale.setScalar(1.2 + Math.sin(t * 10) * 0.1);
      }
    } else {
      groupRef.current.rotation.y = Math.sin(t * 1.2) * 0.25;
      if (pendantRef.current) {
        pendantRef.current.rotation.z = THREE.MathUtils.damp(pendantRef.current.rotation.z, 0, 4, delta);
        pendantRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Velvet Jewelry Bust Stand */}
      <mesh material={materials.velvetBlack} position={[0, 0.6, 0]}>
        <coneGeometry args={[0.5, 1.1, 16]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.42, 0.46, 0.1, 20]} />
      </mesh>

      {/* Gold Chain Torus */}
      <mesh material={materials.gold} position={[0, 0.78, 0.08]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.3, 0.022, 12, 32]} />
      </mesh>

      {/* Sparkling Ruby / Diamond Pendant */}
      <mesh ref={pendantRef} material={materials.gemRuby} position={[0, 0.52, 0.32]}>
        <octahedronGeometry args={[0.1, 0]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 3. HOTWHEELS CAR MODEL
// ============================================================================
export function HotwheelsModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Chassis rev vibrate + wheelie tilt
      groupRef.current.rotation.x = -0.18 + Math.sin(t * 30) * 0.02;
      groupRef.current.position.y = Math.sin(t * 25) * 0.015;
      if (wheelsRef.current) {
        wheelsRef.current.children.forEach(w => {
          w.rotation.x += delta * 25;
        });
      }
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 4, delta);
      groupRef.current.position.y = Math.sin(t * 2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Sports Coupe Body */}
      <mesh material={materials.hotwheelsRed} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.65, 0.22, 1.4]} />
      </mesh>
      {/* Cabin Roof */}
      <mesh material={materials.glass} position={[0, 0.36, -0.05]}>
        <boxGeometry args={[0.55, 0.18, 0.7]} />
      </mesh>
      {/* Rear Spoiler */}
      <mesh material={materials.velvetBlack} position={[0, 0.35, -0.62]}>
        <boxGeometry args={[0.65, 0.04, 0.14]} />
      </mesh>
      {/* Alloy Wheels */}
      <group ref={wheelsRef}>
        {[
          [-0.34, 0.08, 0.42],
          [0.34, 0.08, 0.42],
          [-0.34, 0.08, -0.42],
          [0.34, 0.08, -0.42],
        ].map(([wx, wy, wz], i) => (
          <mesh key={i} material={materials.steel} position={[wx, wy, wz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================================================
// 4. FLOWERS MODEL
// ============================================================================
export function FlowersModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const petalsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      groupRef.current.rotation.z = Math.sin(t * 3.5) * 0.14;
      if (petalsRef.current) {
        petalsRef.current.children.forEach((p, idx) => {
          const s = 1.15 + Math.sin(t * 5 + idx) * 0.15;
          p.scale.set(s, s, s);
        });
      }
    } else {
      groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
      if (petalsRef.current) {
        petalsRef.current.children.forEach(p => p.scale.set(1, 1, 1));
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Kraft Paper Floral Cone */}
      <mesh material={materials.kraftPaper} position={[0, 0.35, 0]}>
        <coneGeometry args={[0.38, 0.85, 16]} />
      </mesh>
      {/* Gold Ribbon Tie */}
      <mesh material={materials.gold} position={[0, 0.28, 0]}>
        <torusGeometry args={[0.18, 0.03, 8, 16]} />
      </mesh>

      {/* Layered Blooming Flower Heads */}
      <group ref={petalsRef} position={[0, 0.8, 0]}>
        <mesh material={materials.flowerPetals} position={[0, 0.1, 0]}>
          <dodecahedronGeometry args={[0.22, 1]} />
        </mesh>
        <mesh material={materials.tulipCoral} position={[-0.18, 0.02, 0.1]}>
          <dodecahedronGeometry args={[0.16, 1]} />
        </mesh>
        <mesh material={materials.sunflowerYellow} position={[0.18, 0.04, -0.05]}>
          <dodecahedronGeometry args={[0.18, 1]} />
        </mesh>
        <mesh material={materials.peonyBlush} position={[0.05, 0.02, 0.18]}>
          <dodecahedronGeometry args={[0.15, 1]} />
        </mesh>
        {/* Leaves */}
        <mesh material={materials.plantGreen} position={[-0.24, -0.1, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
        <mesh material={materials.plantGreen} position={[0.24, -0.1, 0.1]}>
          <sphereGeometry args={[0.1, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 5. BRACELETS MODEL
// ============================================================================
export function BraceletModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bangleRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!bangleRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Levitates off cushion & spins smoothly
      bangleRef.current.position.y = 0.58 + Math.sin(t * 4) * 0.12;
      bangleRef.current.rotation.y += delta * 3;
      bangleRef.current.rotation.x = Math.sin(t * 2) * 0.15;
    } else {
      bangleRef.current.position.y = THREE.MathUtils.damp(bangleRef.current.position.y, 0.42, 4, delta);
      bangleRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Velvet Cushion */}
      <mesh material={materials.velvetBlack} position={[0, 0.15, 0]}>
        <boxGeometry args={[0.75, 0.28, 0.75]} />
      </mesh>
      <mesh material={materials.brassAntique} position={[0, 0.28, 0]}>
        <boxGeometry args={[0.77, 0.02, 0.77]} />
      </mesh>

      {/* Floating Rose Gold Charm Bangle */}
      <group ref={bangleRef} position={[0, 0.42, 0]}>
        <mesh material={materials.gold} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.035, 16, 32]} />
        </mesh>
        {/* Pearl & Heart Charms */}
        <mesh material={materials.glass} position={[0, -0.28, 0.08]}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
        <mesh material={materials.gemRuby} position={[0.22, -0.18, -0.06]}>
          <octahedronGeometry args={[0.06, 0]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 6. WATCHES MODEL
// ============================================================================
export function WatchModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Tilt toward viewer & hands sweep rapidly
      groupRef.current.rotation.x = 0.4 + Math.sin(t * 3) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 2) * 0.2;
      if (handRef.current) handRef.current.rotation.z -= delta * 18;
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 4, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, 0, 4, delta);
      if (handRef.current) handRef.current.rotation.z -= delta * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Leather Strap */}
      <mesh material={materials.leatherCognac} position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 0.95, 0.05]} />
      </mesh>
      {/* Gold Watch Bezel */}
      <mesh material={materials.gold} position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.08, 24]} />
      </mesh>
      {/* White Dial Face */}
      <mesh material={materials.ceramicWhite} position={[0, 0, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.01, 24]} />
      </mesh>
      {/* Sweeping Watch Hand */}
      <mesh ref={handRef} material={materials.steel} position={[0, 0, 0.095]}>
        <boxGeometry args={[0.02, 0.16, 0.005]} />
      </mesh>
      {/* Crown Button */}
      <mesh material={materials.gold} position={[0.3, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 12]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 7. WAIST BELT MODEL
// ============================================================================
export function BeltModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coilRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!coilRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      coilRef.current.scale.x = 1 + Math.sin(t * 6) * 0.12;
      coilRef.current.rotation.z = Math.sin(t * 4) * 0.2;
    } else {
      coilRef.current.scale.x = THREE.MathUtils.damp(coilRef.current.scale.x, 1, 4, delta);
      coilRef.current.rotation.z = THREE.MathUtils.damp(coilRef.current.rotation.z, 0, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Coiled Leather Belt Group */}
      <group ref={coilRef}>
        <mesh material={materials.leatherCognac} position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.24, 24]} />
        </mesh>
        <mesh material={materials.leatherBlack} position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.28, 0.28, 0.26, 24]} />
        </mesh>
      </group>

      {/* Gleaming Brushed Brass Buckle */}
      <mesh material={materials.gold} position={[0.34, 0.25, 0.22]}>
        <boxGeometry args={[0.16, 0.32, 0.06]} />
      </mesh>
      {/* Buckle Tongue */}
      <mesh material={materials.steel} position={[0.34, 0.25, 0.25]}>
        <cylinderGeometry args={[0.015, 0.015, 0.22, 8]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 8. PERFUMES MODEL
// ============================================================================
export function PerfumeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const mistRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Cap lifts upward + mist puffs
      if (capRef.current) capRef.current.position.y = 0.82 + Math.sin(t * 5) * 0.08;
      if (mistRef.current) {
        mistRef.current.position.y = 0.95 + ((t * 2) % 0.6);
        mistRef.current.scale.setScalar(0.8 + ((t * 2) % 0.6));
      }
    } else {
      if (capRef.current) capRef.current.position.y = THREE.MathUtils.damp(capRef.current.position.y, 0.68, 5, delta);
      if (mistRef.current) mistRef.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Crystal Flacon Bottle */}
      <mesh material={materials.glass} position={[0, 0.28, 0]}>
        <boxGeometry args={[0.48, 0.55, 0.32]} />
      </mesh>
      {/* Amber Perfume Liquid Inside */}
      <mesh material={materials.perfumeRose} position={[0, 0.24, 0]}>
        <boxGeometry args={[0.42, 0.45, 0.26]} />
      </mesh>
      {/* Atomizer Collar */}
      <mesh material={materials.gold} position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.08, 16]} />
      </mesh>
      {/* Faceted Cut-Glass Stopper Cap */}
      <mesh ref={capRef} material={materials.glass} position={[0, 0.68, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
      </mesh>

      {/* Translucent Mist Spheres Puff */}
      <group ref={mistRef} position={[0, 0.95, 0]}>
        <mesh material={materials.glass} position={[-0.08, 0, 0.05]}>
          <sphereGeometry args={[0.06, 8, 8]} />
        </mesh>
        <mesh material={materials.glass} position={[0.08, 0.08, -0.05]}>
          <sphereGeometry args={[0.05, 8, 8]} />
        </mesh>
        <mesh material={materials.glass} position={[0, 0.12, 0.08]}>
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 9. GIFT BOXES MODEL
// ============================================================================
export function GiftBoxModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!lidRef.current) return;
    if (isHovered) {
      // Lid pops up and hovers at an angle
      lidRef.current.position.y = 0.58;
      lidRef.current.rotation.x = -0.35;
      lidRef.current.rotation.z = 0.15;
    } else {
      lidRef.current.position.y = THREE.MathUtils.damp(lidRef.current.position.y, 0.36, 5, delta);
      lidRef.current.rotation.x = THREE.MathUtils.damp(lidRef.current.rotation.x, 0, 5, delta);
      lidRef.current.rotation.z = THREE.MathUtils.damp(lidRef.current.rotation.z, 0, 5, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* Box Base */}
      <mesh material={materials.wallLavender} position={[0, 0.15, 0]}>
        <boxGeometry args={[0.68, 0.32, 0.68]} />
      </mesh>
      {/* Interior Warm Light */}
      <pointLight position={[0, 0.28, 0]} color="#FFAE42" intensity={isHovered ? 2.5 : 0.5} distance={1.2} />

      {/* Lid Group with Bow & Ribbons */}
      <group ref={lidRef} position={[0, 0.36, 0]}>
        <mesh material={materials.roseBlush}>
          <boxGeometry args={[0.72, 0.08, 0.72]} />
        </mesh>
        {/* Cross Ribbons */}
        <mesh material={materials.gold} position={[0, 0.045, 0]}>
          <boxGeometry args={[0.73, 0.02, 0.12]} />
        </mesh>
        <mesh material={materials.gold} position={[0, 0.045, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.73]} />
        </mesh>
        {/* Bow Tie Knot */}
        <mesh material={materials.gold} position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 10, 10]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 10. WRAPPING PAPER MODEL
// ============================================================================
export function WrappingPaperModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const rollsRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rollsRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      rollsRef.current.rotation.y += delta * 4;
      rollsRef.current.rotation.z = Math.sin(t * 5) * 0.1;
    } else {
      rollsRef.current.rotation.y += delta * 0.6;
      rollsRef.current.rotation.z = THREE.MathUtils.damp(rollsRef.current.rotation.z, 0, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={rollsRef}>
        {/* Roll 1: Lavender Pattern */}
        <mesh material={materials.wallLavender} position={[-0.12, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.11, 0.11, 0.95, 20]} />
        </mesh>
        {/* Roll 2: Blush Pink Pattern */}
        <mesh material={materials.roseBlush} position={[0.12, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.11, 0.11, 0.95, 20]} />
        </mesh>
        {/* Gold Ribbon Bands */}
        <mesh material={materials.gold} position={[0, 0, 0]}>
          <torusGeometry args={[0.22, 0.03, 8, 20]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 11. WET WIPES MODEL
// ============================================================================
export function WetWipesModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const wipeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!lidRef.current) return;
    if (isHovered) {
      // Flip-top snaps open + wipe peeks upward
      lidRef.current.rotation.x = -1.4;
      if (wipeRef.current) wipeRef.current.position.y = 0.28;
    } else {
      lidRef.current.rotation.x = THREE.MathUtils.damp(lidRef.current.rotation.x, 0, 6, delta);
      if (wipeRef.current) wipeRef.current.position.y = THREE.MathUtils.damp(wipeRef.current.position.y, 0.18, 6, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Softpack Pouch */}
      <mesh material={materials.basketLining} position={[0, 0.12, 0]}>
        <boxGeometry args={[0.72, 0.24, 0.48]} />
      </mesh>
      {/* Lavender Cap Rim */}
      <mesh material={materials.wallLavender} position={[0, 0.24, 0]}>
        <boxGeometry args={[0.34, 0.03, 0.26]} />
      </mesh>

      {/* Flip-Top Lid Hinge Group */}
      <group ref={lidRef} position={[0, 0.26, -0.12]}>
        <mesh material={materials.tulipLilac} position={[0, 0.015, 0.12]}>
          <boxGeometry args={[0.32, 0.02, 0.24]} />
        </mesh>
      </group>

      {/* Soft White Wipe Peeking */}
      <mesh ref={wipeRef} material={materials.basketLining} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.02]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 12. FACE MASK SKIN CARE MODEL
// ============================================================================
export function FaceMaskModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const jarLidRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!jarLidRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Jar lid unscrews & floats
      jarLidRef.current.position.y = 0.52 + Math.sin(t * 4) * 0.05;
      jarLidRef.current.rotation.y += delta * 4;
    } else {
      jarLidRef.current.position.y = THREE.MathUtils.damp(jarLidRef.current.position.y, 0.34, 5, delta);
      jarLidRef.current.rotation.y = THREE.MathUtils.damp(jarLidRef.current.rotation.y, 0, 5, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Cosmetic Cream Jar */}
      <mesh material={materials.glass} position={[-0.15, 0.18, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.28, 20]} />
      </mesh>
      {/* Silky Cream Inside */}
      <mesh material={materials.ceramicWhite} position={[-0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.22, 16]} />
      </mesh>
      {/* Rose Gold Lid */}
      <mesh ref={jarLidRef} material={materials.gold} position={[-0.15, 0.34, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.06, 20]} />
      </mesh>

      {/* Glossy Sachet Sheet Mask Packet */}
      <mesh material={materials.gold} position={[0.22, 0.28, -0.05]} rotation={[-0.15, -0.25, 0.1]}>
        <boxGeometry args={[0.42, 0.58, 0.03]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// 13. GOGGLES / SUNGLASSES MODEL
// ============================================================================
export function GogglesModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!glassRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      glassRef.current.rotation.y = Math.sin(t * 3) * 0.35;
      glassRef.current.rotation.x = -0.15 + Math.sin(t * 2) * 0.1;
    } else {
      glassRef.current.rotation.y = THREE.MathUtils.damp(glassRef.current.rotation.y, 0, 4, delta);
      glassRef.current.rotation.x = THREE.MathUtils.damp(glassRef.current.rotation.x, 0, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={glassRef}>
        {/* Gold Frame Bridge */}
        <mesh material={materials.gold} position={[0, 0.08, 0]}>
          <boxGeometry args={[0.12, 0.025, 0.02]} />
        </mesh>
        {/* Left Lens & Rim */}
        <mesh material={materials.gold} position={[-0.22, 0.08, 0]}>
          <boxGeometry args={[0.32, 0.24, 0.03]} />
        </mesh>
        <mesh material={materials.velvetBlack} position={[-0.22, 0.08, 0.005]}>
          <boxGeometry args={[0.28, 0.2, 0.025]} />
        </mesh>
        {/* Right Lens & Rim */}
        <mesh material={materials.gold} position={[0.22, 0.08, 0]}>
          <boxGeometry args={[0.32, 0.24, 0.03]} />
        </mesh>
        <mesh material={materials.velvetBlack} position={[0.22, 0.08, 0.005]}>
          <boxGeometry args={[0.28, 0.2, 0.025]} />
        </mesh>
        {/* Temples (Arms) */}
        <mesh material={materials.gold} position={[-0.37, 0.08, -0.22]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.02, 0.02, 0.44]} />
        </mesh>
        <mesh material={materials.gold} position={[0.37, 0.08, -0.22]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.02, 0.44]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 14. CHOCOLATES MODEL
// ============================================================================
export function ChocolatesModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const trufflesRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!trufflesRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      // Truffles levitate in a sequential wave
      trufflesRef.current.children.forEach((child, idx) => {
        child.position.y = 0.2 + Math.sin(t * 6 + idx * 1.5) * 0.12;
      });
    } else {
      trufflesRef.current.children.forEach(child => {
        child.position.y = THREE.MathUtils.damp(child.position.y, 0.14, 5, delta);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Gold-Lined Ballotin Tray */}
      <mesh material={materials.shelfWood} position={[0, 0.06, 0]}>
        <boxGeometry args={[0.82, 0.1, 0.62]} />
      </mesh>
      <mesh material={materials.gold} position={[0, 0.115, 0]}>
        <boxGeometry args={[0.78, 0.02, 0.58]} />
      </mesh>

      {/* Artisan Swirled Truffles */}
      <group ref={trufflesRef}>
        {/* Dark Truffle */}
        <mesh material={materials.velvetBlack} position={[-0.24, 0.14, -0.12]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        {/* Milk Chocolate Truffle */}
        <mesh material={materials.teddyMocha} position={[0, 0.14, -0.12]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        {/* White Truffle */}
        <mesh material={materials.ceramicWhite} position={[0.24, 0.14, -0.12]}>
          <sphereGeometry args={[0.09, 12, 12]} />
        </mesh>
        {/* Gold Dusted Truffle */}
        <mesh material={materials.gold} position={[-0.12, 0.14, 0.14]}>
          <sphereGeometry args={[0.085, 12, 12]} />
        </mesh>
        {/* Ruby Chocolate Truffle */}
        <mesh material={materials.roseCrimson} position={[0.12, 0.14, 0.14]}>
          <sphereGeometry args={[0.085, 12, 12]} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 15. DEFAULT FALLBACK MODEL (Petite Maison Ivory-Burgundy Cube & Gold Wax Seal)
// ============================================================================
export function FallbackCubeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const sealRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!sealRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (isHovered) {
      sealRef.current.position.y = 0.58 + Math.sin(t * 5) * 0.08;
      sealRef.current.rotation.y += delta * 3;
      groupRef.current.rotation.y += delta * 0.8;
    } else {
      sealRef.current.position.y = THREE.MathUtils.damp(sealRef.current.position.y, 0.38, 5, delta);
      groupRef.current.rotation.y = Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Ivory Cube */}
      <mesh material={materials.basketLining} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.56, 0.56, 0.56]} />
      </mesh>
      {/* Burgundy Ribbon Cross */}
      <mesh material={materials.crownVelvet} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.58, 0.58, 0.12]} />
      </mesh>
      <mesh material={materials.crownVelvet} position={[0, 0.18, 0]}>
        <boxGeometry args={[0.12, 0.58, 0.58]} />
      </mesh>
      {/* Gold Royal Wax Seal */}
      <mesh ref={sealRef} material={materials.gold} position={[0, 0.38, 0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
      </mesh>
    </group>
  );
}

// ============================================================================
// MASTER DYNAMIC PROCEDURAL MODEL SWITCHER
// ============================================================================
export function Procedural3DItemModel({
  type,
  isHovered = false
}: {
  type: ProceduralModelType;
  isHovered?: boolean;
}) {
  switch (type) {
    case 'teddy':
      return <TeddyModel isHovered={isHovered} />;
    case 'necklace':
      return <NecklaceModel isHovered={isHovered} />;
    case 'hotwheels':
      return <HotwheelsModel isHovered={isHovered} />;
    case 'flowers':
      return <FlowersModel isHovered={isHovered} />;
    case 'bracelet':
      return <BraceletModel isHovered={isHovered} />;
    case 'watch':
      return <WatchModel isHovered={isHovered} />;
    case 'belt':
      return <BeltModel isHovered={isHovered} />;
    case 'perfume':
      return <PerfumeModel isHovered={isHovered} />;
    case 'gift_box':
      return <GiftBoxModel isHovered={isHovered} />;
    case 'wrapping_paper':
      return <WrappingPaperModel isHovered={isHovered} />;
    case 'wet_wipes':
      return <WetWipesModel isHovered={isHovered} />;
    case 'face_mask':
      return <FaceMaskModel isHovered={isHovered} />;
    case 'goggles':
      return <GogglesModel isHovered={isHovered} />;
    case 'chocolates':
      return <ChocolatesModel isHovered={isHovered} />;
    case 'fallback':
    default:
      return <FallbackCubeModel isHovered={isHovered} />;
  }
}
