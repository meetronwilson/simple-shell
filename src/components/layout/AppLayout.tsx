"use client"

import { useLayoutState } from "@/hooks/useLayoutState"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"
import MainContainer from "@/components/layout/MainContainer"
import DetailPanel from "@/components/layout/DetailPanel"

export default function AppLayout({ children }) {
  const { isSidebarOpen, isDetailPanelOpen, selectedRecord, closeDetailPanel } = useLayoutState()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <MainContainer>{children}</MainContainer>
          <DetailPanel isOpen={isDetailPanelOpen} record={selectedRecord} onClose={closeDetailPanel} />
        </div>
      </div>
    </div>
  )
}

