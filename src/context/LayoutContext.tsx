"use client"

import { createContext, useContext, useState, useEffect } from "react"

export const LayoutContext = createContext({
  isSidebarOpen: true,
  isDetailPanelOpen: false,
  selectedRecord: null,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  openSidebar: () => {},
  toggleDetailPanel: () => {},
  closeDetailPanel: () => {},
  openDetailPanel: () => {},
  setSelectedRecord: (record) => {},
})

export function LayoutProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Open detail panel when a record is selected
  useEffect(() => {
    if (selectedRecord) {
      setIsDetailPanelOpen(true)
    }
  }, [selectedRecord])

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  const toggleDetailPanel = () => setIsDetailPanelOpen((prev) => !prev)
  const closeDetailPanel = () => {
    setIsDetailPanelOpen(false)
    setSelectedRecord(null)
  }
  const openDetailPanel = () => setIsDetailPanelOpen(true)

  const handleSetSelectedRecord = (record) => {
    setSelectedRecord(record)
    if (record) {
      openDetailPanel()
    }
  }

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        isDetailPanelOpen,
        selectedRecord,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        toggleDetailPanel,
        closeDetailPanel,
        openDetailPanel,
        setSelectedRecord: handleSetSelectedRecord,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)

