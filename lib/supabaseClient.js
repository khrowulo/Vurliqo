/*
 * Vurliqo - Supabase Client
 * Phase 2: Lovable Cloud backend integration
 * 
 * Lovable Cloud's built-in backend uses Supabase under the hood.
 * Environment variables are injected by Lovable Cloud on deployment:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - SUPABASE_SERVICE_ROLE_KEY
 * 
 * This client is configured to use the environment variables
 * provided by Lovable Cloud. For local development, ensure
 * the project runs through Lovable's dev server which provides
 * the proper bindings.
 */

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment
// These are injected by Lovable Cloud on deployment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

// Primary client for client-side use (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefresh: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Admin client for server-side use (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefresh: false,
    persistSession: false,
  },
});

export default supabase;