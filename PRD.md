# Product Requirements Document (PRD)
## Vanamali Greenscape Creations — Website Rebuild

---

## 1. Project Overview

| Field | Detail |
|---|---|
| **Project Name** | VGC Website — Full Rebuild |
| **Objective** | Build a premium, mobile-first, single-page website to showcase landscaping services, establish local authority, and drive client inquiries via a modern contact form |
| **Target Audience** | Homeowners and commercial clients in and around Kakinada, AP (70% mobile users) |
| **Core Value Proposition** | "Where Nature Meets Legacy" — 25+ years of bridging imagination and reality through precise 3D landscape modeling, design, and execution |

---

## 2. Brand Identity

### 2.1 Core Aesthetic
**"Organic Modernism"** — Elegant, earthy, trustworthy. Heavily reliant on whitespace (warm cream space) and high-quality photography. Catchy but never overcatchy.

### 2.2 Color Palette
All colors are sampled from the VGC logo. Defined as CSS custom properties:

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#E8E4D9` | Primary background |
| `cream-light` | `#F2EFE6` | Alternate/lighter backgrounds (About, Contact) |
| `cream-dark` | `#DDD8CA` | Subtle borders, dividers |
| `forest` | `#2D3B2D` | Primary text, headings, footer bg |
| `forest-light` | `#4A5B4A` | Secondary/body text |
| `leaf` | `#5B8C2A` | CTAs, accents, active states |
| `leaf-light` | `#6FA33A` | Hover states for CTAs |
| `leaf-dark` | `#4A7322` | Pressed/active CTA variant |

> [!IMPORTANT]
> The user previously mentioned `#F1EDDF` as a warm cream — the current build uses `#E8E4D9`. Confirm final cream value during rebuild.

### 2.3 Typography
- **Current**: Montserrat (loaded via `next/font/google`) as the sole font
- **Rebuild Target**: Dual-font pairing:
  - **Cormorant Garamond** — Elegant serif for section headings and hero headline
  - **DM Sans** — Clean modern sans-serif for body text, navigation, buttons, and UI elements
- Applied via `--font-serif` and `--font-sans` CSS custom properties

### 2.4 Logo
- Badge-style circular logo (`/logo-nobg.png`, 224 KB) placed inside a `rounded-full` white container with shadow
- Also available: `logo.png`, `logo_cropped.png`
- Displayed at 80×80px in the header with a white circular border/shadow

---

## 3. Page Architecture (Single-Page Scroll Flow)

The site is a single-page application with smooth-scroll navigation anchors. The layout order, from top-to-bottom:

### 3.1 Global — Smart Header (`SmartHeader`)
- **Behavior**: Fixed to top (`position: fixed; z-index: 50`)
- **Scroll-aware transparency**: 
  - Transparent background + white text when at top of page
  - Cream background + backdrop blur + shadow + dark text after scrolling past 50px
- **Desktop nav links**: About Us (`#about`), Services (`#services`), Gallery (`#gallery`)
- **Desktop CTA**: "Contact Us" button → `#contact` (green rounded-full pill)
- **Mobile**: Hamburger menu (Lucide `Menu`/`X` icons) → full-width dropdown with same links + Contact CTA
- **Logo area**: Circular badge logo + "VANAMALI GREENSCAPE CREATIONS" text (hidden on small screens, shown `sm:` and up)

### 3.2 Section 1 — Hero (`Hero`)
- **Layout**: Full viewport height (`h-screen`, min 600px), content left-aligned (`justify-start`)
- **Background**: Full-bleed optimized image (`/images/hero-bg.jpg`) via `next/image` with `fill` + `object-cover` + `priority`
- **Overlay system** (two layers):
  1. Semi-transparent black: `bg-black/40`
  2. Directional green gradient: `bg-gradient-to-r from-forest/90 via-forest/60 to-transparent`
