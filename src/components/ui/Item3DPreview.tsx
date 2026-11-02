import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { resolveProceduralModelType, ProceduralModelType } from '../../three/ui-previews/modelResolver';
import { Procedural3DItemModel } from '../../three/ui-previews/proceduralModels';

interface Item3DPreviewProps {
  name: string;
  description?: string;
  isHovered?: boolean;
  className?: string;
  fov?: number;
  showShadow?: boolean;
}

function CardModelStage({
  modelType,
  mouse,
  isHovered,
  showShadow
}: {
  modelType: ProceduralModelType;
  mouse: { x: number; y: number };
  isHovered: boolean;
  showShadow: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smoothly tilt and rotate following cursor position
    const targetRotY = mouse.x * 0.9;
    const targetRotX = -mouse.y * 0.45;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 7, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 7, delta);
  });

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight position={[2.5, 3.5, 2.0]} intensity={1.5} color="#FFE7CC" />
      <directionalLight position={[-2.5, -1.0, -2.0]} intensity={0.9} color="#D49B4B" />
      <pointLight position={[0, 1.2, 1.5]} intensity={0.4} color="#FFFFFF" />

      {/* Soft contact shadow disc */}
      {showShadow && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.68, 0]}>
          <circleGeometry args={[0.62, 32]} />
          <meshBasicMaterial color="#5E1B2E" transparent opacity={0.14} depthWrite={false} />
        </mesh>
      )}

      <group ref={groupRef}>
        <Procedural3DItemModel type={modelType} isHovered={isHovered} />
      </group>
    </>
  );
}

export function Item3DPreview({
  name,
  description,
  isHovered: externalHover,
  className = '',
  fov = 34,
  showShadow = true
}: Item3DPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalHover, setInternalHover] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const activeHover = externalHover !== undefined ? externalHover : internalHover;
  const modelType = resolveProceduralModelType(name, description);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMouse({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setInternalHover(false);
    setMouse({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none ${className}`}
      onMouseEnter={() => setInternalHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.2], fov: fov }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        className="w-full h-full pointer-events-none"
      >
        <CardModelStage
          modelType={modelType}
          mouse={mouse}
          isHovered={activeHover}
          showShadow={showShadow}
        />
      </Canvas>
    </div>
  );
}

export default Item3DPreview;
