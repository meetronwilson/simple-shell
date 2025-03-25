"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createSelectionColumn, createSortableHeader } from "@/components/data-table/column-helpers"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

// Define the Task type
type Task = {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  status: "todo" | "in-progress" | "review" | "done"
  dueDate: string
  assignee: {
    id: string
    name: string
    avatar?: string
  }
  project: string
}

// Sample data
const tasks: Task[] = [
  {
    id: "task-001",
    title: "Design homepage wireframes",
    priority: "high",
    status: "in-progress",
    dueDate: "2023-04-15",
    assignee: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Website Redesign",
  },
  {
    id: "task-002",
    title: "Implement authentication flow",
    priority: "high",
    status: "todo",
    dueDate: "2023-04-20",
    assignee: {
      id: "user-2",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Mobile App Development",
  },
  {
    id: "task-003",
    title: "Create logo variations",
    priority: "medium",
    status: "review",
    dueDate: "2023-04-10",
    assignee: {
      id: "user-3",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Brand Identity",
  },
  {
    id: "task-004",
    title: "Keyword research",
    priority: "low",
    status: "done",
    dueDate: "2023-04-05",
    assignee: {
      id: "user-4",
      name: "Morgan Lee",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "SEO Optimization",
  },
  {
    id: "task-005",
    title: "Product page templates",
    priority: "medium",
    status: "in-progress",
    dueDate: "2023-04-18",
    assignee: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "E-commerce Platform",
  },
  {
    id: "task-006",
    title: "API integration",
    priority: "high",
    status: "todo",
    dueDate: "2023-04-25",
    assignee: {
      id: "user-2",
      name: "Sam Taylor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Mobile App Development",
  },
  {
    id: "task-007",
    title: "User testing",
    priority: "medium",
    status: "todo",
    dueDate: "2023-04-30",
    assignee: {
      id: "user-3",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Website Redesign",
  },
]

// Define the columns
const columns: ColumnDef<Task>[] = [
  createSelectionColumn<Task>(),
  {
    accessorKey: "title",
    header: createSortableHeader("Task"),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return (
        <Badge
          className={
            priority === "high"
              ? "bg-red-100 text-red-800 hover:bg-red-100"
              : priority === "medium"
                ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                : "bg-green-100 text-green-800 hover:bg-green-100"
          }
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap: Record<string, { label: string; className: string }> = {
        todo: {
          label: "To Do",
          className: "bg-slate-100 text-slate-800 hover:bg-slate-100",
        },
        "in-progress": {
          label: "In Progress",
          className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
        },
        review: {
          label: "Review",
          className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
        },
        done: {
          label: "Done",
          className: "bg-green-100 text-green-800 hover:bg-green-100",
        },
      }

      const { label, className } = statusMap[status] || {
        label: status,
        className: "",
      }

      return <Badge className={className}>{label}</Badge>
    },
  },
  {
    accessorKey: "dueDate",
    header: createSortableHeader("Due Date"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"))
      const now = new Date()
      const isPastDue = date < now && row.original.status !== "done"

      return <div className={isPastDue ? "text-red-600 font-medium" : ""}>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.getValue("assignee") as Task["assignee"]
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={assignee.avatar} alt={assignee.name} />
            <AvatarFallback>
              {assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{assignee.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>Copy task ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
            <DropdownMenuItem>Change assignee</DropdownMenuItem>
            {task.status !== "done" && <DropdownMenuItem>Mark as done</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function TasksTable() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Tasks</h1>
      <DataTable
        columns={columns}
        data={tasks}
        searchKey="title"
        searchPlaceholder="Search tasks..."
        pageSize={5}
        initialSortColumn={{ id: "dueDate", desc: false }}
      />
    </div>
  )
}

