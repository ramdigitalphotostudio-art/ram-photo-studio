import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    secure: true
});

export default cloudinary;

/**
 * Upload an image to Cloudinary
 * @param file - File path or base64 string
 * @param folder - Cloudinary folder name (optional)
 * @param options - Additional upload options
 */
export async function uploadImage(
    file: string,
    folder: string = 'photo-studio',
    options: Record<string, any> = {}
) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'image',
            ...options
        });
        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}

/**
 * Upload a video to Cloudinary
 * @param file - File path or base64 string
 * @param folder - Cloudinary folder name (optional)
 * @param options - Additional upload options
 */
export async function uploadVideo(
    file: string,
    folder: string = 'photo-studio/videos',
    options: Record<string, any> = {}
) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder,
            resource_type: 'video',
            ...options
        });
        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            duration: result.duration,
            format: result.format
        };
    } catch (error) {
        console.error('Error uploading video:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload failed'
        };
    }
}

/**
 * Delete a resource from Cloudinary
 * @param publicId - The public ID of the resource
 * @param resourceType - 'image' or 'video'
 */
export async function deleteResource(
    publicId: string,
    resourceType: 'image' | 'video' = 'image'
) {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return {
            success: result.result === 'ok',
            result: result.result
        };
    } catch (error) {
        console.error('Error deleting resource:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Delete failed'
        };
    }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - The public ID of the image
 * @param transformations - Cloudinary transformation options
 */
export function getOptimizedImageUrl(
    publicId: string,
    transformations: Record<string, any> = {}
) {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
        ...transformations
    });
}

/**
 * Get responsive image URLs for different screen sizes
 * @param publicId - The public ID of the image
 */
export function getResponsiveImageUrls(publicId: string) {
    return {
        thumbnail: cloudinary.url(publicId, { width: 300, height: 300, crop: 'fill', quality: 'auto' }),
        small: cloudinary.url(publicId, { width: 640, quality: 'auto' }),
        medium: cloudinary.url(publicId, { width: 1024, quality: 'auto' }),
        large: cloudinary.url(publicId, { width: 1920, quality: 'auto' }),
        original: cloudinary.url(publicId, { quality: 'auto' })
    };
}
