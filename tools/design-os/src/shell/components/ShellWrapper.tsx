import { ReactNode } from 'react'
import { AppShell } from './AppShell'
import type { AppShellProps } from './AppShell'
import { loadShellInfo } from '@/lib/shell-loader'

export interface ShellWrapperProps {
  children: ReactNode
  currentPath?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function ShellWrapper({ children, currentPath, onNavigate, onLogout }: ShellWrapperProps) {
  const shellInfo = loadShellInfo()
  const specNavItems = shellInfo?.spec?.navigationItems || []

  // Parse navigation items from spec
  const navigationItems: AppShellProps['navigationItems'] = specNavItems.length > 0
    ? specNavItems.map((item) => {
        // Extract label from format: "**Label** → Description" or "Label → Description"
        const labelMatch = item.match(/\*\*([^*]+)\*\*/)
        const label = labelMatch ? labelMatch[1] : item.split('→')[0]?.trim() || item.trim()
        
        // Generate href from label
        const href = `/${label.toLowerCase().replace(/\s+/g, '-')}`
        
        // Check if current path matches
        const isActive = currentPath === href || currentPath?.startsWith(href + '/')
        
        return { label, href, isActive }
      })
    : [
        { label: 'Dashboard', href: '/dashboard', isActive: currentPath === '/dashboard' },
      ]

  const defaultUser = {
    name: 'Demo User',
    email: 'demo@digilist.no',
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={defaultUser}
      currentPath={currentPath}
      onNavigate={onNavigate}
      onLogout={onLogout}
      notificationCount={3}
    >
      {children}
    </AppShell>
  )
}

// Default export for loadAppShell()
export default ShellWrapper
