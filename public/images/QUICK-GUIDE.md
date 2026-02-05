# Quick Image Update Guide

## 🎯 Where to Update Image Paths

### 1. Homepage Hero Slider
**File**: `src/pages/index.astro`
**Line**: ~4-33

```javascript
const slides = [
  {
    image: "/images/hero/wedding-1.jpg",  // ← Change here
    title: "Timeless Wedding Stories",
    subtitle: "Candid moments, cinematic frames, and heartfelt celebrations.",
    cta: { label: "View Wedding Work", href: "/specialised-in#candid" },
  },
  {
    image: "/images/hero/portrait-1.jpg",  // ← Change here
    title: "Signature Portraits",
    subtitle: "Studio portraits that highlight personality and style.",
    cta: { label: "Book a Portrait", href: "/still-photography#studio" },
  },
  // Add more slides...
];
```

---

### 2. Featured Gallery (6 images)
**File**: `src/pages/index.astro`
**Line**: ~53-60

```javascript
const featuredShots = [
  "/images/gallery/photo-1.jpg",  // ← Change here
  "/images/gallery/photo-2.jpg",  // ← Change here
  "/images/gallery/photo-3.jpg",  // ← Change here
  "/images/gallery/photo-4.jpg",  // ← Change here
  "/images/gallery/photo-5.jpg",  // ← Change here
  "/images/gallery/photo-6.jpg",  // ← Change here
];
```

---

### 3. About Section Image
**File**: `src/pages/index.astro`
**Line**: ~220-225

```html
<div
  class="hidden md:block bg-cover bg-center min-h-[320px] relative"
  style="background-image: url('/images/about/studio-interior.jpg');"  ← Change here
>
```

---

## 📋 Checklist

After adding images:

- [ ] Hero slider: 4 images in `public/images/hero/`
- [ ] Gallery: 6 images in `public/images/gallery/`
- [ ] About: 1 image in `public/images/about/`
- [ ] Updated paths in `src/pages/index.astro`
- [ ] Tested in browser (refresh page)

---

## 🔍 Example File Structure

```
public/images/
├── hero/
│   ├── wedding-1.jpg
│   ├── portrait-1.jpg
│   ├── product-1.jpg
│   └── gifts-1.jpg
├── gallery/
│   ├── photo-1.jpg
│   ├── photo-2.jpg
│   ├── photo-3.jpg
│   ├── photo-4.jpg
│   ├── photo-5.jpg
│   └── photo-6.jpg
└── about/
    └── studio-interior.jpg
```

---

**Total images needed**: 11 images (4 hero + 6 gallery + 1 about)
