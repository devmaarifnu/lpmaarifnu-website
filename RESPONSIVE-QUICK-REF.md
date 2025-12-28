# 📱 Quick Reference - Responsive Classes

## Breakpoints
```
Mobile:  0px - 639px   (default)
Tablet:  640px - 767px (sm:)
Desktop: 768px+        (md:, lg:, xl:, 2xl:)
```

## Common Patterns

### Text Sizes
```jsx
// Heading 1
className="text-3xl md:text-4xl lg:text-5xl"

// Heading 2
className="text-2xl md:text-3xl lg:text-4xl"

// Body Text
className="text-sm md:text-base"

// Small Text
className="text-xs md:text-sm"
```

### Spacing
```jsx
// Section Padding
className="py-12 md:py-16 lg:py-20"

// Container Padding
className="px-4 sm:px-6 lg:px-8"

// Gap
className="gap-4 md:gap-6 lg:gap-8"
```

### Grid Layouts
```jsx
// 1 → 2 → 3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// 1 → 2 → 4 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// 2 → 3 → 4 columns
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

### Flex Direction
```jsx
// Stack → Row
className="flex flex-col md:flex-row"

// Row → Stack (rare)
className="flex flex-row md:flex-col"
```

### Show/Hide
```jsx
// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="block md:hidden"

// Hide on desktop
className="md:hidden"
```

### Widths
```jsx
// Full width → Auto
className="w-full md:w-auto"

// Auto → Fixed width
className="w-auto md:w-64"

// Responsive widths
className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
```

### Heights
```jsx
// Hero sections
className="h-[400px] md:h-[500px] lg:h-[600px]"

// Min heights
className="min-h-screen md:min-h-[600px]"
```

### Images
```jsx
// Responsive aspect ratio
<div className="relative w-full aspect-video">
  <Image src={src} fill className="object-cover" />
</div>

// Different sizes
<Image
  src={src}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Buttons
```jsx
// Full width mobile → Auto desktop
className="w-full md:w-auto"

// Stack → Row
className="flex flex-col sm:flex-row gap-4"
```

### Cards
```jsx
// Padding
className="p-4 md:p-6 lg:p-8"

// Rounded corners
className="rounded-lg md:rounded-xl"
```

### Text Alignment
```jsx
// Center → Left
className="text-center md:text-left"

// Left → Center (rare)
className="text-left md:text-center"
```

## Component Examples

### Responsive Container
```jsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Responsive Section
```jsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-white p-6 rounded-lg">
      {/* Card content */}
    </div>
  ))}
</div>
```

### Responsive Hero
```jsx
<div className="h-[400px] md:h-[500px] lg:h-[600px]">
  <div className="container mx-auto px-4 h-full flex items-center">
    <div className="max-w-2xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        Title
      </h1>
      <p className="text-base md:text-lg mb-6">
        Description
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full sm:w-auto">CTA 1</button>
        <button className="w-full sm:w-auto">CTA 2</button>
      </div>
    </div>
  </div>
</div>
```

### Responsive Navigation
```jsx
// Desktop menu
<nav className="hidden md:flex items-center gap-4">
  {/* Menu items */}
</nav>

// Mobile menu button
<button className="md:hidden">
  <Menu />
</button>
```

### Responsive Table
```jsx
// Desktop: Table
<div className="hidden md:block overflow-x-auto">
  <table>...</table>
</div>

// Mobile: Cards
<div className="md:hidden space-y-4">
  {data.map(item => (
    <div className="bg-white p-4 rounded-lg">
      {/* Card layout */}
    </div>
  ))}
</div>
```

## Touch Targets
```jsx
// Minimum 44x44px
className="min-h-[44px] min-w-[44px]"

// Button
className="px-4 py-3 min-h-[44px]"

// Icon button
className="w-11 h-11 flex items-center justify-center"
```

## Font Sizes (rem)
```
text-xs:   0.75rem (12px)
text-sm:   0.875rem (14px)
text-base: 1rem (16px) ← Minimum untuk mobile
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)
text-4xl:  2.25rem (36px)
text-5xl:  3rem (48px)
```

## Spacing Scale
```
0:   0px
1:   0.25rem (4px)
2:   0.5rem (8px)
3:   0.75rem (12px)
4:   1rem (16px)
6:   1.5rem (24px)
8:   2rem (32px)
12:  3rem (48px)
16:  4rem (64px)
20:  5rem (80px)
24:  6rem (96px)
```

## Z-Index Scale
```
z-0:  0
z-10: 10
z-20: 20
z-30: 30  ← Navbar
z-40: 40  ← Header
z-50: 50  ← Dropdown, Modal
```

---
**Tip**: Copy-paste these patterns untuk konsistensi!
