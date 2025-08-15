import { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, Notifications, PaginatedNotifications } from "@/types";
import { NotificationsList } from "./notifications-list";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/confirm-delete-dialog";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Notificaciones", href: "/admin/notifications" },
];

export default function Notifications() {
    const {
        notificationsList: notificationsProps,
        filter
    } = usePage().props as {
        notificationsList?: PaginatedNotifications
        filter?: string
    }

    const [readFilter, setReadFilter] = useState<string>(filter || "unread")
    const [notificationToDelete, setnotificationToDelete] = useState<Notifications | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function updateFilter(newReadFilter?: string) {
        const finalRead = newReadFilter ?? readFilter

        setReadFilter(finalRead)

        router.get(
            "/client/notifications",
            {
                filter: finalRead,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        )
    }

    function handleGoToAppointments() {
        router.visit("/client/appointments", { preserveState: true, preserveScroll: true })
    }

    function handleMarkAsRead(notification: Notifications) {
        router.patch(`/client/notifications/${notification.id}/status`, {
            read: true,
        }, {
            onSuccess: () => {
                toast.success("Actualizado.");
            },
            onError: (error) => {
                toast.error(error.message);
            },
            preserveScroll: true,
        })
        console.log("Marcar como leída:", notification.id)
    }

    const confirmDelete = (notification: Notifications) => {
        setnotificationToDelete(notification);
        setIsDialogOpen(true);
    }

    // Función para eliminar una cita
    const handleDelete = () => {
        if (!notificationToDelete) return;

        router.delete(route("notifications.destroy", notificationToDelete.id), {
            onSuccess: () => {
                toast.message(`${notificationToDelete.id} ha sido eliminado exitosamente.`)
                setIsDialogOpen(false);
                setnotificationToDelete(null);
            },
            onError: () => {
                toast(`${notificationToDelete.id} no se pudo eliminar.`)
            }
        })
    }

    function handleRefresh() {
        router.get(route('client.notifications'));
    }

    console.log(notificationsProps?.data, 'Lista de notificaciones')

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py- max-w-md">
                    <NotificationsList
                        notification={notificationsProps!}
                        onNavigate={handleGoToAppointments}
                        onRead={handleMarkAsRead}
                        readFilter={readFilter}
                        onChange={updateFilter}
                        refresh={handleRefresh}
                        onDelete={confirmDelete}
                    />
                </div>

                <ConfirmDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={handleDelete}
                    title="¿Eliminar servicio?"
                    description={`¿Estás seguro de que deseas eliminar el servicio ${notificationToDelete?.id}? Esta acción no se puede deshacer.`}
                    confirmText="Sí, eliminar"
                />
            </div>
        </AppLayout>
    );
}
