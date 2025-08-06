"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, usePage } from "@inertiajs/react"
import { Appointment, BreadcrumbItem, PaginatedAppointments } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import IncludeList from "./include-list"
import IncludeInfo from "./include-info"
import { RescheduleModal } from "./reschedule-modal";
import { formatDate } from "@/utils/format-time"
import { Clock, NotebookPen, UserCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppointmentManager } from "@/hooks/useAppointmentManager"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Citas", href: "/admin/appointments" },
  { title: "Detalle de la cita", href: '' },
]

export default function AdminAppointments() {
  const { appointment } = usePage().props as {
    appointment?: Appointment
  }

  const { rescheduleModalOpen, setRescheduleModalOpen, handleReschedule } = useAppointmentManager();

  console.log('citas', appointment);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Detalle de la cita" />

      <Card className="m-3 border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between w-full p-1">
            <h2 className="text-lg font-semibold">Información de la cita</h2>

            <div className="flex items-center gap-2">
              <Button className="flex items-center gap-1">
                <UserCheck2 width={18} />
                Asignar estilista
              </Button>

              <Button
                className="flex items-center gap-1"
                onClick={() => setRescheduleModalOpen(true)}
              >
                <NotebookPen width={18} />
                Reagendar
              </Button>
            </div>
          </div>
        </CardHeader>


        <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6 ">
            <IncludeInfo appointment={appointment} />

            <IncludeList appointment={appointment} />

            <div className="md:col-span-2 border-t pt-4 mt-4">
              <p className="text-sm text-gray-500">Notas</p>
              <p className="font-medium">{appointment?.notes ? appointment?.notes : 'Sin observaciones'}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-6 bg-white dark:bg-zinc-900">
              <CardHeader>
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-center">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Fecha programada
                  </p>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1 capitalize">
                    {new Date(appointment?.appointment_date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <Calendar
                  mode="single"
                  selected={new Date(appointment?.appointment_date)}
                  disabled={[new Date()]}
                  className="w-full flex justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  initialFocus
                />
              </CardContent>
            </Card>

          </div>
        </CardContent>
      </Card>

      <RescheduleModal
        open={rescheduleModalOpen}
        onCancel={() => setRescheduleModalOpen(false)}
        onConfirm={(date, time) => handleReschedule(date, time, appointment)}
        isAlreadyCompleted={appointment.status === "completed"}
        initialDate={new Date(appointment.appointment_date)}
        initialTime={appointment.appointment_time.slice(0, 5)} // HH:mm
      />

    </AppLayout>
  )
}
