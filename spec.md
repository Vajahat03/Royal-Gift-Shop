# GIFT SHOP INVENTORY MANAGEMENT SYSTEM
## Complete Product Specification — React, Supabase & Three.js

**Project Type:** Full-stack Gift Shop Inventory Management System  
**Frontend:** React.js + Vite + TypeScript  
**3D Engine:** Three.js + React Three Fiber  
**3D Animation:** GSAP + ScrollTrigger  
**Backend:** Supabase  
**Database:** PostgreSQL  
**Authentication:** Supabase Auth  
**Styling:** Tailwind CSS  
**Charts:** Recharts  
**Forms:** React Hook Form + Zod  
**Icons:** Lucide React  

---

# 1. PROJECT OVERVIEW

Build a complete, modern Gift Shop Inventory Management System with a premium, immersive 3D user interface.

The application must combine two major experiences:

1. A cinematic 3D miniature gift shop that users explore through scrolling.
2. A fully functional inventory and business management system connected to Supabase.

The application must not be just a visual prototype. Every inventory operation, order, customer record, stock movement, and restocking transaction must use real database data.

The 3D experience must be built from scratch using Three.js. Do not use Spline, paid 3D services, or external subscription-based 3D platforms.

## Main concept

The application opens with a beautiful miniature architectural model of a gift shop.

As the user scrolls:

- The camera approaches the front of the shop.
- It zooms into the entrance and front display.
- It moves smoothly towards the right wall.
- It zooms into the right-side display and windows.
- It moves towards the back of the shop.
- It explores the rear structure.
- It moves towards the left wall.
- It zooms into the left-side architecture.
- It eventually reveals the entire shop from an elevated angle.
- The camera transitions into the main dashboard.

The shop should feel like a premium miniature architectural model being explored through a cinematic camera journey.

The animation must be controlled by scrolling, not by an automatically running video.

---

# 2. CORE TECHNOLOGY

## Frontend

- React.js
- Vite
- TypeScript
- Tailwind CSS
- React Router
- React Three Fiber
- Three.js
- @react-three/drei
- GSAP
- GSAP ScrollTrigger
- React Hook Form
- Zod
- Recharts
- date-fns
- Lucide React
- Sonner

## Backend

- Supabase Authentication
- Supabase PostgreSQL
- Supabase Row Level Security
- Supabase RPC functions
- PostgreSQL transactions

## 3D rendering

Use:

- Three.js for the actual 3D rendering.
- React Three Fiber for declarative React-based 3D components.
- Drei for useful camera, environment, and loading helpers.
- GSAP ScrollTrigger for scroll-driven camera animation.
- GLTFLoader only if importing additional compatible GLB models is necessary.

Do not make the 3D scene dependent on a remote paid service.

---

# 3. DESIGN SYSTEM

## Visual direction

The design should resemble a premium boutique gift store.

### Colour palette

- Warm cream: #FFF9F2
- Soft lavender: #C9B8E8
- Blush pink: #F5C9D6
- Muted purple: #8873B5
- Warm white: #FFFFFF
- Soft beige: #E9DDCE
- Dark charcoal: #29252F
- Subtle gold: #C9A66B

### Design principles

- Modern and elegant.
- Clean layouts.
- Balanced contrast.
- Smooth animations.
- Soft shadows.
- Subtle gradients.
- Rounded corners.
- Premium typography.
- Minimal unnecessary decoration.

Avoid excessive glassmorphism, excessive gradients, and overly dark backgrounds.

The 3D shop should be the visual highlight, while the management screens should prioritize usability.

---

# 4. CINEMATIC THREE.JS GIFT SHOP EXPERIENCE

This is one of the most important features of the application.

## 4.1 Overall architecture

Create a miniature modern gift boutique from scratch using Three.js geometry and reusable components.

The building should have:

