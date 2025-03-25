import type { CalendarEvent as CalendarEventType } from "@/types/calendar"

interface CalendarEventProps {
  event: CalendarEventType
}

export function CalendarEvent({ event }: CalendarEventProps) {
  return (
    <li>
      <a href={event.href} className="group flex rounded-md p-1 hover:bg-accent transition-colors">
        <div className="flex-1 overflow-hidden">
          <p className="truncate font-medium text-foreground group-hover:text-accent-foreground">{event.name}</p>
          <time
            dateTime={event.datetime}
            className="block truncate text-xs text-muted-foreground group-hover:text-accent-foreground"
          >
            {event.time}
          </time>
        </div>
      </a>
    </li>
  )
}

function getEventCategoryColor(category?: string): string {
  switch (category) {
    case "work":
      return "bg-blue-500"
    case "personal":
      return "bg-green-500"
    case "important":
      return "bg-red-500"
    case "social":
      return "bg-purple-500"
    default:
      return "bg-primary"
  }
}

