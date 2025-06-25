import { LayoutGrid, NotebookPen, Scissors, Percent, Gift, Users, BellRing, BookCopy } from "lucide-react";
import type { NavItem } from "@/types";

export function getMainNavItemsByRole(role: 'admin' | 'cliente'): NavItem[] {
    const admin: NavItem[] = [
        { title: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
        { title: "Citas", href: "/admin/appointments", icon: NotebookPen },
        { title: "Servicios", href: "/admin/services", icon: Scissors },
        { title: "Promociones", href: "/promotions", icon: Percent },
        { title: "Paquetes", href: "/packages", icon: Gift },
        { title: "Personal", href: "/staff", icon: Users },
        { title: "Notificaciones", href: "/admin/notifications", icon: BellRing },
    ]

    const client: NavItem[] = [
        { title: "Dashboard", href: "/client/dashboard", icon: LayoutGrid },
        { title: "Agendamiento", href: "/client/services", icon: NotebookPen },
        { title: "Mis citas", href: "/client/appointments", icon: Percent },
        { title: "Notificaciones", href: "/client/notifications", icon: Gift },
    ];

    return role === "admin" ? admin : client;
}
