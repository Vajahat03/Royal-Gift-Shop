export type ProceduralModelType =
  | 'teddy'
  | 'necklace'
  | 'hotwheels'
  | 'flowers'
  | 'bracelet'
  | 'watch'
  | 'belt'
  | 'perfume'
  | 'gift_box'
  | 'wrapping_paper'
  | 'wet_wipes'
  | 'face_mask'
  | 'goggles'
  | 'chocolates'
  | 'fallback';

/**
 * Resolves item name and description to one of 14 procedural 3D models or luxury fallback.
 * Case-insensitive keyword matching against real database inventory items.
 */
export function resolveProceduralModelType(itemName: string = '', description: string = ''): ProceduralModelType {
  const query = `${itemName} ${description}`.toLowerCase();

  // 1. Teddy
  if (query.match(/\b(teddy|bear|plush|cuddle)\b/)) return 'teddy';

  // 2. Necklace
  if (query.match(/\b(necklace|pendant|chain|choker|locket|medallion)\b/)) return 'necklace';

  // 3. Hotwheels Car
  if (query.match(/\b(hotwheels|hot wheels|car|diecast|racer|vehicle|toy car)\b/)) return 'hotwheels';

  // 4. Flowers
  if (query.match(/\b(flower|bouquet|rose|tulip|peony|sunflower|floral|blossom|flora)\b/)) return 'flowers';

  // 5. Bracelets
  if (query.match(/\b(bracelet|bangle|charm|wristband|anklet)\b/)) return 'bracelet';

  // 6. Watches
  if (query.match(/\b(watch|timepiece|chronograph|wristwatch|dial)\b/)) return 'watch';

  // 7. Waist Belt
  if (query.match(/\b(belt|waist|leather strap|buckle|strap)\b/)) return 'belt';

  // 8. Perfumes
  if (query.match(/\b(perfume|fragrance|scent|parfum|cologne|flacon|eau de)\b/)) return 'perfume';

  // 9. Gift Boxes
  if (query.match(/\b(gift box|box|hamper|chest|keepsake|trinket box|wooden box|packaging box)\b/)) return 'gift_box';

  // 10. Wrapping Paper
  if (query.match(/\b(wrapping|packing sheet|paper|roll|ribbon roll|gift wrap)\b/)) return 'wrapping_paper';

  // 11. Wet Wipes
  if (query.match(/\b(wet wipe|wipes|cleansing|tissue|moist towelette)\b/)) return 'wet_wipes';

  // 12. Face Mask Skin Care
  if (query.match(/\b(face mask|mask|skin care|skincare|serum|sheet mask|cosmetic|cream|facial)\b/)) return 'face_mask';

  // 13. Goggles / Sunglasses
  if (query.match(/\b(goggles|sunglasses|eyewear|shades|aviator|glasses)\b/)) return 'goggles';

  // 14. Chocolates
  if (query.match(/\b(chocolate|truffle|praline|cocoa|confection|fudge|bonbon)\b/)) return 'chocolates';

  // 15. Default Luxury Fallback
  return 'fallback';
}
