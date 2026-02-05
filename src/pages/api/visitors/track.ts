import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const POST: APIRoute = async () => {
    try {
        // Try to increment the visitor count using the function
        const { error: funcError } = await supabaseAdmin
            .rpc('increment_visitor_count');

        if (funcError) {
            // If function doesn't exist, try direct update as fallback
            const { error: updateError } = await supabaseAdmin
                .from("visitor_stats")
                .update({
                    total_count: supabaseAdmin.rpc('visitor_stats.total_count + 1'),
                    last_updated: new Date().toISOString()
                })
                .eq("id", 1);

            if (updateError) {
                // Silently fail - visitor tracking is not critical
                return new Response(
                    JSON.stringify({ success: true, tracked: false }),
                    { status: 200 }
                );
            }
        }

        return new Response(
            JSON.stringify({ success: true, tracked: true }),
            { status: 200 }
        );
    } catch (error) {
        // Silently fail - don't break the website if tracking fails
        return new Response(
            JSON.stringify({ success: true, tracked: false }),
            { status: 200 }
        );
    }
};
