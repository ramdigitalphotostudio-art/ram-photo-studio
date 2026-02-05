import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const GET: APIRoute = async () => {
    try {
        // Get the visitor count
        const { data, error } = await supabaseAdmin
            .from("visitor_stats")
            .select("total_count")
            .eq("id", 1)
            .single();

        if (error) {
            // If table doesn't exist yet, return 0
            return new Response(
                JSON.stringify({
                    total: 0,
                    today: 0,
                    week: 0,
                    month: 0,
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const totalCount = data?.total_count || 0;

        return new Response(
            JSON.stringify({
                total: totalCount,
                today: 0,  // Not tracked in simplified version
                week: 0,   // Not tracked in simplified version
                month: 0,  // Not tracked in simplified version
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        // Return 0 instead of error to prevent breaking the admin dashboard
        return new Response(
            JSON.stringify({
                total: 0,
                today: 0,
                week: 0,
                month: 0,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};
