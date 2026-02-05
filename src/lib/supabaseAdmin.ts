// Supabase admin client for server-side operations only
// NEVER import this in client-side code!
import { createClient } from '@supabase/supabase-js';

// In Astro, use import.meta.env instead of process.env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    urlLength: supabaseUrl?.length,
    keyLength: supabaseServiceKey?.length,
    // Debug: show first 10 chars of key (safe to show)
    keyPreview: supabaseServiceKey?.substring(0, 10)
});

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables!');
    console.error('URL:', supabaseUrl ? 'Present' : 'Missing');
    console.error('Service Key:', supabaseServiceKey ? 'Present' : 'Missing');
    throw new Error('Missing Supabase admin environment variables. Please check your .env file.');
}

// Admin client - has full access to database (bypasses RLS)
// Only use this in server-side code (API routes, SSR pages)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
