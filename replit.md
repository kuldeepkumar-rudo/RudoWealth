# RuDo Wealth Platform

## Overview

RuDo Wealth Platform is a next-generation, data-driven wealth management website targeting Emerging and Affluent NRIs (Non-Resident Indians). The platform features a premium dark navy theme with sophisticated scroll-triggered animations and a comprehensive multi-page structure showcasing digital advisory services, private wealth management, educational resources, and financial calculators.

The website implements a "95-5 Design Principle" where 95% of the viewport is dedicated to content and only 5% to navigation, creating an immersive, content-first experience. The design draws inspiration from premium fintech platforms like Dezerv, Stripe, and Revolut, with particular emphasis on smooth vertical scrolling comparisons and progressive disclosure animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (5 main routes: Home/Digital Advisory, About Us, Learn, Calculators, Private Wealth)
- **Component-based architecture** with reusable UI components following atomic design principles

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives
- Custom-configured with "new-york" style variant
- Comprehensive component set including: Accordion, Alert, Avatar, Badge, Button, Card, Calendar, Carousel, Chart, Checkbox, Dialog, Dropdown Menu, Form, Input, Select, Toast, Tooltip, and more
- Components aliased via `@/components` for clean imports

**Styling Architecture**
- **Tailwind CSS** with custom theme extension
- **CSS Variables** for dynamic theming (HSL color format)
- **80-15-5 Color Hierarchy** for premium minimal aesthetic
  - **80% Neutral**: Black/white text, gray backgrounds, subtle borders (HSL 0 0% range)
  - **15% Brand Accent**: Reserved for brand gradients (future use)
  - **5% Functional Colors**: 
    - Green (#00D395 / HSL 160 100% 41%) → Primary CTAs, success states
    - Amber (#FFB800 / HSL 43 100% 50%) → Warnings, pending actions
    - Red (#FF3B30 / HSL 3 100% 59%) → Errors, urgent actions
    - Blue (#007AFF / HSL 211 100% 50%) → Informational content
- **Primary Colors**: Neutral grays (not colored) to avoid distraction
- **Dark theme default** with sophisticated black/gray backgrounds
  - Background: HSL 0 0% 4% (pure black)
  - Foreground: HSL 0 0% 98% (white text)
  - Cards: HSL 0 0% 7% (slightly elevated from background)
- **Light/Dark theme toggle** via ThemeProvider context
- **Custom utility classes** for elevation effects (`hover-elevate`, `active-elevate-2`)
- **Typography**: Inter (primary body), Space Grotesk (accent/numbers)
- **Design Inspiration**: Dezerv.in's premium minimal aesthetic with restrained color usage

**State Management & Data Fetching**
- **TanStack Query (React Query)** for server state management
- Custom query client configuration with conservative refetch policies
- Helper functions for API requests with error handling
- Authentication-aware query functions (401 handling)

**Animation & Interactions**
- **Scroll-triggered animations** using Intersection Observer pattern
- Progressive disclosure with fade-in and elevation effects
- Smooth 700ms transitions for comparison sections
- Numbered indicators with scale and glow effects
- Vertical connecting lines between scroll sections

**Page Structure**
- **Digital Advisory Landing** (11 sections): Hero, Value Proposition, Goal-Based Investing, Quiz, Vertical Scroll Comparison (4 blocks), How It Works, Trust, Features, Portfolios, Pricing, Why Now, Closing CTA
- **About Us**: Mission, philosophy, team profiles, advisory board
- **Learn**: Educational content structure
- **Calculators** (Dedicated Pages Architecture):
  - **Calculator Index** (`/calculators`): Grid of 7 calculator cards with discovery UX
  - **Individual Calculator Pages**: Dedicated routes for each calculator with educational content
    - `/calculators/sip` - SIP Calculator
    - `/calculators/lumpsum` - Lumpsum Calculator
    - `/calculators/step-up-sip` - Step-Up SIP Calculator
    - `/calculators/goal-planning` - Goal Planning Calculator
    - `/calculators/fire` - FIRE Calculator
    - `/calculators/ppf` - PPF Calculator
    - `/calculators/currency-impact` - Currency Impact Calculator
- **Private Wealth**: Premium advisory offering

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for type-safe server code
- Custom Vite integration middleware for development mode
- HTTP server creation via Node's native `http` module

**Development Features**
- Request/response logging middleware with timing
- JSON body parsing with raw body preservation (for webhooks)
- Custom error handling and response formatting
- Development-only Replit plugins (cartographer, dev-banner, runtime-error-modal)

**Build & Deployment**
- **esbuild** for server-side bundling (ESM format)
- Separate client and server build processes
- Production mode detection via `NODE_ENV`
- Static file serving in production

**Storage Layer**
- **Interface-based storage abstraction** (`IStorage`)
- In-memory storage implementation (`MemStorage`) for development
- CRUD methods: `getUser`, `getUserByUsername`, `createUser`
- UUID-based ID generation using Node's crypto module
- Designed for easy swap to database implementation

### Data Storage Solutions

**Database Configuration**
- **Drizzle ORM** for type-safe database queries and migrations
- **PostgreSQL** via Neon serverless driver (`@neondatabase/serverless`)
- Database connection via `DATABASE_URL` environment variable
- Migration files output to `./migrations` directory

**Schema Design**
- **Users table**: id (UUID primary key), username (unique), password
- Zod schema validation via `drizzle-zod`
- Type inference for Insert and Select operations
- Schema located in `shared/schema.ts` for cross-environment access

**Current State**
- Schema defined and configured but minimal implementation
- Ready for expansion with user authentication, portfolio data, quiz responses, etc.
- Memory storage actively used; database connection configured but not actively utilized

### Authentication & Authorization

**Planned Implementation**
- Session-based authentication infrastructure prepared
- `connect-pg-simple` for PostgreSQL session storage
- Credential-based authentication (username/password)
- Cookie-based session management

**Current State**
- User schema defined with username/password fields
- Storage interface includes user CRUD methods
- No active authentication middleware implemented
- Routes currently open without authorization

### External Dependencies

**UI & Component Libraries**
- **Radix UI** - Comprehensive set of unstyled, accessible component primitives
- **Lucide React** - Icon library for consistent iconography
- **class-variance-authority (cva)** - Variant-based component styling
- **clsx & tailwind-merge** - Utility for conditional className joining
- **cmdk** - Command palette/search component
- **embla-carousel-react** - Touch-friendly carousel implementation
- **react-day-picker** - Calendar/date picker component
- **recharts** - Chart visualization library

**Form Management**
- **React Hook Form** - Performant form state management
- **@hookform/resolvers** - Validation resolver integration
- **Zod** - TypeScript-first schema validation

**Development Tools**
- **TypeScript** - Type safety across client and server
- **ESLint** (implicit via dependencies) - Code linting
- **PostCSS** with Autoprefixer - CSS processing
- **@replit/vite-plugin-*** - Replit-specific development enhancements

**Utilities**
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation
- **@jridgewell/trace-mapping** - Source map utilities

**Database & ORM**
- **Drizzle ORM** (`drizzle-orm`) - TypeScript ORM
- **Drizzle Kit** (`drizzle-kit`) - Migration and schema management
- **@neondatabase/serverless** - Serverless PostgreSQL client
- **Drizzle Zod** (`drizzle-zod`) - Zod schema generation from Drizzle schemas

**Third-Party Services**
- **Google Fonts** - Inter and Space Grotesk font families
- **Image Assets** - Generated placeholder images stored in `/attached_assets/generated_images/`
- **react-helmet-async** - SEO meta tag management for dynamic page titles and descriptions

### Financial Calculators Architecture

**Overview**
The calculator system follows a dedicated-page architecture inspired by ET Money, where each calculator has its own route with comprehensive educational content, similar to industry-leading financial platforms.

**Calculator Registry** (`client/src/features/calculators/registry.ts`)
- Centralized metadata system for all 7 calculators
- Single source of truth for: slug, name, icon, descriptions, SEO data, ordering
- Helper functions: `getCalculatorBySlug`, `getNextCalculator`, `getPreviousCalculator`
- Enables consistent navigation and SEO across all calculator pages

**Educational Content System** (`client/src/content/calculators/*.content.ts`)
- Structured content files for each calculator with 5-6 sections
- Standard sections: "What is?", "How it helps?", "How it works?", "How to use?", "Advantages", "Related calculators"
- Includes formulas, worked examples, and NRI-specific benefits
- ContentSection interface ensures consistency

**Shared Calculator Layout** (`client/src/components/calculators/CalculatorLayout.tsx`)
- Reusable wrapper component for all calculator pages
- Features:
  - Breadcrumb navigation (Home → Tools → Calculator Name)
  - Hero section with calculator icon, title, and description
  - "Back to All Calculators" button
  - Desktop: Sticky educational sidebar with table of contents
  - Mobile: Educational content cards below calculator
  - Previous/Next calculator navigation
  - SEO meta tag integration via CalculatorSEO component

**Calculator Index Page** (`client/src/pages/CalculatorsIndex.tsx`)
- Discovery-focused grid layout showcasing all 7 calculators
- Each card displays: icon, name, short description, "Calculate Now" button
- "Why Use Our Calculators?" section highlighting NRI benefits
- Dedicated SEO optimization for calculator landing page

**Individual Calculator Pages**
All 7 calculators follow consistent structure:
1. **SIP Calculator** (`/calculators/sip`) - Systematic Investment Plan with monthly contributions
2. **Lumpsum Calculator** (`/calculators/lumpsum`) - One-time investment growth projections
3. **Step-Up SIP Calculator** (`/calculators/step-up-sip`) - Annual SIP increments with comparison vs normal SIP
4. **Goal Planning Calculator** (`/calculators/goal-planning`) - Required monthly SIP for specific financial goals
5. **FIRE Calculator** (`/calculators/fire`) - Financial Independence Retire Early using 25x rule
6. **PPF Calculator** (`/calculators/ppf`) - Public Provident Fund with 7.1% fixed rate and tax benefits
7. **Currency Impact Calculator** (`/calculators/currency-impact`) - Exchange rate impact on NRI investments (USD/AED ↔ INR)

**Calculator Features**
- Multi-currency support (INR, USD, AED) with intelligent formatting (Lacs/Cr for INR, K/M for USD/AED)
- Quick-select buttons for common investment amounts
- Precision sliders for fine-tuning inputs
- Real-time calculation results with visual breakdowns
- Progress bars showing invested vs returns percentages
- Responsive design (desktop sidebar, mobile cards)
- Comprehensive data-testid attributes for testing

**Calculation Engine** (`client/src/features/calculators/utils.ts`)
- Validated financial formulas:
  - SIP: Annuity-due formula for monthly contributions
  - Lumpsum: Compound interest formula
  - Step-Up SIP: Progressive increment with comparison logic
  - Goal Planning: Reverse calculation for required monthly SIP
  - FIRE: 25x annual expenses rule with corpus growth
  - PPF: Annual compounding at 7.1% statutory rate
  - Currency Impact: SIP growth combined with FX translation
- Helper functions: `formatCurrency`, `currencySymbols`

**SEO Implementation**
- **CalculatorSEO Component** (`client/src/components/calculators/CalculatorSEO.tsx`) using react-helmet-async
- Dynamic page titles, meta descriptions, keywords from registry
- Open Graph tags for social sharing
- Twitter Card metadata
- Unique SEO for each calculator based on slug
- Calculator index has custom comprehensive SEO

**Navigation UX**
- Breadcrumbs: Home → Tools → {Calculator Name}
- Back button to calculator index
- Previous/Next calculator buttons (circular navigation)
- All navigation respects calculator ordering from registry

**Potential Future Integrations**
- FSRA/SIPC regulatory API connections (mentioned in copy but not implemented)
- Payment processing (AED 365/year subscription)
- Portfolio data feeds
- KYC/compliance verification services
- Cross-border transaction handling (UAE/India)