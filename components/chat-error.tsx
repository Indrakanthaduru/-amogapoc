import { AlertCircle } from 'lucide-react'

import { Card } from '@/components/ui/card'

interface ChatErrorProps {
  error: unknown
}

export function ChatError({ error }: ChatErrorProps) {
  if (!error) return null

  let errorMessage: string

  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else if (typeof error === 'object' && error !== null) {
    // Handle API error objects like {type, code, message, param}
    const errObj = error as Record<string, unknown>
    errorMessage = (errObj.message as string) || (errObj.error as string) || JSON.stringify(error)
  } else {
    errorMessage = String(error)
  }

  // Try to parse JSON error response and extract user-friendly message
  try {
    const jsonMatch = errorMessage?.match(/\{.*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (parsed.error) {
        errorMessage = parsed.error
      }
    }
  } catch {
    // If parsing fails, use the original error message
  }

  return (
    <Card className="border-destructive bg-destructive/10 p-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="size-5 text-destructive shrink-0" />
        <p className="text-sm text-destructive">{errorMessage}</p>
      </div>
    </Card>
  )
}
