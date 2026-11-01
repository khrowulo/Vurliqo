/**
 * Vurliqo - Phase 5 Database Structures
 * Advanced Social Features, Following, Close Friends, Blocking, Activity, Mentions, Tags, Comments, Saved Collections, Sharing
 * 
 * These tables are managed through Lovable Cloud's built-in backend.
 * Add schema through the Lovable UI (More → Database → Manage)
 * or via project chat commands.
 * 
 * IMPORTANT: Reuse existing tables where possible from Phases 1-4.
 * Only add new tables/columns for Phase 5 features.
 */

// ==========================================
// FOLLOW SYSTEM
// ==========================================

// Table: follows
-- Existing table from Phase 2, but extending for Phase 5 features
-- If not already exists, create:
/*
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_following BOOLEAN DEFAULT true,
  is_mutual BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
*/

-- Add/modify columns if follows table exists from Phase 2
-- is_following: whether user is currently following
-- is_mutual: whether the follow is mutual (follower also follows back)

// ==========================================
// FOLLOW REQUESTS
// ==========================================

// Table: follow_requests
-- Requests to follow private accounts
CREATE TABLE IF NOT EXISTS follow_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(from_user_id, to_user_id)
);

-- Indexes for follow requests
CREATE INDEX IF NOT EXISTS idx_follow_requests_from_user ON follow_requests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_follow_requests_to_user ON follow_requests(to_user_id);
CREATE INDEX IF NOT EXISTS idx_follow_requests_status ON follow_requests(status);

// ==========================================
// CLOSE FRIENDS SYSTEM
// ==========================================

// Table: close_friends
-- User's close friends list
CREATE TABLE IF NOT EXISTS close_friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  friend_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_user_id)
);

-- Indexes for close friends
CREATE INDEX IF NOT EXISTS idx_close_friends_user_id ON close_friends(user_id);
CREATE INDEX IF NOT EXISTS idx_close_friends_friend_id ON close_friends(friend_user_id);

// ==========================================
// ACCOUNT RESTRICTION & BLOCKING
// ==========================================

// Table: account_restrictions
-- Restriction relationships (softer than blocking)
CREATE TABLE IF NOT EXISTS account_restrictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restricting_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restricted_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  restriction_type TEXT NOT NULL DEFAULT 'limited' CHECK (restriction_type IN ('limited', 'full')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(restricting_user_id, restricted_user_id)
);

-- Indexes for account restrictions
CREATE INDEX IF NOT EXISTS idx_account_restrictions_restrictor ON account_restrictions(restricting_user_id);
CREATE INDEX IF NOT EXISTS idx_account_restrictions_restricted ON account_restrictions(restricted_user_id);

// ==========================================
// BLOCKED USERS (extending Phase 4)
// ==========================================

-- The blocked_users table from Phase 4 already exists
-- No changes needed unless additional fields are required

// ==========================================
// ACTIVITY TRACKING
// ==========================================

// Table: activity_log
-- System activity tracking
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN (
    'follow', 'unfollow', 'follow_accepted', 'follow_rejected',
    'close_friend_added', 'close_friend_removed',
    'block', 'unblock', 'restrict', 'unrestrict',
    'like', 'unlike', 'comment', 'uncomment',
    'mention', 'tag', 'hashtag',
    'story_view', 'reel_view',
    'post_save', 'collection_save', 'collection_remove',
    'share', 'report'
  )),
  target_type TEXT CHECK (target_type IN ('user', 'post', 'reel', 'story', 'comment', 'collection')),
  target_id UUID, -- ID of the target resource (user_id, post_id, etc.)
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activity log
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action_type ON action_type;
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON created_at DESC;

// ==========================================
// MENTIONS & TAGS
// ==========================================

// Table: post_mentions
-- Mentions of users in posts
CREATE TABLE IF NOT EXISTS post_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  mentioned_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentioned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, mentioned_user_id)
);

-- Indexes for post mentions
CREATE INDEX IF NOT EXISTS idx_post_mentions_post_id ON post_mentions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_mentions_user_id ON post_mentions(mentioned_user_id);

// Table: reel_mentions
-- Mentions of users in reels
CREATE TABLE IF NOT EXISTS reel_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  mentioned_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentioned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reel_id, mentioned_user_id)
);

-- Indexes for reel mentions
CREATE INDEX IF NOT EXISTS idx_reel_mentions_reel_id ON reel_mentions(reel_id);
CREATE INDEX IF NOT EXISTS idx_reel_mentions_user_id ON reel_mentions(mentioned_user_id);

