/**
 * Vurliqo - Phase 4 Database Structures
 * Direct Messaging, Chat Systems, and Notifications
 * 
 * These tables are managed through Lovable Cloud's built-in backend.
 * Add schema through the Lovable UI (More → Database → Manage)
 * or via project chat commands.
 */

// ==========================================
// CONVERSATIONS TABLE
// ==========================================

// Table: conversations
-- Stores direct conversation threads
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('direct', 'group', 'business')),
  title TEXT, -- For groups/business: conversation name
  description TEXT, -- For groups/business: description
  is_pinned BOOLEAN DEFAULT false,
  is_muted BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_message_user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// ==========================================
// CONVERSATION PARTICIPANTS
// ==========================================

// Table: conversation_participants
-- Users participating in conversations
CREATE TABLE IF NOT EXISTS conversation_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'owner')),
  is_muted BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

// ==========================================
// DIRECT MESSAGES
// ==========================================

// Table: messages
-- Stores individual messages in conversations
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT, -- For photo/video/voice/attachment
  media_type TEXT CHECK (media_type IN ('text', 'image', 'video', 'voice', 'gif', 'system')),
  reply_to_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT false,
  edit_history JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Message status tracking
-- Table: message_status
-- Tracks read/delivery status per user per message
CREATE TABLE IF NOT EXISTS message_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  delivered_at TIMESTAMP WITH TIME ZONE,
  read_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(message_id, user_id)
);

// ==========================================
// MESSAGE REACTIONS
// ==========================================

// Table: message_reactions
-- Emoji reactions to messages
CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(message_id, user_id, emoji)
);

// ==========================================
// MESSAGE REQUESTS
// ==========================================

// Table: message_requests
-- Messages from non-followers or unrestricted users
CREATE TABLE IF NOT EXISTS message_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  is_accepted BOOLEAN DEFAULT false,
  is_declined BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  declined_at TIMESTAMP WITH TIME ZONE
);

// ==========================================
// BLOCKED USERS
// ==========================================

// Table: blocked_users
-- Tracks user blocking relationships
CREATE TABLE IF NOT EXISTS blocked_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_user_id)
);

// ==========================================
// MUTE CONVERSATIONS
// ==========================================

// Already handled in conversation_participants.is_muted

// ==========================================
// ARCHIVED CONVERSATIONS
// ==========================================
-- Already handled in conversations.is_archived

// ==========================================
// NOTIFICATIONS TABLE
// ==========================================

// Table: notifications
-- System notifications for various events
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN (
    'like', 'comment', 'reply', 'follow', 'follow_request', 
    'mention', 'tag', 'story_interaction', 'reel_interaction',
    'message_request', 'direct_message', 'group_invitation'
  )),
  related_id UUID, -- Related resource ID (post, reel, comment, etc.)
  is_read BOOLEAN DEFAULT false,
  action_url TEXT, -- URL to navigate to when clicked
  metadata JSONB DEFAULT '{}', -- Additional data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Notification preferences per user
-- Table: notification_preferences
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_enabled BOOLEAN DEFAULT true,
  push_enabled BOOLEAN DEFAULT true,
  in_app_enabled BOOLEAN DEFAULT true,
  categories JSONB DEFAULT '{"likes": true, "comments": true, "follows": true, "messages": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// ==========================================
// TYPING/STATE TABLE
// ==========================================

// Table: typing_state
-- Tracks who is typing in which conversation
CREATE TABLE IF NOT EXISTS typing_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  is_typing BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(conversation_id, user_id)
);

// ==========================================
// GROUP MESSAGES (supplementary - already in messages table)
// ==========================================

// Messages table has conversation_id which can be direct/group/business
-- Group-specific features are tracked via conversation type and participants

// ==========================================
// CALL HISTORY (foundation for Module 6)
// ==========================================

// Table: call_history
-- Tracks call attempts and history
CREATE TABLE IF NOT EXISTS call_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  caller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  type TEXT CHECK (type IN ('audio', 'video', 'missed', 'rejected')),
  duration INTEGER, -- in seconds
  status TEXT CHECK (status IN ('completed', 'missed', 'rejected', 'failed')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// ==========================================
// INDEXES
// ==========================================

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_type ON conversations(type);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_is_pinned ON conversations(is_pinned DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_is_muted ON conversations(is_muted);

// Conversation participants indexes
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_blocked ON conversation_participants(is_blocked);

// Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_reply_to ON messages(reply_to_message_id);

// Message status indexes
CREATE INDEX IF NOT EXISTS idx_message_status_message_id ON message_status(message_id);
CREATE INDEX IF NOT EXISTS idx_message_status_user_id ON message_status(user_id);

// Message reactions indexes
CREATE INDEX IF NOT EXISTS idx_message_reactions_message_id ON message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id ON message_reactions(user_id);

// Message requests indexes
CREATE INDEX IF NOT EXISTS idx_message_requests_from_user ON message_requests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_to_user ON message_requests(to_user_id);
CREATE INDEX IF NOT EXISTS idx_message_requests_status ON message_requests(is_accepted, is_declined);

// Blocked users indexes
CREATE INDEX IF NOT EXISTS idx_blocked_users_blocker ON blocked_users(blocker_id);
CREATE INDEX IF NOT EXISTS idx_blocked_users_blocked ON blocked_users(blocked_user_id);

// Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

// Typing state indexes
CREATE INDEX IF NOT EXISTS idx_typing_state_conversation ON typing_state(conversation_id);
CREATE INDEX IF NOT EXISTS idx_typing_state_user ON typing_state(user_id);

// Call history indexes
CREATE INDEX IF NOT EXISTS idx_call_history_caller ON call_history(caller_id);
CREATE INDEX IF NOT EXISTS idx_call_history_recipient ON call_history(recipient_id);
CREATE INDEX IF NOT EXISTS idx_call_history_status ON call_history(status);