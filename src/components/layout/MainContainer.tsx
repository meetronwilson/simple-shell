"use client"

import { useLayoutState } from "@/hooks/useLayoutState"
import { cn } from "@/lib/utils"

export default function MainContainer({ children }) {
  const { isSidebarOpen, isDetailPanelOpen } = useLayoutState()

  return (
    <main className={cn("flex-1 overflow-auto transition-all duration-300", isDetailPanelOpen ? "md:mr-[400px]" : "")}>
      <div className="container mx-auto p-4 md:p-6">{children}</div>
    </main>
  )
}

