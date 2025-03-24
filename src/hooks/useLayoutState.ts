"use client"

import { useEffect } from "react"
import { useLayoutContext } from "@/context/LayoutContext"

export function useLayoutState() {
  const context = useLayoutContext()

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle sidebar with Ctrl+B
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault()
        context.toggleSidebar()
      }

      // Close detail panel with Escape
      if (e.key === "Escape" && context.isDetailPanelOpen) {
        e.preventDefault()
        context.closeDetailPanel()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [context])

  // Additional layout-specific logic can be added here

  return {
    ...context,
    // Computed properties
    isCompact: !context.isSidebarOpen,
    hasDetailOpen: context.isDetailPanelOpen,
    // Additional methods
    resetLayout: () => {
      context.openSidebar()
      context.closeDetailPanel()
    },
  }
}

