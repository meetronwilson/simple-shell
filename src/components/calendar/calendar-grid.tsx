"use client"

import { format, isToday, isSameDay, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import type { CalendarDay, ViewMode } from "@/types/calendar"
import { CalendarEvent } from "./calendar-event"

interface CalendarGridProps {
  calendarData: CalendarDay[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  viewMode: ViewMode
}

export function CalendarGrid({ calendarData, selectedDate, onSelectDate, viewMode }: CalendarGridProps) {
  // Only show month view for now, we can implement other views later
  return (
    <div className="flex flex-1 flex-col">
      <div className="grid grid-cols-7 border-b border-border bg-muted/5 text-center text-xs font-medium">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="bg-background py-2 border-r border-border last:border-r-0">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">
              {day.charAt(0)}
              <span className="sr-only sm:not-sr-only">{day.slice(1)}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="flex bg-muted/5 flex-1">
        {/* Desktop Calendar Grid */}
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:auto-rows-fr lg:divide-x lg:divide-y lg:divide-border">
          {calendarData.map((day) => (
            <div
              key={day.date}
              className={cn(
                "relative p-2 min-h-[100px] transition-colors",
                day.isCurrentMonth ? "bg-background hover:bg-muted/10" : "bg-muted/10 text-muted-foreground",
                selectedDate && isSameDay(parseISO(day.date), selectedDate) && "bg-accent/20",
              )}
              onClick={() => onSelectDate(parseISO(day.date))}
              role="button"
              tabIndex={0}
              aria-selected={selectedDate ? isSameDay(parseISO(day.date), selectedDate) : false}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectDate(parseISO(day.date))
                  e.preventDefault()
                }
              }}
            >
              <div className="flex justify-between">
                <time
                  dateTime={day.date}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                    isToday(parseISO(day.date)) && "bg-primary text-primary-foreground font-medium",
                    selectedDate &&
                      isSameDay(parseISO(day.date), selectedDate) &&
                      !isToday(parseISO(day.date)) &&
                      "bg-accent text-accent-foreground font-medium",
                  )}
                >
                  {format(parseISO(day.date), "d")}
                </time>

                {day.isCurrentMonth && day.date === format(new Date(), "yyyy-MM-dd") && (
                  <span className="text-xs text-muted-foreground">Today</span>
                )}
              </div>

              {day.events.length > 0 && (
                <ol className="mt-2 space-y-1 text-xs">
                  {day.events.slice(0, 2).map((event) => (
                    <CalendarEvent key={event.id} event={event} />
                  ))}
                  {day.events.length > 2 && (
                    <li className="text-muted-foreground text-xs px-1">+ {day.events.length - 2} more</li>
                  )}
                </ol>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Calendar Grid */}
        <div className="grid w-full grid-cols-7 auto-rows-fr divide-x divide-y divide-border lg:hidden">
          {calendarData.map((day) => (
            <button
              key={day.date}
              type="button"
              className={cn(
                "flex h-14 flex-col p-1 transition-colors",
                day.isCurrentMonth ? "bg-background" : "bg-muted/10 text-muted-foreground",
                selectedDate && isSameDay(parseISO(day.date), selectedDate) && "bg-accent/20",
              )}
              onClick={() => onSelectDate(parseISO(day.date))}
              aria-selected={selectedDate ? isSameDay(parseISO(day.date), selectedDate) : false}
            >
              <time
                dateTime={day.date}
                className={cn(
                  "ml-auto flex h-7 w-7 items-center justify-center rounded-full text-sm",
                  isToday(parseISO(day.date)) && "bg-primary text-primary-foreground font-medium",
                  selectedDate &&
                    isSameDay(parseISO(day.date), selectedDate) &&
                    !isToday(parseISO(day.date)) &&
                    "bg-accent text-accent-foreground font-medium",
                )}
              >
                {format(parseISO(day.date), "d")}
              </time>

              {day.events.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-0.5 justify-end">
                  {day.events.map((event, index) => (
                    <span key={event.id} className={cn("h-1.5 w-1.5 rounded-full", getEventColor(index))} />
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function getEventColor(index: number): string {
  const colors = ["bg-primary/80", "bg-blue-500/80", "bg-green-500/80", "bg-yellow-500/80", "bg-purple-500/80"]
  return colors[index % colors.length]
}

