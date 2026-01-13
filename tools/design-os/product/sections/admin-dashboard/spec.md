Section: Admin Dashboard

Goal:
Provide a fast overview of operational workload and system health, and direct users to the next action.

Page title:
Dashboard

Subtitle:
Hurtigoversikt og oppgaver som trenger handling

Layout:
- Desktop-first (admin)
- Uses existing shell: left sidebar + top header (already implemented)
- Main content area is a 12-column grid:
  - Row 1: KPI cards (4 cards)
  - Row 2: Two columns
    - Left (8 cols): "Trenger handling" table
    - Right (4 cols): "Siste hendelser" event feed

KPI cards (Row 1):
1) Avventer behandling
   - Metric: count
   - Description: "Forespørsler og søknader"
   - Icon: clock/waiting
   - Click action: navigates to Bookinger filtered by "Avventer"

2) Nye i dag
   - Metric: count
   - Description: "Mottatt siste 24 timer"
   - Icon: plus/new
   - Click action: navigates to Bookinger filtered by "Nye"

3) Kommende bookinger
   - Metric: count
   - Description: "Neste 7 dager"
   - Icon: calendar
   - Click action: navigates to Bookinger filtered by "Kommende"

4) Integrasjonsavvik
   - Metric: count
   - Description: "Krever oppfølging"
   - Icon: warning/error
   - Click action: navigates to Integrasjoner / Meldinger (depending on IA)

KPI card interaction:
- Entire card is clickable OR has a clear "Se" action link/button
- Must be accessible (keyboard focusable, proper aria-label)
- Must show hover + focus states

Primary table: "Trenger handling"
Purpose:
Show items that require action, sorted by urgency.

Columns:
- Type (badge): "Forespørsel", "Endring", "Søknad"
- Lokale (listing name)
- Søker (org/user)
- Tidspunkt (start date/time)
- Status (badge): "Ny", "Under behandling", "Venter info"
- Frist (deadline date/time)
- Handling (action link): "Åpne"

Table rules:
- Default sort: earliest deadline first
- Row click opens booking detail (future page), but for now link to placeholder route
- Status must not be color-only; always show text and optionally an icon
- If deadline is overdue: show "Over frist" with semantic warning styling

Secondary panel: "Siste hendelser"
Purpose:
Show last system events with type and timestamp.

Event items:
- Type (icon + label): Endret, Avslått, Godkjent, Arkiv sendt
- Subject: e.g. "Kurs – Dansestudio"
- Actor: e.g. "Kari Nordmann"
- Time: e.g. "10:45"

Event rules:
- Newest first
- Clicking an event navigates to relevant booking/detail (placeholder ok)
- Icons and colors are semantic (not brand color)

Empty states:
- KPI cards show 0 and a short helper text
- Table empty: "Ingen saker krever handling akkurat nå"
- Events empty: "Ingen hendelser å vise"

Loading states:
- Skeletons for cards, table rows, and events list
- Keep layout stable while loading

Error states:
- Inline alert above table or within card area:
  - "Kunne ikke hente data. Prøv igjen."
- Provide retry button

Accessibility:
- Tab order: header → KPI cards → table controls → table rows → events list
- Keyboard: Enter opens row, Space activates buttons
- Focus visible on all interactive elements
- Use proper table semantics and aria labels

Non-goals:
- No inline approval/rejection from dashboard
- No complex filtering UI on dashboard (filters live on Bookinger page)
