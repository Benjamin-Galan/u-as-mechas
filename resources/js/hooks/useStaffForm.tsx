import { useForm } from "@inertiajs/react";
import { Staff } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

export function useStaffForm(staff?: Staff | null, onSuccess?: () => void) {
    const isEdit = !!staff;

    useEffect(() => {
        if (!staff) {
            form.reset();        // Limpia todos los campos
            form.clearErrors();  // Limpia errores de validación anteriores
        } else {
            form.setData({
                name: staff.name ?? "",
                email: staff.email ?? "",
                phone: staff.phone ?? "",
                position: staff.position ?? "",
                available: staff.available ?? true,
            });
        }
    }, [staff?.id]);

    const form = useForm({
        name: staff?.name ?? "",
        email: staff?.email ?? "",
        phone: staff?.phone ?? "",
        position: staff?.position ?? "",
        available: staff?.available ?? true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const routeName = isEdit ? "staff.update" : "staff.store";
        const method = isEdit ? form.put : form.post;
        const url = isEdit ? route(routeName, staff!.id) : route(routeName);

        method(url, {
            onSuccess: () => {
                toast.success(isEdit ? "Miembro actualizado exitosamente." : "Miembro agregado exitosamente.");
                form.reset();
                onSuccess?.();
            }
        })
    }

    return {
        ...form,
        isEdit,
        handleSubmit,
    }
}