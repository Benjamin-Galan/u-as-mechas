import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, Notification } from "@/types";

import { echo } from '../../../echo'

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Notificaciones", href: "/admin/notifications" },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { notifications: notificationsProps = [] } = usePage().props as {
        notifications?: Notification[]
    }

     useEffect(() => {

        echo.private("admin.notifications")
            .listen("AppointmentCreated", (e: any) => {
                console.log("Notificación recibida:", e);
                setNotifications((prev) => [e, ...prev]);
            });

        return () => {
            echo.leave("admin.notifications");
        };
    }, []);

    console.log(notificationsProps, 'Lista de notificaciones')

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {notifications.length === 0 && <p>No hay notificaciones nuevas.</p>}
                {notifications.map((n, i) => (
                    <div key={i} className="rounded bg-gray-100 p-4 shadow">
                        <p className="font-semibold">
                            Nueva cita agendada por {n.user.name}
                        </p>
                        <p>
                            Fecha: {n.date} - Hora: {n.time}
                        </p>
                        <p>Total: ${n.total}</p>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
