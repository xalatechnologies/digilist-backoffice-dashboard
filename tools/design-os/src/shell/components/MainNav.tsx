import { LayoutDashboard, Building2, Calendar, FileText, DollarSign, Users, Settings, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

export interface MainNavProps {
  groups: NavGroup[]
  onNavigate?: (href: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Lokaler: Building2,
  Sesonger: Calendar,
  Bookinger: FileText,
  Priser: DollarSign,
  Økonomi: DollarSign,
  Brukere: Users,
  Organisasjoner: Users,
  Integrasjoner: Settings,
  Meldinger: Bell,
}

export function MainNav({ groups, onNavigate }: MainNavProps) {
  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate?.(href)
  }

  const handleKeyDown = (href: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onNavigate?.(href)
    }
  }

  return (
    <nav className="flex flex-col h-full" aria-label="Main navigation">
      {/* Brand area */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#33649E] flex items-center justify-center">
            <span className="text-white text-sm font-bold">DL</span>
          </div>
          <div>
            <div className="font-semibold text-sm">DigiList</div>
            <div className="text-xs text-muted-foreground">Administrasjon</div>
          </div>
        </div>
      </div>

      {/* Navigation groups */}
      <div className="flex-1 overflow-y-auto py-4">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className={cn(groupIndex > 0 && 'mt-6')}>
            {group.label && (
              <div className="px-6 mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.label}
                </h3>
              </div>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon || iconMap[item.label] || LayoutDashboard
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleClick(item.href, e)}
                      onKeyDown={(e) => handleKeyDown(item.href, e)}
                      className={cn(
                        'flex items-center gap-3 px-6 py-2 text-sm transition-colors',
                        'hover:bg-muted/50 focus:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2',
                        item.isActive
                          ? 'bg-[#E6EEF7] text-[#33649E] font-medium border-r-2 border-[#33649E]'
                          : 'text-foreground'
                      )}
                      aria-current={item.isActive ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="border-t p-4">
        <button
          onClick={() => onNavigate?.('/logout')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onNavigate?.('/logout')
            }
          }}
          className="w-full flex items-center gap-3 px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#33649E] focus:ring-offset-2"
        >
          <span>Logg ut</span>
        </button>
      </div>
    </nav>
  )
}
