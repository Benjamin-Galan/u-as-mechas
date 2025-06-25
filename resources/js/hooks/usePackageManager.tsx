import { Packages } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";

export function usePackageManager() {
    const [packageModal, setPackageModal] = useState(false)
    const [packageToEdit, setPackageToEdit] = useState<Packages | null>(null)
    const [packageToDelete, setPackageToDelete] = useState<Packages | null>(null)
    const [deleteDialog, setDeleteDialog] = useState(false)

    const handleCloseModal = () => {
        setPackageModal(false)
        setPackageToEdit(null)
    }

    //Manejar la edición de un paquete
    const handleEdit = (pkg: Packages) => {
        setPackageToEdit(pkg)
        setPackageModal(true)
    }

    const confirmDelete = (pkg: Packages) => {
        setPackageToDelete(pkg)
        setDeleteDialog(true)
    }

    //Eliminar un paquete
    const handleDelete = () => {
        if (!packageToDelete) return

        router.delete(route('package.destroy', packageToDelete.id), {
            onSuccess: () => {
                toast.message(`El paquete ${packageToDelete.name} ha sido eliminado exitosamente.`)
                setDeleteDialog(false)
                setPackageToDelete(null)
            },
            onError: () => {
                toast.error(`${packageToDelete.name} no se pudo eliminar.`);
            }
        })
    }

    return {
        packageModal,
        packageToEdit,
        packageToDelete,
        deleteDialog,
        setPackageModal,
        setDeleteDialog,
        handleCloseModal,
        handleEdit,
        confirmDelete,
        handleDelete
    }
}