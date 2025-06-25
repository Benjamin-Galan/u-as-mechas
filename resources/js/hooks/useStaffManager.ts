import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "@/components/ui/use-toast";
import { Staff } from "@/types";

export function useStaffManager() {
    const [openModal, setOpenModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [selectedMember, setSelectedMember] = useState<Staff | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedStaff(null);
    }

    const handleEdit = (member: Staff) => {
        setSelectedStaff(member);   // ✅ este es el correcto para edición
        setOpenModal(true);
    };
    
    const confirmDelete = (member: Staff) => {
        setSelectedMember(member);
        setIsDialogOpen(true);
    }

    const handleDelete = () => {
        if (!selectedMember) return;

        router.delete(route("staff.destroy", selectedMember.id), {
            onSuccess: () => {
                toast({
                    title: "Miembro eliminado",
                    description: `${selectedMember.name} ha sido eliminado exitosamente.`,
                })
                setIsDialogOpen(false);
                setSelectedMember(null);
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar a ${selectedMember.name}.`,
                    variant: "destructive",
                })
            }
        })
    }

    return {
        openModal,
        selectedStaff,
        selectedMember,
        isDialogOpen,
        setOpenModal,
        setIsDialogOpen,
        handleEdit,
        handleCloseModal,
        confirmDelete,
        handleDelete,
    };
}