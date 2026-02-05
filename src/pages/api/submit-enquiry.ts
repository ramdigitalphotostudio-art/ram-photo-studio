import type { APIRoute } from 'astro';
import { supabaseAdmin } from "../../lib/supabaseAdmin.js";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        // Validate required fields
        if (!name || !phone || !message) {
            return new Response(JSON.stringify({
                success: false,
                error: 'Missing required fields'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert into database
        const insertData: any = {
            name,
            phone,
            message
        };

        // Only include email if it's provided
        if (email) {
            insertData.email = email;
        }

        const { data, error } = await supabaseAdmin
            .from('enquiries')
            .insert([insertData])
            .select('id')
            .single();

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
            success: true,
            id: data.id
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
