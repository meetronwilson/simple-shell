"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockRecords } from "@/lib/mock-data"
import { toast } from "sonner"

interface CustomerDetailsProps {
  customerId?: string
}

export function CustomerDetails({ customerId = "REC-001" }: CustomerDetailsProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Find the customer from mock data
  const customer = mockRecords.find((record) => record.id === customerId) || mockRecords[0]

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-2">Customer not found</h2>
        <p className="text-muted-foreground mb-4">The requested customer could not be found.</p>
        <Button onClick={() => router.push("/customers/list")}>Back to Customers</Button>
      </div>
    )
  }

  // Format the date for display
  const joinDate = "2023-05-15" // This would come from the customer data
  const formattedJoinDate = format(new Date(joinDate), "MMMM d, yyyy")

  const handleDelete = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      toast.success("Customer deleted successfully")
      setIsSubmitting(false)
      router.push("/customers/list")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push(`/customers/edit/${customerId}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isSubmitting}>
            <Trash2 className="mr-2 h-4 w-4" />
            {isSubmitting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={customer.name} />
                <AvatarFallback>
                  {customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{customer.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Mail className="mr-1 h-3 w-3" />
                  {customer.email}
                </CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={customer.status === "Active" ? "default" : "secondary"}>{customer.status}</Badge>
              <Badge variant="outline">{customer.role}</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {customer.lastActive}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>123 Main St, Anytown, USA</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer ID</span>
                      <span className="font-medium">{customer.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium">{customer.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium">{customer.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joined</span>
                      <span className="font-medium">{formattedJoinDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customer.activity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className="rounded-full bg-secondary p-2">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Customer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{customer.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-xs text-muted-foreground">
            Last updated: {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

