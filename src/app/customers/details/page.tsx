"use client"

import { useSearchParams } from "next/navigation"
import { CustomerDetails } from "@/components/customers/CustomerDetails"

export default function CustomerDetailsPage() {
  const searchParams = useSearchParams()
  const customerId = searchParams.get("id") || "REC-001"

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer Details</h2>
        <p className="text-muted-foreground">View and manage customer information.</p>
      </div>

      <CustomerDetails customerId={customerId} />
    </div>
  )
}

