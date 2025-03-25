"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
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

// Define the Project type
type Project = {
  id: string
  name: string
  status: "active" | "completed" | "paused"
  client: string
  startDate: string
  endDate: string | null
  budget: number
}

// Sample data
const projects: Project[] = [
  {
    id: "proj-001",
    name: "Website Redesign",
    status: "active",
    client: "Acme Corp",
    startDate: "2023-01-15",
    endDate: null,
    budget: 15000,
  },
  {
    id: "proj-002",
    name: "Mobile App Development",
    status: "active",
    client: "TechStart Inc",
    startDate: "2023-02-10",
    endDate: null,
    budget: 45000,
  },
  {
    id: "proj-003",
    name: "Brand Identity",
    status: "completed",
    client: "Green Foods",
    startDate: "2022-11-05",
    endDate: "2023-01-20",
    budget: 12000,
  },
  {
    id: "proj-004",
    name: "SEO Optimization",
    status: "paused",
    client: "Local Shop",
    startDate: "2023-03-01",
    endDate: null,
    budget: 5000,
  },
  {
    id: "proj-005",
    name: "E-commerce Platform",
    status: "active",
    client: "Fashion Forward",
    startDate: "2023-02-15",
    endDate: null,
    budget: 60000,
  },
]

// Define the columns
const columns: ColumnDef<Project>[] = [
  createSelectionColumn<Project>(),
  {
    accessorKey: "name",
    header: createSortableHeader("Project Name"),
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          className={
            status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : status === "completed"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "startDate",
    header: createSortableHeader("Start Date"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "budget",
    header: createSortableHeader("Budget"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("budget"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(project.id)}>
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit project</DropdownMenuItem>
            {project.status !== "completed" && <DropdownMenuItem>Mark as completed</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ProjectsTable() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Projects</h1>
      <DataTable
        columns={columns}
        data={projects}
        searchKey="name"
        searchPlaceholder="Search projects..."
        pageSize={5}
        initialSortColumn={{ id: "startDate", desc: true }}
      />
    </div>
  )
}

