---
name: Draxen Gaming
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#dcb8ff'
  on-secondary: '#480081'
  secondary-container: '#7701d0'
  on-secondary-container: '#dcb7ff'
  tertiary: '#fff5f5'
  on-tertiary: '#67001d'
  tertiary-container: '#ffcfd2'
  on-tertiary-container: '#c0003e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#dcb8ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6700b5'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b8'
  on-tertiary-fixed: '#40000f'
  on-tertiary-fixed-variant: '#91002d'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system establishes a high-octane, futuristic digital environment tailored for the elite gaming community. The visual direction is defined as **Cyber-Glassmorphism**—a synthesis of high-tech minimalism and aggressive cyberpunk aesthetics. It targets a demographic that values performance, immersion, and cutting-edge hardware.

The brand personality is authoritative, immersive, and hyper-modern. The UI should feel like a premium command center rather than a standard storefront. We achieve this through:
- **Depth and Luminescence:** Using light as a structural element through glowing borders and neon accents.
- **Precision:** Utilizing monospaced accents to evoke a sense of "under-the-hood" technical data.
- **Atmosphere:** Deep obsidian backgrounds contrasted against vibrant, high-frequency RGB gradients to simulate the experience of a high-end gaming rig.

## Colors

The palette is rooted in a "Deep Space" black to maximize the visual impact of self-illuminated elements. 

- **Primary (Neon Blue):** Used for primary actions, active states, and "power-on" indicators.
- **Secondary (Electric Purple):** Used for secondary interactions, high-tier product categorizations, and decorative gradients.
- **Tertiary (Cyber Red):** Reserved for urgent notifications, "Hot Deals," and critical alerts.
- **Surface Strategy:** Backgrounds utilize a multi-layered dark grey and black approach to create depth without relying on pure #000000, allowing for subtle internal shadows.
- **Gradients:** Use linear gradients (45-degree angle) transitioning from Primary to Secondary to represent the "RGB Pulse" effect in hero sections and progress bars.

## Typography

The typography strategy balances aggressive brand impact with technical clarity.

- **Headlines (Sora):** Wide, geometric, and bold. Use wide tracking for display sizes to enhance the futuristic "tech-expo" feel.
- **Body (Geist):** A high-precision sans-serif that ensures readability for long spec sheets and product descriptions.
- **Technical Labels (JetBrains Mono):** Used for SKUs, price points, and system stats. All mono text should be uppercase to reinforce the "terminal" aesthetic.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Grid Logic:** Gutters are kept wide (24px) to allow elements to breathe amidst high-contrast visuals. 
- **The "Command" Layout:** Content should be grouped into modular "tiles" or "modules" that mimic the layout of an OS dashboard. 
- **Padding:** Use a strict 8px base unit. Internal card padding should be generous (32px) to offset the "heavy" look of glowing borders.
- **Breakpoints:** 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## Elevation & Depth

Depth in this design system is conveyed through **light and translucency** rather than traditional physical shadows.

- **Glassmorphism:** Use backdrop-filter (blur: 12px to 20px) on container surfaces. Surfaces should have a 10% white or primary-color tint.
- **Luminous Borders:** Instead of shadows, use 1px semi-transparent borders. For active or "High-Tier" elements, apply an outer glow (box-shadow) using the primary color with a 15-25px blur and 0.4 opacity.
- **Z-Axis Hierarchy:**
  - **Level 0 (Floor):** Deep space black (#050505).
  - **Level 1 (Cards):** Translucent gunmetal (#1A1A1A at 80% opacity).
  - **Level 2 (Modals/Popovers):** Blurred glass with a Primary Color 1px stroke.

## Shapes

The shape language is **aggressive and geometric**. 

- **Corner Treatment:** While a "Soft" (4px) radius is the standard for cards to maintain a premium feel, "Clip-path" corners (45-degree angled cuts) should be used on buttons and decorative accents to enhance the cyberpunk aesthetic.
- **Interactive Elements:** Buttons should use the "Pill" shape only for secondary tags; primary actions are strictly rectangular with subtle 4px rounded corners or chamfered edges.

## Components

### Buttons
- **Primary:** Solid Primary Color background, black text. On hover, apply a high-intensity outer glow and a slight scale-up (1.02x).
- **Ghost:** Primary color border (1px), no background. On hover, fill with 10% primary color opacity.
- **Cyber-Action:** Include a small 45-degree "notch" on the top-right corner.

### Cards
- **Product Card:** Glassmorphic background, 1px internal stroke. Image should have a subtle "under-glow" that matches the product's dominant color.
- **Hover State:** Border color shifts from neutral to Primary/Secondary gradient.

### Input Fields
- **Styling:** Dark background, bottom-only border (2px) in neutral grey. Border glows Primary Color upon focus.
- **Font:** Use JetBrains Mono for input text to maintain the technical feel.

### Lists & Tables
- **Specs:** Alternating row highlights using 5% opacity primary color. Use monospaced labels for all numerical data.

### Progress Bars (RGB Pulse)
- **Visual:** Use a linear gradient (Primary to Secondary). Apply a "scanline" animation overlay that moves horizontally across the bar.