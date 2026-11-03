-- ============================================================================
-- GIFT SHOP INVENTORY MANAGEMENT SYSTEM
-- PostgreSQL + Supabase Database Schema (Single-User Boutique, Production-Ready)
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Materials Catalog
CREATE TABLE IF NOT EXISTS materials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL DEFAULT 'Pieces', -- Pieces, Metres, Sets, Grams, Boxes, Rolls
    minimum_stock NUMERIC(12, 2) NOT NULL DEFAULT 5,
    unit_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    description TEXT,
    category VARCHAR(100) DEFAULT 'General',
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Ensure image_url column exists if table was previously created
ALTER TABLE materials ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2. Inventory Balances (Physical, Reserved, Available = Physical - Reserved)
CREATE TABLE IF NOT EXISTS inventory_balances (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
    physical_quantity NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    reserved_quantity NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_material_balance UNIQUE(material_id),
    CONSTRAINT chk_physical_positive CHECK (physical_quantity >= 0),
    CONSTRAINT chk_reserved_positive CHECK (reserved_quantity >= 0),
    CONSTRAINT chk_reserved_lte_physical CHECK (reserved_quantity <= physical_quantity)
);

-- 3. Customers
CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. Gift Recipes
CREATE TABLE IF NOT EXISTS gift_recipes (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    selling_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. Gift Recipe Bill of Materials (Items)
CREATE TABLE IF NOT EXISTS gift_recipe_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    recipe_id TEXT NOT NULL REFERENCES gift_recipes(id) ON DELETE CASCADE,
    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    quantity_required NUMERIC(12, 2) NOT NULL DEFAULT 1.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    CONSTRAINT uq_recipe_material UNIQUE(recipe_id, material_id),
    CONSTRAINT chk_qty_req_positive CHECK (quantity_required > 0)
);

-- 6. Orders
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    order_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    expected_delivery_date TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'draft', -- draft, confirmed, reserved, in_production, completed, cancelled
    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending', -- pending, paid, partially_paid, refunded
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. Order Items (Recipes & Quantities)
CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    recipe_id TEXT NOT NULL REFERENCES gift_recipes(id) ON DELETE RESTRICT,
    quantity NUMERIC(12, 2) NOT NULL DEFAULT 1.00,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT chk_order_item_qty CHECK (quantity > 0)
);

-- 8. Order Materials (Expected vs Actual Material Consumption)
CREATE TABLE IF NOT EXISTS order_materials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_item_id TEXT NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    expected_quantity NUMERIC(12, 2) NOT NULL,
    actual_quantity NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 9. Restocks
CREATE TABLE IF NOT EXISTS restocks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    supplier_name VARCHAR(255) NOT NULL,
    restock_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    invoice_reference VARCHAR(100),
    total_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 10. Restock Items
CREATE TABLE IF NOT EXISTS restock_items (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    restock_id TEXT NOT NULL REFERENCES restocks(id) ON DELETE CASCADE,
    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    quantity NUMERIC(12, 2) NOT NULL,
    unit_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    CONSTRAINT chk_restock_qty CHECK (quantity > 0)
);

