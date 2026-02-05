// API endpoint to add a new customer
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../../lib/supabaseAdmin.js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { name, spouse_name, phone, email, birthday, anniversary, location, city, notes } = body;

        // Validate required fields
        if (!name || !phone) {
            return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate phone number format (10 digits only)
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            return new Response(JSON.stringify({ error: 'Phone number must be exactly 10 digits' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check for duplicate phone number
        const { data: existingUsers } = await supabaseAdmin
            .from('customers')
            .select('id')
            .eq('phone', cleanPhone)
            .limit(1);

        if (existingUsers && existingUsers.length > 0) {
            return new Response(JSON.stringify({ error: 'A customer with this phone number already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert customer
        const { data, error } = await supabaseAdmin
            .from('customers')
            .insert([{ name, spouse_name, phone: cleanPhone, email, birthday, anniversary, location, city, notes }]) // Saving cleaned phone
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('Error adding customer:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
