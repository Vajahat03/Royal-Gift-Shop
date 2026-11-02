import { ProceduralModelType } from '../ui-previews/modelResolver';

export interface ShowcaseItem {
  id: string;
  sku: string;
  name: string;
  modelType: ProceduralModelType;
  category: string;
  price: number;
  available: number;
  maxStock: number;
  animationDesc: string;
  tier: 1 | 2 | 3;
  angle: number;
  radius: number;
  materialId?: string;
}

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'sc-teddy',
    sku: 'PM-01 • Teddy',
    name: 'Plush Teddy Bear',
    modelType: 'teddy',
    category: 'Keepsakes & Toys',
    price: 48,
    available: 26,
    maxStock: 45,
    animationDesc: '✨ Waves arms & happy bounce!',
    tier: 2,
    angle: 2.5,
    radius: 1.05,
    materialId: 'mat-teddy-bear-med'
  },
  {
    id: 'sc-perfume',
    sku: 'PM-02 • Fragrance',
    name: 'French Crystal Perfume Flacon',
    modelType: 'perfume',
    category: 'Luxury Perfumes',
    price: 75,
    available: 18,
    maxStock: 35,
    animationDesc: '✨ Crystal cap lifts & atomizer puffs mist!',
    tier: 2,
    angle: 1.25,
    radius: 1.05,
    materialId: 'mat-perfume-flacons'
  },
  {
    id: 'sc-flowers',
    sku: 'PM-03 • Floral',
    name: 'Velvet Crimson Rose Bouquet',
    modelType: 'flowers',
    category: 'Flower Bouquets',
    price: 48,
    available: 14,
    maxStock: 30,
    animationDesc: '✨ Blooms gently sway & open up!',
    tier: 1,
    angle: 0.0,
    radius: 1.85,
    materialId: 'mat-rose-bouquet'
  },
  {
    id: 'sc-gift-box',
    sku: 'PM-04 • Keepsake',
    name: 'Pastel Ribbon Gift Box',
    modelType: 'gift_box',
    category: 'Gift Boxes',
    price: 32,
    available: 22,
    maxStock: 40,
    animationDesc: '✨ Lid pops open with warm golden glow!',
    tier: 2,
    angle: 0.0,
    radius: 1.05,
    materialId: 'mat-stacked-box'
  },
  {
    id: 'sc-hotwheels',
    sku: 'PM-05 • Collectible',
    name: 'Hot Wheels Die-Cast Racer',
    modelType: 'hotwheels',
    category: 'Collectibles',
    price: 28,
    available: 19,
    maxStock: 35,
    animationDesc: '✨ Wheels spin fast & chassis pops wheelie!',
    tier: 1,
    angle: 1.05,
    radius: 1.85,
    materialId: 'mat-hotwheels-rack'
  },
  {
    id: 'sc-necklace',
    sku: 'PM-06 • Jewelry',
    name: 'Heirloom Velvet Pendant Necklace',
    modelType: 'necklace',
    category: 'Jewelry & Timepieces',
    price: 95,
    available: 12,
    maxStock: 25,
    animationDesc: '✨ Bust rotates & ruby pendant glints!',
    tier: 1,
    angle: 3.14,
    radius: 1.85,
    materialId: 'mat-necklace-bust'
  },
  {
    id: 'sc-bracelet',
    sku: 'PM-07 • Jewelry',
    name: 'Rose Gold Charm Bangle',
    modelType: 'bracelet',
    category: 'Jewelry & Timepieces',
    price: 62,
    available: 15,
    maxStock: 30,
    animationDesc: '✨ Bangle levitates & star charms spin!',
    tier: 1,
    angle: 2.1,
    radius: 1.85,
    materialId: 'mat-charm-bracelets'
  },
  {
    id: 'sc-watch',
    sku: 'PM-08 • Timepiece',
    name: 'Heritage Chronograph Watch',
    modelType: 'watch',
    category: 'Jewelry & Timepieces',
    price: 120,
    available: 8,
    maxStock: 20,
    animationDesc: '✨ Tilts forward & hands sweep rapidly!',
    tier: 2,
    angle: 3.77,
    radius: 1.05,
    materialId: 'mat-luxury-watches'
  },
  {
    id: 'sc-belt',
    sku: 'PM-09 • Leather',
    name: 'Hand-Stitched Leather Waist Belt',
    modelType: 'belt',
    category: 'Executive Accessories',
    price: 55,
    available: 16,
    maxStock: 30,
    animationDesc: '✨ Coiled leather flexes & buckle gleams!',
    tier: 2,
    angle: 5.0,
    radius: 1.05,
    materialId: 'mat-leather-belts'
  },
  {
    id: 'sc-chocolates',
    sku: 'PM-10 • Confection',
    name: 'Artisan Belgian Truffle Box',
    modelType: 'chocolates',
    category: 'Gourmet Treats',
    price: 36,
    available: 24,
    maxStock: 50,
    animationDesc: '✨ Truffles levitate in harmonic wave!',
    tier: 3,
    angle: 0.0,
    radius: 0.48,
    materialId: 'mat-artisan-chocolates'
  },
  {
    id: 'sc-goggles',
    sku: 'PM-11 • Eyewear',
    name: 'Polarized Boutique Sunglasses',
    modelType: 'goggles',
    category: 'Fashion Accessories',
    price: 58,
    available: 14,
    maxStock: 25,
    animationDesc: '✨ Hinged arms unfold with lens specular glint!',
    tier: 3,
    angle: 2.1,
    radius: 0.48,
    materialId: 'mat-designer-goggles'
  },
  {
    id: 'sc-face-mask',
    sku: 'PM-12 • Skincare',
    name: 'Hydrating Botanical Mask Pot',
    modelType: 'face_mask',
    category: 'Wellness & Spa',
    price: 26,
    available: 30,
    maxStock: 60,
    animationDesc: '✨ Frosted cap unscrews & floats upward!',
    tier: 3,
    angle: 4.2,
    radius: 0.48,
    materialId: 'mat-skincare-masks'
  },
  {
    id: 'sc-wet-wipes',
    sku: 'PM-13 • Wellness',
    name: 'Rosewater Refreshing Wipes',
    modelType: 'wet_wipes',
    category: 'Wellness & Spa',
    price: 14,
    available: 40,
    maxStock: 80,
    animationDesc: '✨ Flip-top snaps open & wipe peeks upward!',
    tier: 1,
    angle: 4.2,
    radius: 1.85,
    materialId: 'mat-wet-wipes'
  },
  {
    id: 'sc-wrapping',
    sku: 'PM-14 • Packaging',
    name: 'Gold Foil Wrapping Paper Rolls',
    modelType: 'wrapping_paper',
    category: 'Packaging Materials',
    price: 18,
    available: 35,
    maxStock: 70,
    animationDesc: '✨ Patterned rolls spin & tilt dynamically!',
    tier: 1,
    angle: 5.25,
    radius: 1.85,
    materialId: 'mat-wrapping-paper'
  }
];