- Modern cubic architecture.
- Two-storey appearance.
- Flat roof.
- Large transparent glass windows.
- White and cream exterior walls.
- Lavender and blush pink accents.
- Glass entrance.
- Interior shelves.
- Gift display counters.
- Warm lighting.
- Decorative plants.
- Gift boxes and ribbons.
- Teddy bears.
- Flower bouquets.
- Chocolate displays.

The building must look like a carefully designed architectural miniature rather than a basic collection of cubes.

## 4.2 Building dimensions

Use a consistent coordinate system.

Suggested dimensions:

- Building width: 12 units.
- Building depth: 10 units.
- Building height: 8 units.
- Ground floor: 4 units.
- First floor: 3 units.
- Roof thickness: 0.3 units.
- Surrounding platform: 15 × 13 units.

These values are starting points and can be adjusted to improve composition.

## 4.3 Building components

Create reusable components:

- BuildingBase
- GroundFloor
- FirstFloor
- ExteriorWalls
- GlassWindows
- GlassEntrance
- FlatRoof
- InteriorFloor
- DisplayShelves
- GiftCounter
- GiftBoxes
- TeddyBear
- FlowerBouquet
- ChocolateDisplay
- RibbonDecorations
- IndoorPlants
- OutdoorPlants
- DecorativeLighting
- ShopSignboard

Each component must be independently editable.

Use custom geometry where necessary to achieve a polished architectural appearance.

## 4.4 Four-sided architecture

The shop must have four clearly distinguishable sides.

### Front wall

Include:

- Main glass entrance.
- Large display windows.
- Gift shop signage.
- Decorative plants.
- Gift display visible through the glass.

### Right wall

Include:

- Large glass windows.
- Interior gift shelves.
- Flower displays.
- Decorative lighting.
- Visible interior architecture.

### Back wall

Include:

- Modern wall design.
- Smaller windows.
- Decorative panels.
- Visible interior shelving through appropriate openings.

### Left wall

Include:

- Glass display section.
- Gift-wrapping counter visible through the glass.
- Decorative wall elements.
- Small exterior plants.

Do not create four identical walls. Each side must have its own design.

---

# 5. SCROLL-DRIVEN CAMERA ANIMATION

## 5.1 Main requirement

The entire 3D architectural journey must respond to the user's scroll position.

The camera should not simply rotate continuously.

The camera must travel through predefined cinematic positions around the building.

Use GSAP ScrollTrigger with a pinned 3D scene.

The page should have a long scroll section that controls the camera journey.

## 5.2 Animation sequence

### Scene 1 — Opening view

At the beginning:

- Show the complete miniature gift shop.
- Camera positioned at a front three-quarter angle.
- Slightly elevated camera.
- Entire building visible.
- Soft studio lighting.
- Shop centered in the viewport.

The first screen should feel like an architectural product showcase.

Display a small heading:

"Welcome to Your Gift Boutique"

Supporting text:

"Every little detail, beautifully managed."

Add a subtle scroll indicator.

### Scene 2 — Front architecture

As the user scrolls:

- Camera moves closer to the front facade.
- Smooth zoom-in.
- Main entrance becomes the focus.
- Gift shop sign becomes visible.
- Display windows and decorations become more prominent.

Use subtle easing, without sudden camera jumps.

### Scene 3 — Front interior reveal

Continue scrolling:

- Camera approaches the glass entrance.
- Camera moves slightly upward.
- Interior shelves become more visible.
- Gift boxes, teddy bears, and flowers are revealed.
- Use carefully controlled transparency and lighting.

The camera should not clip through walls accidentally.

### Scene 4 — Right-side exploration

Continue scrolling:

- Camera smoothly moves around the right corner.
- Camera follows a curved path.
- Right-side wall becomes the main focus.
- Camera zooms into the glass windows.
- Interior flower shelves and gift displays become visible.

The transition should feel like a physical camera moving around an architectural model.

### Scene 5 — Rear architecture

Continue scrolling:

- Camera moves around the back corner.
- Rear wall comes into view.
- Camera approaches the building.
- Reveal the rear windows and wall details.

### Scene 6 — Left-side exploration

