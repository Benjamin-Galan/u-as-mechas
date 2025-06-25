import { Promotions } from "@/types";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

export function usePromotionManager() {
    const [promotionModal, setPromotionModal] = useState(false);
    const [promotionToEdit, setPromotionToEdit] = useState<Promotions | null>(null);
    const [promotionToDelete, setPromotionToDelete] = useState<Promotions | null>(null);
    const [deleteDialog, setDeleteDialog] = useState(false);

    const handleCloseModal = () => {
        setPromotionModal(false);
        setPromotionToEdit(null);
    }

    //Funcion para manejar la edición de una promoción
    const handleEdit = (promotion: Promotions) => {
        setPromotionToEdit(promotion);
        setPromotionModal(true);
    }

    //Confirmación de eliminación de una promoción
    const confirmDelete = (promotion: Promotions) => {
        setPromotionToDelete(promotion);
        setDeleteDialog(true);
    }

    //Eliminar una promocion
    const handleDelete = () => {
        if (!promotionToDelete) return;

        router.delete(route("promotions.destroy", promotionToDelete.id), {
            onSuccess: () => {
                toast.message(`${promotionToDelete.name} ha sido eliminada exitosamente.`);
                setDeleteDialog(false);
                setPromotionToDelete(null);
            },
            onError: () => {
                toast.error(`${promotionToDelete.name} no se pudo eliminar.`);
            }
        })

    }


    return {
        promotionModal,
        promotionToEdit,
        promotionToDelete,
        deleteDialog,
        setPromotionModal,
        setDeleteDialog,
        handleEdit,
        handleCloseModal,
        confirmDelete,
        handleDelete
    }
}