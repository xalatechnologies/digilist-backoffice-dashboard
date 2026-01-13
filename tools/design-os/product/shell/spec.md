# Application Shell Specification

## Overview

Admin shell for DigiList Admin Dashboard providing persistent navigation and layout structure. The shell consists of a left sidebar navigation, top header, and main content area. Designed for desktop-first admin workflows with full keyboard accessibility.

## Navigation Structure

- **Dashboard** → Admin Dashboard section
- **Lokaler** → Booking & Lokaler section
- **Sesonger** → Booking & Lokaler section
- **Bookinger** → Booking & Lokaler section
- **Priser** → Økonomi section
- **Økonomi** → Økonomi section
- **Brukere** → Brukere & Organisasjoner section
- **Organisasjoner** → Brukere & Organisasjoner section
- **Integrasjoner** → System section
- **Meldinger** → System section

## Layout Pattern

Left sidebar navigation with persistent top header. The sidebar contains:
- Brand area with DigiList logo and "Administrasjon" subtitle
- Navigation groups organized by functional area
- Bottom logout action

Top header contains:
- Left: Page context (e.g., "DigiList")
- Right: Theme toggle, notifications icon with badge, and user menu

Main content area is scrollable with standard max width and spacing, supporting grid-based layouts for dashboard content.

## User Menu

Located in the top header right side. Contains:
- User email/name
- Profile access
- Logout action

## Responsive Behavior

- **Desktop**: Full sidebar visible, persistent layout
- **Tablet**: Sidebar remains visible (may be collapsible in future versions)
- **Mobile**: Sidebar behavior TBD (not required for v1)

## Design Notes

- Active route highlighted using brand color #33649E
- Keyboard accessible navigation links with visible focus states
- Skip to content link for accessibility
- ARIA labels for icons and navigation landmarks
- Brand color (#33649E) used only for active navigation indicator and primary buttons
- Status colors remain semantic (not brand color)
