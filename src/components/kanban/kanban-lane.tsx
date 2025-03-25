import { Droppable } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Fix the import path
import { KanbanCard } from "./kanban-card"
import type { KanbanItem, KanbanLane, CustomCardRenderer } from "./types"

interface KanbanLaneProps<T extends KanbanItem> {
  lane: KanbanLane
  customCardRenderer?: CustomCardRenderer<T>
}

export function KanbanLaneComponent<T extends KanbanItem>({ lane, customCardRenderer }: KanbanLaneProps<T>) {
  // Add a check to ensure lane and lane.items exist
  if (!lane || !lane.items) {
    return null
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{lane.title}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {lane.items.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2 flex-grow overflow-y-auto">
        <Droppable droppableId={lane.id} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
              {lane.items?.map((item, index) => (
                <KanbanCard
                  key={item.id}
                  item={item as T}
                  index={index}
                  laneId={lane.id}
                  customCardRenderer={customCardRenderer}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  )
}

