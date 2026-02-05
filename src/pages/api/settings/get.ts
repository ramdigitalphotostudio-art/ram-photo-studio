import type { APIRoute } from 'astro';
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const GET: APIRoute = async () => {
    try {
        const { data, error } = await supabaseAdmin
            .from('settings')
            .select('value')
            .eq('key', 'greeting_templates')
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
            throw error;
        }

        // Return found data or null (which frontend will handle by using defaults)
        return new Response(JSON.stringify({
            templates: data?.value || null
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Settings fetch error:', error);
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
