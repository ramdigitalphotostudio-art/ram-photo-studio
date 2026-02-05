import type { APIRoute } from 'astro';
import { uploadImage, uploadVideo } from '../../lib/cloudinary';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as string; // 'image' or 'video'
        const folder = formData.get('folder') as string || 'photo-studio';

        if (!file) {
            return new Response(
                JSON.stringify({ success: false, error: 'No file provided' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        // Upload based on type
        let result;
        if (type === 'video') {
            result = await uploadVideo(dataUri, folder);
        } else {
            result = await uploadImage(dataUri, folder);
        }

        if (result.success) {
            return new Response(
                JSON.stringify(result),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify(result),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error('Upload error:', error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed'
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
