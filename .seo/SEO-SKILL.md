# SEO Skill — Let's Study MS
> Adapted from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (MIT License)
> Run monthly: Ask AI to "implement the SEO skill" to audit and optimize.

---

## How To Use

Tell the AI assistant:
> "Run the SEO skill on this project" or "Implement the SEO skill"

The AI will:
1. Read this file for the checklist
2. Audit every page against the checklist
3. Fix issues and generate a report

---

## Checklist (Run Every Month)

### 1. index.html (Root SEO)
- [ ] `<title>` tag: 50-60 chars, unique, includes primary keyword
- [ ] `<meta description>`: 150-160 chars, compelling, includes keyword
- [ ] `<meta keywords>`: relevant long-tail keywords
- [ ] `<link rel="canonical">` present and correct
- [ ] Open Graph tags: og:title, og:description, og:image, og:url, og:type
- [ ] Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
- [ ] Geo meta tags for local SEO
- [ ] JSON-LD EducationalOrganization schema (keep updated with new info)
- [ ] **NO FAQPage schema** (restricted to gov/health since Aug 2023)
- [ ] Favicon set correctly

### 2. Per-Page SEO (React Helmet)
For EVERY page (Home, Testimonials, Contact, all 7 course pages):
- [ ] Unique `<title>` (50-60 chars)
- [ ] Unique `<meta description>` (150-160 chars)
- [ ] `<link rel="canonical">` with correct URL
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags
- [ ] Proper H1 tag (exactly one per page)
- [ ] BreadcrumbList schema where applicable

### 3. Technical SEO
- [ ] `robots.txt` allows all pages, references sitemap
- [ ] AI crawler directives (allow GPTBot, ClaudeBot, PerplexityBot)
- [ ] `sitemap.xml` with ALL pages, correct `<lastmod>` dates
- [ ] No `<priority>` or `<changefreq>` tags in sitemap (Google ignores them)
- [ ] `llms.txt` file for AI search visibility
- [ ] 404 page with `noindex, nofollow`
- [ ] Catch-all route in App.jsx for 404
- [ ] `.htaccess` SPA rewrite rules

### 4. Content & E-E-A-T
- [ ] Author credentials visible (faculty section)
- [ ] Contact info accessible (phone, email, address)
- [ ] Student testimonials with real names and photos
- [ ] Achievement data with specific numbers (AIR ranks, etc.)
- [ ] Institution affiliations mentioned (IIT, ISI, IISc, etc.)

### 5. Images
- [ ] All `<img>` have descriptive `alt` text (not just "Logo" or "image")
- [ ] Images use WebP/optimized formats where possible
- [ ] Hero/LCP images NOT lazy-loaded
- [ ] Below-fold images use `loading="lazy"`
- [ ] Width/height or aspect-ratio set for CLS prevention

### 6. Schema Markup
- [ ] EducationalOrganization (index.html) — keep address, phone, email current
- [ ] BreadcrumbList on Home page
- [ ] **NEVER** use: HowTo (deprecated Sept 2023), FAQ (restricted Aug 2023)
- [ ] Keep schema valid — test at https://search.google.com/test/rich-results

### 7. AI Search / GEO Readiness
- [ ] `llms.txt` present at `/llms.txt`
- [ ] Allow GPTBot, ClaudeBot, PerplexityBot in robots.txt
- [ ] Clear, quotable sentences on key pages
- [ ] Question-based H2/H3 headings where natural
- [ ] Publication/update dates visible

### 8. Performance
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] No render-blocking resources
- [ ] Images compressed and optimized
- [ ] Code-split routes (Vite handles this)

---

## Site Structure (All Routes)

| Path | Page | Priority |
|------|------|----------|
| `/` | Home | 1.0 |
| `/testimonials` | Hall of Fame (Alumni) | 0.8 |
| `/contact` | Contact Us | 0.8 |
| `/courses/foundation-batch` | Foundation Batch | 0.9 |
| `/courses/semester-batch` | Semester Batch | 0.9 |
| `/courses/msc-mathematics` | MSc Mathematics | 0.9 |
| `/courses/mtech-datascience` | MTech/Data Science | 0.9 |
| `/courses/engineering-mathematics` | Engineering Mathematics | 0.9 |
| `/courses/phd-entrances` | PhD Entrances | 0.9 |
| `/courses/advanced-courses` | Advanced Courses | 0.9 |

---

## Last Audit: 2026-11-06 (November 2026)

### Changes Made:
- **Logo Redesign & Branding**:
  - Updated favicon and apple-touch-icon to new emerald & gold badge logo.
  - Updated JSON-LD EducationalOrganization schema logo URL to `https://letsstudyms.com/images/logo-full.jpg`.
  - Updated all social share OG/Twitter image URLs from postimg.cc to hosted logo.
  - Updated header, footer, and hero sections with new transparent badge logo.
  - Added theme-color meta tags for light/dark mode browser UI.
- **November Exam Season Optimization**:
  - Updated meta description with "November exam preparation" messaging (154 chars).
  - Enhanced keywords to include seasonal context: "november exam preparation" and entrance exam focus.
  - Updated OG description to highlight exam season relevance.
- **Sitemap & Technical**:
  - Updated all `<lastmod>` dates to `2026-11-06` across all 10 pages.
  - Verified canonical URLs and OG tags point to new logo assets.
  - Confirmed `robots.txt`, `llms.txt`, and `.htaccess` remain valid.
- **Font & Color System**:
  - Added Playfair Display serif font for headings (legacy: Outfit sans-serif).
  - Converted blue-based theme to emerald green (#0C4136) and gold (#D2A23A) palette.
  - Updated CSS variables for semantic color tokens (primary, gold, gold-light, gold-foreground).
  - Verified all 17 modified component files compile and render correctly.
- **Verification**:
  - Production build passes with 0 errors.
  - All pages render with new logo, colors, and November messaging.

---

## Audit History

### 2026-09-22 (September Audit)
- Optimized root title to 55 chars with primary keyword
- Enhanced EducationalOrganization JSON-LD schema
- Replaced generic alt text with descriptive keywords
- Optimized all page titles and descriptions to 50-60 / 150-160 char standards
- Added complete Helmet metadata to Login page
- Added lazy loading and keyword-rich alt text to all course pages
- Verified AI crawler allowances and .htaccess routing

### 2026-05-13 (Initial Audit)
- Removed FAQPage schema (restricted to gov/health as of Aug 2023)
- Updated sitemap and removed `<priority>` tags
- Added AI crawler directives (GPTBot, ClaudeBot, PerplexityBot)
- Created llms.txt for AI search visibility
- Added OG/Twitter tags to all pages
- Added catch-all 404 route
- Improved image alt text on logo
- Added BreadcrumbList schema to Testimonials

