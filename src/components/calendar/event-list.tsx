import { format } from "date-fns"
import { Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CalendarEvent as CalendarEventType } from "@/types/calendar"
import { cn } from "@/lib/utils"

interface EventListProps {
  date: Date
  events: CalendarEventType[]
}

export function EventList({ date, events }: EventListProps) {
  if (events.length === 0) return null

  return (
    <div className="p-4 border-t lg:hidden">
      <h2 className="font-medium mb-2 text-sm flex items-center">
        <span className="inline-block w-1 h-4 bg-primary rounded-full mr-2"></span>
        Events for {format(date, "MMMM d, yyyy")}
      </h2>
      <div className="divide-y rounded-md border overflow-hidden">
        {events.map((event) => (
          <div key={event.id} className="group flex items-center p-3 hover:bg-muted/50 transition-colors">
            <div className={cn("w-1 self-stretch rounded-sm mr-3", getEventCategoryColor(event.category))} />
            <div className="flex-auto">
              <p className="font-medium">{event.name}</p>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {event.time}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              asChild
            >
              <a href={event.href} aria-label={`Edit ${event.name}`}>
                <Edit className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
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

