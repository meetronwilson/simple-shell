import { startOfMonth, eachDayOfInterval, format, isToday, isSameMonth, startOfWeek, addDays } from "date-fns"
import type { CalendarDay, CalendarEvent } from "@/types/calendar"

// Sample events data - in a real app, this would come from an API or database
const sampleEvents: { date: string; events: CalendarEvent[] }[] = [
  {
    date: "2024-03-25",
    events: [
      { id: 1, name: "Design review", time: "10AM", datetime: "2024-03-25T10:00", href: "#" },
      { id: 2, name: "Sales meeting", time: "2PM", datetime: "2024-03-25T14:00", href: "#" },
    ],
  },
  {
    date: "2024-03-28",
    events: [{ id: 3, name: "Date night", time: "6PM", datetime: "2024-03-28T18:00", href: "#" }],
  },
  {
    date: "2024-03-30",
    events: [{ id: 4, name: "Sam's birthday party", time: "2PM", datetime: "2024-03-30T14:00", href: "#" }],
  },
  {
    date: "2024-04-02",
    events: [
      { id: 5, name: "Maple syrup museum", time: "3PM", datetime: "2024-04-02T15:00", href: "#" },
      { id: 6, name: "Hockey game", time: "7PM", datetime: "2024-04-02T19:00", href: "#" },
    ],
  },
  {
    date: "2024-04-10",
    events: [{ id: 7, name: "Cinema with friends", time: "9PM", datetime: "2024-04-10T21:00", href: "#" }],
  },
  {
    date: format(new Date(), "yyyy-MM-dd"),
    events: [
      {
        id: 8,
        name: "Project deadline",
        time: "5PM",
        datetime: `${format(new Date(), "yyyy-MM-dd")}T17:00`,
        href: "#",
      },
    ],
  },
]

export function generateCalendarData(currentDate: Date): CalendarDay[] {
  // Get the start of the month
  const monthStart = startOfMonth(currentDate)

  // Start from the Monday before the first day of the month
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })

  // Get all days in the month plus padding days (6 weeks total)
  const daysInMonth = eachDayOfInterval({
    start: calendarStart,
    end: addDays(calendarStart, 41), // 6 weeks (42 days) to ensure we have enough days
  })

  // Map days to calendar data structure
  return daysInMonth.map((day) => {
    const dateString = format(day, "yyyy-MM-dd")
    const eventData = sampleEvents.find((e) => e.date === dateString)

    return {
      date: dateString,
      isCurrentMonth: isSameMonth(day, currentDate),
      isToday: isToday(day),
      isSelected: false,
      events: eventData?.events || [],
    }
  })
}

