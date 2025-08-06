import { useState } from "react";
import { router } from "@inertiajs/react";
import { Appointment } from "@/types";
import { toast } from "sonner";

export function useAppointmentManager() {
    const [openModal, setOpenModal] = useState(false);
    const [appointmentToEditm, setAppointmentToEdit] = useState<Appointment | null>(null);
    const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    const handleCloseModal = () => {

    }

    // Función para manejar la edición de una cita

    // Función para confirmar una cita

    // Función para manejar la cancelación de una cita

    // Función para confirmar la eliminación de una cita

    // Función para eliminar una cita

    // Función para completar una cita 

    // Función para manejar la edición de un servicio
    // const handleEdit = (service: Service) => {
    //     setServiceToEdit(service);
    //     setOpenModal(true);
    // };

    // Función para enviar a la pagina de detalles de una cita
    const handleDetails = (appointment: Appointment) => {
        router.get(route("appointments.details", appointment.id), {
            
        })
    }

    // Función para confirmar la eliminación de un servicio
    const confirmDelete = (appointment: Appointment) => {
        setAppointmentToDelete(appointment);
        setIsDialogOpen(true);
    }

    // Función para eliminar un servicio
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

    const handleCancel = (appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/status`, {
            status: 'cancelled',
        }, {
            onSuccess: () => {
                toast.success("Cita cancelada correctamente.");
                setCancelModalOpen(false);
            },
            onError: () => {
                toast.error("Error al cancelar la cita.");
            },
            preserveScroll: true,
        });
    };

    const handleReschedule = (date: string, time: string, appointment: Appointment) => {
        router.patch(`/admin/appointments/${appointment.id}/reschedule`, {
            appointment_date: date,
            appointment_time: time,
        }, {
            onSuccess: () => {
                toast.success("Cita reagendada correctamente.");
                setRescheduleModalOpen(false);
            },
            onError: () => {
                toast.error("Error al reagendar cita.");
            },
            preserveScroll: true,
        });
    }

    return {
        openModal,
        appointmentToEditm,
        appointmentToDelete,
        isDialogOpen,
        setOpenModal,
        setIsDialogOpen,
        handleCloseModal,
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
        handleDetails
    }

}