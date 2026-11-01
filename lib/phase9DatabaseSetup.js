/* 
 * Vurliqo - Phase 9 Database Structures
 * Lovable Cloud native database schema extensions
 * 
 * Database tables and schema extensions for Phase 9 features.
 * Tables managed through Lovable Cloud's built-in backend interface.
 * 
 * To implement: Use Lovable UI → More → Database → Manage
 * Or describe schema changes in project chat.
 */

/* ================================================
   Live Streaming System Tables
   ================================================ */

// live_broadcasts - Live broadcast sessions
// - id: UUID, primary key
// - creator_id: UUID, references users(id)
// - title: text, not null
// - description: text (optional)
// - status: enum ('scheduled', 'live', 'completed', 'cancelled'), default 'scheduled'
// - started_at: timestamptz (optional)
// - ended_at: timestamptz (optional)
// - duration_seconds: integer (optional)
// - viewer_count: integer, default 0
// - thumbnail_url: text (optional)
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// live_comments - Real-time comments during live broadcasts
// - id: UUID, primary key
// - broadcast_id: UUID, references live_broadcasts(id)
// - user_id: UUID, references users(id)
// - content: text, not null
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// live_reactions - Viewer reactions during live broadcasts
// - id: UUID, primary key
// - broadcast_id: UUID, references live_broadcasts(id)
// - user_id: UUID, references users(id) (nullable, for anonymous reactions)
// - reaction_type: enum ('heart', 'applause', 'laugh', 'wow'), not null
// - created_at: timestamptz, default now()

/* ================================================
   Broadcast Channels Tables
   ================================================ */

// broadcast_channels - Channel definitions
// - id: UUID, primary key
// - owner_id: UUID, references users(id)
// - name: text, not null
// - description: text (optional)
// - is_public: boolean, default true
// - thumbnail_url: text (optional)
// - member_count: integer, default 0
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// channel_members - Channel membership
// - id: UUID, primary key
// - channel_id: UUID, references broadcast_channels(id)
// - user_id: UUID, references users(id)
// - role: enum ('member', 'admin'), default 'member'
// - joined_at: timestamptz, default now()
// - UNIQUE(channel_id, user_id)

// channel_announcements - Channel announcements
// - id: UUID, primary key
// - channel_id: UUID, references broadcast_channels(id)
// - author_id: UUID, references users(id)
// - content: text, not null
// - type: enum ('text', 'photo', 'video'), default 'text'
// - created_at: timestamptz, default now()

/* ================================================
   Notes System Tables
   ================================================ */

// notes - User notes
// - id: UUID, primary key
// - user_id: UUID, references users(id)
// - content: text, not null
// - audience: enum ('followers', 'following', 'public'), default 'followers'
// - has_expiration: boolean, default true
// - expires_at: timestamptz (optional)
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// note_replies - Replies to notes (via messaging system)
// - id: UUID, primary key
// - note_id: UUID, references notes(id)
// - user_id: UUID, references users(id)
// - content: text, not null
// - created_at: timestamptz, default now()

/* ================================================
   Communities Tables
   ================================================ */

// communities - Community definitions
// - id: UUID, primary key
// - creator_id: UUID, references users(id)
// - name: text, not null
// - description: text (optional)
// - is_public: boolean, default true
// - thumbnail_url: text (optional)
// - member_count: integer, default 0
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// community_members - Community membership
// - id: UUID, primary key
// - community_id: UUID, references communities(id)
// - user_id: UUID, references users(id)
// - role: enum ('member', 'admin', 'moderator'), default 'member'
// - joined_at: timestamptz, default now()
// - UNIQUE(community_id, user_id)

// community_posts - Community posts
// - id: UUID, primary key
// - community_id: UUID, references communities(id)
// - author_id: UUID, references users(id)
// - content: text (optional)
// - media_url: text (optional)
// - media_type: enum ('image', 'video', 'none'), default 'none'
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// community_comments - Community post comments
// - id: UUID, primary key
// - post_id: UUID, references community_posts(id)
// - user_id: UUID, references users(id)
// - content: text, not null
// - created_at: timestamptz, default now()

