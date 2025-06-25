interface OptionsMenuProps {
  appointment: Appointment
}

import { CheckCircle, Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { ConfirmModal } from "./confirm-modal";
import { DetailsModal } from "./details-modal"
import { RescheduleModal } from "./reschedule-modal";
import { toast } from "sonner";
import { Appointment } from "@/types";
import { CancelModal } from "./cancel-modal";

export function OptionsMenu({ appointment }: OptionsMenuProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const handleConfirm = () => {
    router.patch(`/admin/appointments/${appointment.id}/status`, {
      status: 'confirmed',
    }, {
      onSuccess: () => {
        toast.success("Cita confirmada correctamente." );
        setModalOpen(false);
      },
      onError: () => {
        toast.error("Error al confirmar cita.");
      },
      preserveScroll: true,
    });
  };

  const handleCancel = () => {
    router.patch(`/admin/appointments/${appointment.id}/status`, {
      status: 'cancelled',
    }, {
      onSuccess: () => {
        toast.success("Cita cancelada correctamente." );
        setCancelModalOpen(false);
      },
      onError: () => {
        toast.error("Error al cancelar la cita.");
      },
      preserveScroll: true,
    });
  };

  const handleReschedule = (date: string, time: string) => {
    router.patch(`/admin/appointments/${appointment.id}/reschedule`, {
      appointment_date: date,
      appointment_time: time,
    }, {
      onSuccess: () => {
        toast.success("Cita reagendada correctamente." );
        setRescheduleModalOpen(false);
      },
      onError: () => {
        toast.error("Error al reagendar cita.");
      },
      preserveScroll: true,
    });
  };


  return (
    <>
      <div className="flex justify-between">
        <Eye
          className="stroke-blue-700 hover:stroke-blue-300 dark:stroke-blue-300 hover:bg-zinc-700 cursor-pointer p-1 rounded-sm shadow-sm"
          onClick={() => setDetailsModalOpen(true)}
        />
        <Pencil
          className="stroke-zinc-700 hover:stroke-zinc-300 dark:stroke-zinc-200 hover:bg-zinc-700 cursor-pointer p-1 rounded-sm shadow-sm"
          onClick={() => setRescheduleModalOpen(true)}
        />
        <Trash
          className="stroke-red-700 hover:stroke-red-300 dark:stroke-red-400 hover:bg-zinc-700 cursor-pointer p-1 rounded-sm shadow-sm" 
          onClick={() => setCancelModalOpen(true)}
        />
        <CheckCircle
          className="stroke-lime-800 hover:stroke-lime-300 dark:stroke-lime-300 hover:bg-zinc-700 cursor-pointer p-1 rounded-sm shadow-sm"
          onClick={() => setModalOpen(true)}
        />
      </div>

      <ConfirmModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        isAlreadyConfirmed={appointment.status === "confirmed"}
      />

      <CancelModal
        open={cancelModalOpen}
        onCancel={() => setCancelModalOpen(false)}
        onConfirm={handleCancel}
        isAlreadyConfirmed={appointment.status === "cancelled"}
      />

      <RescheduleModal
        open={rescheduleModalOpen}
        onCancel={() => setRescheduleModalOpen(false)}
        onConfirm={handleReschedule}
        isAlreadyCompleted={appointment.status === "completed"}
      />

      <DetailsModal
        open={detailsModalOpen}
        onCancel={() => setDetailsModalOpen(false)}
        appointments={appointment!}
      />
    </>
  );
}
