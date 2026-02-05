import type { APIRoute } from 'astro';
import { deleteResource } from '../../lib/cloudinary';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { publicId, resourceType } = await request.json();

        if (!publicId) {
            return new Response(
                JSON.stringify({ success: false, error: 'No public ID provided' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const result = await deleteResource(publicId, resourceType || 'image');

        return new Response(
            JSON.stringify(result),
            {
                status: result.success ? 200 : 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    } catch (error) {
        console.error('Delete error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Delete failed'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
