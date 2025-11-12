# RuDo Wealth Platform - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing from premium fintech platforms (Dezerv, Stripe, Revolut) with emphasis on sophisticated dark-themed wealth management aesthetic matching RuDo's current website (rudowealth.com). Focus on trust, transparency, and professional elegance suitable for affluent NRIs making significant financial decisions.

**Core Principles**:
- **95-5 Design Principle**: 95% viewport dedicated to content, 5% to navigation/chrome
- Premium minimalism with breathing room
- Data-driven trust signals throughout
- Smooth, purposeful vertical scrolling experience (inspired by Dezerv)
- Professional sophistication over flashy design
- Scroll-triggered animations for progressive disclosure

## Typography

**Font Families**:
- Primary: Inter or 'SF Pro Display' (via Google Fonts)
- Accent/Numbers: 'Space Grotesk' for portfolio returns and metrics

**Hierarchy**:
- Hero Headlines: 3.5rem-4.5rem (56-72px), font-weight 600-700, tight leading (1.1)
- Section Headlines: 2.25rem-3rem (36-48px), font-weight 600
- Subsection/Card Titles: 1.5rem-1.75rem (24-28px), font-weight 500-600
- Body Text: 1rem-1.125rem (16-18px), font-weight 400, relaxed leading (1.6-1.7)
- Small/Caption: 0.875rem (14px), font-weight 400-500
- Numbers/Metrics: Space Grotesk, 1.25rem-2rem, font-weight 600-700

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12 between major elements
- Card padding: p-8 to p-12 for feature cards, p-6 to p-8 for smaller cards
- Container max-width: max-w-7xl for full sections, max-w-4xl for focused content

**Grid System**:
- Portfolio cards: 3-column on desktop (grid-cols-3), 2-column tablet (md:grid-cols-2), single mobile
- Feature cards: 4-column desktop (grid-cols-4), 2-column tablet, single mobile
- Comparison blocks: 2-column layout with clear visual separation
- Team profiles: 4-column desktop grid with consistent card sizing

## Component Library

**Navigation** (95-5 Principle):
- Fixed header (56px/14rem height) with backdrop blur effect
- Translucent background (bg-background/80) for minimal visual weight
- Logo left, navigation center/right
- CTA button in header (consistent "Start Your Plan" or "Build Wealth Plan")
- Mobile: Hamburger menu with smooth slide-in drawer
- Minimal border (border-border/50) to reduce chrome

**Hero Section** (95vh):
- Near-full viewport section (95vh min-height) - content dominates
- Large headline with gradient text treatment on key phrases
- Trust bar with icons: "FSRA-regulated | SIPC-protected | Withdraw anytime"
- Launch badge: Subtle pill badge "🎉 First 90 days free" 
- Dual CTAs: Primary "Build Your Wealth Plan →" + Secondary "See How It Works ↓"
- Background: Large abstract gradient illustration suggesting growth/wealth (20% opacity)
- Multiple gradient overlays for depth and readability

**Cards**:
- Portfolio Cards: Glass-morphism effect with subtle border, rounded-2xl, p-8
  - Icon/emoji top-left, title, strategy type, returns/risk metrics, "For:" use case
  - Hover: Subtle lift transform and glow effect
- Feature Cards: Compact, icon + title + 2-line description, p-6
- Comparison Cards: Split design with "Left:" outdated approach vs "Right:" RuDo solution
- **Vertical Scroll Comparison** (Dezerv-inspired):
  - Full viewport height sections (min-h-screen)
  - Numbered indicators (01, 02, 03, 04) with state transitions
  - Scroll-triggered opacity and transform animations (700ms duration)
  - Progressive disclosure as user scrolls
  - VS badge between columns appears on activation
  - Cards elevate and brighten as they become active
  - Smooth transitions between states
- Team Cards: Photo top, name, title, hover reveals brief bio or expertise

**Interactive Elements**:
- Quiz/Assessment: Step-by-step card interface with progress indicator
- Buttons: Primary (solid with glow), Secondary (outline), all with smooth transitions
- Background blur on buttons over images for readability

**Data Displays**:
- Pricing Box: Large focal element, flat fee highlighted, comparison chart below
- Trust Badges: Icon + label format in horizontal row
- Metrics: Large numbers with Space Grotesk, small descriptive text below

**Sections**:
- Value Proposition: Split layout, headline left, supporting visual/illustration right
- How It Works: 3-step timeline with connecting line, number badges, descriptions
- Testimonials: Carousel or 3-column grid with quotes, client name/title, subtle borders
- FAQ: Accordion with smooth expand/collapse

## Images

**Hero Section**: Abstract wealth visualization - flowing lines suggesting portfolio growth, market movements, or interconnected global finance. Modern, sophisticated illustration (not stock photos). Positioned right side or full-width background with overlay.

**About Us Team Photos**: Professional headshots with consistent framing, subtle border treatment, rounded corners

**Trust/Regulatory Icons**: FSRA, SIPC, ADGM badges - use official logos

**Feature Section Icons**: Use Heroicons (outline style) via CDN for features, benefits, process steps

**Learn Section**: Conceptual illustrations for educational content (charts, graphs, investment concepts) - placeholder comments for custom illustrations

**No stock photography** of people shaking hands or generic business scenes

## Page-Specific Guidelines

**Digital Advisory Landing**:
11 sections flowing naturally, each py-20 to py-32 spacing
- Trust bar immediately after hero
- Comparison blocks in 2-column alternating layout
- Portfolio cards in 3-column grid with "Find Your Portfolio →" CTA
- Pricing as dedicated focal section with large pricing box

**About Us**:
6 sections with visual hierarchy
- Problem statement: 2-column layout (text + supporting stat/visual)
- Team grid: 4-column cards with consistent heights
- Advisory board: 3-column with credentials emphasis
- Regulatory badges prominent in dedicated trust section

**Calculators**:
Interactive card-based interface, form on left, real-time results visualization on right, clean numerical displays with Space Grotesk

**Private Wealth**:
Premium tier differentiation through elevated visual treatment, larger imagery, exclusive feel with testimonials from high-net-worth individuals

**Footer**:
Comprehensive with newsletter signup, quick links (4-column layout), regulatory text, social icons, trust badges repeated