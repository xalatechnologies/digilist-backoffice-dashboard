# DigiList Backoffice Dashboard - Design OS

Et produktplanleggings- og designverktøy for å definere, designe og eksportere DigiList Backoffice Dashboard-komponenter.

## 📋 Oversikt

Dette prosjektet bruker [Design OS](https://buildermethods.com/design-os) for å planlegge og designe DigiList Backoffice Dashboard. Design OS er et verktøy som hjelper deg med å definere produktvisjonen, strukturere datamodellen, designe UI-en, og eksportere produksjonsklare komponenter for implementering.

### Hva er Design OS?

Design OS er en strukturert prosess for å planlegge og designe produkter før implementering. I stedet for å hoppe rett inn i kode, jobber du gjennom en guidet prosess som fanger opp hva du bygger og hvorfor—deretter leverer alt en kodeagent trenger for å bygge det riktig.

## 🚀 Komme i gang

### Forutsetninger

- Node.js 18+ og npm
- Git

### Installasjon

1. **Klon repositoriet** (hvis du ikke allerede har gjort det):
   ```bash
   cd tools/design-os
   ```

2. **Installer avhengigheter**:
   ```bash
   npm install
   ```

3. **Start utviklingsserveren**:
   ```bash
   npm run dev
   ```

4. **Åpne i nettleseren**:
   ```
   http://localhost:3000
   ```

## 📁 Prosjektstruktur

```
tools/design-os/
├── product/                    # Produktdefinisjon (portabel)
│   ├── product-overview.md     # Produktbeskrivelse, problemer/løsninger, funksjoner
│   ├── product-roadmap.md      # Liste over seksjoner med titler og beskrivelser
│   ├── data-model/             # Global datamodell
│   │   └── data-model.md       # Entitetsbeskrivelser og relasjoner
│   ├── design-system/          # Design tokens
│   │   ├── colors.json         # { primary, secondary, neutral }
│   │   └── typography.json     # { heading, body, mono }
│   ├── shell/                  # Applikasjonsshell
│   │   └── spec.md             # Shell-spesifikasjon
│   └── sections/               # Seksjonsspesifikasjoner
│       └── admin-dashboard/
│           ├── spec.md         # Seksjonsspesifikasjon
│           ├── data.json       # Eksempeldata for skjermdesign
│           └── *.png           # Skjermbilder
│
├── src/                        # Design OS-applikasjonen
│   ├── components/             # UI-komponenter for Design OS
│   ├── lib/                    # Hjelpefunksjoner og loadere
│   ├── sections/               # Skjermdesign-komponenter
│   │   └── admin-dashboard/
│   │       └── Dashboard.tsx   # Dashboard-komponent
│   └── shell/                  # Shell-design-komponenter
│       ├── components/
│       └── ShellPreview.tsx
│
└── docs/                       # Dokumentasjon
    ├── getting-started.md
    ├── product-planning.md
    ├── design-section.md
    └── export.md
```

## 🎨 Designprosess

Design OS følger en strukturert planleggingssekvens:

### Fase 1: Produktplanlegging

1. **Produktvisjon** (`/product-vision`) - Definer produktets kjernebeskrivelse, problemer det løser, og nøkkelfunksjoner
2. **Produktroadmap** (`/product-roadmap`) - Del produktet inn i 3-5 utviklingsseksjoner
3. **Datamodell** (`/data-model`) - Definer kjerneentiteter og relasjoner
4. **Design tokens** (`/design-tokens`) - Velg fargepalett og typografi
5. **Applikasjonsshell** (`/design-shell`) - Design navigasjon og layout

### Fase 2: Seksjonsdesign

For hver seksjon i roadmapen:

1. **Shape Section** (`/shape-section`) - Definer omfang og krav
2. **Sample Data** (`/sample-data`) - Generer realistiske data og TypeScript-typer
3. **Design Screen** (`/design-screen`) - Bygg faktiske React-komponenter
4. **Screenshot Design** (`/screenshot-design`) - Dokumenter designet (valgfritt)

### Fase 3: Eksport

1. **Export Product** (`/export-product`) - Generer komplett handoff-pakke

## 🛠️ Teknisk Stack

- **React 19** - UI-rammeverk
- **TypeScript** - Type-sikkerhet
- **Vite** - Build-verktøy og dev-server
- **Tailwind CSS v4** - Styling
- **React Router** - Routing
- **@digdir/designsystemet-react** - Designsystem-komponenter
- **Radix UI** - Headless UI-komponenter
- **Lucide React** - Ikoner

## 📝 Tilgjengelige Kommandoer

| Kommando | Formål |
|----------|--------|
| `/product-vision` | Definer produktnavn, beskrivelse, problemer, funksjoner |
| `/product-roadmap` | Del produkt inn i seksjoner |
| `/data-model` | Definer kjerneentiteter og relasjoner |
| `/design-tokens` | Velg farger og typografi |
| `/design-shell` | Design navigasjon og layout |
| `/shape-section` | Definer en seksjons omfang og krav |
| `/sample-data` | Generer eksempeldata og TypeScript-typer |
| `/design-screen` | Opprett skjermdesign-komponenter |
| `/screenshot-design` | Ta skjermbilder |
| `/export-product` | Generer komplett handoff-pakke |

## 🎯 Nåværende Status

### Fullført

- ✅ Produktvisjon og roadmap
- ✅ Datamodell
- ✅ Design tokens (farger og typografi)
- ✅ Applikasjonsshell-design
- ✅ Admin Dashboard-seksjon:
  - ✅ Seksjonsspesifikasjon
  - ✅ Eksempeldata
  - ✅ Dashboard-skjermdesign med:
    - KPI-kort (Avventer behandling, Nye i dag, Kommende bookinger, Integrasjonsavvik)
    - "Trenger handling"-tabell med horisontal scrollbar
    - "Siste hendelser"-liste
  - ✅ Mørk modus-støtte

### Neste Steg

- [ ] Eksporter produktpakke
- [ ] Implementer i hovedkodebasen

## 🎨 Design System

### Farger

Produktet bruker DigiDir Designsystemet med tilpassede farger definert i `product/design-system/colors.json`.

### Typografi

Typografi er definert i `product/design-system/typography.json` og bruker Google Fonts.

### Mørk Modus

Alle komponenter støtter mørk modus med riktig kontrast og lesbarhet.

## 📦 Eksport

Når designet er ferdig, kan du eksportere en komplett handoff-pakke som inneholder:

- Produktoversikt og dokumentasjon
- Design tokens (farger, typografi)
- Datamodell og TypeScript-typer
- Shell-komponenter
- Seksjonskomponenter med eksempeldata
- Implementeringsinstruksjoner
- Test-spesifikasjoner

## 🧪 Utvikling

### Bygge prosjektet

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Preview produksjonsbygget

```bash
npm run preview
```

## 📚 Dokumentasjon

- [Getting Started](docs/getting-started.md)
- [Product Planning](docs/product-planning.md)
- [Designing Sections](docs/design-section.md)
- [Export](docs/export.md)
- [Usage Guide](docs/usage.md)

## 🔗 Ressurser

- [Design OS Dokumentasjon](https://buildermethods.com/design-os)
- [DigiDir Designsystemet](https://www.digdir.no/designsystemet)
- [Tailwind CSS v4](https://tailwindcss.com)

## 📄 Lisens

Se [LICENSE](LICENSE) filen for detaljer.

---

**Merk**: Design OS er et planleggingsverktøy, ikke sluttproduktets kodebase. Skjermdesignene og komponentene generert her er ment å eksporteres og integreres i den faktiske produktets kodebase.
