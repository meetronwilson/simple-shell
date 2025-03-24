"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-react"
import { useLayoutState } from "@/hooks/useLayoutState"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isSidebarOpen, toggleSidebar } = useLayoutState()
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  // For mobile sidebar
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen)
  const closeMobileSidebar = () => setIsMobileOpen(false)

  // Sidebar content that's shared between desktop and mobile
  const sidebarContent = (
    <>
      <div className="px-3 py-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {isSidebarOpen && <span className="text-xl">SaaS App</span>}
          </Link>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
              onClick={closeMobileSidebar}
            >
              <item.icon className="h-5 w-5" />
              {isSidebarOpen && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-3 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn("w-full justify-start px-2", !isSidebarOpen && "justify-center")}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {isSidebarOpen && (
                <div className="ml-2 flex flex-col items-start text-sm">
                  <span>John Doe</span>
                  <span className="text-xs text-muted-foreground">john@example.com</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )

  // Mobile sidebar (using Sheet component)
  const mobileSidebar = (
    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
      <SheetContent side="left" className="p-0 w-[240px]">
        {sidebarContent}
      </SheetContent>
    </Sheet>
  )

  // Desktop sidebar
  const desktopSidebar = (
    <div
      className={cn(
        "hidden md:flex flex-col h-full border-r transition-all duration-300 overflow-y-auto",
        isSidebarOpen ? "w-64" : "w-[70px]",
      )}
    >
      {sidebarContent}
    </div>
  )

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
      <Button variant="ghost" size="icon" className="md:hidden fixed top-3 left-3 z-50" onClick={toggleMobileSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}

