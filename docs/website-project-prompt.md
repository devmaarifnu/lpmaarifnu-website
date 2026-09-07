# Prompting Lengkap: Website Institusi dengan Next.js

## 🎯 Overview Proyek

Bangun website institusi modern menggunakan Next.js 14+ dengan App Router, mengadopsi konsep layout dari referensi BGN (Badan Geodesi Nasional) dengan skema warna hijau modern, kode yang maintainable, dan mengikuti best practices.

---

## 📋 Spesifikasi Teknis

### Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: JavaScript ES6+
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Shadcn/ui
- **State Management**: React Context API / Zustand (untuk state kompleks)
- **Form Handling**: React Hook Form + Yup validation
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Typography**: Inter (primary), Poppins (headings)
- **Package Manager**: pnpm

### Code Standards
- ESLint + Prettier
- Husky pre-commit hooks
- Conventional Commits
- Component-based architecture
- JSDoc comments untuk dokumentasi
- PropTypes untuk type checking
- Server Components sebagai default
- Client Components hanya untuk interaktivitas

---

## 🎨 Design System

### Color Palette (Hijau Modern)

```javascript
// tailwind.config.js
const colors = {
  primary: {
    50: '#f0fdf4',   // Lightest green
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main brand color
    600: '#16a34a',  // Primary hover
    700: '#15803d',
    800: '#166534',
    900: '#14532d',  // Darkest
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  accent: {
    yellow: '#fbbf24',  // For highlights
    blue: '#3b82f6',    // For links
    red: '#ef4444',     // For alerts
  }
}
```

### Typography Scale
```css
/* Heading sizes */
h1: 3rem (48px) - font-bold
h2: 2.25rem (36px) - font-semibold
h3: 1.875rem (30px) - font-semibold
h4: 1.5rem (24px) - font-medium
h5: 1.25rem (20px) - font-medium

/* Body text */
body: 1rem (16px) - font-normal
small: 0.875rem (14px) - font-normal
```

### Spacing System
- Gunakan spacing scale Tailwind: 4, 8, 12, 16, 24, 32, 48, 64px
- Container max-width: 1280px (xl breakpoint)
- Gutter: 24px mobile, 32px desktop

---

## 🏗️ Struktur Menu & Halaman

### Navigation Structure

#### 1. **Home**
- Hero Section dengan Slider
- Headline News Grid
- Foto Kegiatan Gallery
- Keterangan Kegiatan
- Opini Section
- Berita Terbaru Sidebar
- Flyer/Iklan Section

#### 2. **Tentang Kami**
Dropdown menu:
- Sejarah
- Visi-Misi
- Struktur Organisasi
- Susunan Pengurus
- Susunan Redaktur
- Program Strategis

#### 3. **Berita**
Dropdown menu:
- Nasional
- Daerah

#### 4. **Opini**
Halaman artikel opini

#### 5. **Pramuka**
Konten tentang kegiatan pramuka

#### 6. **Data Satpen**
Data satuan pendidikan

#### 7. **Dokumen**
Repository dokumen downloadable

---

## 📁 Struktur Folder Project

```
project-root/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   └── page.jsx
│   │   ├── tentang/
│   │   │   ├── sejarah/
│   │   │   ├── visi-misi/
│   │   │   ├── struktur-organisasi/
│   │   │   ├── susunan-pengurus/
│   │   │   ├── susunan-redaktur/
│   │   │   └── program-strategis/
│   │   ├── berita/
│   │   │   ├── nasional/
│   │   │   ├── daerah/
│   │   │   └── [slug]/
│   │   ├── opini/
│   │   ├── pramuka/
│   │   ├── data-satpen/
│   │   ├── dokumen/
│   │   ├── layout.jsx
│   │   ├── globals.css
│   │   └── not-found.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MobileMenu.jsx
│   │   ├── home/
│   │   │   ├── HeroSlider.jsx
│   │   │   ├── HeadlineNews.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   ├── ActivityDescription.jsx
│   │   │   ├── OpinionSection.jsx
│   │   │   ├── LatestNews.jsx
│   │   │   └── FlyerSection.jsx
│   │   ├── ui/
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dropdown-menu.jsx
│   │   │   └── ... (shadcn components)
│   │   └── shared/
│   │       ├── NewsCard.jsx
│   │       ├── Breadcrumb.jsx
│   │       └── SectionTitle.jsx
│   ├── lib/
│   │   ├── utils.js
│   │   ├── api.js
│   │   └── constants.js
│   ├── hooks/
│   │   ├── useMediaQuery.js
│   │   └── useScrollPosition.js
│   └── data/
│       └── menu-config.js
├── public/
│   ├── images/
│   ├── icons/
│   └── documents/
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── jsconfig.json
├── next.config.js
└── package.json
```

