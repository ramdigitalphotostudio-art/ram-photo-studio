# Images Folder Structure

This folder contains all local images for the Ram Digital Photo Studio website.

## 📁 Folder Organization

```
public/images/
├── hero/          - Hero slider images (homepage carousel)
├── gallery/       - Featured gallery images
├── services/      - Service-related images
└── about/         - About section images
```

## 📝 How to Use

### 1. **Add Your Images**
Place your images in the appropriate folders:
- **Hero images**: `public/images/hero/` (e.g., `slide1.jpg`, `slide2.jpg`)
- **Gallery images**: `public/images/gallery/` (e.g., `photo1.jpg`, `photo2.jpg`)
- **Service images**: `public/images/services/`
- **About images**: `public/images/about/`

### 2. **Reference Images in Code**
Since files in `public/` are served from the root, use paths like:

```astro
<!-- Hero slider -->
<img src="/images/hero/slide1.jpg" alt="Wedding photography" />

<!-- Gallery -->
<img src="/images/gallery/photo1.jpg" alt="Featured work" />

<!-- About section -->
<img src="/images/about/studio.jpg" alt="Our studio" />
```

### 3. **Image Naming Convention**
Use descriptive, lowercase names with hyphens:
- ✅ Good: `wedding-couple-sunset.jpg`
- ✅ Good: `product-shoot-1.jpg`
- ❌ Avoid: `IMG_1234.jpg`
- ❌ Avoid: `Photo 1.jpg` (spaces)

### 4. **Recommended Image Sizes**

**Hero Slider:**
- Dimensions: 1920x1080px (16:9 ratio)
- Format: JPG
- Quality: 80-85%
- Max size: 500KB per image

**Gallery Images:**
- Dimensions: 900x1125px (4:5 ratio)
- Format: JPG
- Quality: 80-85%
- Max size: 300KB per image

**About Section:**
- Dimensions: 1200x800px
- Format: JPG
- Quality: 80-85%
- Max size: 400KB per image

## 🔄 Updating Images in Code

### Homepage Hero Slider
Edit `src/pages/index.astro`, find the `slides` array:

```javascript
const slides = [
  {
    image: "/images/hero/slide1.jpg",  // Change this
    title: "Timeless Wedding Stories",
    subtitle: "Candid moments, cinematic frames...",
    cta: { label: "View Wedding Work", href: "/specialised-in#candid" },
  },
  // Add more slides...
];
```

### Featured Gallery
Edit `src/pages/index.astro`, find the `featuredShots` array:

```javascript
const featuredShots = [
  "/images/gallery/photo1.jpg",
  "/images/gallery/photo2.jpg",
  "/images/gallery/photo3.jpg",
  "/images/gallery/photo4.jpg",
  "/images/gallery/photo5.jpg",
  "/images/gallery/photo6.jpg",
];
```

### About Section Image
Edit `src/pages/index.astro`, find the about section:

```html
<div
  class="hidden md:block bg-cover bg-center min-h-[320px] relative"
  style="background-image: url('/images/about/studio.jpg');"
>
```

## 💡 Tips

1. **Optimize images** before uploading (use tools like TinyPNG, Squoosh)
2. **Use WebP format** for better compression (optional)
3. **Keep file sizes small** for faster loading
4. **Use consistent naming** for easy management
5. **Backup originals** before optimizing

## 🚀 Quick Start

1. Add your images to the appropriate folders
2. Update the image paths in `src/pages/index.astro`
3. Refresh your browser to see the changes

---

**Note**: Images in the `public/` folder are served as-is and are not processed by Astro's build system. They're perfect for photos, logos, and other static assets.