Continue scrolling:

- Camera moves around the left corner.
- Left facade becomes visible.
- Camera zooms towards the glass section.
- Reveal the gift-wrapping counter and interior shelves.

### Scene 7 — Elevated roof view

Continue scrolling:

- Camera moves upwards.
- Camera tilts downward.
- Show the roof and complete building layout.
- Reveal the interior arrangement from above where possible.

Use a roof-removal or architectural cutaway effect if necessary.

### Scene 8 — Complete miniature reveal

Continue scrolling:

- Camera gradually pulls back.
- Return to a beautiful three-quarter view.
- Show the complete miniature building.
- Lighting and composition should feel premium.

### Scene 9 — Transition to dashboard

At the end:

- Fade the 3D scene.
- Transition into the main application dashboard.
- Release the pinned scroll section.
- Show the actual inventory dashboard.

The dashboard must be a separate functional React screen, not part of the 3D model.

## 5.3 Camera implementation

Create a dedicated camera animation module.

Suggested structure:

```text
src/
  three/
    components/
      GiftShopScene.tsx
      Building.tsx
      FrontWall.tsx
      RightWall.tsx
      BackWall.tsx
      LeftWall.tsx
      Interior.tsx
      Roof.tsx
      GiftDisplays.tsx
      Decorations.tsx

    camera/
      CameraController.tsx
      cameraPositions.ts
      scrollTimeline.ts

    materials/
      materials.ts

    lighting/
      LightingSetup.tsx

    utils/
      geometryHelpers.ts
```

Define camera positions for each animation stage.

Each camera keyframe must contain:

- Camera position.
- Camera target.
- Camera field of view.
- Scroll progress.
- Transition duration or timeline position.

Use a Catmull-Rom curve or equivalent smooth path for camera movement.

Use GSAP timelines to animate:

- Camera position.
- Camera target.
- Camera zoom/FOV.
- Building reveal.
- Roof visibility.
- Lighting intensity.
- Scene opacity.

Use `useFrame` only for lightweight continuous effects, not to create a competing animation loop for scroll-controlled camera movement.

## 5.4 Wall exploration and cutaway effects

The user must be able to inspect the building without the camera getting trapped outside solid walls.

Implement an architectural reveal system.

Possible techniques:

1. Transparent glass walls.
2. Selective wall visibility.
3. Temporary wall hiding during close-up shots.
4. Roof removal during top-down exploration.
5. Interior cutaway views.
6. Carefully placed camera positions outside the building.

Do not simply make all walls invisible.

Each reveal should be intentional and coordinated with the camera timeline.

## 5.5 Scroll behaviour

Requirements:

- Smooth scrolling.
- Pinned scene during the cinematic journey.
- Scroll progress controls camera movement.
- Scrolling backwards reverses the animation naturally.
- No sudden camera jumps.
- No accidental page scroll lock.
- Correct behaviour on refresh and direct route entry.
- Proper cleanup of GSAP timelines and ScrollTrigger instances.
- Avoid conflicts with React Strict Mode.

## 5.6 Optional manual interaction

After the cinematic journey, allow the user to interact with the model.

Provide:

- Mouse drag to rotate.
- Scroll or controls to zoom.
- Reset camera button.
- Optional wall selection controls.

Use OrbitControls for manual interaction only when it does not conflict with the scroll-controlled timeline.

---

# 6. PERFORMANCE AND RESPONSIVENESS

The 3D experience must be visually impressive without making the application unusable.

Requirements:

- Use efficient geometries.
- Reuse materials.
- Reuse objects where possible.
- Use instancing for repeated decorative objects.
- Optimize shadows.
- Avoid unnecessarily high polygon counts.
- Use texture compression where appropriate.
- Lazy-load the 3D experience.
- Dynamically import Three.js components.
- Display a loading indicator.
- Provide a static fallback.
- Handle WebGL initialization failures.
- Dispose geometries, materials and textures correctly.

### Device handling

