"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  Bell,
  ChevronUp,
  Sun,
  Moon,
  ChevronDown,
  List,
  UserPlus,
  UserCircle,
} from "lucide-react"
import { useLayoutState } from "@/hooks/useLayoutState"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"

const navigationItems = [
  {
    group: "Dashboards",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/analytics",
      },
    ],
  },
  {
    group: "General",
    items: [
      {
        title: "Settings",
        icon: Settings,
        href: "/settings",
      },
      {
        title: "Customers",
        icon: Users,
        href: "/customers",
        subItems: [
          {
            title: "List Customers",
            icon: List,
            href: "/customers/list",
          },
          {
            title: "Create Customer",
            icon: UserPlus,
            href: "/customers/create",
          },
          {
            title: "Customer Details",
            icon: UserCircle,
            href: "/customers/details",
          },
        ],
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isSidebarOpen, toggleSidebar } = useLayoutState()
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  // For mobile sidebar
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen)
  const closeMobileSidebar = () => setIsMobileOpen(false)

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

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

        <nav className="space-y-6">
          {navigationItems.map((group) => (
            <div key={group.group} className="space-y-1">
              {isSidebarOpen && (
                <h2 className="px-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                  {group.group}
                </h2>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div key={item.href}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.title)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full",
                            pathname.startsWith(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {isSidebarOpen && (
                            <>
                              <span className="flex-1 text-left">{item.title}</span>
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expandedItems.includes(item.title) && "rotate-180"
                                )}
                              />
                            </>
                          )}
                        </button>
                        {isSidebarOpen && expandedItems.includes(item.title) && (
                          <div className="ml-6 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                  pathname === subItem.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                                )}
                                onClick={closeMobileSidebar}
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span>{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t">
        <div className="p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-1.5 relative group",
                  !isSidebarOpen && "justify-center",
                )}
              >
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-background">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"
                    aria-hidden="true"
                  />
                </div>

                {isSidebarOpen && (
                  <>
                    <div className="flex flex-col items-start text-sm overflow-hidden">
                      <span className="font-medium truncate max-w-[120px]">John Doe</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">john@example.com</span>
                    </div>
                    <div className="ml-auto flex items-center text-muted-foreground">
                      <ChevronUp className="h-4 w-4 rotate-0 transition-transform group-data-[state=open]:rotate-180" />
                    </div>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isSidebarOpen ? "end" : "center"} side="top" className="w-64">
              <div className="flex items-center gap-2 p-2">
                <div className="rounded-md bg-secondary p-1">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium">Switch Theme</p>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Sun className="mr-1 h-4 w-4" />
                    Light
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Moon className="mr-1 h-4 w-4" />
                    Dark
                  </Button>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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