// Table: post_tags
-- Hashtags/tags associated with posts
CREATE TABLE IF NOT EXISTS post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, tag)
);

-- Indexes for post tags
CREATE INDEX IF NOT EXISTS idx_post_tags_post_id ON post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag);

// ==========================================
// COMMENTS & MODERATION EXPANSION
// ==========================================

// Table: comment_replies
-- Nested replies to comments
CREATE TABLE IF NOT EXISTS comment_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for comment replies
CREATE INDEX IF NOT EXISTS idx_comment_replies_comment_id ON comment_replies(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_replies_user_id ON comment_replies(user_id);

// Table: comment_moderation
-- Comment moderation actions
CREATE TABLE IF NOT EXISTS comment_moderation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('hide', 'delete', 'report', 'unhide')),
  acted_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  acted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Indexes for comment moderation
CREATE INDEX IF NOT EXISTS idx_comment_moderation_comment_id ON comment_moderation(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_moderation_acted_by ON comment_moderation(acted_by_user_id);

// ==========================================
// SAVED CONTENT & COLLECTIONS
// ==========================================

// Table: saved_collections
-- User-created collections for saved posts/reels
CREATE TABLE IF NOT EXISTS saved_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for saved collections
CREATE INDEX IF NOT EXISTS idx_saved_collections_user_id ON saved_collections(user_id);

// Table: collection_items
-- Items within saved collections
CREATE TABLE IF NOT EXISTS collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES saved_collections(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('post', 'reel')),
  item_id UUID NOT NULL, -- post_id or reel_id
  order_index INTEGER NOT NULL DEFAULT 0,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, item_id)
);

-- Indexes for collection items
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_item_id ON collection_items(item_id);

// ==========================================
// SHARING & EXTERNAL SHARING
// ==========================================

// Table: shared_content
-- Track shared content
CREATE TABLE IF NOT EXISTS shared_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shared_by_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('post', 'reel', 'profile', 'link')),
  item_id UUID NOT NULL, -- post_id, reel_id, user_id, or link URL
  shared_with_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- If DM share
  shared_with_group_id UUID REFERENCES conversations(id) ON DELETE SET NULL, -- If group share
  share_type TEXT NOT NULL DEFAULT 'direct', -- direct, group, external
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Indexes for shared content
CREATE INDEX IF NOT EXISTS idx_shared_content_by_user ON shared_content(shared_by_user_id);
CREATE INDEX IF NOT EXISTS idx_shared_content_item_type ON shared_content(item_type);
CREATE INDEX IF NOT EXISTS idx_shared_content_shared_with ON shared_content(shared_with_user_id);

// ==========================================
// REPORT SYSTEM
// ==========================================

// Table: reports
-- User reports for content or other users
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'post', 'reel', 'story', 'comment', 'reel_comment')),
  target_id UUID NOT NULL, -- ID of the reported resource
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Indexes for reports
CREATE INDEX IF NOT EXISTS idx_reports_target_type ON reports(target_type);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_reporter ON reports(reporter_user_id);

// ==========================================
// POST INTERACTIONS EXPANSION
// ==========================================

-- Note: likes, comments, and posts tables likely exist from Phase 2/3
-- Add/modify as needed for Phase 5 features:

-- If comment table exists from Phase 2, ensure it has:
-- - post_id reference
-- - user_id reference  
-- - content
-- - created_at

-- If we need to track comment likes (new):
/*
ALTER TABLE comments ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;
*/

-- If we need to track comment replies (already in comment_replies table above)

// ==========================================
// INDEXES FOR EXISTING TABLES (enhancements)
// ==========================================

-- Enhance posts table indexes if needed
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_likes_count ON posts(likes_count DESC);

// Enhance reels table indexes
CREATE INDEX IF NOT EXISTS idx_reels_user_id ON reels(user_id);
CREATE INDEX IF NOT EXISTS idx_reels_likes_count ON reels(likes_count DESC);
CREATE INDEX IF NOT EXISTS idx_reels_views_count ON reels(views_count DESC);

// ==========================================
// VIEWS & COUNTERS
// ==========================================

-- Follow counts (could be computed or maintained)
-- Followers count: SELECT COUNT(*) FROM follows WHERE following_id = ?
-- Following count: SELECT COUNT(*) FROM follows WHERE follower_id = ?
-- Close friends count: SELECT COUNT(*) FROM close_friends WHERE user_id = ?

-- Activity: View activity feed for a user
-- SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 50