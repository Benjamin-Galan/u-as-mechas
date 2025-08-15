
import { Head, usePage } from "@inertiajs/react"
import { Appointment, BreadcrumbItem } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import IncludeList from "./include-list"
import IncludeInfo from "./include-info"
import { RescheduleModal } from "./reschedule-modal";
import { StylistsModal } from "./stylist-modal"
import { NotebookPen, UserCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppointmentManager } from "@/hooks/useAppointmentManager"
import ClientCalendar from "@/components/client-calendar"
import { CheckInModal } from "./check-in-modal"
import { useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Citas", href: "/admin/appointments" },
  { title: "Detalle de la cita", href: '' },
]

export default function AdminAppointments() {
  const { appointment } = usePage().props as {
    appointment?: Appointment
  }

  const [checkInModal, setCheckInModal] = useState(false);
  const [appointmentToCheckIn, setAppointmentToCheckIn] = useState<Appointment | null>(null);

  const {
    rescheduleModalOpen,
    setRescheduleModalOpen,
    handleReschedule,
    stylistModalOpen,
    setStylistModalOpen,
    handleCheckIn
  } = useAppointmentManager();

  if (!appointment) {
    return <div>No se encontró información de la cita.</div>;
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Detalle de la cita" />

      <Card className="m-3 border-none shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between w-full p-1">
            <h2 className="text-lg font-semibold">Información de la cita</h2>

            <div className="flex items-center gap-2">
              <Button
                className="flex items-center gap-1"
                onClick={() => setStylistModalOpen(true)}
              >
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

              <Button
                className="flex items-center gap-1"
                onClick={() => {
                  setCheckInModal(true)
                  setAppointmentToCheckIn(appointment);
                }}
              >
                <NotebookPen width={18} />
                Check-in
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
            <ClientCalendar appointment={appointment} />
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

      <StylistsModal
        open={stylistModalOpen}
        onCancel={() => setStylistModalOpen(false)}
        selectedClient={appointment}
      />

      <CheckInModal
        open={checkInModal}
        onCancel={() => setCheckInModal(false)}
        onConfirm={() => {
          if (appointmentToCheckIn) {
            handleCheckIn(appointmentToCheckIn);
            setCheckInModal(false);
          }
        }}
        isAlreadyConfirmed={appointmentToCheckIn?.status === "completed"}
      />
    </AppLayout>
  )
}
