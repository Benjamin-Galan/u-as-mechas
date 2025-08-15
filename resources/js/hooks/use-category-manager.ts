import { useState } from "react";
import { router } from "@inertiajs/react";
import type { Category } from "@/types";
import { toast } from "sonner";

export function useCategoryManager() {
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseCatModal = () => {
        setCategoryModalOpen(false);
        setCategoryToEdit(null);
    };

    const handleOpenModal = (category?: Category) => {
        setCategoryToEdit(category || null);
        setCategoryModalOpen(true);
    };

    // Función para confirmar la eliminación de un servicio
    const confirmDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDialogOpen(true);
    }

    // Eliminar una categoría
    const handleDeleteCategory = () => {
        if (!categoryToDelete) return;

        router.delete(route("categories.destroy", categoryToDelete.id), {
            onSuccess: () => {
                toast.message(`${categoryToDelete.id} ha sido eliminado exitosamente.`)
                setIsDialogOpen(false);
                setCategoryToDelete(null);
            },
            onError: () => {
                toast(`${categoryToDelete.id} no se pudo eliminar.`)
            }
        })
    }

    return {
        categoryModalOpen,
        categoryToEdit,
        categoryToDelete,
        handleOpenModal,
        handleCloseCatModal,
        handleDeleteCategory,
        confirmDelete,
        isDialogOpen,
        setIsDialogOpen
    };
}
