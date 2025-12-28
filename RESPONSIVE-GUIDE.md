# 📱 Panduan Responsive Design - LP Ma'arif NU Website

## ✅ Responsive Breakpoints

Website ini menggunakan breakpoint Tailwind CSS default:

| Breakpoint | Min Width | Target Device |
|------------|-----------|---------------|
| `xs` (default) | 0px | Mobile Portrait (320px+) |
| `sm` | 640px | Mobile Landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large Desktop |
| `2xl` | 1536px | Extra Large |

## 🎯 Design Principles

### 1. Mobile-First Approach
Semua komponen dibuat dengan mobile-first approach:
```jsx
// ✅ Correct - Mobile first
<div className="text-sm md:text-base lg:text-lg">

// ❌ Wrong - Desktop first
<div className="text-lg md:text-base sm:text-sm">
```

### 2. Touch-Friendly Targets
Semua elemen interaktif minimal 44x44px untuk kemudahan tap:
```css
/* Sudah diaplikasikan di globals.css */
button, a {
  min-height: 44px;
  min-width: 44px;
}
```

### 3. Prevent Horizontal Scroll
```css
body {
  overflow-x: hidden; /* Mencegah scroll horizontal */
}
```

### 4. Readable Text on Mobile
```css
body {
  font-size: 16px; /* Mencegah auto-zoom di iOS */
}

input, select, textarea {
  font-size: 16px; /* Mencegah zoom saat fokus */
}
```

## 📐 Komponen Responsive

### Header
```jsx
// Responsive logo dan contact info
- Logo: 48px (mobile) → 56px (desktop)
- Contact: Stack vertical (mobile) → Horizontal (desktop)
- Text: text-lg md:text-xl
```

### Navbar
```jsx
// Hamburger menu untuk mobile
- Mobile: Slide-in drawer dengan backdrop
- Desktop: Horizontal menu dengan dropdown
- Sticky position di semua device
```

### Hero Slider
```jsx
// Responsive heights dan text
- Height: 400px (mobile) → 500px (tablet) → 600px (desktop)
- Title: text-3xl md:text-4xl lg:text-5xl xl:text-6xl
- Description: text-base md:text-lg lg:text-xl
- Buttons: Full width mobile → Auto width desktop
```

### News Cards
```jsx
// 3 Variants semua responsive:
1. Default: Full width → 2 cols → 3 cols
2. Horizontal: Stack → Side by side
3. Minimal: Compact di semua size
```

### Footer
```jsx
// Grid responsive
- Mobile: 1 kolom (stack)
- Tablet: 2 kolom
- Desktop: 4 kolom
```

## 🛠️ Helper Components

### ResponsiveContainer
```jsx
import { ResponsiveContainer } from '@/components/ui/responsive-helpers';

<ResponsiveContainer size="default">
  {/* Auto padding dan max-width */}
</ResponsiveContainer>
```

Sizes:
- `sm`: max-w-3xl
- `default`: max-w-6xl (default)
- `lg`: max-w-7xl
- `full`: max-w-full

### ResponsiveGrid
```jsx
import { ResponsiveGrid } from '@/components/ui/responsive-helpers';

<ResponsiveGrid cols={3} gap={6}>
  {/* Auto responsive grid */}
</ResponsiveGrid>
```

Columns auto-adjust:
- `cols={1}`: 1 di semua size
- `cols={2}`: 1 → 2
- `cols={3}`: 1 → 2 → 3
- `cols={4}`: 1 → 2 → 4

### Show/Hide on Mobile
```jsx
import { ShowOnMobile, HideOnMobile } from '@/components/ui/responsive-helpers';

<ShowOnMobile>
  <MobileMenu />
</ShowOnMobile>

<HideOnMobile>
  <DesktopMenu />
</HideOnMobile>
```

### ResponsiveHeading
```jsx
import { ResponsiveHeading } from '@/components/ui/responsive-helpers';

<ResponsiveHeading level="h1">
  {/* Auto scale: text-3xl sm:text-4xl md:text-5xl lg:text-6xl */}
</ResponsiveHeading>
```

## 📊 Data Tables Responsive

### Horizontal Scroll untuk Tabel
```jsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* Table content */}
  </table>
</div>
```

