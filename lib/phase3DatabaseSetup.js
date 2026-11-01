/**
 * Vurliqo - Phase 3 Database Structures
 * Stories, Reels, Explore, and Search system
 * 
 * These tables are managed through Lovable Cloud's built-in backend.
 * Add schema through the Lovable UI (More → Database → Manage)
 * or via project chat commands.
 */

// ==========================================
// STORIES TABLES
// ==========================================

// Table: stories
-- Stores user stories (expire after 24 hours)
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  caption TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true
);

// Table: story_views
-- Tracks story views per user
CREATE TABLE IF NOT EXISTS story_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, user_id)
);

// Table: story_reactions
-- Emoji reactions to stories
CREATE TABLE IF NOT EXISTS story_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(story_id, user_id, emoji)
);

// Table: story_replies
-- Replies to specific story frames
CREATE TABLE IF NOT EXISTS story_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// ==========================================
// HIGHLIGHTS TABLES
// ==========================================

// Table: story_highlights
-- User-created story highlights (permanent collections)
CREATE TABLE IF NOT EXISTS story_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Table: highlight_items
-- Individual story items in a highlight
CREATE TABLE IF NOT EXISTS highlight_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  highlight_id UUID NOT NULL REFERENCES story_highlights(id) ON DELETE CASCADE,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// ==========================================
// REELS TABLES
// ==========================================

// Table: reels
-- User-created reels (short videos)
CREATE TABLE IF NOT EXISTS reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  cover_image_url TEXT,
  caption TEXT,
  hashtag TEXT,
  location TEXT,
  duration INTEGER DEFAULT 30,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  allows_comments BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Table: reel_views
-- Tracks reel views
CREATE TABLE IF NOT EXISTS reel_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reel_id, user_id)
);

// Table: reel_likes
-- Likes on reels
CREATE TABLE IF NOT EXISTS reel_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reel_id, user_id)
);

// Table: reel_comments
-- Comments on reels
CREATE TABLE IF NOT EXISTS reel_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Table: reel_saves
-- Saved reels per user
CREATE TABLE IF NOT EXISTS reel_saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reel_id UUID NOT NULL REFERENCES reels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(reel_id, user_id)
);

// ==========================================
// SEARCH & DISCOVERY TABLES
// ==========================================

// Table: search_history
-- User search history
CREATE TABLE IF NOT EXISTS search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query TEXT NOT NULL,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL DEFAULT 'general'
);

// Table: hashtags
-- Hashtag tracking for discovery
CREATE TABLE IF NOT EXISTS hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag TEXT NOT NULL UNIQUE,
  total_uses INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

// Table: post_hashtags
-- Junction table for post-hashtag relationships
CREATE TABLE IF NOT EXISTS post_hashtags (
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  hashtag_id UUID NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, hashtag_id)
);

// ==========================================
// INDEXES
// ==========================================

-- Stories indexes
CREATE INDEX IF NOT EXISTS idx_stories_user_id ON stories(user_id);
CREATE INDEX IF NOT EXISTS idx_stories_expires_at ON stories(expires_at DESC);
CREATE INDEX IF NOT EXISTS idx_story_views_story_id ON story_views(story_id);
CREATE INDEX IF NOT EXISTS idx_story_views_user_id ON story_views(user_id);
CREATE INDEX IF NOT EXISTS idx_story_reactions_story_id ON story_reactions(story_id);
CREATE INDEX IF NOT EXISTS idx_story_replies_story_id ON story_replies(story_id);

// Highlights indexes
CREATE INDEX IF NOT EXISTS idx_story_highlights_user_id ON story_highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_highlight_items_highlight_id ON highlight_items(highlight_id);

// Reels indexes
CREATE INDEX IF NOT EXISTS idx_reels_user_id ON reels(user_id);
CREATE INDEX IF NOT EXISTS idx_reels_created_at ON reels(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reel_views_reel_id ON reel_views(reel_id);
CREATE INDEX IF NOT EXISTS idx_reel_likes_reel_id ON reel_likes(reel_id);
CREATE INDEX IF NOT EXISTS idx_reel_comments_reel_id ON reel_comments(reel_id);
CREATE INDEX IF NOT EXISTS idx_reel_saves_reel_id ON reel_saves(reel_id);

// Search history indexes
CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_searched_at ON search_history(searched_at DESC);

// Hashtags indexes
CREATE INDEX IF NOT EXISTS idx_hashtags_tag ON hashtags(tag);