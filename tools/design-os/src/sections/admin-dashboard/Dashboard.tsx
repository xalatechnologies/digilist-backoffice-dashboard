import { Clock, Plus, Calendar, AlertTriangle, Edit, X, Check, Archive } from 'lucide-react'
import { Card } from '@digdir/designsystemet-react'
import { Tag } from '@digdir/designsystemet-react'
import { Table } from '@digdir/designsystemet-react'
import { Button } from '@digdir/designsystemet-react'
import { Skeleton } from '@digdir/designsystemet-react'
import { cn } from '@/lib/utils'
import { loadSectionData } from '@/lib/section-loader'

// Types
export interface KPIData {
  count: number
  label: string
  description: string
  route: string
}

export interface RequiresHandlingItem {
  id: string
  type: 'Forespørsel' | 'Endring' | 'Søknad'
  listing: string
  applicant: string
  starts_at: string
  status: 'Ny' | 'Under behandling' | 'Venter info'
  deadline: string
  route: string
}

export interface RecentEvent {
  id: string
  type: 'Endret' | 'Avslått' | 'Godkjent' | 'Arkiv sendt'
  subject: string
  actor: string
  time: string
  route: string
}

export interface DashboardProps {
  kpis: {
    awaiting_handling: KPIData
    new_today: KPIData
    upcoming_bookings: KPIData
    integration_issues: KPIData
  }
  requires_handling: RequiresHandlingItem[]
  recent_events: RecentEvent[]
  isLoading?: boolean
  error?: string | null
  onNavigate?: (route: string) => void
  onRetry?: () => void
}

// Helper functions
function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('nb-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function isOverdue(deadline: string): boolean {
  return new Date(deadline) < new Date()
}

function getStatusTagVariant(status: RequiresHandlingItem['status']): 'primary' | 'secondary' | 'neutral' {
  switch (status) {
    case 'Ny':
      return 'primary'
    case 'Under behandling':
      return 'secondary'
    case 'Venter info':
      return 'neutral'
    default:
      return 'neutral'
  }
}

function getEventIcon(type: RecentEvent['type']) {
  switch (type) {
    case 'Endret':
      return Edit
    case 'Avslått':
      return X
    case 'Godkjent':
      return Check
    case 'Arkiv sendt':
      return Archive
    default:
      return Edit
  }
}

function getEventIconColor(type: RecentEvent['type']): string {
  switch (type) {
    case 'Endret':
      return 'text-blue-600 dark:text-blue-400'
    case 'Avslått':
      return 'text-red-600 dark:text-red-400'
    case 'Godkjent':
      return 'text-green-600 dark:text-green-400'
    case 'Arkiv sendt':
      return 'text-gray-600 dark:text-gray-400'
    default:
      return 'text-gray-600 dark:text-gray-400'
  }
}

// KPI Card Component
function KPICard({
  icon: Icon,
  label,
  count,
  description,
  route,
  onNavigate,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  description: string
  route: string
  onNavigate?: (route: string) => void
}) {
  const handleClick = () => {
    onNavigate?.(route)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 bg-card border-border"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${count} ${description}. Klikk for å se detaljer.`}
    >
      <Card.Block className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold mb-1 text-foreground">{count}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="rounded-lg bg-muted dark:bg-muted/50 p-3">
              <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Card.Block>
    </Card>
  )
}

// KPI Card Skeleton
function KPICardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <Card.Block className="p-6 bg-card">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-11 w-11 rounded-lg" />
        </div>
      </Card.Block>
    </Card>
  )
}

