"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTime, formatDate } from "../../../utils/format-time"
import { TodayAppointment } from "@/types"
import { Eye } from "lucide-react"

interface AppointmentsTableProps {
    appointments: TodayAppointment[]
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "cancelled":
                return "bg-red-100 text-red-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Completada"
            case "cancelled":
                return "Cancelada"
            case "pending":
                return "Pendiente"
            default:
                return status
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">Citas del Día</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Atiende</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-right">Ver detalles</TableHead>
                            
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                                    No hay citas para hoy
                                </TableCell>
                            </TableRow>
                        ) : (
                            appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.user.name}</TableCell>
                                    <TableCell>{appointment.staff.name}</TableCell>
                                    <TableCell>{formatDate(appointment.appointment_date)}</TableCell>
                                    <TableCell>{formatTime(appointment.appointment_date)}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(appointment.status)} variant="outline">
                                            {getStatusText(appointment.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${Number.parseFloat(appointment.total_price).toFixed(2)}</TableCell>
                                    <TableCell className="flex justify-end"><Eye className="hover:cursor-pointer" /></TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
