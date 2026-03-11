# Implementation Roadmap
## VGC Website — Rebuild Checklist

---

## Phase 1: Environment & Configuration Setup

- [ ] Initialize a fresh Next.js 16 project with App Router, TypeScript strict mode
- [ ] Install core dependencies: `tailwindcss@4`, `@tailwindcss/postcss`, `framer-motion`, `lucide-react`
- [ ] Install UI dependencies: `embla-carousel-react`, `yet-another-react-lightbox`, `react-hook-form`
- [ ] Configure `postcss.config.mjs` with `@tailwindcss/postcss`
- [ ] Configure `tsconfig.json` with `@/*` path alias to `./src/*`
- [ ] Set up `globals.css` with Tailwind 4 `@theme inline` block:
  - Define all color tokens (cream, cream-light, cream-dark, forest, forest-light, leaf, leaf-light, leaf-dark)
  - Define font-family custom properties (`--font-sans`, `--font-serif`)
  - Set base `body` styles (background cream, text forest)
- [ ] Load **Cormorant Garamond** and **DM Sans** via `next/font/google` in `layout.tsx`
- [ ] Copy all assets to `public/`:
  - `public/images/hero-bg.jpg`
  - `public/images/new/<category>/` (all 11 category folders)
  - `public/videos/final-design.mp4`
  - `public/logo-nobg.png`, `public/logo.png`
- [ ] Set up `.env.local` with EmailJS credentials
- [ ] Verify dev server boots cleanly with `npm run dev`

---

## Phase 2: Global Components

### 2a — Root Layout
- [ ] Create `src/app/layout.tsx`:
  - Wire up both Google Fonts
  - Set metadata (title, description)
  - Compose `<SmartHeader />`, `<main>{children}</main>`, `<Footer />`, `<InstagramFloat />`

### 2b — Smart Header (`SmartHeader.tsx`)
- [ ] Build fixed header with `z-50`, transparent-to-solid scroll transition at 50px
- [ ] Implement scroll-aware state: transparent bg + white text ↔ cream bg + backdrop-blur + shadow + dark text
- [ ] Desktop navigation: links to `#about`, `#services`, `#gallery` + "Contact Us" CTA pill to `#contact`
- [ ] Logo area: circular badge container (rounded-full, white bg, shadow) with `next/image` + brand name text
- [ ] Mobile hamburger menu: Lucide `Menu`/`X` toggle → full-width dropdown panel
- [ ] Smooth-scroll behavior on all anchor clicks
- [ ] Close mobile menu on link click

### 2c — Footer (`Footer.tsx`)
- [ ] Build as a Server Component (no `"use client"`)
- [ ] Dark green (`bg-forest`) background with cream text
- [ ] Expand to 4-column grid layout (Brand, Services, Quick Links, Contact Info)
- [ ] Brand column: company name + tagline
- [ ] Services column: links to each service category
- [ ] Quick Links column: About, Gallery, FAQ, Contact
- [ ] Contact column: phone numbers (tel: links), office address, Instagram handle (gradient hover)
- [ ] Bottom bar: years badge + copyright with dynamic year

### 2d — Instagram Float (`InstagramFloat.tsx`)
- [ ] Fixed positioned at bottom-right (`bottom-6 right-6`)
- [ ] Delayed appearance (2 seconds after mount)
- [ ] Instagram-gradient pill (purple→pink→orange) with icon and label
- [ ] Dismissible via small `×` button
- [ ] Framer Motion slide-up + scale entrance/exit animation

---

## Phase 3: Page-by-Page Section Construction

### 3a — Hero Section (`Hero.tsx`)
- [ ] Full viewport height (`h-screen`, min 600px), left-aligned content (`justify-start`)
- [ ] Background: `next/image` with `fill` + `object-cover` + `priority`
- [ ] Dual overlay: `bg-black/40` + `bg-gradient-to-r from-forest/90 via-forest/60 to-transparent`
- [ ] Trust badge: uppercase green text with "25+ Years of Excellence | Proudly Serving You"
- [ ] Headline: `<h1>` "Where Nature Meets Legacy." — responsive sizing (4xl→7xl), serif font
- [ ] Two CTA buttons: "View Projects" (outline) + "Contact Us" (solid green)
- [ ] Framer Motion staggered fade-up mount animations for all text elements
- [ ] Button press feedback: `whileHover: scale(1.05)`, `whileTap: scale(0.95)`

### 3b — About Us Section (`AboutUs.tsx`)
- [ ] White background section, centered header with subtitle + heading (serif)
- [ ] Two-column grid on desktop (text left, stats right), stacked on mobile
- [ ] Left — Brand narrative (3 paragraphs) + Team Members block:
  - R. Bala (Founder), R. Sriram (Lead Designer & Architect), P. Siva (Work Force Manager)
- [ ] Right — 2×2 stats grid: 25+ Years, 500+ Projects, 3D Tech, 100% Satisfaction
- [ ] Each stat card: Lucide icon in green-tint circle, bold value, label
- [ ] Framer Motion `whileInView` scroll-triggered slide-in for columns + staggered stat cards

