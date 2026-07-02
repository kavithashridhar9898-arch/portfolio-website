---
name: Aetheric Noir
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#050505'
  on-primary-container: '#797777'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#c9c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#050505'
  on-tertiary-container: '#797777'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c9c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 96px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  subheading-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is engineered to evoke a sense of "digital couture"—an ultra-premium, cinematic experience that feels both technologically advanced and classically luxurious. It targets an elite audience of high-end collaborators and technical visionaries who value precision, depth, and the "unseen" details.

The aesthetic is a hybrid of **High-End Glassmorphism** and **Minimalist Futurism**. It utilizes deep obsidian surfaces, light-refracting glass layers, and soft atmospheric glows to create a sense of infinite spatial depth. Every interaction should feel intentional, weighted, and expensive, drawing inspiration from high-fidelity hardware interfaces and luxury watchmaking.

## Colors

The palette is anchored in **Ultra Deep Black (#050505)** to maximize OLED contrast and depth. 

- **Primary Background:** #050505 (Obsidian).
- **Secondary Surfaces:** #121212 (Graphite), used for card backgrounds and elevated containers.
- **Accents:** 
    - **Electric Blue:** Used for primary actions and "active" states.
    - **Royal Purple:** Used for secondary highlights and deep gradients.
    - **Neon Cyan:** Reserved for technical indicators, code highlights, and status nodes.
- **Typography:** Soft White (#F5F5F7) is the standard for high-readiness text, while mid-tone greys are used for secondary information to maintain visual hierarchy.

## Typography

This design system utilizes a tiered typographic approach to balance editorial luxury with technical precision.

- **Headlines (Geist):** Tight tracking and high weight contrast. Display sizes should utilize a subtle gradient mask from Soft White to a slightly darker grey to mimic metallic reflections.
- **Body (Inter):** Generous line height (1.6x - 1.8x) is required to ensure readability against dark backgrounds. 
- **Tech/Monospace (Space Mono):** Used for code snippets, metadata, and "admin" labels. Always set with increased letter spacing (0.05em - 0.1em) for a sophisticated, instrumentation-inspired look.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The main content is capped at 1440px for maximum readability, centered within the viewport.

- **Rhythm:** An 8px base grid governs all dimensions.
- **Hierarchy:** Use dramatic vertical "breathing room" (Section Gaps of 120px+) to separate distinct portfolio projects or dashboard modules.
- **Grid:** A 12-column grid is used for the dashboard, while the portfolio uses a more asymmetrical, editorial placement of elements to create visual interest.
- **Mobile:** Margins shrink to 20px, and section gaps reduce to 64px. Multi-column cards reflow to a single-column stack.

## Elevation & Depth

Depth is the defining characteristic of this design system. It avoids traditional drop shadows in favor of **Light-Based Elevation**.

1.  **Level 0 (Base):** #050505 with a subtle, non-repeating film grain noise texture at 2% opacity.
2.  **Level 1 (Cards):** Glassmorphism. Semi-transparent background (#121212 at 60% opacity) with a 20px backdrop-blur. 
3.  **Level 2 (Floating UI/Modals):** Increased transparency, 40px backdrop-blur, and a "rim light" effect—a 1px solid border at the top and left edges using a low-opacity Soft White to simulate light catching the edge of a glass pane.
4.  **Ambient Glows:** Use large, diffused radial gradients (200px-500px radius) in Blue and Purple behind key components to create a sense of luminescence.

## Shapes

The design system favors a "Hardware Geometric" look. Curves are present but controlled.

- **Standard Containers:** 0.5rem (8px) corner radius, providing a crisp, modern feel.
- **Interactive Elements:** Buttons and input fields use 1rem (16px) or fully rounded pill-shapes to invite interaction and contrast against the more rigid layout grid.
- **Accent Shapes:** Use 1px thin lines and "plus" sign (+) markers at the intersection of grid lines to reinforce the technical, engineered aesthetic.

## Components

### Glass Cards
Every card must feature a 1px border. On hover, the border should transition from a static grey to a subtle gradient (Electric Blue to Royal Purple). The background noise texture should remain visible through the glass blur.

### Magnetic Buttons
Primary buttons feature a "magnetic" interaction where the text and background subtly follow the cursor within a 20px radius. The background should be a subtle mesh gradient of Blue and Purple with a soft outer glow.

### Interactive Inputs
Form fields are transparent with only a bottom 1px border. Upon focus, a neon-cyan glow expands from the center of the border to the edges, and the label floats upward in Space Mono.

### Animated Timeline Nodes
For the portfolio "Experience" section, nodes are glowing Cyan circles connected by a thin, dashed line. When in view, the line "draws" itself via a dash-offset animation, and nodes pulse with a soft ambient glow.

### Motion Principles
- **Parallax:** Background glow elements should move at 10% of the scroll speed to create 3D depth.
- **Blur Reveals:** Elements entering the viewport should transition from a `blur(20px)` and `opacity(0)` to `blur(0)` and `opacity(1)` using a long, smooth cubic-bezier (0.22, 1, 0.36, 1).
- **Micro-interactions:** Every click or hover should trigger a subtle haptic-like visual change, such as a slight scale increase (1.02x) or a color shift.