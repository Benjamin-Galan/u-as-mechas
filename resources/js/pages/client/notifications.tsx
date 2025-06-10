import { useState } from "react"
import { Head, usePage, router } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/client/dashboard",
    },
    {
        title: "Notificaciones",
        href: "/client/notifications",
    },
]

export default function Notifications() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

            </div>
        </AppLayout>
    );
}