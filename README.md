# Petite Maison Gift Boutique — Photorealistic Interior 3D Management System
## Interior 3D Journey & Single-User Inventory Operations

Built with **React 18**, **Three.js**, **React Three Fiber (R3F)**, **GSAP ScrollTrigger**, **Tailwind CSS**, and **Supabase / PostgreSQL**.

---

### Recent Enhancements

1. **Items Fit 100% Inside Shelves (Zero Clipping)**:
   - Sized and framed all items (Big Teddies, Small Teddies, Tumblers, Watches, Belts, Hotwheels, Skincare, Hairbuns, Wipes) with comfortable interior margins.
   - Arms and ears of the Big Teddies are now anatomically resting on their lap so they sit cozily **inside** each walnut cubicle without penetrating vertical partitions.

2. **Photorealistic Retail Aesthetics & Shadows**:
   - **Under-Shelf LED Lighting**: Embedded warm LED strip lights underneath each rack tier casting soft realistic downward illumination on items.
   - **Rich Materials**: Dark European walnut shelving, brushed 18k gold edge moldings, soft woven rattan baskets with linen cloth linings, black velvet jewelry trays, and realistic metallic/glass shaders.
   - **Soft Shadows & ACES Filmic Tone Mapping**: Configured with `PCFSoftShadowMap` and `ACESFilmicToneMapping` for cinematic depth and soft shadow roll-off.

3. **Multi-Directional Cursor Look (All Sides & Directions)**:
   - Moving the mouse cursor anywhere on the screen now pans, tilts, and tracks the camera in **all directions** (look up, down, left, right, and perspective parallax).
   - Scroll up/down to glide through the interior boutique stations; move the cursor in any direction to inspect shelves, ceiling, and displays with natural first-person head tracking.
   - Also toggle free 360° orbit inspection at any time.

4. **Removed Numbered Pill Navigation**:
   - Completely removed the `1 2 3 [4] 5 6 7` numbered button bar shown in the screenshot.

---

### Running the App

```bash
# Start Vite development server
npm run dev

# Build production bundle
npm run build
```

Dev Server URL: `http://localhost:5174/`
