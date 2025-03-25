import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { KanbanItem, CustomCardRenderer } from "./types"
import { Draggable } from "./dynamic-dnd"

interface KanbanCardProps<T extends KanbanItem> {
  item: T
  index: number
  laneId: string
  customCardRenderer?: CustomCardRenderer<T>
}

export function KanbanCard<T extends KanbanItem>({ item, index, laneId, customCardRenderer }: KanbanCardProps<T>) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2">
          {customCardRenderer ? (
            customCardRenderer(item, laneId)
          ) : (
            <Card className={`shadow-sm ${snapshot.isDragging ? "shadow-md" : ""}`}>
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-sm font-medium">{item.title || item.name || `Item ${item.id}`}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-1 text-xs text-muted-foreground">
                {item.description || "No description"}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </Draggable>
  )
}

