import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import type { Staff } from "@/types"

import StaffForm from "./staff-form"

interface Props {
    open: boolean
    onClose: () => void
    staff?: Staff | null
}

export default function StaffModal({ open, onClose, staff }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{staff ? 'Editar miembro' : 'Nuevo miembro'}</DialogTitle>
                </DialogHeader>

                <StaffForm staff={staff} onSuccess={onClose} />
            </DialogContent>
        </Dialog>
    )
}