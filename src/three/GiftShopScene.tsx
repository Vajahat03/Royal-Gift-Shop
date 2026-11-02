import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ShopInteriorShell } from './components/ShopInteriorShell';
import { BoutiqueStreetEnvironment } from './components/BoutiqueStreetEnvironment';
import { LeftWallRacks } from './components/LeftWallRacks';
import { FrontWallDisplay } from './components/FrontWallDisplay';
import { RightWallShelves } from './components/RightWallShelves';
import { DynamicShelfManager } from './components/DynamicShelfManager';
import { LightingSetup } from './lighting/LightingSetup';
import { getInterpolatedCamera } from './camera/cameraPositions';

interface GiftShopSceneProps {
  scrollProgress: number;
  mousePos: { x: number; y: number };
  isFreeOrbit: boolean;
  onSelectItem: (materialId: string) => void;
}

export function GiftShopScene({ scrollProgress, mousePos, isFreeOrbit, onSelectItem }: GiftShopSceneProps) {
  const { camera, gl } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 2.5, 0));
  
  // High-precision smooth physics refs for dampening
  const smoothedProgress = useRef(scrollProgress);
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));

  // Configure high-end shadow maps and ACESFilmic tone mapping on renderer
  React.useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.15;
  }, [gl]);

  useFrame((state, delta) => {
    if (isFreeOrbit) return;

    // 1. Smoothly damp the scroll progress with a gentle spring curve (eliminates mouse wheel jumps)
    const clampedDelta = Math.min(delta, 0.1);
    smoothedProgress.current = THREE.MathUtils.damp(
      smoothedProgress.current,
      scrollProgress,
      4.2,
      clampedDelta
    );

    // 2. Smoothly damp the cursor mouse coordinates (eliminates twitchy cursor movement)
    smoothedMouse.current.x = THREE.MathUtils.damp(
      smoothedMouse.current.x,
      mousePos.x,
      3.5,
      clampedDelta
    );
    smoothedMouse.current.y = THREE.MathUtils.damp(
      smoothedMouse.current.y,
      mousePos.y,
      3.5,
      clampedDelta
    );

    // 3. Compute continuous camera trajectory from damped progress
    const { position, target, fov } = getInterpolatedCamera(smoothedProgress.current);
    const targetPos = new THREE.Vector3(...position);
    const targetLook = new THREE.Vector3(...target);

    // Forward, right, and up vectors relative to current viewing direction
    const forwardVec = targetLook.clone().sub(targetPos).normalize();
    const rightVec = new THREE.Vector3().crossVectors(forwardVec, new THREE.Vector3(0, 1, 0)).normalize();
    const upVec = new THREE.Vector3(0, 1, 0);

    // Interior activation ramp: 0 at start diorama, 1 once user scrolls into the boutique
    const interiorFactor = Math.min(Math.max((smoothedProgress.current - 0.05) / 0.15, 0), 1);

    // 4. Cursor-directed area focal tracking:
    // Subtly parallax in diorama view, full shelf tracking once inside
    const trackingStrength = 0.5 + 1.7 * interiorFactor;
    targetLook.addScaledVector(rightVec, smoothedMouse.current.x * trackingStrength);
    targetLook.addScaledVector(upVec, -smoothedMouse.current.y * (trackingStrength * 0.75));

    // 5. Cursor-directed focal zoom:
    // When inside the shop, moving cursor towards a shelf area zooms into it
    const cursorDist = Math.hypot(smoothedMouse.current.x, smoothedMouse.current.y);
    const zoomStrength = Math.min(cursorDist * 1.1, 1.0); // 0 to 1
    const zoomDistance = zoomStrength * 2.2 * interiorFactor; // Push camera towards hovered shelf
    targetPos.addScaledVector(forwardVec, zoomDistance);

    // Damped camera glides towards target vectors
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPos.x, 3.8, clampedDelta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPos.y, 3.8, clampedDelta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPos.z, 3.8, clampedDelta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLook.x, 3.8, clampedDelta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLook.y, 3.8, clampedDelta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLook.z, 3.8, clampedDelta);

    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      // Dynamic focal zoom: narrow FOV slightly when focusing into an area
      const targetFov = fov - zoomStrength * 8;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 3.5, clampedDelta);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <LightingSetup />

      {/* OrbitControls enabled in free inspection mode with smooth damping */}
      {isFreeOrbit && (
        <OrbitControls 
          enableDamping 
          dampingFactor={0.06}
          rotateSpeed={0.65}
          zoomSpeed={0.75}
          minDistance={1.2} 
          maxDistance={14} 
          target={[0, 2.8, 0]} 
        />
      )}

      {/* Full 3-Wall Diorama Architectural Environment with Complete Street, Trees & Street Lamps */}
      <group position={[0, 0, 0]}>
        <BoutiqueStreetEnvironment />
        <ShopInteriorShell />
        <LeftWallRacks onSelectItem={onSelectItem} />
        <FrontWallDisplay onSelectItem={onSelectItem} />
        <RightWallShelves onSelectItem={onSelectItem} />
        {/* Dynamic Shelf Manager: Automatically places 3D models & clean name tags for catalog items */}
        <DynamicShelfManager onSelectItem={onSelectItem} />
      </group>
    </>
  );
}
