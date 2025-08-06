"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTime, formatDate } from "../../../utils/format-time"
import type { Appointment } from "@/types"
import { Eye, Calendar, Clock } from "lucide-react"

interface AppointmentsTableProps {
  appointments: Appointment[]
  onViewDetails?: (appointment: Appointment) => void
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
}

const statusTexts: Record<string, string> = {
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  pending: "Pendiente",
}

export function AppointmentsTable({ appointments, onViewDetails }: AppointmentsTableProps) {
  const getStatusColor = (status: string) =>
    statusStyles[status] ?? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  const getStatusText = (status: string) => statusTexts[status] ?? status

  console.log("Citas del día:", appointments)

  const formatter = new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    minimumFractionDigits: 2,
  })

  return (
    <Card className=" shadow-lg bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Citas del Día</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Gestiona las citas programadas para hoy</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Cliente</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Atiende</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Fecha</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Hora</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Estado</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400 font-semibold">Total</TableHead>
                <TableHead className="text-right text-gray-600 dark:text-gray-400 font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">No hay citas para hoy</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Las citas aparecerán aquí cuando sean programadas
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white">{appointment.user.name}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{appointment.staff.name}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(appointment.appointment_date)}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatTime(appointment.appointment_date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(appointment.status)} border-0 font-medium`} variant="outline">
                        {getStatusText(appointment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 dark:text-white">
                      {formatter.format(Number(appointment.total_price))}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-colors"
                        onClick={() => onViewDetails?.(appointment)}
                        aria-label={`Ver detalles de la cita con ${appointment.user.name}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
