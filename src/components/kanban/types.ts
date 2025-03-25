import type React from "react"
export interface KanbanItem {
  id: string
  [key: string]: any
}

export interface KanbanLane {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanBoard {
  lanes: KanbanLane[]
}

export type OnItemMoveFunction = (
  itemId: string,
  source: { laneId: string; index: number },
  destination: { laneId: string; index: number },
) => void

export type CustomCardRenderer<T extends KanbanItem> = (item: T, laneId: string) => React.ReactNode

