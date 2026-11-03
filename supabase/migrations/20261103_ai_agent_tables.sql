-- ============================================================================
-- AI AGENT & GOOGLE GMAIL INTEGRATION EXTENSION SCHEMA
-- ============================================================================

-- 1. User Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(50) DEFAULT 'shop_owner',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 2. AI Conversations
CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL DEFAULT 'New Conversation',
    user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 3. Conversation Messages
CREATE TABLE IF NOT EXISTS conversation_messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(30) NOT NULL, -- user, model, system, tool
    content TEXT NOT NULL,
    tool_calls JSONB,
    tool_results JSONB,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 4. Google Connections (Gmail OAuth Tokens - Encrypted on Backend)
CREATE TABLE IF NOT EXISTS google_connections (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    encrypted_refresh_token TEXT NOT NULL,
    access_token TEXT,
    token_expiry TIMESTAMPTZ,
    scopes TEXT[] DEFAULT ARRAY['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.email'],
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 5. Email Campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft', -- draft, sending, completed, failed, partially_failed
    sender_email VARCHAR(255) NOT NULL,
    total_recipients INTEGER NOT NULL DEFAULT 0,
    accepted_count INTEGER NOT NULL DEFAULT 0,
    failed_count INTEGER NOT NULL DEFAULT 0,
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 6. Email Campaign Recipients (Per-recipient tracking)
CREATE TABLE IF NOT EXISTS email_campaign_recipients (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    campaign_id TEXT NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
    customer_id TEXT REFERENCES customers(id) ON DELETE SET NULL,
    recipient_email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, sent, failed, unsubscribed
    error_message TEXT,
    message_id VARCHAR(255),
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 7. AI Execution Logs (Audit trail for every business-changing action)
CREATE TABLE IF NOT EXISTS ai_execution_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    conversation_id TEXT REFERENCES conversations(id) ON DELETE SET NULL,
    user_prompt TEXT NOT NULL,
    intent_detected VARCHAR(100),
    tool_name VARCHAR(100) NOT NULL,
    tool_arguments JSONB,
    tool_result JSONB,
    status VARCHAR(50) NOT NULL, -- success, failure, rejected, simulated
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_conv_messages_conv ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conv_messages_created ON conversation_messages(created_at ASC);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_camp ON email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_status ON email_campaign_recipients(status);
CREATE INDEX IF NOT EXISTS idx_ai_logs_created ON ai_execution_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_logs_tool ON ai_execution_logs(tool_name);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_execution_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow full access on profiles" ON profiles;
    CREATE POLICY "Allow full access on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on conversations" ON conversations;
    CREATE POLICY "Allow full access on conversations" ON conversations FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on conversation_messages" ON conversation_messages;
    CREATE POLICY "Allow full access on conversation_messages" ON conversation_messages FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on google_connections" ON google_connections;
    CREATE POLICY "Allow full access on google_connections" ON google_connections FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on email_campaigns" ON email_campaigns;
    CREATE POLICY "Allow full access on email_campaigns" ON email_campaigns FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on email_campaign_recipients" ON email_campaign_recipients;
    CREATE POLICY "Allow full access on email_campaign_recipients" ON email_campaign_recipients FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow full access on ai_execution_logs" ON ai_execution_logs;
    CREATE POLICY "Allow full access on ai_execution_logs" ON ai_execution_logs FOR ALL USING (true) WITH CHECK (true);
END $$;

-- Schema Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
