"use client"

import { usePathname } from "next/navigation"
import { Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

/**
 * Formats a path segment into a properly cased label
 * Handles special cases, IDs, and converts kebab/snake case to title case
 */
function formatPathSegment(segment: string): string {
  // Check if segment is in our predefined map
  const pathMap: Record<string, string> = {
    dashboard: "Dashboard",
    customers: "Customers",
    products: "Products",
    orders: "Orders",
    settings: "Settings",
    list: "List",
    create: "Create",
    details: "Details",
    edit: "Edit",
    profile: "Profile",
    analytics: "Analytics",
  }

  // Return mapped value if it exists
  if (pathMap[segment.toLowerCase()]) {
    return pathMap[segment.toLowerCase()]
  }

  // Check if segment is an ID (numeric or UUID)
  if (/^[0-9]+$/.test(segment) || /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)) {
    return `ID: ${segment.slice(0, 8)}${segment.length > 8 ? "..." : ""}`
  }

  // Convert kebab-case or snake_case to Title Case
  return segment
    .replace(/-|_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <Breadcrumb className="overflow-auto py-2 scrollbar-hide">
      <BreadcrumbList className="flex-nowrap">
        {/* Home item */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:inline">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Render segments with separators between items */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const label = formatPathSegment(segment)

          return (
            <React.Fragment key={`segment-${href}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="text-muted-foreground hover:text-foreground">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

