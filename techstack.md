# Technical Architecture
## VGC Website — Rebuild Stack & Patterns

---

## 1. Framework & Language

| Layer | Technology | Version | Notes |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.x | File-system routing, Server/Client components, Route Handlers |
| **Language** | TypeScript | 5.x | Strict mode enabled (`"strict": true` in tsconfig) |
| **React** | React | 19.x | Latest concurrent features |
| **Runtime** | Node.js | 20+ | Required for Next.js 16 |

### App Router Conventions
- All pages under `src/app/`
- Client components must be marked with `"use client"` directive
- Server actions / Route handlers in `src/app/api/`
- Path aliases configured: `@/*` → `./src/*`

---

## 2. Styling

| Layer | Technology | Version | Notes |
|---|---|---|---|
| **CSS Engine** | Tailwind CSS | 4.x | New `@theme inline` syntax for design tokens |
| **PostCSS** | @tailwindcss/postcss | 4.x | Single PostCSS plugin |

### Tailwind Configuration
Tailwind 4 uses inline `@theme` blocks in `globals.css` instead of `tailwind.config.js`:

```css
@import "tailwindcss";

@theme inline {
  --color-cream: #E8E4D9;
  --color-cream-light: #F2EFE6;
  --color-cream-dark: #DDD8CA;
  --color-forest: #2D3B2D;
  --color-forest-light: #4A5B4A;
  --color-leaf: #5B8C2A;
  --color-leaf-light: #6FA33A;
  --color-leaf-dark: #4A7322;
  --font-sans: var(--font-montserrat);  /* Will become DM Sans */
  /* Add: --font-serif: var(--font-cormorant-garamond); */
}
```

Colors are consumed as standard Tailwind classes: `bg-cream`, `text-forest`, `border-leaf`, etc.

---

## 3. Animation

| Package | Version | Usage |
|---|---|---|
| **Framer Motion** | 12.x | Scroll-triggered reveals, accordion expand/collapse, staggered grid transitions, button micro-interactions, floating element enter/exit |

### Animation Patterns Used
1. **Mount animations**: `initial` + `animate` (Hero badge, headline, CTAs)
2. **Scroll-triggered**: `whileInView` with `viewport: { once: true, margin: "-100px" }`
3. **Stagger containers**: `containerVariants` with `staggerChildren`
4. **Interactive**: `whileHover`, `whileTap` for buttons and cards
5. **Presence**: `AnimatePresence` for accordion items and gallery grid swaps
6. **Spring/ease**: Mix of `easeOut` and `easeInOut` with 300–800ms durations

---

## 4. UI Component Libraries

| Package | Version | Usage |
|---|---|---|
| **Lucide React** | 0.575.x | All icons (Menu, X, Home, Landmark, Factory, Building2, Hammer, Sprout, Sun, Carrot, TreePine, Clock, Cuboid, Award, Users, Loader2, Phone, MapPin, User, Instagram) |
| **Embla Carousel** | 8.x | Horizontal image carousel in "All" gallery view (loop, snap-scroll, touch support) |
| **Yet Another React Lightbox** | 3.x | Full-screen image viewer with navigation |
| **React Hook Form** | 7.x | Contact form state management and validation |
| **React Compare Slider** | 3.x | *Installed but currently unused* — was for before/after image comparison |

---

## 5. Backend & Integrations

| Service | Purpose |
|---|---|
| **EmailJS** (via API Route) | Contact form delivery — server-side call from Next.js Route Handler |
| **Instagram** | External link to `@vanamali_greenscapes` profile |

### Contact Form Architecture
```
Client (react-hook-form) 
  → POST /api/contact (JSON body)
    → Next.js Route Handler 
      → EmailJS REST API (server-side, env vars)
        → Email delivery
```

### Environment Variables Required
```env
EMAILJS_SERVICE_ID=service_6qrn4vd
EMAILJS_TEMPLATE_ID=template_b772wyt
EMAILJS_PUBLIC_KEY=3dPfFdFxqP-81OblM
```

---

## 6. Fonts

### Current
- **Montserrat** — loaded via `next/font/google`, applied as `--font-montserrat`

### Rebuild Target
- **Cormorant Garamond** — Serif, for headings and hero text
- **DM Sans** — Sans-serif, for body text and UI elements
- Both loaded via `next/font/google` with `display: "swap"`

---

## 7. Image Handling

| Pattern | Implementation |
|---|---|
| **Component** | `next/image` with `fill` layout for all portfolio/gallery/hero images |
| **Priority loading** | `priority` prop on hero background and logo |
| **Responsive sizes** | `sizes` prop set per breakpoint (e.g., `"(max-width: 768px) 80vw, 33vw"`) |
| **Static serving** | All images in `public/images/` and `public/videos/` |
| **Source images** | `Images_New/` at project root (original uploads, not served) |

---

## 8. Architectural Patterns to Follow

### 8.1 Component Architecture
```
src/
├── app/
│   ├── api/contact/route.ts    — Server-side Route Handler
│   ├── globals.css             — Tailwind theme + global styles
│   ├── layout.tsx              — Root layout (fonts, header, footer, floating elements)
│   └── page.tsx                — Home page (composes all sections)
└── components/
    ├── SmartHeader.tsx          — Fixed navigation (client component)
    ├── Hero.tsx                 — Hero section (client component)
    ├── AboutUs.tsx              — About section (client component)
    ├── RenderVsReality.tsx      — 3D Process section (client component)
    ├── Services.tsx             — Services grid (client component)
    ├── ProjectGallery.tsx       — Gallery with filters (client component)
    ├── FAQ.tsx                  — FAQ accordion (client component)
    ├── Contact.tsx              — Contact form + info (client component)
    ├── Footer.tsx               — Footer (server component — no interactivity)
    └── InstagramFloat.tsx       — Floating CTA (client component)
```

### 8.2 Key Patterns
1. **Server vs Client**: Only `Footer.tsx` is a Server Component. All interactive components use `"use client"`.
2. **Cross-component communication**: Service cards dispatch `CustomEvent("filterGallery")` → Gallery listens via `useEffect` + `addEventListener`.
3. **Form handling**: `react-hook-form` for client-side validation → API Route for server-side EmailJS call (not client-side EmailJS).
4. **Section anchoring**: All sections have `id` attributes (`#about`, `#services`, `#gallery`, `#faq`, `#contact`) for smooth-scroll navigation.
5. **Responsive design**: Mobile-first with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
6. **Animation viewport**: All scroll animations use `viewport: { once: true }` to fire only once.

### 8.3 Build & Deploy
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```
- **Dev server**: `npm run dev` (default port 3000)
- **Deployment target**: Vercel (optimized for Next.js)
- **ESLint**: `eslint-config-next` for Next.js-specific rules
