"use client"

import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ViewMode } from "@/types/calendar"

interface MobileMenuProps {
  onToday: () => void
  onViewChange: (view: ViewMode) => void
}

export function MobileMenu({ onToday, onViewChange }: MobileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Create event
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={onToday}>
          Go to today
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={() => onViewChange("day")}>
          Day view
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onViewChange("week")}>
          Week view
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onViewChange("month")}>
          Month view
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => onViewChange("year")}>
          Year view
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

