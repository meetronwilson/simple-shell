"use client"

import { CustomerCreateForm } from "@/components/customers/CustomerCreateForm"

export default function CustomerCreatePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Create Customer</h2>
        <p className="text-muted-foreground">Add a new customer to your organization.</p>
      </div>

      <CustomerCreateForm />
    </div>
  )
}

