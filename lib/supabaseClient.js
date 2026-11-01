/* 
 * Vurliqo - Supabase/Lovable Cloud Client
 * Phase 2: Backend integration for database, storage, and auth
 */

import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual Lovable Cloud credentials
// The built-in Lovable Cloud backend uses Supabase under the hood
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
);

export default supabase;