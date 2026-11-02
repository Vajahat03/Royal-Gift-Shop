import React from 'react';

export function LightingSetup() {
  return (
    <>
      {/* Warm Ambient Fill Light with Soft Tone */}
      <ambientLight intensity={0.95} color="#FFF8F0" />

      {/* Main Luxury Boutique Key Light (Warm Sun & Skylight) */}
      <directionalLight
        position={[4, 10, 5]}
        intensity={1.4}
        color="#FFF3E2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />

      {/* Secondary Soft Fill from Opposite Corner for Realistic Shadow Roll-off */}
      <directionalLight position={[-6, 7, -4]} intensity={0.5} color="#E8DDF5" />

      {/* Central Chandelier Warm Spotlight Focused on Shop Interior Floor */}
      <spotLight
        position={[0, 4.8, 0]}
        target-position={[0, 0, 0]}
        intensity={2.2}
        distance={12}
        angle={Math.PI / 3}
        penumbra={0.8}
        color="#FFE6C7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Left Wall Shelving Illumination Spotlight */}
      <spotLight
        position={[-1.5, 4.5, 0]}
        target-position={[-5.3, 3.0, 0]}
        intensity={1.6}
        distance={8}
        angle={Math.PI / 3.2}
        penumbra={0.7}
        color="#FFEED4"
      />

      {/* Front Wall Showcase Illumination Spotlight */}
      <spotLight
        position={[0, 4.5, -1.0]}
        target-position={[0, 2.5, -4.6]}
        intensity={1.6}
        distance={8}
        angle={Math.PI / 3.2}
        penumbra={0.7}
        color="#FFEED4"
      />
    </>
  );
}
