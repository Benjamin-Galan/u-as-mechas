"use client"

import { useState } from "react"
import { Head, router, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, PaginatedNotifications } from "@/types"
import {NotificationsTabs} from "./notifications-tabs"
import NotificationList from "./notifications-list"
import NotificationActions from "./notification-actions"
import { Bell } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Dashboard", href: "/admin/dashboard" },
  { title: "Notificaciones", href: "/admin/notifications" },
]

export default function Notifications() {
  const {
    notifications: notificationsProps,
    filter,
    type,
  } = usePage().props as {
    notifications?: PaginatedNotifications
    filter?: string
    type?: string
  }


  const [readFilter, setReadFilter] = useState<string>(filter || "unread")
  const [typeFilter, setTypeFilter] = useState<string>(type || "all")

  // Esta función es ahora más clara y específica:
  function updateFilters(newReadFilter?: string, newTypeFilter?: string) {
    const finalRead = newReadFilter ?? readFilter
    const finalType = newTypeFilter ?? typeFilter

    setReadFilter(finalRead)
    setTypeFilter(finalType)

    router.get(
      "/admin/notifications",
      {
        filter: finalRead,
        type: finalType,
      },
      {
        preserveScroll: true,
        preserveState: true,
      },
    )
  }

  function handleMarkAllAsRead() {
    console.log("Marcado")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Notifications" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestión de Notificaciones</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Aquí puedes gestionar todas las notificaciones del sistema
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <NotificationsTabs readFilter={readFilter} onChange={updateFilters} />

          <NotificationActions
            activeType={typeFilter}
            onChangeType={(newType) => updateFilters(undefined, newType)}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </div>

        <NotificationList notifications={notificationsProps!} />
      </div>
    </AppLayout>
  )
}
