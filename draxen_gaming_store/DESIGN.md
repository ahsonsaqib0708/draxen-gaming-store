---
name: Draxen Gaming Store
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
  on-surface-variant: '#cbc3d9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#948da2'
  outline-variant: '#494456'
  surface-tint: '#cfbdff'
  primary: '#cfbdff'
  on-primary: '#3a0093'
  primary-container: '#6200ee'
  on-primary-container: '#d0beff'
  inverse-primary: '#6d23f9'
  secondary: '#46f5e0'
  on-secondary: '#003731'
  secondary-container: '#00d8c4'
  on-secondary-container: '#005950'
  tertiary: '#ffabf3'
  on-tertiary: '#5b005b'
  tertiary-container: '#970097'
  on-tertiary-container: '#ffaef3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8ddff'
  primary-fixed-dim: '#cfbdff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#5300cd'
  secondary-fixed: '#4ffbe6'
  secondary-fixed-dim: '#17deca'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffd7f5'
  tertiary-fixed-dim: '#ffabf3'
  on-tertiary-fixed: '#380038'
  on-tertiary-fixed-variant: '#810081'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style
The design system embodies a high-octane, premium cyberpunk aesthetic tailored for elite gamers. It prioritizes a high-tech, immersive atmosphere that mimics a high-end gaming cockpit or an advanced OS interface.

**Design Style: Cyberpunk Glassmorphism**
The style utilizes deep obsidian surfaces, neon-reactive borders, and multi-layered translucency. It leans into a futuristic "Razer-level" quality, focusing on precision, speed, and digital luxury. The UI should feel alive, using subtle glows and "energy-infused" elements to guide the user through the shopping experience.

- **Atmosphere:** Dark, energetic, and sophisticated.
- **Visual Cues:** Neon light-trails, data-driven overlays, and hardware-inspired geometry.
- **Target Audience:** Enthusiast gamers, hardware collectors, and esports professionals.

## Colors
This design system operates exclusively in a deep dark mode to maximize the impact of neon accents.

- **Primary (Deep Purple):** Used for primary actions and brand presence. It represents the "core energy" of the interface.
- **Secondary (Neon Blue/Cyan):** Used for success states, interactive highlights, and secondary calls to action.
- **Tertiary (Magenta/RGB Glow):** Reserved for "Hot" items, sales, and urgent notifications.
- **Base/Neutral:** A true black (#050505) for the background to create infinite depth, with a slightly elevated obsidian (#0F0F12) for surface containers.
- **RGB Glows:** Apply low-opacity gradients of Cyan and Magenta as background "blobs" to simulate hardware lighting.

## Typography
The typography strategy contrasts aggressive, wide-set headlines with highly legible, technical body text.

- **Headlines (Sora):** Chosen for its geometric, futuristic construction. All-caps should be used for section titles to emphasize the "gaming hardware" look.
- **Body (Inter):** A neutral, systematic sans-serif that ensures readability against dark, high-contrast backgrounds.
- **Technical/Labels (JetBrains Mono):** Used for specs, pricing, and SKU details to reinforce the high-tech, developer-centric aesthetic of premium gaming gear.

## Layout & Spacing
The layout follows a rigid 12-column fluid grid for desktop, transitioning to a single-column stack for mobile.

- **Philosophy:** Generous whitespace (or "darkspace") to allow high-fidelity product photography to breathe.
- **Rhythm:** An 8px base unit controls all padding and margins. 
- **Alignment:** Use heavy inner-padding (32px+) for glassmorphic cards to prevent content from feeling cramped against neon borders.
- **Breakpoints:**
  - Desktop: 1200px+ (12 columns)
  - Tablet: 768px - 1199px (6 columns)
  - Mobile: <767px (2 columns or stack)

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Light Emission** rather than traditional shadows.

- **Surfaces:** Use semi-transparent backgrounds (e.g., `rgba(15, 15, 18, 0.7)`) with a `backdrop-filter: blur(20px)`.
- **Borders:** Implement "Thin-Film" strokes. Use 1px solid borders with 20-30% opacity of the primary or secondary color.
- **Glow Effects:** Interactive elements should utilize `box-shadow` with a high blur radius (20px+) and 0px spread, using the brand's neon colors to simulate light emitting from the component.
- **Stacking:** Higher elevation levels are indicated by increased background transparency and brighter border strokes.

## Shapes
The shape language is sharp and precise, reflecting industrial design and hardware aesthetics.

- **Corner Radius:** Elements use a "Soft" 4px radius (0.25rem) to maintain a modern, aggressive edge without being painfully sharp. 
- **Angular Accents:** For hero buttons or special badges, use "clipped corners" (45-degree chamfers) to evoke a military-tech or sci-fi interface feel.

## Components

- **Glow Buttons:** Primary buttons feature a solid Deep Purple fill with a subtle "Pulse" animation. On hover, the external neon glow expands and the border brightness increases.
- **Neon Cards:** Product cards use a dark glassmorphic base. On hover, the border color transitions from a subtle grey to a full-intensity Neon Blue or Magenta glow.
- **Glass Inputs:** Form fields are dark and translucent. The focus state triggers a 1px Cyan border and a soft inner glow.
- **Spec Chips:** Small, monospaced badges used for hardware specs (e.g., "RTX 4090", "144Hz"). These should have a dark fill and a high-contrast border.
- **HUD-style Progress Bars:** Used for "Stock Levels" or "Power Ratings," featuring a segmented bar design rather than a smooth continuous fill.
- **Navigation:** A top-pinned glass bar with a bottom-border "energy line" (a 1px gradient stroke that spans the width of the screen).