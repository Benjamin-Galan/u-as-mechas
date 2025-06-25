import { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, Notification } from "@/types";

import { echo } from '../../echo'

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/client/dashboard" },
    { title: "Notificaciones", href: "/client/notifications" },
];

export default function Notifications() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const { notifications: notificationsProps = [] } = usePage().props as {
        notifications?: Notification[]
    }

    useEffect(() => {

        echo.private("client.notifications")
            .listen("AppointmentConfirmed", (e: any) => {
                console.log("Notificación recibida:", e);
                setNotifications((prev) => [e, ...prev]);
            });

        return () => {
            echo.leave("client.notifications");
        };
    }, []);

    useEffect(() => {
        echo.private("client.notifications")
            .listen("PromotionCreated", (e: any) => {
                console.log("Notificación recibida:", e);
                setNotifications((prev) => [e, ...prev]);
            });

        return () => {
            echo.leave("client.notifications");
        };
    }, []);

    useEffect(() => {
        echo.private("client.notifications")
            .listen("ServiceCreatedOrDiscounted", (e: any) => {
                console.log("Notificación recibida:", e);
                setNotifications((prev) => [e, ...prev]);
            });

        return () => {
            echo.leave("client.notifications");
        };
    }, []);

    console.log(notifications, 'Lista de notificaciones')

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {notifications.length === 0 && <p>No hay notificaciones nuevas.</p>}
                {notifications.map((n, i) => (
                    <div>
                        {n.date && (
                            <div key={i} className="rounded bg-gray-100 p-4 shadow">
                                <p>
                                    Tu cita para el Fecha: {n.date} a las Hora: {n.time} ha sido confirmada
                                </p>
                            </div>
                        )}

                        {n.promotion_name && (
                            <div key={i} className="rounded bg-gray-100 p-4 shadow">
                                <p>
                                    Nueva promoción: {n.promotion_name}. Finaliza el : {n.end_date}. Aprovechala!
                                </p>
                            </div>
                        )}

                        {n.service_name && (
                            <div key={i} className="rounded bg-gray-100 p-4 shadow">
                                <p>
                                    Nuevo servicio: {n.service_name}. Aprovechalo!
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}