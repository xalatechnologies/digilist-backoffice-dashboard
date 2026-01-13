import { ReactNode } from 'react'
import { MainNav } from './MainNav'
import type { NavGroup } from './MainNav'
import { UserMenu } from './UserMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Bell } from 'lucide-react'
import { Button } from '@digdir/designsystemet-react'
import { Tag } from '@digdir/designsystemet-react'

export interface AppShellProps {
  children: ReactNode
  navigationItems?: Array<{ label: string; href: string; isActive?: boolean }>
  user?: {
    name?: string
    email?: string
    avatarUrl?: string
  }
  currentPath?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
  notificationCount?: number
}

// Organize navigation items into groups based on the spec
function organizeNavItems(
  items: Array<{ label: string; href: string; isActive?: boolean }>,
  currentPath?: string
): NavGroup[] {
  // Define navigation groups
  const groups: NavGroup[] = [
    {
      label: 'Oversikt',
      items: [],
    },
    {
      label: 'Booking & Lokaler',
      items: [],
    },
    {
      label: 'Økonomi',
      items: [],
    },
    {
      label: 'Brukere & Organisasjoner',
      items: [],
    },
    {
      label: 'System',
      items: [],
    },
  ]

  // Map items to groups
  items.forEach((item) => {
    const isActive = currentPath ? item.href === currentPath : item.isActive
    const navItem = { ...item, isActive }

    if (item.label === 'Dashboard') {
      groups[0].items.push(navItem)
    } else if (['Lokaler', 'Sesonger', 'Bookinger'].includes(item.label)) {
      groups[1].items.push(navItem)
    } else if (['Priser', 'Økonomi'].includes(item.label)) {
      groups[2].items.push(navItem)
    } else if (['Brukere', 'Organisasjoner'].includes(item.label)) {
      groups[3].items.push(navItem)
    } else if (['Integrasjoner', 'Meldinger'].includes(item.label)) {
      groups[4].items.push(navItem)
    }
  })

  // Filter out empty groups
  return groups.filter((group) => group.items.length > 0)
}

export function AppShell({
  children,
  navigationItems = [],
  user,
  currentPath,
  onNavigate,
  onLogout,
  notificationCount = 0,
}: AppShellProps) {
  const navGroups = organizeNavItems(navigationItems, currentPath)

  const handleNavigate = (href: string) => {
    onNavigate?.(href)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#33649E] focus:text-white focus:rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-[#33649E]"
      >
        Hopp til hovedinnhold
      </a>

      {/* Sidebar */}
      <aside className="w-64 border-r bg-card shrink-0 flex flex-col" aria-label="Sidebar navigation">
        <MainNav groups={navGroups} onNavigate={handleNavigate} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 border-b bg-card shrink-0 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">DigiList</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="tertiary"
                icon
                className="relative"
                onClick={() => handleNavigate('/notifications')}
                aria-label={`Varsler${notificationCount > 0 ? ` (${notificationCount} nye)` : ''}`}
              >
                <Bell className="h-4 w-4" />
              </Button>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-destructive text-white text-xs font-medium">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </div>

            {/* User menu */}
            <UserMenu user={user} onNavigate={handleNavigate} onLogout={onLogout} />
          </div>
        </header>

        {/* Main content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto bg-background"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
