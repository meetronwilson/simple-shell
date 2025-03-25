"use client"

import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import type { ViewMode } from "@/types/calendar"
import { MobileMenu } from "./mobile-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CalendarHeaderProps {
  currentDate: Date
  viewMode: ViewMode
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (view: ViewMode) => void
}

export function CalendarHeader({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}: CalendarHeaderProps) {
  const viewModeLabel = viewMode.charAt(0).toUpperCase() + viewMode.slice(1)

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      <h1 className="text-lg font-semibold text-foreground">
        <time dateTime={format(currentDate, "yyyy-MM")}>{format(currentDate, "MMMM yyyy")}</time>
      </h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border shadow-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-r-none border-r h-9" onClick={onPrevious}>
                  <span className="sr-only">Previous month</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous month</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="sm" className="rounded-none border-r px-3.5 font-medium h-9" onClick={onToday}>
            Today
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-l-none h-9" onClick={onNext}>
                  <span className="sr-only">Next month</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next month</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="hidden md:flex md:items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 font-medium">
                {viewModeLabel} view
                <ChevronLeft className="h-4 w-4 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewChange("day")}>Day view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange("week")}>Week view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange("month")}>Month view</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange("year")}>Year view</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="mx-4 h-6" />

          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Add event
          </Button>
        </div>

        <MobileMenu onToday={onToday} onViewChange={onViewChange} />
      </div>
    </header>
  )
}

