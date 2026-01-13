Design Tokens – DigiList Admin Dashboard

## Base System

Designsystemet.no is the source of truth for typography, spacing, and component styling. All base styling follows Designsystemet.no patterns and defaults.

## Typography

- **Font Stack**: Designsystemet.no default font stack
- **Scale**: Designsystemet.no typography scale
- **Density**: Maintain readable density for admin tables and cards
- **No custom fonts**: Use system defaults only

## Brand Accent Color

### Primary Color: #33649E

A professional blue that serves as the primary brand accent.

### Color Tokens

- `color.primary`: #33649E
- `color.primary.hover`: #2C5688
- `color.primary.active`: #24496F
- `color.primary.subtle`: #E6EEF7

### Usage Rules

**Use brand accent for:**
- Primary CTA buttons
- Active navigation highlight
- Selected states (tabs, selected rows, selected filters)

**Do NOT use brand accent for:**
- Semantic statuses (success/warning/error/info)
- Large background surfaces
- Body text
- Color-only state communication

## Accessibility

- **WCAG 2.1 AA compliance** required
- **Text contrast**: ≥ 4.5:1
- **UI/focus indicators**: ≥ 3:1
- **No color-only communication**: Always combine color with text or icons
- **Visible focus indicators**: Required on all interactive elements
