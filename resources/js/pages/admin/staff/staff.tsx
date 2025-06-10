import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import AppLayout from "@/layouts/app-layout"
import { useState } from "react"
import { Head, usePage } from "@inertiajs/react"
import { BreadcrumbItem, type Staff } from "@/types"
import { router } from "@inertiajs/react"
import { toast } from "@/components/ui/use-toast"
import StaffModal from "./staff-modal"
import StaffList from "./staff-list"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Personal",
        href: "/staff",
    },
]

export default function Staff() {
    const { members: propsStaff = [] } = usePage().props as { members?: Staff[] }
    const [openModal, setOpenModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
    const [selectedMember, setSelectedMember] = useState<Staff | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedStaff(null) //limpiar al cerrar
    }

    const handleEdit = (member: Staff) => {
        setSelectedStaff(member)
        setOpenModal(true)
    }

    const confirmDelete = (member: Staff) => {
        setSelectedMember(member)
        setIsDialogOpen(true)
    }

    const handleDelete = () => {
        if (!selectedMember) return

        router.delete(route("staff.destroy", selectedMember.id), {
            onSuccess: () => {
                toast({
                    title: "Miembro eliminado",
                    description: `${selectedMember.name} ha sido eliminado exitosamente.`,
                })
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar a ${selectedMember.name}.`,
                    variant: "destructive",
                })
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personal" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Gestión de Personal</h1>
                        <p className="text-gray-600">Aquí puedes gestionar todo tu personal disponible.</p>
                    </div>

                    <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => setOpenModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo miembro
                    </Button>
                </div>
            </div>

            <StaffModal
                open={openModal}
                onClose={handleCloseModal}
                staff={selectedStaff}
            />

            <StaffList
                members={propsStaff}
                onEdit={handleEdit}
                confirmDelete={confirmDelete} // luego puedes completar esto
            />

            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDelete}
                title="¿Eliminar miembro?"
                description={`¿Estás seguro de que deseas eliminar a ${selectedMember?.name}? Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar"
            />

        </AppLayout>
    )
}