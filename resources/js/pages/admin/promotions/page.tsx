import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Promotions } from "@/types"

import { Gift, Plus } from "lucide-react"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"
import Modal from "./modal"
import { HeaderContent } from "@/components/header-content"
import { usePromotionManager } from "@/hooks/usePromotionManager"
import PromotionList from "./promotion-list"
import { ServiceStats } from "./promotion-stats"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        title: "Promociones",
        href: "/promotions",
    },
]

export default function Promotions() {
    const { promotions } = usePage().props as {
        promotions?: Promotions[]
    }

    console.log(promotions, 'promociones');

    const {
        promotionModal,
        setPromotionModal,
        promotionToEdit,
        promotionToDelete,
        deleteDialog,
        handleCloseModal,
        handleEdit,
        confirmDelete,
        handleDelete,
        setDeleteDialog
    } = usePromotionManager()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Promociones" />

            <div className="p-4">
                <HeaderContent
                    titleIcon={<Gift className="w-6 h-6 text-purple-600" />}
                    buttonIcon={<Plus className="w-4 h-4" />}
                    section="Promociones"
                    article="todas las"
                    onOpenModal={() => setPromotionModal(true)}
                />

                <ServiceStats promotions={promotions!} />

                <PromotionList
                    promotions={promotions} onEdit={handleEdit} onDelete={confirmDelete}
                />

                {/* <Filters /> */}

                <Modal
                    open={promotionModal}
                    onClose={handleCloseModal}
                    promotion={promotionToEdit}
                />

                <ConfirmDialog
                    open={deleteDialog}
                    onClose={() => setDeleteDialog(false)}
                    onConfirm={handleDelete}
                    title="¿Eliminar Promoción?"
                    description={`¿Estás seguro de que deseas eliminar el servicio ${promotionToDelete?.name}? Esta acción no se puede deshacer.`}
                    confirmText="Sí, eliminar"
                />
            </div>
        </AppLayout>
    )
}