### 3c — Render vs Reality / 3D Process (`RenderVsReality.tsx`)
- [ ] Cream-light background
- [ ] Flex row (desktop text-left + video-right, mobile stacked)
- [ ] Left — subtitle "Our Signature Process" + heading "See It Before We Build It" + descriptive paragraphs
- [ ] Right — `<video>` with autoPlay, loop, muted, playsInline in rounded container with shadow and white border
- [ ] Responsive aspect-video container

### 3d — Services Section (`Services.tsx`)
- [ ] Cream background, centered header
- [ ] Responsive card grid: 1 col → 2 col (sm) → 3 col (lg) → 4 col (xl)
- [ ] 11 service cards, each with:
  - Lucide icon in green-tint circle (hover: solid green fill, white icon)
  - Title + short description
  - onClick → dispatch `CustomEvent("filterGallery")` with category + scroll to `#gallery`
- [ ] Framer Motion staggered container + card fade-up + hover lift (`y: -8`)

### 3e — FAQ Section (`FAQ.tsx`)
- [ ] White background, max-width 4xl
- [ ] Centered header with subtitle + heading
- [ ] 5 accordion items inside a bordered/rounded container
- [ ] Exclusive toggle (only one open at a time)
- [ ] `+` icon in circular border, rotates 45° on open (CSS transform)
- [ ] Framer Motion `AnimatePresence` for `height: 0→auto` + `opacity` transitions

### 3f — Contact Section (`Contact.tsx`)
- [ ] Cream-light background, centered header
- [ ] 5-column grid: 2 cols info + 3 cols form
- [ ] Left info cards: Sriram (phone), Siva (phone), Office address, Instagram CTA (gradient card)
- [ ] Right form (react-hook-form):
  - Fields: Name, Phone, Email, Brief Message
  - CSS floating labels (peer trick)
  - Required validation + email pattern
  - Submit button with loading spinner state
  - Success view: green checkmark + thank you message
  - Error view: red alert banner
- [ ] Form submits POST to `/api/contact`

---

## Phase 4: Complex Interactive Components

### 4a — Project Gallery (`ProjectGallery.tsx`)
- [ ] Define `IMAGE_CATEGORIES` data structure with all 12 categories and image paths
- [ ] Build "All" category by aggregating all other category images
- [ ] Horizontal filter tabs (pill buttons) with active/inactive states
- [ ] "All" view: Embla Carousel (loop, snap-scroll, touch support)
  - 80% width cards on mobile, 33.33% on desktop
  - Circular prev/next navigation buttons
- [ ] Category view: Animated CSS grid (2→3→4 cols)
  - `AnimatePresence mode="wait"` for cross-fade transitions between categories
  - Staggered image pop-in on category switch
- [ ] Each image: `aspect-[4/3]`, rounded-xl, shadow, hover scale + dark overlay
- [ ] Lightbox: `yet-another-react-lightbox` on click, full-screen
- [ ] Listen for `CustomEvent("filterGallery")` from Services to auto-switch category
- [ ] Handle empty categories gracefully (Industrial = coming soon)

### 4b — Cross-Component Event System
- [ ] Services dispatches: `window.dispatchEvent(new CustomEvent("filterGallery", { detail: { category } }))`
- [ ] Gallery listens: `window.addEventListener("filterGallery", handler)` in `useEffect`
- [ ] Auto-scroll to gallery section after category switch

---

## Phase 5: Server Actions & Integrations

### 5a — Contact API Route
- [ ] Create `src/app/api/contact/route.ts`
- [ ] Implement `POST` handler with JSON body parsing
- [ ] Validate required fields: name, email, phone, message
- [ ] Server-side EmailJS integration:
  - Build payload with `service_id`, `template_id`, `user_id`, `template_params`
  - POST to `https://api.emailjs.com/api/v1.0/email/send`
- [ ] Return appropriate success/error responses
- [ ] Ensure env vars are properly loaded

### 5b — SEO & Metadata
- [ ] Set proper `<title>` and `<meta description>` in layout metadata
- [ ] Ensure single `<h1>` per page (hero headline)
- [ ] Semantic HTML5 elements throughout
- [ ] All images have descriptive `alt` attributes

---

## Phase 6: Polish, Performance & Deployment

- [ ] Responsive audit: test all breakpoints (mobile, tablet, desktop, large desktop)
- [ ] Verify all Framer Motion animations fire correctly (once on scroll)
- [ ] Image optimization check: all images loaded via `next/image` with correct `sizes` props
- [ ] Performance audit: lazy loading for below-fold images, priority for hero/logo
- [ ] Accessibility: keyboard navigation, focus rings, ARIA labels on buttons
- [ ] Cross-browser testing
- [ ] Final content review: all text, phone numbers, addresses, links are correct
- [ ] `npm run build` — verify clean production build
- [ ] Deploy to Vercel
