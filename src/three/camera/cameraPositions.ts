export interface CameraKeyframe {
  progress: number;
  title: string;
  subtitle: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // Scene 0: Petite Miniature 3D Diorama (Starting View — Diorama occupies the right 70%, text on left 30%)
  {
    progress: 0.0,
    title: "The Royal Gift Atelier — Petite Diorama",
    subtitle: "A miniature architectural world of bespoke gifts, royal treasures, and artisanal keepsakes.",
    position: [-3.6, 11.8, 22.0],
    target: [-3.6, 2.0, -0.6],
    fov: 34,
  },
  // Scene 1: Entering the Boutique Interior (Step inside as scroll begins)
  {
    progress: 0.18,
    title: "1. Atelier Interior & Three Walls",
    subtitle: "Open 3-wall luxury atelier view. View all shelves, display counters, and live inventory.",
    position: [0.0, 5.0, 8.5],
    target: [0.0, 2.4, -0.6],
    fov: 42,
  },
  // Scene 2: Left Wall — Camera moves opposite to right wall and zooms out to capture all shelves
  {
    progress: 0.45,
    title: "2. Left Wall — Handcrafted Teddies & Jewelry Racks",
    subtitle: "Big, Medium & Small plush bears, tumblers, and fine jewelry with camera on opposite wall.",
    position: [3.8, 3.8, 0.2],
    target: [-5.3, 3.4, 0.0],
    fov: 44,
  },
  // Scene 3: Front Wall — Camera moves back opposite front wall and zooms out to view top & lower shelves
  {
    progress: 0.72,
    title: "3. Front Wall — Traditional Wooden Boxes & French Perfumes",
    subtitle: "Carved keepsake wooden boxes, luxury perfumes, Hot Wheels, and wrapping paper station.",
    position: [0.0, 3.8, 7.6],
    target: [0.0, 3.0, -4.6],
    fov: 42,
  },
  // Scene 4: Right Wall — Camera moves towards left wall and zooms out to capture The Royal Gift counter & Crown
  {
    progress: 1.0,
    title: "4. Right Wall — 'The Royal Gift' Counter & Golden Crown",
    subtitle: "Compact luxury counter with embossed plaque, imperial 3D gold crown, and jewelry bouquet.",
    position: [-3.8, 3.8, 0.2],
    target: [5.3, 3.2, 0.0],
    fov: 44,
  },
];

// Quintic smoothstep for ultra-fluid cinematic acceleration and deceleration
function smoothQuintic(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function getInterpolatedCamera(progress: number): {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  currentKeyframe: CameraKeyframe;
} {
  const p = Math.max(0, Math.min(1, progress));

  let prev = CAMERA_KEYFRAMES[0];
  let next = CAMERA_KEYFRAMES[1];

  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (p >= CAMERA_KEYFRAMES[i].progress && p <= CAMERA_KEYFRAMES[i + 1].progress) {
      prev = CAMERA_KEYFRAMES[i];
      next = CAMERA_KEYFRAMES[i + 1];
      break;
    }
  }

  const range = next.progress - prev.progress || 1;
  const rawT = (p - prev.progress) / range;
  const t = Math.max(0, Math.min(1, rawT));
  const ease = smoothQuintic(t);

  const px = prev.position[0] + (next.position[0] - prev.position[0]) * ease;
  const py = prev.position[1] + (next.position[1] - prev.position[1]) * ease;
  const pz = prev.position[2] + (next.position[2] - prev.position[2]) * ease;

  const tx = prev.target[0] + (next.target[0] - prev.target[0]) * ease;
  const ty = prev.target[1] + (next.target[1] - prev.target[1]) * ease;
  const tz = prev.target[2] + (next.target[2] - prev.target[2]) * ease;

  const fov = prev.fov + (next.fov - prev.fov) * ease;
  const activeKeyframe = t < 0.5 ? prev : next;

  return {
    position: [px, py, pz],
    target: [tx, ty, tz],
    fov,
    currentKeyframe: activeKeyframe,
  };
}
