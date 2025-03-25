"use client"

import { useState } from "react"
import { addMonths, subMonths, isSameDay, parseISO } from "date-fns"
import { CalendarHeader } from "./calendar-header"
import { CalendarGrid } from "./calendar-grid"
import { EventList } from "./event-list"
import { generateCalendarData } from "@/lib/calendar-utils"
import type { ViewMode } from "@/types/calendar"

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("month")

  // Generate calendar data
  const calendarData = generateCalendarData(currentDate)

  // Get selected day events
  const selectedDayEvents = selectedDate
    ? calendarData.find((day) => isSameDay(parseISO(day.date), selectedDate))?.events || []
    : []

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-background shadow-sm transition-all">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={handlePreviousMonth}
        onNext={handleNextMonth}
        onToday={handleToday}
        onViewChange={handleViewChange}
      />

      <div className="flex flex-1 flex-col overflow-hidden bg-muted/5">
        <CalendarGrid
          calendarData={calendarData}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
          viewMode={viewMode}
        />

        {selectedDate && selectedDayEvents.length > 0 && <EventList date={selectedDate} events={selectedDayEvents} />}
      </div>
    </div>
  )
}

