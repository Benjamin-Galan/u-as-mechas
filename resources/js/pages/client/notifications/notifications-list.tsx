import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Notifications, PaginatedNotifications } from "@/types";
import { NotificationMenu } from "./notifications-menu";
import { NotificationsTabs } from "@/pages/admin/notifications/notifications-tabs";
import { RotateCw } from "lucide-react";

interface Props {
    notification: PaginatedNotifications
    onNavigate: () => void
    onRead: (notification: Notifications) => void
    readFilter: string
    onChange: (filter: string) => void
    refresh: () => void
    onDelete: (notification: Notifications) => void
}

export function NotificationsList({ notification, onNavigate, onDelete, onRead, readFilter, onChange, refresh }: Props) {
    return (
        <div className="space-y-6">
            <Card className="border-none shadow-none">
                <CardHeader className="p-0">
                    <CardTitle className="text-2xl p-0">
                        Notificaciones
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="flex justify-between mb-3">
                        <NotificationsTabs
                            readFilter={readFilter}
                            onChange={onChange}
                        />

                        <RotateCw className="mr-2" onClick={refresh}/>
                    </div>

                    <div className="space-y-4">
                        {notification.data.map((n, i) => (
                            <div key={i} className="rounded bg-gray-100 p-4 shadow">
                                <p className="font-semibold">
                                    {n.message}
                                </p>

                                <div className="flex justify-end">
                                    <NotificationMenu
                                        notification={n}
                                        onNavigate={onNavigate}
                                        onDelete={onDelete}
                                        onRead={onRead}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}