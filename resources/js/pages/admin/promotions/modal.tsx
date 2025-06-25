import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import PromotionForm from "./promotion-form"

import type { Promotions } from "@/types"

interface Props {
    open: boolean
    onClose: () => void
    promotion?: Promotions | null
}

export default function ServiceModal({ open, onClose, promotion }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modal</DialogTitle>
                </DialogHeader>

                <PromotionForm />
            </DialogContent>
        </Dialog>
    )
}