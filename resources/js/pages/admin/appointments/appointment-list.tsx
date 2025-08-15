"use client"

import type { Appointment, PaginatedAppointments } from "@/types"
import { router } from "@inertiajs/react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStatusBadge } from "@/utils/getStatusBagde"
import { OptionsMenu } from "./options-menu"
import { formatDate } from "@/utils/format-date"
import { Calendar, Clock, UserCheck, ChevronLeft, ChevronRight } from "lucide-react"
import ListHeader from "./list-header"
import { Button } from "@/components/ui/button"

interface AppointmentProps {
  appointments: PaginatedAppointments
  onDelete: (appointment: Appointment) => void
  onEdit: (appointment: Appointment) => void
  onConfirm: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export function AppointmentList({ appointments, onCancel, onEdit, onConfirm }: AppointmentProps) {
  return (
    <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Lista de Citas</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{appointments.total} citas encontradas</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <ListHeader />

            <TableBody>
              {appointments.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No hay citas</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          No se encontraron citas con los filtros aplicados
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                appointments.data.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                          {appointment.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {appointment.user?.name || "Usuario sin nombre"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {formatDate(appointment.appointment_date)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 dark:text-white font-medium">
                          {appointment.appointment_time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">{getStatusBadge(appointment.status)}</TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
                          <UserCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {appointment.staff?.name ?? "No asignado"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <OptionsMenu appointment={appointment} onConfirm={onConfirm} onCancel={onCancel} onEdit={onEdit} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {appointments.data.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Mostrando {appointments.from} - {appointments.to} de {appointments.total} resultados
              </span>
            </div>

            <div className="flex items-center gap-2">
              {appointments.links.map((link, i) => {
                if (link.label.includes("Previous")) {
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      disabled={!link.url}
                      onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </Button>
                  )
                }

                if (link.label.includes("Next")) {
                  return (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      disabled={!link.url}
                      onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                      className="flex items-center gap-1"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )
                }

                return (
                  <Button
                    key={i}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                    className={link.active ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                  >
                    {link.label}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
