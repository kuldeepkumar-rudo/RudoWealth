# RuDo Wealth Platform - Color Reference

## Dark Theme (Primary)

### Background Colors
```css
--background: 222 47% 3%        /* Deep navy, almost black - main background */
--card: 222 40% 6%              /* Slightly lighter navy - card backgrounds */
--sidebar: 222 50% 3%           /* Darkest navy - sidebar background */
--popover: 222 40% 8%           /* Medium navy - popover/dropdown backgrounds */
```

### Foreground/Text Colors
```css
--foreground: 210 40% 98%       /* Off-white - primary text */
--card-foreground: 210 40% 98%  /* Off-white - text on cards */
--muted-foreground: 215 20% 60% /* Muted blue-grey - secondary text */
```

### Border Colors
```css
--border: 222 30% 8%            /* Subtle navy borders */
--card-border: 222 30% 8%       /* Card borders */
--input: 222 25% 15%            /* Input field borders/backgrounds */
```

### Brand/Accent Colors
```css
--primary: 203 89% 53%          /* Vibrant blue - CTAs, links, active states */
--primary-foreground: 210 85% 98% /* White text on primary */
--secondary: 222 30% 12%        /* Dark navy - secondary buttons */
--accent: 203 89% 20%           /* Dark blue - accent elements */
```

### Semantic Colors
```css
--destructive: 0 72% 50%        /* Red - errors, negative states */
--destructive-foreground: 0 0% 98% /* White text on destructive */
--muted: 222 30% 10%            /* Muted navy - disabled states */
```

### Chart/Data Visualization
```css
--chart-1: 203 89% 53%          /* Primary blue */
--chart-2: 195 75% 55%          /* Cyan */
--chart-3: 180 70% 50%          /* Teal */
--chart-4: 165 65% 52%          /* Aqua */
--chart-5: 150 60% 50%          /* Sea green */
```

## Light Theme (Secondary)

### Background Colors
```css
--background: 0 0% 100%         /* Pure white */
--card: 0 0% 100%               /* White cards */
--muted: 0 0% 92%               /* Light grey backgrounds */
```

### Text Colors
```css
--foreground: 0 0% 9%           /* Near-black text */
--muted-foreground: 0 0% 38%    /* Grey secondary text */
```

### Brand Colors
```css
--primary: 203 89% 43%          /* Slightly darker blue for light mode */
--destructive: 0 72% 35%        /* Darker red for light mode */
```

## Usage Guidelines

### Primary Blue (203 89% 53%)
**Use for:**
- Call-to-action buttons
- Active navigation items
- Links and interactive elements
- Progress indicators
- Key metrics and numbers
- Focus states

**Don't use for:**
- Large background areas (too bright)
- Body text (readability issues)

### Navy Backgrounds (222 series)
**Use for:**
- Main application background
- Card containers
- Section dividers
- Sidebar/navigation backgrounds

**Don't use for:**
- Text (insufficient contrast)
- Small UI elements (gets lost)

### Destructive Red (0 72% 50%)
**Use for:**
- Error messages
- Delete/remove actions
- Warning states
- "Old way" in comparisons
- Negative financial indicators

**Don't use for:**
- Primary actions
- Positive states

### Text Hierarchy
1. **Primary text** (--foreground): Headlines, main content
2. **Secondary text** (--muted-foreground at 60% lightness): Descriptions, supporting text
3. **Tertiary text** (--muted-foreground at 50% lightness): Captions, metadata

## Gradients

### Hero Gradient
```css
from-primary via-chart-2 to-chart-3
/* Creates smooth blue-to-teal gradient for impact */
```

### Background Gradients
```css
from-background to-card
/* Subtle depth for sections */

from-background via-background/90 to-background/70
/* Overlay for images */
```

## Opacity Levels

- **Full opacity (100%)**: Primary content, active states
- **90%**: Slightly muted elements
- **80%**: Header backgrounds with blur
- **60%**: Secondary text, muted elements
- **40%**: Inactive states
- **20%**: Very subtle backgrounds, image overlays
- **10%**: Hover state overlays
- **5%**: Minimal backgrounds for cards

## Accessibility

All color combinations meet WCAG 2.1 Level AA standards:
- Text contrast ratio: minimum 4.5:1
- Large text (18pt+): minimum 3:1
- Interactive elements: distinct focus indicators
- Never rely on color alone to convey information

## Dark Mode Best Practices

1. **Avoid pure black** - Use very dark navy (3% lightness) instead
2. **Reduce eye strain** - Use muted blues, not greys
3. **Maintain hierarchy** - Use subtle lightness variations
4. **Add depth** - Layer cards slightly lighter than background
5. **Glow effects** - Use primary color shadows for active states
