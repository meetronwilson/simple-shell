"use client"

import { useState, useEffect } from "react"
// Fix the import path to use the correct path to the kanban components
import { KanbanBoard } from "@/components/kanban/kanban-board"
import type { KanbanItem, KanbanLane } from "@/components/kanban/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"

interface Task extends KanbanItem {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  assignee?: {
    name: string
    avatar?: string
  }
}

const initialData: KanbanLane[] = [
  {
    id: "todo",
    title: "To Do",
    items: [
      {
        id: "task-1",
        title: "Research competitors",
        description: "Analyze top 5 competitors in the market",
        priority: "medium",
        dueDate: "2023-04-15",
        assignee: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task-2",
        title: "Design new landing page",
        description: "Create wireframes for the new homepage",
        priority: "high",
        dueDate: "2023-04-10",
        assignee: {
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task-3",
        title: "Update documentation",
        description: "Update API documentation with new endpoints",
        priority: "low",
        dueDate: "2023-04-20",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      {
        id: "task-4",
        title: "Implement authentication",
        description: "Add OAuth2 authentication to the API",
        priority: "high",
        dueDate: "2023-04-08",
        assignee: {
          name: "Jamie Smith",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task-5",
        title: "Fix navigation bug",
        description: "Fix the dropdown menu not closing on mobile",
        priority: "medium",
        dueDate: "2023-04-12",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    items: [
      {
        id: "task-6",
        title: "Code review: Payment API",
        description: "Review PR #123 for the new payment processing API",
        priority: "high",
        dueDate: "2023-04-07",
        assignee: {
          name: "Morgan Lee",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [
      {
        id: "task-7",
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing",
        priority: "medium",
        dueDate: "2023-04-05",
        assignee: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: "task-8",
        title: "Create component library",
        description: "Build reusable UI components with Storybook",
        priority: "high",
        dueDate: "2023-04-03",
        assignee: {
          name: "Sam Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
]

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export default function KanbanExample() {
  const [lanes, setLanes] = useState<KanbanLane[]>(initialData)

  useEffect(() => {
    console.log("Lanes data:", lanes)
  }, [lanes])

  const handleItemMove = (
    itemId: string,
    source: { laneId: string; index: number },
    destination: { laneId: string; index: number },
  ) => {
    // Create a deep copy of the lanes
    const newLanes = JSON.parse(JSON.stringify(lanes)) as KanbanLane[]

    // Find the source and destination lanes
    const sourceLane = newLanes.find((lane) => lane.id === source.laneId)
    const destLane = newLanes.find((lane) => lane.id === destination.laneId)

    if (!sourceLane || !destLane) return

    // Get the item
    const [movedItem] = sourceLane.items.splice(source.index, 1)

    // Add the item to the destination lane
    destLane.items.splice(destination.index, 0, movedItem)

    // Update state
    setLanes(newLanes)
  }

  // Import the KanbanLaneComponent directly for the custom card renderer
  const customCardRenderer = (item: Task, laneId: string) => {
    return (
      <Card className="shadow-sm">
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium">{item.title}</h3>
            <Badge className={`text-xs ${priorityColors[item.priority]}`}>{item.priority}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-1 text-xs text-muted-foreground">
          <p>{item.description}</p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          {item.dueDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="mr-1 h-3 w-3" />
              {new Date(item.dueDate).toLocaleDateString()}
            </div>
          )}
          {item.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.assignee.avatar} alt={item.assignee.name} />
              <AvatarFallback className="text-xs">
                {item.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-2rem)]">
      <h1 className="text-2xl font-bold mb-6">Project Tasks</h1>
      <div className="h-[calc(100%-4rem)]">
        <KanbanBoard<Task>
          lanes={lanes}
          onItemMove={handleItemMove}
          customCardRenderer={customCardRenderer}
          searchKey={["title", "description"]}
          searchPlaceholder="Search tasks..."
        />
      </div>
    </div>
  )
}

