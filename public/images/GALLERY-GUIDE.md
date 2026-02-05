# Gallery Images Update Guide

## 📸 Gallery Structure

The gallery uses a **masonry grid layout** with 15 images arranged in a Pinterest-style layout.

---

## 🎯 How to Replace Images

### 1. **Add Your Images**
Place 15 images in: `public/images/gallery/`

Recommended naming:
```
gallery-1.jpg
gallery-2.jpg
gallery-3.jpg
...
gallery-15.jpg
```

---

### 2. **Update Image Paths**

**File**: `src/pages/gallery.astro`
**Lines**: ~4-18

Replace the `galleryImages` array:

```javascript
const galleryImages = [
  { src: "/images/gallery/gallery-1.jpg", alt: "Wedding couple portrait", span: "row-span-2" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Bride details", span: "row-span-1" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Wedding ceremony", span: "row-span-2" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Wedding rings", span: "row-span-1" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Couple outdoor", span: "row-span-2" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Portrait session", span: "row-span-1" },
  { src: "/images/gallery/gallery-7.jpg", alt: "Family portrait", span: "row-span-2" },
  { src: "/images/gallery/gallery-8.jpg", alt: "Wedding bouquet", span: "row-span-1" },
  { src: "/images/gallery/gallery-9.jpg", alt: "Couple dancing", span: "row-span-2" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Wedding venue", span: "row-span-1" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Baby portrait", span: "row-span-2" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Studio portrait", span: "row-span-1" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Wedding celebration", span: "row-span-2" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Product photography", span: "row-span-1" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Couple sunset", span: "row-span-2" },
];
```

---

## 🎨 Understanding the Layout

### **Span Classes**

- `row-span-1` - Takes 1 row height (smaller, square-ish)
- `row-span-2` - Takes 2 rows height (taller, portrait-style)

### **Current Pattern**

```
[Tall] [Short] [Tall] [Short] [Tall]
[Short] [Tall] [Short] [Tall] [Short]
[Tall] [Short] [Tall] [Short] [Tall]
```

This creates a balanced, Pinterest-style masonry grid.

---

## 💡 Tips for Best Results

### **Image Sizes**

**For `row-span-1` (short images):**
- Recommended: 800x800px (square)
- Aspect ratio: 1:1 or 4:3

**For `row-span-2` (tall images):**
- Recommended: 800x1200px (portrait)
- Aspect ratio: 2:3 or 3:4

### **Optimization**
- Format: JPG or WebP
- Quality: 80-85%
- Max size: 300-500KB per image
- Use tools like TinyPNG or Squoosh

---

## ✨ Features

### **Lightbox**
- Click any image to view full size
- Smooth fade-in animation
- Click outside or press ESC to close
- Backdrop blur effect

### **Hover Effects**
- Image scales up slightly
- Dark overlay appears
- Zoom icon shows

### **Responsive**
- 2 columns on mobile
- 3 columns on tablet
- 4 columns on desktop

---

## 🔧 Customization

### **Change Number of Images**

Add or remove items from the `galleryImages` array. The grid will automatically adjust.

### **Adjust Grid Columns**

In `gallery.astro`, find this line:
```html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
```

Change:
- `grid-cols-2` - Mobile columns
- `md:grid-cols-3` - Tablet columns  
- `lg:grid-cols-4` - Desktop columns
- `auto-rows-[200px]` - Row height

### **Adjust Gap Between Images**

Change `gap-4` to:
- `gap-2` - Smaller gap
- `gap-6` - Larger gap
- `gap-8` - Extra large gap

---

## 📋 Quick Checklist

- [ ] Add 15 images to `public/images/gallery/`
- [ ] Update paths in `src/pages/gallery.astro`
- [ ] Update alt text descriptions
- [ ] Test lightbox functionality
- [ ] Check responsive layout on mobile

---

**Total images needed**: 15 images
**Recommended mix**: 8 tall (row-span-2) + 7 short (row-span-1)