// Main Dashboard Component
export function Dashboard({
  kpis,
  requires_handling,
  recent_events,
  isLoading = false,
  error = null,
  onNavigate,
  onRetry,
}: DashboardProps) {
  // Sort requires_handling by deadline (earliest first)
  const sortedRequiresHandling = [...requires_handling].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  )

  const handleRowClick = (route: string) => {
    onNavigate?.(route)
  }

  const handleRowKeyDown = (e: React.KeyboardEvent, route: string) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleRowClick(route)
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto bg-background text-foreground">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Hurtigoversikt og oppgaver som trenger handling</p>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-destructive bg-card border-border">
          <Card.Block className="p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-destructive">Kunne ikke hente data. Prøv igjen.</p>
              </div>
              {onRetry && (
                <Button variant="secondary" onClick={onRetry}>
                  Prøv igjen
                </Button>
              )}
            </div>
          </Card.Block>
        </Card>
      )}

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
          </>
        ) : (
          <>
            <KPICard
              icon={Clock}
              label={kpis.awaiting_handling.label}
              count={kpis.awaiting_handling.count}
              description={kpis.awaiting_handling.description}
              route={kpis.awaiting_handling.route}
              onNavigate={onNavigate}
            />
            <KPICard
              icon={Plus}
              label={kpis.new_today.label}
              count={kpis.new_today.count}
              description={kpis.new_today.description}
              route={kpis.new_today.route}
              onNavigate={onNavigate}
            />
            <KPICard
              icon={Calendar}
              label={kpis.upcoming_bookings.label}
              count={kpis.upcoming_bookings.count}
              description={kpis.upcoming_bookings.description}
              route={kpis.upcoming_bookings.route}
              onNavigate={onNavigate}
            />
            <KPICard
              icon={AlertTriangle}
              label={kpis.integration_issues.label}
              count={kpis.integration_issues.count}
              description={kpis.integration_issues.description}
              route={kpis.integration_issues.route}
              onNavigate={onNavigate}
            />
          </>
        )}
      </div>

      {/* Row 2: Main Content - Vertical Stack */}
      <div className="space-y-6">
        {/* Trenger handling table */}
        <Card className="bg-card border-border">
          <Card.Block className="p-6 border-b border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground">Trenger handling</h2>
            <p className="text-sm text-muted-foreground mt-1">Saker som krever oppmerksomhet, sortert etter frist</p>
          </Card.Block>
          <Card.Block className="p-0 bg-card">
            {isLoading ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            ) : sortedRequiresHandling.length === 0 ? (
              <div className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Ingen saker krever handling akkurat nå
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell className="text-foreground">Type</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Lokale</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Søker</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Tidspunkt</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Status</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Frist</Table.HeaderCell>
                      <Table.HeaderCell className="text-foreground">Handling</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {sortedRequiresHandling.map((item) => {
                      const overdue = isOverdue(item.deadline)
                      return (
                        <Table.Row
                          key={item.id}
                          className="cursor-pointer hover:bg-muted/50 text-foreground"
                          onClick={() => handleRowClick(item.route)}
                          onKeyDown={(e) => handleRowKeyDown(e, item.route)}
                          tabIndex={0}
                          role="button"
                          aria-label={`Åpne ${item.listing} - ${item.type}`}
                        >
                          <Table.Cell>
                            <Tag variant="neutral">{item.type}</Tag>
                          </Table.Cell>
                          <Table.Cell className="font-medium text-foreground">{item.listing}</Table.Cell>
                          <Table.Cell className="text-foreground">{item.applicant}</Table.Cell>
                          <Table.Cell className="text-foreground">{formatDateTime(item.starts_at)}</Table.Cell>
                          <Table.Cell>
                            <Tag variant={getStatusTagVariant(item.status)}>
                              {item.status}
                            </Tag>
                          </Table.Cell>
                          <Table.Cell className="text-foreground">
                            {overdue ? (
                              <span className="text-destructive font-medium">Over frist</span>
                            ) : (
                              formatDateTime(item.deadline)
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              variant="tertiary"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRowClick(item.route)
                              }}
                              className="h-auto p-0 text-sm"
                            >
                              Åpne
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table>
              </div>
            )}
          </Card.Block>
        </Card>

        {/* Siste hendelser */}
        <Card className="bg-card border-border">
          <Card.Block className="p-6 border-b border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground">Siste hendelser</h2>
            <p className="text-sm text-muted-foreground mt-1">Nylige systemhendelser</p>
          </Card.Block>
          <Card.Block className="p-6 bg-card">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))}
              </div>
            ) : recent_events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Ingen hendelser å vise</p>
            ) : (
              <div className="space-y-4">
                {recent_events.map((event) => {
                  const Icon = getEventIcon(event.type)
                  const iconColor = getEventIconColor(event.type)
                  return (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors"
                      onClick={() => onNavigate?.(event.route)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          onNavigate?.(event.route)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${event.type}: ${event.subject}`}
                    >
                      <div className={cn('mt-0.5 flex-shrink-0', iconColor)}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{event.subject}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {event.type} av {event.actor}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Block>
        </Card>
      </div>
    </div>
  )
}

// Default export for Design OS preview - loads sample data
export default function DashboardPreview() {
  const sectionData = loadSectionData('admin-dashboard')
  const data = sectionData.data as {
    kpis: DashboardProps['kpis']
    requires_handling: RequiresHandlingItem[]
    recent_events: RecentEvent[]
  }

  const handleNavigate = (route: string) => {
    console.log('Navigate to:', route)
    // In Design OS preview, we just log navigation
  }

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">No sample data available</p>
      </div>
    )
  }

  return (
    <Dashboard
      kpis={data.kpis}
      requires_handling={data.requires_handling}
      recent_events={data.recent_events}
      onNavigate={handleNavigate}
    />
  )
}
