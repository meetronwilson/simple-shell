"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// Dynamically import react-beautiful-dnd components with SSR disabled
export const DragDropContext = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.DragDropContext as ComponentType<any>),
  { ssr: false },
)

export const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable as ComponentType<any>),
  { ssr: false },
)

export const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable as ComponentType<any>),
  { ssr: false },
)

