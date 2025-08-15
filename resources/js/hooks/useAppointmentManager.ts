import { useState } from "react";
import { router } from "@inertiajs/react";
import { Appointment } from "@/types";
import { toast } from "sonner";

export function useAppointmentManager() {
    const [openModal, setOpenModal] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [appointmentToEdit, setAppointmentToEdit] = useState<Appointment | null>(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [stylistModalOpen, setStylistModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    // Función para enviar a la pagina de detalles de una cita
    const handleDetails = (appointment: Appointment) => {
        router.get(route("appointments.details", appointment.id))
    }

    // Función para confirmar la eliminación de un servicio
    const confirmDelete = (appointment: Appointment) => {
        setAppointmentToDelete(appointment);
        setIsDialogOpen(true);
    }

    // Función para eliminar una cita
    const handleDelete = () => {
        if (!appointmentToDelete) return;

        router.delete(route("appointments.destroy", appointmentToDelete.id), {
            onSuccess: () => {
                toast.message(`${appointmentToDelete.id} ha sido eliminado exitosamente.`)
                setIsDialogOpen(false);
                setAppointmentToDelete(null);
            },
            onError: () => {
                toast(`${appointmentToDelete.id} no se pudo eliminar.`)
            }
        })
    }

    // Función para cancelar una cita
    const handleCancel = (appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/cancel`, {
            status: 'cancelled',
        }, {
            onSuccess: () => {
                toast.success("Cita cancelada correctamente.");
                setCancelModalOpen(false);
            },
            onError: (errors) => {
                if (errors.status) {
                    toast.error(errors.status); // Aquí mostramos el mensaje exacto
                } else {
                    toast.error("Error al cancelar la cita.");
                }
            },
            preserveScroll: true,
        });
    };

    // Función para reagendar una cita
    const handleReschedule = (date: string, time: string, appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/reschedule`, {
            appointment_date: date,
            appointment_time: time,
        }, {
            onSuccess: () => {
                toast.success("Cita reagendada correctamente.");
                setRescheduleModalOpen(false);
            },
            onError: (errors) => {
                if (errors.status) {
                    toast.error(errors.status); // Aquí mostramos el mensaje exacto
                } else {
                    toast.error("Error al reagendar la cita.");
                }
            },
            preserveScroll: true,
        });
    }

    // Función para confirmar una cita
    const handleConfirm = (appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/confirm`, {
            status: 'confirmed',
        }, {
            onSuccess: () => {
                toast.success("Cita confirmada correctamente.");
                setModalOpen(false);
            },
            onError: (errors) => {
                if (errors.status) {
                    toast.error(errors.status); // Aquí mostramos el mensaje exacto
                } else {
                    toast.error("Error al confirmar la cita.");
                }
            }
            ,
            preserveScroll: true,
        });
    };

    //Funcion para hacer check-in en una cita
    const handleCheckIn = (appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/check`, {
            status: 'completed',
        }, {
            onSuccess: () => {
                toast.success("Check-in realizado correctamente.");
                setModalOpen(false);
            },
            onError: (errors) => {
                if (errors.status) {
                    toast.error(errors.status); // Aquí mostramos el mensaje exacto
                } else {
                    toast.error("Error al confirmar la cita.");
                }
            },
            preserveScroll: true,
        });
    }

    return {
        openModal,
        appointmentToEdit,
        appointmentToDelete,
        isDialogOpen,
        setOpenModal,
        setIsDialogOpen,
        confirmDelete,
        handleCancel,
        handleReschedule,
        modalOpen,
        setModalOpen,
        detailsModalOpen,
        setDetailsModalOpen,
        rescheduleModalOpen,
        setRescheduleModalOpen,
        cancelModalOpen,
        setCancelModalOpen,
        handleDelete,
        handleDetails,
        stylistModalOpen,
        setStylistModalOpen,
        handleConfirm,
        handleCheckIn
    }

}