import type { APIRoute } from 'astro';
import { supabaseAdmin } from "../../lib/supabaseAdmin.js";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { id, email } = body;

        // Validate required fields
        if (!id || !email) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Missing required fields'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Update the enquiry with email
        const { error } = await supabaseAdmin
            .from('enquiries')
            .update({ email })
            .eq('id', id);

        if (error) {
            console.error('Database error:', error);
            return new Response(JSON.stringify({
                success: false,
                error: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            success: true
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('API error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message || 'Internal server error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