- **Content stack** (max-width 3xl, left-aligned):
  - **Trust Badge**: `<p>` — "25+ Years of Excellence | Proudly Serving You" — uppercase, tracking-widest, `text-leaf-light`
  - **Headline**: `<h1>` — "Where Nature Meets Legacy." — bold, responsive sizing (4xl → 7xl)
  - **CTA Buttons** (two, side by side):
    1. "View Projects" → `#gallery` — outline style (white border, transparent bg, hover: white/10)
    2. "Contact Us" → `#contact` — solid green (`bg-leaf`)
  - All elements animated with Framer Motion staggered `fade-up` on mount (`initial→animate`)

### 3.3 Section 2 — About Us (`AboutUs`)
- **Background**: `bg-white`
- **Layout**: Centered header → two-column grid (`md:grid-cols-2`)
- **Header**: subtitle "Our Story" (leaf green, uppercase) + heading "Transforming Ordinary Outdoor Areas into Living Masterpieces"
- **Left column — Text content**:
  - Three paragraphs of brand story (25 years, 3D technology, project types)
  - **Team Members block**: Bordered section with `Users` icon header, showing:
    - R. Bala — Founder
    - R. Sriram — Lead Designer & Architect
    - P. Siva — Work Force Manager
  - Each member: avatar circle with `Award` icon + name + role
- **Right column — Stats Grid** (2×2):
  - 25+ Years of Experience (`Clock` icon)
  - 500+ Projects Completed (`TreePine` icon)
  - 3D Design Technology (`Cuboid` icon)
  - 100% Client Satisfaction (`Award` icon)
  - Each: rounded card, cream-light bg, subtle border, hover shadow
- **Animations**: Framer Motion `whileInView` fade-slide for columns + staggered card reveals

### 3.4 Section 3 — The 3D Process / Render vs Reality (`RenderVsReality`)
- **Background**: `bg-cream-light`
- **Layout**: Flex row on desktop (text left, video right), stacked on mobile
- **Left — Text**:
  - Subtitle: "Our Signature Process" (leaf green)
  - Heading: "See It Before We Build It"
  - Two descriptive paragraphs about 3D walkthrough process
- **Right — Video**:
  - `<video>` element playing `/videos/final-design.mp4`
  - Attributes: `autoPlay`, `loop`, `muted`, `playsInline`
  - Contained in `aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white`

> [!NOTE]
> The original PRD spec'd a before/after image comparison slider using `react-compare-slider`. This was later replaced with a looping video showcase. The `react-compare-slider` package is still installed in `package.json` but unused. **Decision needed: Keep video approach or restore the interactive slider for the rebuild?**

### 3.5 Section 4 — Services (`Services`)
- **Background**: `bg-cream`
- **Header**: "Our Services" + subtitle
- **Layout**: Responsive card grid (`sm:2 lg:3 xl:4` columns)
- **11 Service cards**, each with:
  - Lucide icon in a green-tinted circle (hover: solid green fill, white icon)
  - Title + description
  - Whole card is clickable → dispatches `CustomEvent("filterGallery")` with the service category, then smooth-scrolls to the gallery section
  - **Framer Motion**: Container `staggerChildren: 0.1`, each card `fade-up`, hover lift (`y: -8`)

| # | Service Name | Category Key | Icon |
|---|---|---|---|
| 1 | Residential Landscaping | `residential` | `Home` |
| 2 | Spiritual Landscaping | `spiritual` | `Landmark` |
| 3 | Industrial Landscaping | `industrial` | `Factory` |
| 4 | Commercial Complexes & Offices | `commercial` | `Building2` |
| 5 | Hardscaping | `hardscaping` | `Hammer` |
| 6 | Bio Wall | `biowall` | `Sprout` |
| 7 | Roof Top Gardens | `rooftop` | `Sun` |
| 8 | Organic Farms | `organic` | `Carrot` |
| 9 | Lawn | `lawn` | `TreePine` |
| 10 | Layouts | `layouts` | `Landmark` |
| 11 | Farm House Villas | `farmhouse` | `Home` |

