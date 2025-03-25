export type ViewMode = "day" | "week" | "month" | "year"

export interface CalendarEvent {
  id: number
  name: string
  time: string
  datetime: string
  href: string
  category?: string
}

export interface CalendarDay {
  date: string
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

