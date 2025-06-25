import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { Service } from "@/types";

export function useServiceManager() {
    const [openModal, setOpenModal] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        setServiceToEdit(null);
    }

    // Función para manejar la edición de un servicio
    const handleEdit = (service: Service) => {
        setServiceToEdit(service);
        setOpenModal(true);
    };

    // Función para confirmar la eliminación de un servicio
    const confirmDelete = (service: Service) => {
        setServiceToDelete(service);
        setIsDialogOpen(true);
    }

    // Función para eliminar un servicio
    const handleDelete = () => {
        if (!serviceToDelete) return;

        router.delete(route("services.destroy", serviceToDelete.id), {
            onSuccess: () => {
                toast.message(`${serviceToDelete.name} ha sido eliminado exitosamente.`)
                setIsDialogOpen(false);
                setServiceToDelete(null);
            },
            onError: () => {
                toast(`${serviceToDelete.name} no se pudo eliminar.`)
            }
        })
    }

    return {
        openModal,
        serviceToEdit,
        serviceToDelete,
        isDialogOpen,
        setOpenModal,
        setIsDialogOpen,
        handleEdit,
        handleCloseModal,
        confirmDelete,
        handleDelete,
    };
}