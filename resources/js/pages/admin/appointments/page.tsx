"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, usePage } from "@inertiajs/react"
import type { Appointment, BreadcrumbItem, PaginatedAppointments } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { AppointmentList } from "./appointment-list"
import AppointmentFilters from "./appointment-filters"
import { ConfirmModal } from "./confirm-modal";
import { DetailsModal } from "./details-modal"
import { RescheduleModal } from "./reschedule-modal";
import { CancelModal } from "./cancel-modal";
import { useState } from "react"
import { useAppointmentManager } from "@/hooks/useAppointmentManager";
import { ConfirmDialog } from "@/components/confirm-delete-dialog";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Citas", href: "/admin/appointments" },
]

export default function AdminAppointments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [appointmentToConfirm, setAppointmentToConfirm] = useState<Appointment | null>(null);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const { appointments } = usePage().props as {
    appointments?: PaginatedAppointments
  }
  const {
    confirmDelete,
    handleDelete,
    handleDetails,
    isDialogOpen,
    setIsDialogOpen,
    appointmentToDelete,
    handleConfirm,
    handleCancel
  } = useAppointmentManager();

  function confirmAppointment(appointment: Appointment) {
    setAppointmentToConfirm(appointment);
    setModalOpen(true);
  }

  function cancelAppointment(appointment: Appointment) {
    setAppointmentToCancel(appointment);
    setCancelModalOpen(true);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Citas" />

      <div className="p-6">
        <AppointmentFilters />

        {/* Appointments List */}
        <AppointmentList
          appointments={appointments!}
          onDelete={confirmDelete}
          onEdit={handleDetails}
          onConfirm={confirmAppointment}
          onCancel={cancelAppointment}
        />

        <ConfirmModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onConfirm={() => {
            if (appointmentToConfirm) {
              handleConfirm(appointmentToConfirm);
              setModalOpen(false);
            }
          }}
          isAlreadyConfirmed={appointmentToConfirm?.status === "confirmed"}
        />

        <CancelModal
          open={cancelModalOpen}
          onCancel={() => setCancelModalOpen(false)}
          onConfirm={() => {
            if (appointmentToCancel) {
              handleCancel(appointmentToCancel);
              setCancelModalOpen(false);
            }
          }}
          isAlreadyConfirmed={appointmentToConfirm?.status === "cancelled"}
        />

        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
          title="¿Eliminar servicio?"
          description={`¿Estás seguro de que deseas eliminar el servicio ${appointmentToDelete?.id}? Esta acción no se puede deshacer.`}
          confirmText="Sí, eliminar"
        />
      </div>
    </AppLayout>
  )
}
