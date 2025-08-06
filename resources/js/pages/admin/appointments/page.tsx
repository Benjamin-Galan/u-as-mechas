"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, usePage } from "@inertiajs/react"
import type { BreadcrumbItem, PaginatedAppointments } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { router } from "@inertiajs/react";
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
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { appointments } = usePage().props as {
    appointments?: PaginatedAppointments
  }
  const { confirmDelete, handleDelete, handleDetails, isDialogOpen, setIsDialogOpen, appointmentToDelete } = useAppointmentManager();

  console.log('citas', appointments?.data);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Citas" />

      <div className="p-6">
        <AppointmentFilters />

        {/* Appointments List */}
        <AppointmentList appointments={appointments!} onDelete={confirmDelete} onEdit={handleDetails}/>

        {/* <ConfirmModal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onConfirm={confirmDelete}
          isAlreadyConfirmed={appointment.status === "confirmed"}
        /> */}

        {/* <CancelModal
          open={cancelModalOpen}
          onCancel={() => setCancelModalOpen(false)}
          onConfirm={handleCancel}
          isAlreadyConfirmed={appointment.status === "cancelled"}
        /> */}

        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
          title="¿Eliminar servicio?"
          description={`¿Estás seguro de que deseas eliminar el servicio ${appointmentToDelete?.id}? Esta acción no se puede deshacer.`}
          confirmText="Sí, eliminar"
        />

        {/* <RescheduleModal
          open={rescheduleModalOpen}
          onCancel={() => setRescheduleModalOpen(false)}
          onConfirm={handleReschedule}
          isAlreadyCompleted={appointment.status === "completed"}
        />

        <DetailsModal
          open={detailsModalOpen}
          onCancel={() => setDetailsModalOpen(false)}
          appointments={appointment!}
        /> */}

      </div>
    </AppLayout>
  )
}
