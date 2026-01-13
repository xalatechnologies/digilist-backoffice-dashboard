# Screen Designs - Admin Dashboard

## Dashboard

**File:** `src/sections/admin-dashboard/Dashboard.tsx`

**Route:** `/admin/dashboard`

### Overview

Desktop-first dashboard providing operational workload overview and system health indicators. Includes KPI cards, action-required table, and recent events feed.

### Components

- **KPI Cards (4)**: Avventer behandling, Nye i dag, Kommende bookinger, Integrasjonsavvik
- **Trenger handling Table**: Sorted by deadline, shows items requiring action
- **Siste hendelser Feed**: Recent system events with type, subject, actor, and time

### States

- **Loading**: Skeleton states for all components
- **Empty**: Appropriate empty state messages
- **Error**: Inline alert with retry button

### Accessibility

- Full keyboard navigation support
- Proper ARIA labels
- Focus visible on all interactive elements
- Semantic HTML structure