### 3.6 Section 5 — Project Gallery (`ProjectGallery`)
- **Background**: `bg-cream`
- **Header**: subtitle "Our Portfolio" + heading "Decades of Transforming Spaces"
- **Filter Tabs**: Horizontal pills for all 12 categories (All, Residential, Spiritual, Commercial, Hardscaping, Vertical Gardens, Roof Top, Organic Farms, Farm House Villas, Industrial, Lawn, Layouts)
  - Active tab: `bg-leaf text-white shadow-md`
  - Inactive tab: `bg-white border` with hover effects
- **"All" view**: Embla Carousel (looped, snap-scroll, `align: "start"`)
  - 80% width cards on mobile, 33% on desktop
  - Prev/Next circular navigation buttons
- **Category view**: Animated CSS grid (`grid-cols-2 md:3 lg:4`) with `AnimatePresence` fade transitions
  - Each image: `aspect-[4/3]`, rounded, shadow, hover scale + dark overlay
- **Lightbox**: `yet-another-react-lightbox` opens on image click, full-screen with close control
- **Cross-component interaction**: Listens for `filterGallery` CustomEvent from Services to auto-set active category
- **Image source**: All served from `/images/new/<category>/` in the public folder
- **Industrial**: Empty array (coming soon)

### 3.7 Section 6 — FAQ (`FAQ`)
- **Background**: `bg-white`
- **Header**: "Got Questions?" subtitle + "Frequently Asked Questions" heading
- **Layout**: Max-width 4xl, centered
- **Accordion items** (5 questions):
  1. "How does the 3D design process work?"
  2. "Is the initial consultation free?"
  3. "Do you handle both design and installation?"
  4. "What types of properties do you work with?"
  5. "Do you offer ongoing maintenance, and do you supply plants and materials?"
- **Accordion behavior**:
  - Single item open at a time (exclusive toggle)
  - `+` icon in circular border, rotates 45° when open (transforms into `×`)
  - Active question text turns `text-leaf`, icon bg fills green
  - Content expands with Framer Motion `height: 0→auto` + opacity transition

### 3.8 Section 7 — Contact (`Contact`)
- **Background**: `bg-cream-light`
- **Header**: "Ready to Start?" + "Let's Discuss Your Landscape" + free consultation note
- **Layout**: 5-column grid — 2 cols info cards, 3 cols form
- **Left — Info cards** (4 cards):
  1. **R Sriram** — Lead Designer & Architect — `70323 50412` (clickable `tel:` link)
  2. **P Siva** — Work Force Manager — `99496 45777` (clickable `tel:` link)
  3. **Office Address** — 2-8, Near Jeeyar Swami vari Ashram, G.Vemavaram, 533461
  4. **Instagram CTA** — `@vanamali_greenscapes` — gradient card (purple→pink), hover scale effect
- **Right — Contact Form** (react-hook-form):
  - 4 fields: Name, Phone, Email, Brief Message
  - **Floating labels**: CSS `peer` trick — label moves up on focus/fill
  - **Validation**: Required fields + email pattern validation
  - **Submit button**: "Send Message" → loading spinner (`Loader2` + "Sending...") → success state
  - **Success state**: Green checkmark in circle + "Thank you!" message
  - **Error state**: Red alert banner
  - **Backend**: POST to `/api/contact` → server-side EmailJS integration

### 3.9 Global — Footer (`Footer`)
- **Background**: `bg-forest` (dark green), cream text
- **Layout**: 3-column grid on desktop, stacked on mobile
  - **Col 1 — Brand**: Company name (uppercase, tracked) + tagline
  - **Col 2 — Quick Links**: Services, Gallery, FAQ, Contact
  - **Col 3 — Get in Touch**: Phone numbers, address, Instagram handle (gradient hover)