-- 11. Immutable Stock Movement Ledger
CREATE TABLE IF NOT EXISTS stock_movements (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    material_id TEXT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    movement_type VARCHAR(50) NOT NULL, -- initial_stock, restock, reservation, reservation_release, production_consumption, material_return, manual_adjustment
    quantity NUMERIC(12, 2) NOT NULL,
    previous_quantity NUMERIC(12, 2) NOT NULL,
    new_quantity NUMERIC(12, 2) NOT NULL,
    order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
    restock_id TEXT REFERENCES restocks(id) ON DELETE SET NULL,
    reference VARCHAR(255),
    notes TEXT,
    created_by VARCHAR(100) DEFAULT 'Shop Owner',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 12. Shop Settings
CREATE TABLE IF NOT EXISTS shop_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    store_name VARCHAR(255) NOT NULL DEFAULT 'Petite Maison Gift Boutique',
    currency_symbol VARCHAR(5) NOT NULL DEFAULT '$',
    tax_rate NUMERIC(5, 2) NOT NULL DEFAULT 8.5,
    address TEXT DEFAULT '',
    phone VARCHAR(50) DEFAULT '',
    email VARCHAR(255) DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_materials_active ON materials(is_active);
CREATE INDEX IF NOT EXISTS idx_inventory_balances_mat ON inventory_balances(material_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_stock_movements_mat ON stock_movements(material_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_type ON stock_movements(movement_type);
CREATE INDEX IF NOT EXISTS idx_stock_movements_created ON stock_movements(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
-- Enable RLS
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_recipe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE restocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE restock_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;

-- Permissive policies for boutique operations (anon and authenticated users)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow full access on materials" ON materials;
    CREATE POLICY "Allow full access on materials" ON materials FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on inventory_balances" ON inventory_balances;
    CREATE POLICY "Allow full access on inventory_balances" ON inventory_balances FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on customers" ON customers;
    CREATE POLICY "Allow full access on customers" ON customers FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on gift_recipes" ON gift_recipes;
    CREATE POLICY "Allow full access on gift_recipes" ON gift_recipes FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on gift_recipe_items" ON gift_recipe_items;
    CREATE POLICY "Allow full access on gift_recipe_items" ON gift_recipe_items FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on orders" ON orders;
    CREATE POLICY "Allow full access on orders" ON orders FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on order_items" ON order_items;
    CREATE POLICY "Allow full access on order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on order_materials" ON order_materials;
    CREATE POLICY "Allow full access on order_materials" ON order_materials FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on restocks" ON restocks;
    CREATE POLICY "Allow full access on restocks" ON restocks FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on restock_items" ON restock_items;
    CREATE POLICY "Allow full access on restock_items" ON restock_items FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on stock_movements" ON stock_movements;
    CREATE POLICY "Allow full access on stock_movements" ON stock_movements FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on shop_settings" ON shop_settings;
    CREATE POLICY "Allow full access on shop_settings" ON shop_settings FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Schema Grants for anon and authenticated API clients
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

-- ============================================================================
-- ATOMIC STORED PROCEDURES (RPCs)
-- ============================================================================

-- RPC 1: Reserve Order Stock (on order confirmation)
CREATE OR REPLACE FUNCTION reserve_order_stock(p_order_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_mat RECORD;
    v_avail NUMERIC;
    v_prev_qty NUMERIC;
    v_new_qty NUMERIC;
BEGIN
    SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Order not found';
    END IF;

    IF v_order.status = 'confirmed' OR v_order.status = 'reserved' THEN
        RETURN jsonb_build_object('success', true, 'message', 'Stock already reserved');
    END IF;

    -- Verify all materials availability first
    FOR v_mat IN
        SELECT om.material_id, SUM(om.expected_quantity) as total_required, m.name as material_name
        FROM order_materials om
        JOIN materials m ON m.id = om.material_id
        WHERE om.order_id = p_order_id
        GROUP BY om.material_id, m.name
    LOOP
        SELECT (physical_quantity - reserved_quantity) INTO v_avail
        FROM inventory_balances
        WHERE material_id = v_mat.material_id
        FOR UPDATE;

        IF v_avail IS NULL OR v_avail < v_mat.total_required THEN
            RAISE EXCEPTION 'Insufficient stock for %: Required %, Available %', v_mat.material_name, v_mat.total_required, COALESCE(v_avail, 0);
        END IF;
    END LOOP;

    -- Perform reservation and create ledger records
    FOR v_mat IN
        SELECT om.material_id, SUM(om.expected_quantity) as total_required
        FROM order_materials om
        WHERE om.order_id = p_order_id
        GROUP BY om.material_id
    LOOP
        SELECT reserved_quantity INTO v_prev_qty
        FROM inventory_balances
        WHERE material_id = v_mat.material_id;

        v_new_qty := v_prev_qty + v_mat.total_required;

        UPDATE inventory_balances
        SET reserved_quantity = v_new_qty,
            updated_at = timezone('utc', now())
        WHERE material_id = v_mat.material_id;

        INSERT INTO stock_movements (
            material_id, movement_type, quantity, previous_quantity, new_quantity,
            order_id, reference, notes
        ) VALUES (
            v_mat.material_id, 'reservation', v_mat.total_required, v_prev_qty, v_new_qty,
            p_order_id, v_order.order_number, 'Stock reserved for order ' || v_order.order_number
        );
    END LOOP;

    UPDATE orders
    SET status = 'reserved', updated_at = timezone('utc', now())
    WHERE id = p_order_id;

    RETURN jsonb_build_object('success', true, 'message', 'Stock reserved successfully');
END;
$$;

-- RPC 2: Release Order Reservation (on cancel)
CREATE OR REPLACE FUNCTION release_order_reservation(p_order_id TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_mat RECORD;
    v_prev_qty NUMERIC;
    v_new_qty NUMERIC;
BEGIN
    SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Order not found';
    END IF;

    IF v_order.status NOT IN ('confirmed', 'reserved', 'in_production') THEN
        RETURN jsonb_build_object('success', false, 'message', 'Order is not in a reserved status');
    END IF;

    FOR v_mat IN
        SELECT om.material_id, SUM(om.expected_quantity) as total_required
        FROM order_materials om
        WHERE om.order_id = p_order_id
        GROUP BY om.material_id
    LOOP
        SELECT reserved_quantity INTO v_prev_qty
        FROM inventory_balances
        WHERE material_id = v_mat.material_id
        FOR UPDATE;

        v_new_qty := GREATEST(0, v_prev_qty - v_mat.total_required);

        UPDATE inventory_balances
        SET reserved_quantity = v_new_qty,
            updated_at = timezone('utc', now())
        WHERE material_id = v_mat.material_id;

        INSERT INTO stock_movements (
            material_id, movement_type, quantity, previous_quantity, new_quantity,
            order_id, reference, notes
        ) VALUES (
            v_mat.material_id, 'reservation_release', v_mat.total_required, v_prev_qty, v_new_qty,
            p_order_id, v_order.order_number, 'Reservation released for cancelled order ' || v_order.order_number
        );
    END LOOP;

    UPDATE orders
    SET status = 'cancelled', updated_at = timezone('utc', now())
    WHERE id = p_order_id;

    RETURN jsonb_build_object('success', true, 'message', 'Reservation released and order cancelled');
END;
$$;

-- RPC 3: Complete Order & Deduct Stock Atomically
CREATE OR REPLACE FUNCTION complete_order(p_order_id TEXT, p_actual_consumptions JSONB DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_order RECORD;
    v_mat RECORD;
    v_phys_prev NUMERIC;
    v_phys_new NUMERIC;
    v_res_prev NUMERIC;
    v_res_new NUMERIC;
    v_consumed NUMERIC;
BEGIN
    SELECT * INTO v_order FROM orders WHERE id = p_order_id FOR UPDATE;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Order not found';
    END IF;

    IF v_order.status = 'completed' THEN
        RETURN jsonb_build_object('success', true, 'message', 'Order already completed');
    END IF;

    -- Deduct physical stock and release reservation
    FOR v_mat IN
        SELECT om.id as order_material_id, om.material_id, om.expected_quantity
        FROM order_materials om
        WHERE om.order_id = p_order_id
    LOOP
        v_consumed := v_mat.expected_quantity;

        SELECT physical_quantity, reserved_quantity
        INTO v_phys_prev, v_res_prev
        FROM inventory_balances
        WHERE material_id = v_mat.material_id
        FOR UPDATE;

        v_phys_new := v_phys_prev - v_consumed;
        IF v_phys_new < 0 THEN
            RAISE EXCEPTION 'Physical stock cannot be negative';
        END IF;

        IF v_order.status IN ('confirmed', 'reserved', 'in_production') THEN
            v_res_new := GREATEST(0, v_res_prev - v_consumed);
        ELSE
            v_res_new := v_res_prev;
        END IF;

        UPDATE inventory_balances
        SET physical_quantity = v_phys_new,
            reserved_quantity = v_res_new,
            updated_at = timezone('utc', now())
        WHERE material_id = v_mat.material_id;

        UPDATE order_materials
        SET actual_quantity = v_consumed
        WHERE id = v_mat.order_material_id;

        INSERT INTO stock_movements (
            material_id, movement_type, quantity, previous_quantity, new_quantity,
            order_id, reference, notes
        ) VALUES (
            v_mat.material_id, 'production_consumption', -v_consumed, v_phys_prev, v_phys_new,
            p_order_id, v_order.order_number, 'Stock consumed on completion of order ' || v_order.order_number
        );
    END LOOP;

    UPDATE orders
    SET status = 'completed',
        payment_status = 'paid',
        updated_at = timezone('utc', now())
    WHERE id = p_order_id;

    RETURN jsonb_build_object('success', true, 'message', 'Order completed and inventory deducted');
END;
$$;

-- RPC 4: Create Restock
CREATE OR REPLACE FUNCTION create_restock(
    p_supplier_name TEXT,
    p_invoice_ref TEXT,
    p_notes TEXT,
    p_items JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_restock_id TEXT;
    v_item RECORD;
    v_total_cost NUMERIC := 0;
    v_mat_id TEXT;
    v_qty NUMERIC;
    v_cost NUMERIC;
    v_subtotal NUMERIC;
    v_phys_prev NUMERIC;
    v_phys_new NUMERIC;
BEGIN
    INSERT INTO restocks (supplier_name, invoice_reference, notes)
    VALUES (p_supplier_name, p_invoice_ref, p_notes)
    RETURNING id INTO v_restock_id;

    FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(material_id TEXT, quantity NUMERIC, unit_cost NUMERIC)
    LOOP
        v_mat_id := v_item.material_id;
        v_qty := v_item.quantity;
        v_cost := COALESCE(v_item.unit_cost, 0);
        v_subtotal := v_qty * v_cost;
        v_total_cost := v_total_cost + v_subtotal;

        INSERT INTO restock_items (restock_id, material_id, quantity, unit_cost, subtotal)
        VALUES (v_restock_id, v_mat_id, v_qty, v_cost, v_subtotal);

        SELECT physical_quantity INTO v_phys_prev
        FROM inventory_balances
        WHERE material_id = v_mat_id
        FOR UPDATE;

        IF v_phys_prev IS NULL THEN
            v_phys_prev := 0;
            INSERT INTO inventory_balances (material_id, physical_quantity, reserved_quantity)
            VALUES (v_mat_id, v_qty, 0);
            v_phys_new := v_qty;
        ELSE
            v_phys_new := v_phys_prev + v_qty;
            UPDATE inventory_balances
            SET physical_quantity = v_phys_new,
                updated_at = timezone('utc', now())
            WHERE material_id = v_mat_id;
        END IF;

        UPDATE materials
        SET unit_cost = v_cost,
            updated_at = timezone('utc', now())
        WHERE id = v_mat_id;

        INSERT INTO stock_movements (
            material_id, movement_type, quantity, previous_quantity, new_quantity,
            restock_id, reference, notes
        ) VALUES (
            v_mat_id, 'restock', v_qty, v_phys_prev, v_phys_new,
            v_restock_id, p_invoice_ref, 'Restocked from ' || p_supplier_name
        );
    END LOOP;

    UPDATE restocks
    SET total_cost = v_total_cost
    WHERE id = v_restock_id;

    RETURN jsonb_build_object('success', true, 'restock_id', v_restock_id, 'total_cost', v_total_cost);
END;
$$;

-- RPC 5: Manual Stock Adjustment
CREATE OR REPLACE FUNCTION adjust_inventory(
    p_material_id TEXT,
    p_new_physical NUMERIC,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    v_prev_qty NUMERIC;
    v_diff NUMERIC;
BEGIN
    SELECT physical_quantity INTO v_prev_qty
    FROM inventory_balances
    WHERE material_id = p_material_id
    FOR UPDATE;

    IF v_prev_qty IS NULL THEN
        RAISE EXCEPTION 'Material balance record not found';
    END IF;

    IF p_new_physical < 0 THEN
        RAISE EXCEPTION 'Stock quantity cannot be negative';
    END IF;

    v_diff := p_new_physical - v_prev_qty;

    UPDATE inventory_balances
    SET physical_quantity = p_new_physical,
        updated_at = timezone('utc', now())
    WHERE material_id = p_material_id;

    INSERT INTO stock_movements (
        material_id, movement_type, quantity, previous_quantity, new_quantity,
        reference, notes
    ) VALUES (
        p_material_id, 'manual_adjustment', v_diff, v_prev_qty, p_new_physical,
        'Manual Adjustment', p_reason
    );

    RETURN jsonb_build_object('success', true, 'previous', v_prev_qty, 'new', p_new_physical);
END;
$$;