Desktop:
- Full cinematic experience.
- Detailed architecture.
- High-quality shadows.
- Smooth camera movement.

Tablet:
- Simplified geometry.
- Reduced shadow quality.
- Optimized rendering.

Mobile:
- Simplified 3D scene.
- Reduced decorations.
- Shorter camera path.
- Avoid excessive GPU usage.
- Provide a static architectural fallback if WebGL performance is poor.

Respect `prefers-reduced-motion`.

---

# 7. APPLICATION MODULES

The management system must contain the following modules.

## 7.1 Dashboard

Show:

- Total inventory items.
- Total available material quantity.
- Total customers.
- Total orders.
- Pending orders.
- Completed orders.
- Low-stock alerts.
- Recent transactions.
- Recent restocking.
- Material consumption overview.
- Monthly sales summary.
- Inventory value where cost information is available.

Use real Supabase data.

## 7.2 Inventory Management

Allow the owner to:

- Add materials.
- Edit material details.
- Delete unused materials only when safe.
- View current stock.
- View reserved stock.
- View available stock.
- Set minimum stock levels.
- View unit of measurement.
- View stock history.

Example materials:

| Material | Unit | Initial stock |
|---|---|---:|
| Teddy bear | Pieces | 5 |
| Flowers | Pieces | 5 |
| Packing sheet | Metres | 5 |
| Chocolates | Pieces | 5 |
| Ribbons | Pieces | 5 |

Do not hardcode these as permanent inventory values. They are example records.

## 7.3 Gift Recipe Management

A gift recipe defines which materials are required to create a gift.

Example:

Gift: Standard Gift Box

| Material | Quantity |
|---|---:|
| Teddy bear | 1 |
| Flowers | 1 |
| Packing sheet | 1 metre |
| Chocolates | 1 |
| Ribbon | 1 |

Allow the owner to:

- Create recipes.
- Edit recipes.
- Add multiple materials.
- Specify required quantities.
- View total material requirements.
- Estimate how many gifts can be produced from current stock.

The system must calculate production capacity based on the limiting material.

## 7.4 Customer Management

Store:

- Customer name.
- Phone number.
- Email (optional).
- Address (optional).
- Notes.
- Created date.

Features:

- Add customer.
- Edit customer.
- View customer details.
- View purchase history.
- View total orders.
- View total spending.
- Search customers.

## 7.5 Order Management

Orders must support multiple gift types and quantities.

Each order must have:

- Order number.
- Customer.
- Order date.
- Expected delivery date.
- Gift items.
- Gift quantities.
- Expected material consumption.
- Actual material consumption.
- Total amount.
- Payment status.
- Production status.
- Notes.

Order statuses:

- Draft.
- Confirmed.
- Reserved.
- In production.
- Completed.
- Cancelled.

### Order workflow

1. Select customer.
2. Add one or more gift recipes.
3. Enter quantities.
4. Calculate required materials automatically.
5. Check available stock.
6. Show stock shortage if any.
7. Confirm order.
8. Reserve required materials.
9. Start production.
10. Record actual materials consumed.
11. Complete order.
12. Update stock balances and ledger atomically.

Never allow stock to become negative.

## 7.6 Automatic Inventory Deduction

Example:

Initial stock:

- Teddy bears: 5.
- Flowers: 5.
- Packing sheet: 5 metres.
- Chocolates: 5.
- Ribbons: 5.

Five customers each order one standard gift.

After confirming the orders, the required materials should be reserved.

After completing all five orders, actual consumption should result in:

| Material | Initial | Used | Remaining |
|---|---:|---:|---:|
| Teddy bears | 5 | 5 | 0 |
| Flowers | 5 | 5 | 0 |
| Packing sheet | 5 m | 5 m | 0 |
| Chocolates | 5 | 5 | 0 |
| Ribbons | 5 | 5 | 0 |

Each order must retain its own material consumption record.

The system must be able to answer:

- Which customer used which materials?
- Which order consumed the material?
- How much was consumed?
- When was it consumed?
- Who performed the operation?

