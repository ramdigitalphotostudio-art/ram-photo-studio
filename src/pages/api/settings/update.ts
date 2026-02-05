import type { APIRoute } from 'astro';
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { templates } = body;

        if (!templates || !templates.birthday || !templates.anniversary) {
            return new Response(JSON.stringify({ error: "Invalid templates data" }), { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('settings')
            .upsert({
                key: 'greeting_templates',
                value: templates,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Settings update error:', error);
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