- **Bottom bar**: "20+ Years of Excellence" + copyright notice

### 3.10 Global — Instagram Float (`InstagramFloat`)
- **Behavior**: Fixed to `bottom-6 right-6`, appears after 2-second delay
- **Design**: Instagram-gradient pill button (purple→pink→orange) + "Follow us on Instagram" text
- **Dismissible**: Small `×` button to the left
- **Animation**: Framer Motion slide-up + scale entrance/exit

---

## 4. Server-Side / API

### 4.1 Contact Form API Route (`/api/contact`)
- **Type**: Next.js Route Handler (App Router) — `POST` method
- **Validation**: Checks for name, email, phone, message
- **Integration**: Server-side EmailJS call using env vars:
  - `EMAILJS_SERVICE_ID`
  - `EMAILJS_TEMPLATE_ID`
  - `EMAILJS_PUBLIC_KEY`
- **Flow**: Client form → POST JSON → Route Handler → EmailJS API → response

### 4.2 Environment Variables
```
EMAILJS_SERVICE_ID=service_6qrn4vd
EMAILJS_TEMPLATE_ID=template_b772wyt
EMAILJS_PUBLIC_KEY=3dPfFdFxqP-81OblM
```

---

## 5. Asset Inventory

### 5.1 Images
- **Hero background**: `/images/hero-bg.jpg`
- **Logo variants**: `/logo-nobg.png`, `/logo.png`, `/logo_cropped.png`
- **Portfolio images**: `/images/new/<category>/` — 11 category subdirectories, ~280 images total
  - Categories: residential, spiritual, commercial, hardscaping, biowall, rooftop, organic, farmhouse, industrial (empty), lawn, layouts
- **Source images**: `Images_New/` at project root (original uploads with original folder names)

### 5.2 Videos
- **3D Design showcase**: `/videos/final-design.mp4`

---

## 6. UX & Animations Catalog

### 6.1 Framer Motion Effects Used
| Effect | Location | Implementation |
|---|---|---|
| Staggered fade-up on mount | Hero (badge, headline, CTAs) | `initial→animate` with delays |
| Scroll-triggered fade-up | About Us header | `whileInView` with `viewport: { once: true, margin: "-100px" }` |
| Scroll-triggered slide-in-left | About Us text column | `initial: { x: -30 }` → `whileInView: { x: 0 }` |
| Scroll-triggered slide-in-right | About Us stats column | `initial: { x: 30 }` → `whileInView: { x: 0 }` |
| Staggered card reveal | About Us stats, Services grid | `containerVariants.staggerChildren: 0.1` |
| Card hover lift | Services cards | `whileHover: { y: -8 }` |
| Button press feedback | Hero CTAs | `whileTap: { scale: 0.95 }`, `whileHover: { scale: 1.05 }` |
| Accordion expand/collapse | FAQ items | `AnimatePresence` + `height: 0→auto, opacity: 0→1` |
| Category grid swap | Gallery grid | `AnimatePresence mode="wait"` with fade-up/fade-down transitions |
| Staggered image pop-in | Gallery grid images | `initial: { opacity: 0, scale: 0.95 }` + `delay: index * 0.03` |
| Float entrance | Instagram button | `initial: { y: 80, scale: 0.8 }` → `animate: { y: 0, scale: 1 }` |

### 6.2 CSS Transitions
- Header background/text color on scroll (300ms ease-in-out)
- Button color/shadow transitions on hover
- Service card icon background swap on group hover
- Image scale on hover (`hover:scale-[1.02]`)
- Dark overlay on image hover

### 6.3 Interactive Features
- Embla Carousel (touch/swipe, loop, snap-scroll)
- Full-screen lightbox with arrow navigation
- Service → Gallery cross-component filtering via CustomEvent
- Accordion (single-item exclusive open)
- Floating label inputs (CSS peer trick)
- Form validation feedback (inline errors)
- Form submit states (loading spinner, success checkmark, error banner)