## 7.7 Restocking Management

Allow the owner to record:

- Material.
- Restocked quantity.
- Unit cost.
- Supplier.
- Restocking date.
- Invoice or reference number.
- Notes.

After restocking, inventory must increase automatically through an atomic database transaction.

Example:

Packing sheet:
- Previous stock: 0 metres.
- Restocked: 20 metres.
- New stock: 20 metres.

Show restocking history.

## 7.8 Stock Movement Ledger

Create an append-only stock movement history.

Movement types:

- Initial stock.
- Restock.
- Reservation.
- Reservation release.
- Production consumption.
- Material return.
- Manual adjustment.

Every movement must contain:

- Material ID.
- Movement type.
- Quantity.
- Previous balance.
- New balance.
- Related order or restock ID.
- Date and time.
- User ID.
- Notes.

Never erase historical stock movements.

## 7.9 Reports

Provide:

- Inventory summary.
- Material consumption report.
- Customer purchase report.
- Order report.
- Restocking report.
- Low-stock report.
- Monthly revenue.
- Material usage trends.

Use Recharts.

---

# 8. DATABASE DESIGN

Create the following PostgreSQL tables.

## profiles

- id
- full_name
- created_at

## materials

- id
- name
- unit
- minimum_stock
- unit_cost
- description
- is_active
- created_at
- updated_at

## inventory_balances

- id
- material_id
- physical_quantity
- reserved_quantity
- updated_at

Available quantity:

physical_quantity - reserved_quantity

## customers

- id
- name
- phone
- email
- address
- notes
- created_at
- updated_at

## gift_recipes

- id
- name
- description
- selling_price
- is_active
- created_at
- updated_at

## gift_recipe_items

- id
- recipe_id
- material_id
- quantity_required
- created_at

## orders

- id
- order_number
- customer_id
- order_date
- expected_delivery_date
- status
- payment_status
- total_amount
- notes
- created_at
- updated_at

## order_items

- id
- order_id
- recipe_id
- quantity
- unit_price
- subtotal

## order_materials

- id
- order_id
- order_item_id
- material_id
- expected_quantity
- actual_quantity
- created_at

## restocks

- id
- supplier_name
- restock_date
- invoice_reference
- notes
- created_at

## restock_items

- id
- restock_id
- material_id
- quantity
- unit_cost
- subtotal

## stock_movements

- id
- material_id
- movement_type
- quantity
- previous_quantity
- new_quantity
- order_id
- restock_id
- reference
- notes
- created_by
- created_at

Add appropriate foreign keys, indexes, unique constraints, numeric precision and check constraints.

Use `NUMERIC` for material quantities and monetary values, not floating-point types.

---

# 9. DATABASE SECURITY AND STOCK INTEGRITY

Enable Row Level Security on all business tables.

Each authenticated user must only access their own records.

For a single-business application, all data must be isolated by the authenticated owner.

Use PostgreSQL transactions and Supabase RPC functions for all authoritative stock operations.

Required RPC operations:

- confirm_order
- reserve_order_stock
- release_order_reservation
- complete_order
- record_material_return
- create_restock
- adjust_inventory

Requirements:

- Lock relevant inventory rows using appropriate row-level locking.
- Validate available quantities before reservation.
- Prevent negative quantities.
- Prevent duplicate fulfillment.
- Prevent duplicate restocking.
- Ensure related stock movements and balance changes succeed or fail together.
- Use idempotency protection for repeat requests.
- Validate all IDs and ownership inside the database.
- Never trust client-side stock calculations as authoritative.

### Cancellation rules

- Draft order: no stock changes.
- Reserved order: release reserved stock.
- Completed order: never erase consumption history.
- Completed order returns must be explicitly recorded as material returns.
- Partial returns must be supported.

The frontend must not directly update authoritative inventory balances.

---

# 10. PROJECT STRUCTURE