/* ================================================
   Polls & Interactive Content Tables
   ================================================ */

// polls - Poll definitions
// - id: UUID, primary key
// - creator_id: UUID, references users(id)
// - question: text, not null
// - expires_at: timestamptz, not null
// - allow_multiple: boolean, default false
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// poll_options - Poll options
// - id: UUID, primary key
// - poll_id: UUID, references polls(id)
// - text: text, not null
// - vote_count: integer, default 0
// - created_at: timestamptz, default now()

// poll_votes - Poll votes (with unique constraint)
// - id: UUID, primary key
// - poll_id: UUID, references polls(id)
// - user_id: UUID, references users(id)
// - option_index: integer, not null
// - created_at: timestamptz, default now()
// - UNIQUE(poll_id, user_id) - prevents duplicate voting

/* ================================================
   Events & Reminders Tables
   ================================================ */

// events - Event definitions
// - id: UUID, primary key
// - creator_id: UUID, references users(id)
// - name: text, not null
// - description: text (optional)
// - date: timestamptz, not null
// - is_public: boolean, default true
// - location: text (optional)
// - interested_count: integer, default 0
// - attending_count: integer, default 0
// - created_at: timestamptz, default now()
// - updated_at: timestamptz, default now()

// event_rsvps - Event RSVPs
// - id: UUID, primary key
// - event_id: UUID, references events(id)
// - user_id: UUID, references users(id)
// - response: enum ('interested', 'attending', 'maybe'), not null
// - created_at: timestamptz, default now()
// - UNIQUE(event_id, user_id) - prevents duplicate RSVPs

/* ================================================
   Audio & Video Calling Tables
   ================================================ */

// call_records - Call history
// - id: UUID, primary key
// - caller_id: UUID, references users(id)
// - recipient_id: UUID, references users(id) (optional, for 1:1 calls)
// - call_type: enum ('audio', 'video'), not null
// - duration_seconds: integer (optional)
// - status: enum ('missed', 'completed', 'ongoing'), default 'ongoing'
// - started_at: timestamptz, not null
// - ended_at: timestamptz (optional)
// - created_at: timestamptz, default now()

// call_permissions - Call access permissions
// - id: UUID, primary key
// - user_id: UUID, references users(id)
// - can_receive_calls: boolean, default true
// - can_initiate_calls: boolean, default true
// - updated_at: timestamptz, default now()

/* ================================================
   Security & RLS Policies (Important)
   ================================================ */

// All new tables must have Row Level Security (RLS) policies:
// - Users can only access their own data unless explicitly permitted
// - Admin/moderator roles have broader access through authorized functions
// - Never expose user_id or sensitive data in client-side queries without protection
// - All admin operations must be protected on backend, not frontend-only
// - Immutable audit records for administrative actions

// Example RLS policy structure (managed through Lovable Cloud):
// - ON SELECT USING (user_id = auth.uid() OR role_in('super-admin'))
// - ON INSERT WITH CHECK (auth.uid() = creator_id OR role_in('admin'))
// - ON UPDATE USING (auth.uid() = user_id OR role_in('admin'))
// - ON DELETE USING (auth.uid() = user_id OR role_in('super-admin'))

/* ================================================
   Migration Notes
   ================================================ */

// Important: 
// - Do not create duplicate tables
// - Do not lose existing data from Phases 1-7
// - Proper foreign keys for all references
// - Appropriate indexes for performance
// - Unique constraints where appropriate (prevent duplicates)
// - Secure access controls for all new tables
// - User-specific data isolation
// - Safe migrations that preserve existing records
// - No reliance on local frontend state for permanent records
// - All admin operations must be protected server-side