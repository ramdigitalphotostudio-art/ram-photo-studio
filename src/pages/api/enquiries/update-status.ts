// API endpoint to update enquiry status (server-side only)
import type { APIRoute } from 'astro';
import { supabaseAdmin } from "../../../lib/supabaseAdmin.js";

// Disable prerendering for this API route
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    console.log('=== API Route Called ===');

    try {
        // Check if supabaseAdmin is initialized
        if (!supabaseAdmin) {
            console.error('supabaseAdmin is not initialized!');
            return new Response(JSON.stringify({ error: 'Server configuration error: Supabase admin client not initialized' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Parsing request body...');
        let body;
        try {
            body = await request.json();
        } catch (parseError: any) {
            console.error('Failed to parse request body:', parseError);
            return new Response(JSON.stringify({ error: 'Invalid request body: ' + parseError.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Request body:', body);

        const { id, status } = body;

        // Validate input
        if (!id || !status) {
            console.log('Validation failed: Missing id or status');
            return new Response(JSON.stringify({ error: 'Missing id or status' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate status value
        const validStatuses = ['to_be_contacted', 'resolved', 'spam'];
        if (!validStatuses.includes(status)) {
            console.log('Validation failed: Invalid status value:', status);
            return new Response(JSON.stringify({ error: 'Invalid status value' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Updating enquiry:', id, 'to status:', status);

        // Update status using admin client (bypasses RLS)
        const { data, error } = await supabaseAdmin
            .from('enquiries')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return new Response(JSON.stringify({ error: 'Database error: ' + error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log('Update successful:', data);

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('API error:', error);
        console.error('Error stack:', error.stack);
        return new Response(JSON.stringify({
            error: 'Internal server error: ' + (error.message || 'Unknown error'),
            details: error.stack
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
