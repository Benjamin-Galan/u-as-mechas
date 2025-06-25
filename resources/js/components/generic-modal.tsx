import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    titleType: string;         // Ej: "Servicio"
    isEditing: boolean;        // true = editar, false = nuevo
    children: React.ReactNode;
}

export function GenericModal({ open, onClose, titleType, isEditing, children }: Props) {
    const title = isEditing ? `Editar ${titleType}` : `Nuevo ${titleType}`;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}
