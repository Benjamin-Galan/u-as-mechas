"use client"

import { useState } from "react"
import { NotebookPen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Head, usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { AppointmentList } from "./appointments/appointment-list"
import { AppointmentDetails } from "./appointments/appointment-details"
import type { BreadcrumbItem, Appointment } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/client/dashboard",
  }, 
  {
    title: "Mis Citas",
    href: "/client/appointments",
  },
]

export default function ClientAppointments() {
  const { appointments: appointmentsProps = [] } = usePage().props as {
    appointments?: Appointment[]
  }

  const [currentScreen, setCurrentScreen] = useState<"list" | "details">("list")
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null)

  const handleSendSchedule = () => {
    return router.visit("/client/services", { method: "get" })
  }

  const handleViewDetails = (id: number) => {
    setSelectedAppointmentId(id)
    setCurrentScreen("details")
  }

  const handleBackToList = () => {
    setCurrentScreen("list")
    setSelectedAppointmentId(null)
  }

  const selectedAppointment = appointmentsProps.find((appointment) => appointment.id === selectedAppointmentId)

  const renderScreen = () => {
    switch (currentScreen) {
      case "list":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="font-bold sm:text-2xl">Mis citas</h1>
              <Button variant="outline" size="sm" onClick={handleSendSchedule}>
                <NotebookPen className="w-4 h-4 mr-2" />
                Agendar
              </Button>
            </div>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="recent">Recientes</TabsTrigger>
                <TabsTrigger value="all">Todas</TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <div className="grid gap-4">
                  {appointmentsProps
                    .filter(
                      (appointment) =>
                        new Date(appointment.appointment_date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    )
                    .map((appointment) => (
                      <AppointmentList
                        key={appointment.id}
                        item={appointment}
                        type="recent"
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="grid gap-4">
                  {appointmentsProps.map((appointment) => (
                    <AppointmentList
                      key={appointment.id}
                      item={appointment}
                      type="all"
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )
      case "details":
        return selectedAppointment ? (
          <AppointmentDetails appointment={selectedAppointment} onBack={handleBackToList} />
        ) : (
          <div className="text-center py-8">
            <p>Cita no encontrada</p>
            <Button onClick={handleBackToList} className="mt-4">
              Volver a mis citas
            </Button>
          </div>
        )
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Mis citas" />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-md">{renderScreen()}</div>
      </div>
    </AppLayout>
  )
}