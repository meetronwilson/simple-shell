import ProjectsTable from "@/components/data-table/projects-table"
import TasksTable from "@/components/data-table/tasks-table"

export default function Home() {
  return (
    <div className="container mx-auto py-10 space-y-16">
      <ProjectsTable />
      <TasksTable />
    </div>
  )
}