```text
src/
  app/
    App.tsx
    router.tsx

  components/
    layout/
    ui/
    charts/
    forms/

  features/
    dashboard/
    inventory/
    customers/
    recipes/
    orders/
    restocking/
    ledger/
    reports/
    settings/

  three/
    GiftShopExperience.tsx

    components/
      GiftShopScene.tsx
      Building.tsx
      ExteriorWalls.tsx
      GlassWindows.tsx
      Interior.tsx
      DisplayShelves.tsx
      GiftDisplays.tsx
      Roof.tsx
      Decorations.tsx

    camera/
      CameraController.tsx
      cameraPositions.ts
      scrollTimeline.ts

    materials/
      materials.ts

    lighting/
      LightingSetup.tsx

    utils/
      geometryHelpers.ts

  hooks/
  contexts/
  services/
    supabase.ts
    inventoryService.ts
    orderService.ts
    customerService.ts
    restockService.ts

  lib/
    validations/
    calculations/

  types/
  utils/

supabase/
  migrations/
  functions/
```

Keep 3D components separate from business management components.

Do not mix inventory calculations into the Three.js rendering system.

---

# 11. PHASED DEVELOPMENT PLAN

Implement the application in the following phases.

Do not attempt to implement everything in one operation.

Every phase must be completed, tested and approved before moving to the next phase.

## PHASE 1 — Project Setup and Authentication

Implement:

- React + Vite + TypeScript.
- Tailwind.
- React Router.
- Supabase client.
- Supabase authentication.
- Protected routes.
- Base design system.
- Application layout.

Testing:

- Register a user.
- Log in.
- Log out.
- Refresh session.
- Access protected pages.
- Verify authenticated ownership.

Completion condition:

Authentication works and the project structure is ready.

## PHASE 2 — Three.js Architectural Gift Shop

Implement:

- Three.js dependencies.
- React Three Fiber.
- Miniature building geometry.
- Four distinct walls.
- Windows and entrance.
- Interior shelves.
- Gift displays.
- Lighting.
- Materials.
- Decorative objects.
- Camera keyframes.
- GSAP ScrollTrigger.
- Scroll-controlled camera journey.
- Architectural reveal effects.
- Responsive rendering.
- Loading fallback.

Testing:

- Verify the complete shop appears.
- Scroll through all four sides.
- Verify zoom transitions.
- Verify roof and interior reveal.
- Scroll backwards.
- Test mouse interaction.
- Test mobile fallback.
- Check GPU performance.
- Check that no camera clipping or animation jumps occur.

Completion condition:

A polished, scroll-controlled 3D miniature gift shop works independently of the business modules.

## PHASE 3 — Inventory Management

Implement:

- Materials table.
- Add/edit material forms.
- Inventory balances.
- Stock display.
- Low-stock thresholds.
- Search and filters.
- Supabase RLS.

Testing:

- Add five materials.
- Add initial quantities.
- Edit materials.
- Verify balances.
- Verify isolation between users.

Completion condition:

Inventory is connected to Supabase and displays actual stock.

## PHASE 4 — Customer Management

Implement:

- Customer CRUD.
- Customer search.
- Customer details.
- Purchase history layout.

Testing:

- Add customers A–E.
- Edit customer details.
- Search customers.
- Verify data persistence.

Completion condition:

Customer records work with real database data.

## PHASE 5 — Gift Recipe Management

Implement:

- Recipe CRUD.
- Recipe material mapping.
- Quantity calculations.
- Production capacity calculations.

Testing:

Create a standard gift recipe containing one teddy bear, one flower, one metre of packing sheet, one chocolate and one ribbon.

Verify that the system calculates production capacity correctly.

Completion condition:

Recipes calculate material requirements accurately.

## PHASE 6 — Order Management and Stock Reservation

Implement:

- Create order.
- Select customer.
- Add multiple gift recipes.
- Set quantities.
- Calculate required stock.
- Validate available stock.
- Confirm orders.
- Reserve inventory through RPC.

Testing:

Create five orders for five customers.

