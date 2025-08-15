import { useForm } from "@inertiajs/react";
import { Category } from "@/types";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";

export function useCategoryForm(category?: Category | null, onSuccess?: () => void) {
    const isEdit = Boolean(category);

    const form = useForm({
        name: category?.name ?? "",
    });

    useEffect(() => {
        if (category) {
            form.setData({ name: category.name ?? "" });
        } else {
            form.reset();
            form.clearErrors();
        }
    }, [category?.id]); // Solo se ejecuta cuando cambia el id de la categoría

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            const routeName = isEdit ? "categories.update" : "categories.store";
            const method = isEdit ? form.put : form.post;
            const url = isEdit ? route(routeName, category!.id) : route(routeName);

            method(url, {
                onSuccess: () => {
                    toast.success(
                        isEdit
                            ? "Categoría actualizada exitosamente."
                            : "Categoría agregada exitosamente."
                    );
                    form.reset();
                    onSuccess?.();
                },
                onError: () => {
                    toast.error("Ocurrió un error. Por favor, revisa los campos.");
                },
            });
        },
        [isEdit, category?.id, form, onSuccess]
    );

    return {
        ...form,
        isEdit,
        handleSubmit,
    };
}
