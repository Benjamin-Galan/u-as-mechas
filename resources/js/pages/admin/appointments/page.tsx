"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, usePage } from "@inertiajs/react"
import type { BreadcrumbItem, PaginatedAppointments } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { AppointmentList } from "./appointment-list"
import { useEffect, useMemo, useState } from "react"
import AppointmentFilters from "./appointment-filters"
import { echo } from "@/echo"
import { toast } from "sonner"
import { Calendar, Users, Clock, TrendingUp } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Citas", href: "/admin/appointments" },
]

export default function AdminAppointments() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { appointments } = usePage().props as {
    appointments?: PaginatedAppointments
  }

  useEffect(() => {
    echo.private("admin.notifications").listen("AppointmentCreated", (e: Notification) => {
      toast("Tienes una nueva cita", {
        action: {
          label: "Ver Notificaciones",
          onClick: () => console.log("Undo"),
        },
      })
      setNotifications((prev) => [e, ...prev])
    })

    return () => {
      echo.leave("admin.notifications")
    }
  }, [])

  const stats = useMemo(() => {
    if (!appointments?.data) return { total: 0, pending: 0, confirmed: 0, completed: 0 }

    const total = appointments.data.length
    const pending = appointments.data.filter((apt) => apt.status === "pending").length
    const confirmed = appointments.data.filter((apt) => apt.status === "confirmed").length
    const completed = appointments.data.filter((apt) => apt.status === "completed").length

    return { total, pending, confirmed, completed }
  }, [appointments])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Citas" />

      <div className="p-6">
        <AppointmentFilters />

        {/* Appointments List */}
        <AppointmentList appointments={appointments!} />

      </div>
    </AppLayout>
  )
}