### Card Layout untuk Mobile
Pada halaman Data Satpen, tabel diubah jadi card di mobile:
```jsx
// Desktop: Table
// Mobile: Cards dengan semua info
```

## 🖼️ Images Responsive

### Next.js Image Component
```jsx
import Image from 'next/image';

<Image
  src={imageSrc}
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
  priority // Untuk above-fold images
/>
```

### Aspect Ratio
```jsx
<div className="relative w-full aspect-video">
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover"
  />
</div>
```

## 📝 Text Utilities

### Line Clamp
```jsx
// Sudah tersedia di globals.css
<p className="line-clamp-2">
  {/* Truncate ke 2 baris */}
</p>

<p className="line-clamp-3">
  {/* Truncate ke 3 baris */}
</p>
```

### Truncate Text
```jsx
import { truncateText } from '@/lib/utils';

const short = truncateText(longText, 150); // Max 150 karakter
```

## 🎨 Spacing Guidelines

### Section Padding
```jsx
// Menggunakan ResponsiveSection
<ResponsiveSection variant="default">
  {/* py-12 md:py-16 lg:py-20 */}
</ResponsiveSection>

<ResponsiveSection variant="compact">
  {/* py-8 md:py-12 lg:py-16 */}
</ResponsiveSection>

<ResponsiveSection variant="spacious">
  {/* py-16 md:py-20 lg:py-24 */}
</ResponsiveSection>
```

### Container Padding
```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

## ⚡ Performance Tips

### 1. Lazy Load Images
```jsx
<Image
  src={src}
  alt={alt}
  loading="lazy" // Otomatis di Next.js Image
/>
```

### 2. Responsive Images
```jsx
// Next.js otomatis generate srcset
<Image
  src={image}
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 3. Optimize Font Loading
```jsx
// Sudah diimplementasi di layout.js
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
});
```

## 🧪 Testing Responsive

### Browser DevTools
1. Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test breakpoints:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Desktop (1280px+)

### Real Device Testing
- Android Chrome (mobile)
- iOS Safari (mobile)
- iPad Safari (tablet)
- Desktop browsers

### Checklist
- [ ] No horizontal scroll
- [ ] Touch targets minimal 44x44px
- [ ] Text readable tanpa zoom
- [ ] Images tidak overflow
- [ ] Navigation mudah diakses
- [ ] Forms mudah diisi
- [ ] Buttons tidak terlalu kecil
- [ ] Content tidak terpotong

## 🐛 Common Issues & Solutions

### Issue: Text terlalu kecil di mobile
```jsx
// ❌ Bad
<p className="text-xs">

// ✅ Good
<p className="text-sm md:text-base">
```

### Issue: Gambar overflow
```jsx
// ❌ Bad
<img src={src} />

// ✅ Good
<img src={src} className="w-full h-auto" />
```

### Issue: Grid terlalu banyak kolom di mobile
```jsx
// ❌ Bad
<div className="grid grid-cols-4">

// ✅ Good
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### Issue: Button terlalu kecil untuk tap
```jsx
// ❌ Bad
<button className="px-2 py-1 text-xs">

// ✅ Good
<button className="px-4 py-2 text-base min-h-[44px]">
```

## 📱 Mobile-Specific Features

### Touch Gestures
```jsx
// Swipe support di Hero Slider
- Swipe left/right untuk navigasi
- Pause on touch
```

### iOS Safari Fixes
```css
/* Prevent zoom on input focus */
input, select, textarea {
  font-size: 16px;
}

/* Smooth scrolling */
-webkit-overflow-scrolling: touch;
```

### Android Chrome Fixes
```css
/* Remove tap highlight */
-webkit-tap-highlight-color: transparent;
```

## ✅ Best Practices Summary

1. **Always test on real devices**
2. **Use mobile-first approach**
3. **Touch targets min 44x44px**
4. **Text min 16px untuk mencegah zoom**
5. **Prevent horizontal scroll**
6. **Optimize images untuk mobile**
7. **Use semantic HTML**
8. **Test pada koneksi lambat**
9. **Gunakan responsive utilities**
10. **Follow accessibility guidelines**

---

**Last Updated**: December 2024
**Maintained by**: LP Ma'arif NU Development Team
