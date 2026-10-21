---
name: Cinema Modern
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
  on-surface-variant: '#ebbbb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#b18780'
  outline-variant: '#603e39'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690100'
  primary-container: '#ff5540'
  on-primary-container: '#5c0000'
  inverse-primary: '#c00100'
  secondary: '#afc6ff'
  on-secondary: '#002d6d'
  secondary-container: '#005dd2'
  on-secondary-container: '#d6e0ff'
  tertiary: '#acc7ff'
  on-tertiary: '#002f67'
  tertiary-container: '#488fff'
  on-tertiary-container: '#00285b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#afc6ff'
  on-secondary-fixed: '#001944'
  on-secondary-fixed-variant: '#004299'
  tertiary-fixed: '#d7e2ff'
  tertiary-fixed-dim: '#acc7ff'
  on-tertiary-fixed: '#001a40'
  on-tertiary-fixed-variant: '#004491'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  live-badge-red: '#CC0000'
  surface-elevated: '#212121'
  surface-overlay: '#282828'
  text-primary: '#F1F1F1'
  text-secondary: '#AAAAAA'
  border-subtle: rgba(255, 255, 255, 0.1)
typography:
  display-hero:
    fontFamily: Roboto Flex
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Roboto Flex
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Roboto Flex
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Roboto Flex
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Roboto Flex
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
  body-md:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Roboto Flex
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Roboto Flex
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Roboto Flex
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  badge-xs:
    fontFamily: Roboto Flex
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an immersive, cinematic video streaming environment engineered for prolonged viewing sessions and friction-free content discovery. The experience centers on high-fidelity video canvases, where the interface gracefully recedes to prioritize creator and entertainment media while maintaining sharp, effortless navigation.

The aesthetic fuses modern minimalism with tonal dark-mode discipline. Deep, pitch-black canvases prevent bezel bleed on OLED and HDR screens, while rich charcoal tiered surfaces provide soft structural demarcation. Accented with high-energy streaming red, interactive states deliver immediate tactical feedback without overwhelming the visual field. The tone is confident, fluid, and uncluttered, catering to both quick-browse mobile consumers and immersive desktop viewers.

## Colors

The palette employs a dark-first hierarchy engineered around high-contrast legibility and OLED efficiency:

- **Primary (`#FF0000`)**: Reserved for core focal triggers, active scrubbing bars, recording/live status badges, and critical calls-to-action (such as subscriptions or upload actions).
- **Secondary (`#065FD4`)**: Used selectively for auxiliary interactive anchors, verified creator badges, actionable informational links, and tertiary interaction elements.
- **Neutral (`#0F0F0F`)**: Serves as the bedrock canvas value. Secondary layers scale subtly to `#212121` and `#282828` to distinguish floating bars, modals, and card surfaces without relying on harsh lines.
- **Text & Accents**: High-contrast white (`#F1F1F1`) drives headlines and primary titles for maximum readability, accompanied by subdued gray (`#AAAAAA`) for metadata, view counts, timestamps, and secondary captions.

## Typography

The typography relies on **Roboto Flex** across all structural levels, mirroring the platform's utilitarian, clean, and media-focused lineage. Strict optical scales maintain clean scannability across high-density grids:

- **Headlines & Titles**: Tight tracking and balanced weights (600–700) give titles immediate presence while truncating gracefully on dense video card layouts.
- **Body & Meta**: Clear weights (400) ensure creator names, descriptions, and comments remain legible against dark container backgrounds.
- **Labels & Micro-copy**: Used for navigation tabs, video durations, live indicators, and tag filters, utilizing slightly elevated weights (500–600) with subtle letter spacing for rapid glanceability.

## Layout & Spacing

The layout is built around an adaptive, fluid-responsive multi-column structure that shifts between browsing feeds and concentrated theatre views:

- **Breakpoints & Grids**:
  - **Desktop (1200px+)**: Dynamic 4-to-6 column fluid grid for browse feeds, transitioning to an asymmetric split (70% primary player canvas, 30% contextual rail) for watch views.
  - **Tablet (768px - 1199px)**: Responsive 2-to-3 column grid with collapsible side navigation.
  - **Mobile (< 768px)**: Single-column edge-to-edge media feed paired with a persistent 48px to 56px bottom navigation bar.
