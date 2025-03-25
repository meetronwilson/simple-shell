"use client"

import { useState, useEffect } from "react"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
// Fix the import path
import { KanbanLaneComponent } from "./kanban-lane"
import type { KanbanItem, KanbanLane, OnItemMoveFunction, CustomCardRenderer } from "./types"

interface KanbanBoardProps<T extends KanbanItem> {
  lanes: KanbanLane[]
  onItemMove: OnItemMoveFunction
  customCardRenderer?: CustomCardRenderer<T>
  searchKey?: keyof T | Array<keyof T>
  searchPlaceholder?: string
}

export function KanbanBoard<T extends KanbanItem>({
  lanes: initialLanes,
  onItemMove,
  customCardRenderer,
  searchKey,
  searchPlaceholder = "Search items...",
}: KanbanBoardProps<T>) {
  const [lanes, setLanes] = useState<KanbanLane[]>(initialLanes || [])
  const [searchTerm, setSearchTerm] = useState("")

  // Update lanes when initialLanes changes
  useEffect(() => {
    // Ensure initialLanes is not undefined
    if (!initialLanes) {
      setLanes([])
      return
    }

    if (!searchTerm) {
      setLanes(initialLanes)
    } else {
      // Filter items based on search term
      const filteredLanes = initialLanes.map((lane) => ({
        ...lane,
        items: lane.items.filter((item: T) => {
          if (!searchKey) return true

          if (Array.isArray(searchKey)) {
            return searchKey.some((key) => String(item[key]).toLowerCase().includes(searchTerm.toLowerCase()))
          }

          return String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
        }),
      }))
      setLanes(filteredLanes)
    }
  }, [initialLanes, searchTerm, searchKey])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    // Dropped outside the list
    if (!destination) return

    // No movement
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    // Call the callback
    onItemMove(
      draggableId,
      { laneId: source.droppableId, index: source.index },
      { laneId: destination.droppableId, index: destination.index },
    )
  }

  return (
    <div className="flex flex-col h-full">
      {searchKey && (
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full">
          {lanes?.map((lane) => (
            <KanbanLaneComponent key={lane.id} lane={lane} customCardRenderer={customCardRenderer} />
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

