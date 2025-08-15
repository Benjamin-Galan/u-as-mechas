import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ServiceForm from "./service-form"
import type { Category, Service } from "@/types"

interface Props {
    open: boolean
    onClose: () => void
    categories: Category[]
    service: Service | null
}

export default function ServiceModal({ open, onClose, categories, service }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{service ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle>
                </DialogHeader>

                <ServiceForm
                    categories={categories}
                    service={service}
                    onSuccess={onClose}
                />
            </DialogContent>
        </Dialog>
    )
}