- **Rhythm**: Standard spacing steps follow an 8pt architectural rhythm, utilizing `space-xs` (4px) for inline badges and thumbnail micro-spacing, `space-sm` (8px) for channel avatar/meta gaps, and `space-md` (16px) to separate adjacent video card entries. Outer margins adjust smoothly between mobile (`margin-mobile: 1rem`) and wider displays (`margin: 1.5rem`).

## Elevation & Depth

Visual hierarchy is maintained primarily through **tonal surface layering** complemented by translucent frosted surfaces, rather than sharp drop shadows:

- **Base Layer (L0)**: `#0F0F0F` pure background foundation.
- **Container Tiers (L1)**: `#212121` used for cards on hover, segmented chips, floating search bars, and drawer panels.
- **Overlay Tiers (L2)**: `#282828` for dropdowns, popovers, and interactive context menus.
- **Backdrop Blurs**: Floating headers and the mobile bottom navigation bar leverage `backdrop-filter: blur(20px)` over `rgba(15, 15, 15, 0.8)` to let video content subtly register beneath navigational elements.
- **Borders & Dividers**: Avoid high-contrast strokes; rely on low-opacity borders (`rgba(255, 255, 255, 0.08)`) to outline cards and search bars without introducing visual clutter.

## Shapes

The interface embraces a modern rounded geometry (`roundedness: 2`, 8px base radius) paired with specialized pill geometry for contextual micro-actions:

- **Video Thumbnails & Media**: Standardized at 12px (`rounded-lg`) corner radii on desktop and tablet grids, providing a contemporary aesthetic while maintaining edge-to-edge fluidity on mobile.
- **Pills & Chips**: Category filter tabs, channel subscription buttons, and interaction capsules (like/dislike/share clusters) utilize full pill curvature (`rounded-full`) for high touch affinity.
- **Inputs & Search**: Search boxes feature pill or softly rounded forms with unified inset button contours.
- **Floating Panels & Modals**: Soft 12px–16px radii soften larger interactive overlays.

## Components

### Buttons
- **Primary / Subscribe**: Pure white background (`#FFFFFF`) with dark charcoal text (`#0F0F0F`) for maximum contrast, or high-priority streaming red (`#FF0000`) with white text. Full pill curvature (`rounded-full`), `space-sm` vertical by `space-md` horizontal padding.
- **Secondary / Action Capsules**: Tonal background (`#272727`), white text, hover transitions to `#3F3F3F`. Used for like/dislike groupings and share buttons.
- **Icon Buttons**: Circular 40x40px touch targets with transparent backgrounds, activating an ambient white ripple (`rgba(255, 255, 255, 0.1)`) on hover/press.

### Chips & Filter Badges
- Displayed horizontally in an edge-fading scrollable carousel directly below the top bar.
- **Default State**: Surface fill of `rgba(255, 255, 255, 0.08)`, text `#F1F1F1`, 8px vertical by 12px horizontal padding, full pill radius.
- **Selected State**: High-contrast white fill (`#FFFFFF`), pure black text (`#0F0F0F`), font weight 600.

### Video Cards
- **Structure**: High-ratio thumbnail container (16:9) with an inset bottom-right time stamp pill (`rgba(0, 0, 0, 0.8)` fill, 4px radius, `badge-xs` text).
- **Metadata Layout**: 36px circular avatar left-aligned; title stacked to the right in `title-sm` (line clamp 2), followed by channel name and view/date metadata in `body-sm` (`#AAAAAA`).
- **Interactive State**: Thumbnails scale subtly (1.02x) on desktop hover, revealing quick-action overlay triggers (Watch Later, Queue).

### Inputs & Search
- Integrated search bar combining a pill-shaped input field with a subtle dark border (`rgba(255, 255, 255, 0.15)`) and an integrated search icon trigger button (`#222222`).
- Focus states apply a crisp secondary blue accent border (`#065FD4`).

### Mobile Bottom Navigation
- Fixed 56px height bar across the bottom viewport with `backdrop-filter: blur(20px)` and background `rgba(15, 15, 15, 0.9)`.
- Features 4 to 5 core destinations (Home, Shorts, Subscriptions, Library) centered around icon + label stacks, rendering active items in high-contrast `#F1F1F1` and inactive items in `#AAAAAA`.