---

## 🎯 Component Specifications

### 1. Header Component
```javascript
// src/components/layout/Header.jsx
import PropTypes from 'prop-types'

const Header = ({ transparent = false, fixed = false }) => {
  // Implementation
}

Header.propTypes = {
  transparent: PropTypes.bool,
  fixed: PropTypes.bool,
}

Features:
- Logo di kiri
- Informasi kontak (alamat, telp, email) di kanan
- Background hijau primary-600
- Responsive: stack vertical di mobile
- Sticky header dengan backdrop blur saat scroll
```

### 2. Navbar Component
```javascript
// src/components/layout/Navbar.jsx
import PropTypes from 'prop-types'

const NavItem = PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
})

Features:
- Horizontal menu dengan dropdown
- Hover effects dengan smooth transition
- Active state indicator (border-bottom hijau)
- Mobile: Hamburger menu dengan slide-in drawer
- Mega menu untuk dropdown banyak item
```

### 3. Hero Slider
```javascript
// src/components/home/HeroSlider.jsx
import PropTypes from 'prop-types'

const SlideType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  }),
})

HeroSlider.propTypes = {
  slides: PropTypes.arrayOf(SlideType).isRequired,
}

Features:
- Auto-play dengan interval 5 detik
- Manual navigation (prev/next arrows)
- Dot indicators
- Lazy loading images
- Parallax effect (optional)
- Responsive images
```

### 4. News Card Component
```javascript
// src/components/shared/NewsCard.jsx
import PropTypes from 'prop-types'

const NewsCard = ({ 
  title, 
  excerpt, 
  image, 
  date, 
  category, 
  author, 
  slug, 
  variant = 'default' 
}) => {
  // Implementation
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string,
  slug: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'horizontal', 'minimal']),
}

Features:
- Hover effect: scale + shadow
- Image dengan aspect ratio 16:9
- Category badge
- Truncate excerpt dengan "Read more"
- Lazy load images
```

---

## 🔧 Implementation Guidelines

### 1. Layout Pattern (App Router)

```javascript
// src/app/layout.jsx
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nama Institusi - Website Resmi',
  description: 'Deskripsi website institusi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Header />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### 2. Server Component Pattern

```javascript
// src/app/berita/nasional/page.jsx
import { getNewsArticles } from '@/lib/api'
import NewsCard from '@/components/shared/NewsCard'

export default async function NasionalNewsPage() {
  const articles = await getNewsArticles({ category: 'nasional' })
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Berita Nasional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <NewsCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  )
}
```

### 3. Client Component Pattern

```javascript
// src/components/home/HeroSlider.jsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

export default function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slides.length])
  
  return (
    // Implementation
  )
}

HeroSlider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}
```

### 4. Clean Code Practices

```javascript
// ✅ Good: Single Responsibility
import PropTypes from 'prop-types'

export function NewsCard({ article }) {
  return (
    <article className="news-card">
      <NewsImage src={article.image} alt={article.title} />
      <NewsContent article={article} />
    </article>
  )
}

NewsCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
}

// ✅ Good: Reusable Utilities with JSDoc
/**
 * Format date to Indonesian locale
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long'
  }).format(date)
}

// ✅ Good: PropTypes Validation
export function Button({ variant = 'primary', size = 'md', children, onClick }) {
  // Implementation
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

// ❌ Bad: Mixed Concerns
function BadComponent() {
  const [data, setData] = useState()
  // Direct API call, styling, and business logic in one component
}
```

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind default breakpoints
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large

// Custom media queries hook
// src/hooks/useMediaQuery.js
import { useState, useEffect } from 'react'

/**
 * Hook to detect media query matches
 * @param {string} query - Media query string
 * @returns {boolean} Whether the query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}
```

---

## 🚀 Performance Optimization

### 1. Image Optimization
```javascript
// Use Next.js Image component
import Image from 'next/image'

export function HeroImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      priority // For above-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
```

### 2. Code Splitting
```javascript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false // Disable SSR if needed
})
```

### 3. Font Optimization
```javascript
// src/app/layout.jsx
import { Inter, Poppins } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

---

## 🔐 SEO & Metadata

```javascript
// src/app/layout.jsx
export const metadata = {
  title: {
    default: 'Nama Institusi - Website Resmi',
    template: '%s | Nama Institusi'
  },
  description: 'Deskripsi website institusi',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Nama Institusi' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://www.example.com',
    siteName: 'Nama Institusi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nama Institusi',
    description: 'Deskripsi singkat',
    images: ['/twitter-image.jpg'],
  },
}
```

---

## 📊 Data Fetching Strategy

```javascript
// src/lib/api.js

/**
 * Fetch news articles from API
 * @param {Object} params - Query parameters
 * @param {string} [params.category] - Article category
 * @param {number} [params.limit] - Number of articles to fetch
 * @param {number} [params.page] - Page number
 * @returns {Promise<Array>} Array of articles
 */