Verify that stock reservations are accurate and that overselling is prevented.

Completion condition:

Orders and reservations work reliably.

## PHASE 7 — Production and Automatic Stock Deduction

Implement:

- Production status.
- Actual material usage.
- Order completion.
- Atomic inventory deduction.
- Material consumption history.

Testing:

Complete five standard gift orders.

Verify that all five material balances become zero.

Verify that every customer's order retains its own material consumption records.

Completion condition:

Stock deduction and customer-level traceability work correctly.

## PHASE 8 — Restocking

Implement:

- Restock form.
- Supplier information.
- Restock date.
- Material quantities.
- Unit costs.
- Atomic stock updates.
- Restocking history.

Testing:

Restock 20 metres of packing sheet.

Verify that the balance increases from zero to 20 metres and a stock movement is created.

Completion condition:

Restocking works with complete historical records.

## PHASE 9 — Stock Ledger and Cancellation

Implement:

- Stock movement history.
- Movement filters.
- Order references.
- Restock references.
- Reservation release.
- Material return.
- Manual stock adjustment with audit trail.

Testing:

- Cancel a reserved order.
- Verify reservation release.
- Record a partial material return.
- Verify ledger history.
- Verify that historical movements are preserved.

Completion condition:

Every stock change is traceable.

## PHASE 10 — Dashboard and Reports

Implement:

- Summary cards.
- Low-stock alerts.
- Recent orders.
- Recent restocking.
- Material consumption charts.
- Customer summaries.
- Revenue reports.
- Inventory reports.

Testing:

Verify all dashboard totals against database records.

Completion condition:

The dashboard and reports reflect actual business activity.

## PHASE 11 — Final Integration and Optimization

Implement:

- Responsive layouts.
- Loading states.
- Error handling.
- Empty states.
- Form validation.
- Performance optimization.
- Three.js lazy loading.
- WebGL fallback.
- Database query optimization.
- Security review.
- Production configuration.

Testing:

- Test the full order lifecycle.
- Test inventory isolation.
- Test concurrent stock operations.
- Test low-stock conditions.
- Test mobile responsiveness.
- Test application refresh.
- Test 3D performance on lower-end devices.

Completion condition:

The application is production-ready and all core workflows are functional.

---

# 12. IMPORTANT DEVELOPMENT RULES

1. Do not use mock data as real application data.
2. Do not hardcode inventory quantities.
3. Do not use paid 3D platforms.
4. Do not use Spline.
5. Build the miniature shop using Three.js geometry.
6. Use GSAP ScrollTrigger for the camera journey.
7. Keep 3D presentation separate from business logic.
8. Use Supabase as the source of truth.
9. Use database transactions for stock changes.
10. Do not directly modify stock balances from frontend code.
11. Preserve existing database data when implementing new features.
12. Do not redesign completed modules unnecessarily.
13. Test every phase before proceeding.
14. Never silently skip a requirement.
15. Do not replace working functionality with placeholder implementations.

---

# 13. ACCEPTANCE CRITERIA

The project is considered complete only when all the following work:

### 3D experience

- A miniature gift shop is generated using Three.js.
- It has four distinct architectural sides.
- The camera follows a scroll-controlled cinematic path.
- Each side gets its own close-up and zoom.
- The interior is revealed.
- The roof can be inspected from above.
- Scrolling backwards reverses the journey.
- The experience works responsively with suitable fallbacks.

### Business system

- Users can authenticate.
- Users can add materials.
- Users can create customers.
- Users can create gift recipes.
- Users can place orders.
- Materials are reserved correctly.
- Materials are deducted on fulfillment.
- Restocking increases stock correctly.
- All stock movements are traceable.
- Customer order history is accurate.
- Reports use real database data.

### Final result

A premium, interactive gift shop management application where users first experience a beautifully animated miniature gift boutique and then manage the actual business through a fully functional inventory dashboard.

**The 3D shop is the visual identity of the application. Supabase is the source of truth for all business data.**