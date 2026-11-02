import * as THREE from 'three';

// Boutique Luxury Color Palette
export const COLORS = {
  cream: '#FFF9F2',
  creamDark: '#F3E9DD',
  lavender: '#C9B8E8',
  blushPink: '#F5C9D6',
  mutedPurple: '#8873B5',
  darkCharcoal: '#1E1B24',
  subtleGold: '#D4AF37',
  champagneGold: '#E6CA65',
  softBeige: '#E9DDCE',
  oakWood: '#8B5A2B',
  darkWalnut: '#4A2E1B',
  lightWood: '#C8A882',
  wicker: '#9E7247',
  velvetBlack: '#18151D',
  plantGreen: '#4A7C59',
  flowerRose: '#E06D8A',
  chocolateBrown: '#3B2219',
  stainlessSteel: '#E2E8F0',
  glass: '#F0F9FF'
};

export const materials = {
  // Walls
  wallCream: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.cream),
    roughness: 0.7,
    metalness: 0.02,
  }),

  wallLavender: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.lavender),
    roughness: 0.55,
    metalness: 0.05,
  }),

  // Shelving Wood - Rich Walnut & Satin Oak
  shelfWood: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.darkWalnut),
    roughness: 0.35,
    metalness: 0.08,
  }),

  shelfDivider: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.creamDark),
    roughness: 0.5,
    metalness: 0.04,
  }),

  // Pavement / Foundations
  pavement: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.softBeige),
    roughness: 0.85,
    metalness: 0.02,
  }),

  foundation: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.darkCharcoal),
    roughness: 0.6,
    metalness: 0.25,
  }),

  // Brushed 18k Gold & Brass
  gold: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.subtleGold),
    roughness: 0.22,
    metalness: 0.88,
  }),

  champagneGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.champagneGold),
    roughness: 0.18,
    metalness: 0.85,
  }),

  // Polished Stainless Steel & Chrome
  steel: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.stainlessSteel),
    roughness: 0.15,
    metalness: 0.95,
  }),

  // Woven Wicker / Rattan Basket
  wickerBasket: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.wicker),
    roughness: 0.85,
    metalness: 0.05,
  }),

  basketLining: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FAF5EE'),
    roughness: 0.8,
    metalness: 0.0,
  }),

  // Velvet Jewelry Trays & Cushions
  velvetBlack: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.velvetBlack),
    roughness: 0.9,
    metalness: 0.1,
  }),

  // High-End Crystal Glass
  glass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(COLORS.glass),
    transparent: true,
    opacity: 0.25,
    roughness: 0.04,
    transmission: 0.92,
    thickness: 0.6,
    ior: 1.52,
  }),

  // Interior Hardwood Parquet Floor
  interiorFloor: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.oakWood),
    roughness: 0.32,
    metalness: 0.08,
  }),

  // Gift Boxes & Ribbons
  giftBlush: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.blushPink),
    roughness: 0.38,
    metalness: 0.08,
  }),

  giftLavender: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.lavender),
    roughness: 0.38,
    metalness: 0.08,
  }),

  giftPurple: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.mutedPurple),
    roughness: 0.35,
    metalness: 0.12,
  }),

  ribbonGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.subtleGold),
    roughness: 0.2,
    metalness: 0.75,
  }),

  // Plush Fur Material with soft matte scattering look
  teddyFur: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C6925B'),
    roughness: 0.95,
    metalness: 0.0,
  }),

  teddySnout: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F0DCC2'),
    roughness: 0.85,
  }),

  teddyEyes: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#100D14'),
    roughness: 0.05,
    metalness: 0.9,
  }),

  // Chocolates
  chocolate: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.chocolateBrown),
    roughness: 0.25,
    metalness: 0.15,
  }),

  // Florals
  flowerPetals: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.flowerRose),
    roughness: 0.5,
  }),

  plantGreen: new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.plantGreen),
    roughness: 0.65,
  }),

  ceramicWhite: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FCFBF9'),
    roughness: 0.18,
    metalness: 0.08,
  }),

  // Warm LED Under-Shelf Light Strip
  ledStripGlow: new THREE.MeshBasicMaterial({
    color: new THREE.Color('#FFF5DB'),
  }),

  warmGlow: new THREE.MeshBasicMaterial({
    color: new THREE.Color('#FFE8BD'),
  }),

  // --- TRADITIONAL WOODS & ANTIQUE BRASS ---
  woodMahogany: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4A150E'),
    roughness: 0.35,
    metalness: 0.08,
  }),

  woodTeak: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#8B5A2B'),
    roughness: 0.42,
    metalness: 0.05,
  }),

  woodRosewood: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#381815'),
    roughness: 0.3,
    metalness: 0.1,
  }),

  woodCarvedDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2C1810'),
    roughness: 0.48,
    metalness: 0.04,
  }),

  brassAntique: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C59B4E'),
    roughness: 0.38,
    metalness: 0.85,
  }),

  brassPolished: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E5C158'),
    roughness: 0.2,
    metalness: 0.9,
  }),

  // --- GENUINE LEATHERS ---
  leatherCognac: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6E3A1A'),
    roughness: 0.65,
    metalness: 0.1,
  }),

  leatherBlack: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1A181B'),
    roughness: 0.55,
    metalness: 0.15,
  }),

  leatherTan: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9E683B'),
    roughness: 0.6,
    metalness: 0.1,
  }),

  // --- STREET, SIDEWALK, TREES & OUTDOOR LIGHTING ---
  streetAsphalt: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2C2B33'),
    roughness: 0.88,
    metalness: 0.08,
  }),

  streetSidewalk: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DFD6C7'),
    roughness: 0.72,
    metalness: 0.04,
  }),

  streetCurb: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#8F877B'),
    roughness: 0.65,
    metalness: 0.12,
  }),

  treeBark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4E382A'),
    roughness: 0.88,
    metalness: 0.04,
  }),

  leafDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2E5A36'),
    roughness: 0.8,
    metalness: 0.02,
  }),

  leafMedium: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#487E50'),
    roughness: 0.75,
    metalness: 0.02,
  }),

  leafLight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6E9D6B'),
    roughness: 0.7,
    metalness: 0.02,
  }),

  streetLampMetal: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1B1A20'),
    roughness: 0.35,
    metalness: 0.75,
  }),

  streetLampGlass: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFF5DC'),
    roughness: 0.15,
    metalness: 0.05,
    emissive: new THREE.Color('#FFAA33'),
    emissiveIntensity: 0.7,
  }),

  // --- MULTI-COLORED TEDDY PLUSH FURS ---
  teddyHoney: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#C48F54'),
    roughness: 0.95,
    metalness: 0.0,
  }),

  teddyCream: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F7EFE2'),
    roughness: 0.92,
    metalness: 0.0,
  }),

  teddyPink: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#EBAEB8'),
    roughness: 0.95,
    metalness: 0.0,
  }),

  teddyMocha: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5A3D28'),
    roughness: 0.94,
    metalness: 0.0,
  }),

  teddyBlue: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#A9C6D9'),
    roughness: 0.95,
    metalness: 0.0,
  }),

  // --- ROYAL CROWN & JEWELS ---
  royalCrownGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F3BA2F'),
    roughness: 0.15,
    metalness: 0.95,
  }),

  crownVelvet: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#780016'),
    roughness: 0.88,
    metalness: 0.05,
  }),

  gemRuby: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#DC143C'),
    roughness: 0.05,
    metalness: 0.2,
    transmission: 0.85,
    thickness: 0.4,
  }),

  gemSapphire: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#104E8B'),
    roughness: 0.05,
    metalness: 0.2,
    transmission: 0.85,
    thickness: 0.4,
  }),

  gemEmerald: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#008037'),
    roughness: 0.05,
    metalness: 0.2,
    transmission: 0.85,
    thickness: 0.4,
  }),

  // --- LUXURY PERFUME LIQUIDS & FLACONS ---
  perfumeAmber: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#E5983A'),
    roughness: 0.08,
    transmission: 0.88,
    thickness: 0.5,
  }),

  perfumeRose: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#E06282'),
    roughness: 0.08,
    transmission: 0.88,
    thickness: 0.5,
  }),

  perfumeEmerald: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#2A9D6A'),
    roughness: 0.08,
    transmission: 0.88,
    thickness: 0.5,
  }),

  perfumeSapphire: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#2B5B84'),
    roughness: 0.08,
    transmission: 0.88,
    thickness: 0.5,
  }),

  // --- HOTWHEELS METALLIC PAINTS ---
  hotwheelsRed: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D90429'),
    roughness: 0.18,
    metalness: 0.88,
  }),

  hotwheelsBlue: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0077B6'),
    roughness: 0.18,
    metalness: 0.88,
  }),

  hotwheelsGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F3BA2F'),
    roughness: 0.18,
    metalness: 0.9,
  }),

  hotwheelsGreen: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#38B000'),
    roughness: 0.18,
    metalness: 0.85,
  }),

  // --- WRAPPING PAPERS OF DIVERSE COLORS & DESIGNS ---
  wrapEmeraldGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0E533C'),
    roughness: 0.35,
    metalness: 0.3,
  }),

  wrapRoyalNavy: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1B264F'),
    roughness: 0.35,
    metalness: 0.25,
  }),

  wrapBurgundy: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#671A27'),
    roughness: 0.38,
    metalness: 0.2,
  }),

  wrapChampagne: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E3CCA0'),
    roughness: 0.25,
    metalness: 0.45,
  }),

  wrapLilac: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#B696DB'),
    roughness: 0.4,
    metalness: 0.15,
  }),

  // --- AESTHETIC FLORALS & BOUQUET MATERIALS ---
  roseCrimson: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#B31942'),
    roughness: 0.48,
    metalness: 0.05,
  }),

  roseBlush: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F4A6B8'),
    roughness: 0.42,
    metalness: 0.04,
  }),

  roseCream: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFF5EA'),
    roughness: 0.45,
    metalness: 0.02,
  }),

  tulipCoral: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FF6F61'),
    roughness: 0.38,
    metalness: 0.06,
  }),

  tulipLilac: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DDA0DD'),
    roughness: 0.4,
    metalness: 0.05,
  }),

  sunflowerYellow: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFBA08'),
    roughness: 0.35,
    metalness: 0.08,
  }),

  sunflowerCenter: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3D2314'),
    roughness: 0.85,
    metalness: 0.02,
  }),

  peonyBlush: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#F7A399'),
    roughness: 0.42,
    metalness: 0.04,
  }),

  eucalyptusSage: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#607764'),
    roughness: 0.65,
    metalness: 0.02,
  }),

  kraftPaper: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#B08968'),
    roughness: 0.75,
    metalness: 0.02,
  }),

  floristBlushWrap: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FDE2E4'),
    roughness: 0.55,
    metalness: 0.05,
  }),

  floristNavyWrap: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1D2D44'),
    roughness: 0.5,
    metalness: 0.1,
  }),

  tissueShredIvory: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFF8E7'),
    roughness: 0.82,
    metalness: 0.02,
  }),

  // --- AESTHETIC PACKAGING BOX MATERIALS ---
  boxSageGreen: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#84A98C'),
    roughness: 0.45,
    metalness: 0.05,
  }),

  boxDustyRose: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DDBEA9'),
    roughness: 0.42,
    metalness: 0.06,
  }),

  boxNavyFloral: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2B2D42'),
    roughness: 0.4,
    metalness: 0.12,
  }),

  boxCreamGold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FDFBF7'),
    roughness: 0.35,
    metalness: 0.08,
  }),

  satinRibbonChampagne: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#DDA15E'),
    roughness: 0.22,
    metalness: 0.72,
  }),
};
