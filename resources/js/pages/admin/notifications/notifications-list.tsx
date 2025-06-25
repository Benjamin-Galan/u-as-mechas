"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PaginatedNotifications } from "@/types"
import { getStatusBadge } from "@/utils/getStatusBagde"
import { formatDateTime } from "@/utils/format-time"
import NotificationMenu from "./notification-menu"
import { router } from "@inertiajs/react"
import { Clock } from "lucide-react"

interface Props {
  notifications: PaginatedNotifications
}

export default function NotificationList({ notifications }: Props) {
  const getNotificationIcon = (type: string) => {
    // Puedes personalizar los íconos según el tipo de notificación
    return "🔔"
  }

  return (
    <>
      <div className="space-y-4">
        {notifications?.data.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "transition-all duration-200 hover:shadow-md border-l-4 bg-white dark:bg-gray-800/50",
              notification.read
                ? "border-l-gray-300 dark:border-l-gray-600"
                : "border-l-blue-500 dark:border-l-blue-400 bg-blue-50/50 dark:bg-blue-900/10",
            )}
          >
            <CardContent className="">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                      notification.read ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-500 dark:bg-blue-600",
                    )}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div>
                    {getStatusBadge(notification.type)}
                    {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatDateTime(notification.created_at)}</span>
                  </div>
                  <NotificationMenu notification={notification} />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{notification.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{notification.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {notifications?.links.map((link, i) => (
          <button
            key={i}
            disabled={!link.url}
            onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={cn(
              "px-4 py-2 border rounded-lg text-sm transition-all duration-200",
              link.active
                ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700",
              !link.url && "opacity-50 cursor-not-allowed",
            )}
          />
        ))}
      </div>
    </>
  )
}
