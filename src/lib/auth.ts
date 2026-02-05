// Authentication utilities for Supabase Auth
import type { AstroCookies } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

/**
 * Create a Supabase client with cookie-based session management
 * This allows us to maintain auth state across requests
 */
export function createSupabaseClient(cookies: AstroCookies) {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            flowType: 'pkce',
            autoRefreshToken: false, // Disabled to prevent cookie errors
            detectSessionInUrl: false,
            persistSession: true,
            storage: {
                getItem: (key: string) => {
                    return cookies.get(key)?.value ?? null;
                },
                setItem: (key: string, value: string) => {
                    cookies.set(key, value, {
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7, // 7 days
                        sameSite: 'lax',
                        secure: import.meta.env.PROD,
                    });
                },
                removeItem: (key: string) => {
                    cookies.delete(key, { path: '/' });
                },
            },
        },
    });
}

/**
 * Check if the user is authenticated
 * Returns the user object if authenticated, null otherwise
 */
export async function getAuthenticatedUser(cookies: AstroCookies) {
    const supabase = createSupabaseClient(cookies);
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string, cookies: AstroCookies) {
    const supabase = createSupabaseClient(cookies);
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { data, error };
}

/**
 * Sign out the current user
 */
export async function signOut(cookies: AstroCookies) {
    const supabase = createSupabaseClient(cookies);
    const { error } = await supabase.auth.signOut();

    // Clear all auth cookies
    cookies.delete('sb-access-token', { path: '/' });
    cookies.delete('sb-refresh-token', { path: '/' });

    return { error };
}
