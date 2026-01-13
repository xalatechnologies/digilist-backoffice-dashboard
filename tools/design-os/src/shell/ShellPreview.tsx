import { ShellWrapper } from './components/ShellWrapper'

export default function ShellPreview() {
  return (
    <ShellWrapper>
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Shell Preview</h2>
          <p className="text-muted-foreground">
            This is a preview of the application shell. The shell includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Left sidebar navigation with grouped items</li>
            <li>Top header with page context and user actions</li>
            <li>Main content area for page content</li>
            <li>Full keyboard accessibility</li>
            <li>Brand color (#33649E) for active states</li>
          </ul>
        </div>
      </div>
    </ShellWrapper>
  )
}