export async function getNewsArticles(params = {}) {
  const { category, limit, page } = params
  
  const queryParams = new URLSearchParams()
  if (category) queryParams.append('category', category)
  if (limit) queryParams.append('limit', limit.toString())
  if (page) queryParams.append('page', page.toString())
  
  // Use fetch with Next.js caching
  const res = await fetch(`${process.env.API_URL}/articles?${queryParams}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!res.ok) throw new Error('Failed to fetch articles')
  
  return res.json()
}

// For static pages - generate static params
export async function generateStaticParams() {
  const articles = await getNewsArticles({ limit: 100 })
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
```

---

## 🎨 Animation Guidelines

```javascript
// Subtle animations with Framer Motion
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export function AnimatedSection({ children }) {
  return (
    <motion.div {...fadeInUp}>
      {children}
    </motion.div>
  )
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
}
```

---

## ✅ Accessibility Checklist

- [ ] Semantic HTML5 elements
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] Alt text untuk semua images
- [ ] ARIA labels untuk interactive elements
- [ ] Keyboard navigation support
- [ ] Focus indicators yang jelas
- [ ] Color contrast ratio minimum 4.5:1
- [ ] Skip to main content link
- [ ] Screen reader tested

---

## 🧪 Testing Strategy

```javascript
// Unit tests dengan Jest & React Testing Library
import { render, screen } from '@testing-library/react'
import NewsCard from '@/components/shared/NewsCard'

const mockArticle = {
  id: '1',
  title: 'Test Article',
  excerpt: 'Test excerpt',
  image: '/test.jpg',
  date: '2024-01-01',
  category: 'Nasional',
  slug: 'test-article',
}

describe('NewsCard', () => {
  it('renders article title', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByRole('heading')).toHaveTextContent(mockArticle.title)
  })
  
  it('displays category badge', () => {
    render(<NewsCard article={mockArticle} />)
    expect(screen.getByText('Nasional')).toBeInTheDocument()
  })
})

// E2E tests dengan Playwright
import { test, expect } from '@playwright/test'

test('navigation menu works', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Tentang Kami')
  await expect(page).toHaveURL('/tentang/sejarah')
})
```

---

## 📦 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.example.com
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Private (tidak terexpose ke client)
DATABASE_URL=postgresql://...
API_SECRET_KEY=...
```

---

## 🔄 Deployment Checklist

- [ ] Build tanpa errors (`npm run build`)
- [ ] Lighthouse score > 90
- [ ] SEO metadata lengkap
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] Environment variables set
- [ ] Analytics integrated
- [ ] Error tracking (Sentry)
- [ ] CDN untuk assets
- [ ] SSL certificate active

---

## 📚 References

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Shadcn/ui: https://ui.shadcn.com
- React Patterns: https://reactpatterns.com
- Web.dev Best Practices: https://web.dev

---

## 🎯 Success Criteria

Website dianggap sukses jika:
1. ✅ Lighthouse Performance Score > 90
2. ✅ Fully responsive di semua breakpoints
3. ✅ Accessible (WCAG 2.1 Level AA)
4. ✅ SEO optimized (meta tags, structured data)
5. ✅ Loading time < 3 detik
6. ✅ No console errors/warnings
7. ✅ Cross-browser compatible
8. ✅ Code maintainability score > 80%
9. ✅ PropTypes validation pada semua components
10. ✅ Clean Git history dengan conventional commits

---

**Catatan**: Prompting ini dirancang untuk developer berpengalaman yang memahami Next.js dan modern web development practices. Sesuaikan dengan kebutuhan spesifik project Anda.
