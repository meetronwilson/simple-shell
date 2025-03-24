"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export type Record = {
  id: string
  name: string
  email: string
  status: string
  role: string
  lastActive: string
  notes: string
  activity: {
    action: string
    date: string
  }[]
}

interface DetailPanelProps {
  isOpen: boolean
  record: Record | null
  onClose: () => void
}

export default function DetailPanel({ isOpen, record, onClose }: DetailPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 z-20 w-full max-w-[400px] border-l bg-background shadow-lg md:absolute md:inset-y-0 md:right-0 md:z-0">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="text-lg font-semibold">Record Details</div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          {record ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">{record.name}</h3>
                <p className="text-sm text-muted-foreground">{record.email}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Details</h4>
                <div className="grid gap-2 text-sm">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-muted-foreground">ID</div>
                    <div>{record.id}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-muted-foreground">Status</div>
                    <div>{record.status}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-muted-foreground">Role</div>
                    <div>{record.role}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-muted-foreground">Last Active</div>
                    <div>{record.lastActive}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Notes</h4>
                <p className="text-sm">{record.notes}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Activity</h4>
                <div className="space-y-2">
                  {record.activity.map((activity, index) => (
                    <div key={index} className="rounded-lg border p-3 text-sm">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No record selected</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

