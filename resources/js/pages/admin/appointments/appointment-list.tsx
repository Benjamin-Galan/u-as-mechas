import type { Appointment, PaginatedAppointments } from "@/types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CardContent } from "@/components/ui/card"
import { Edit, Trash2, MoreHorizontal, UserPlus, ListCollapse } from "lucide-react"
import { getStatusBadge } from "@/utils/getStatusBagde"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { formatDate } from "@/utils/format-date"

interface AppointmentProps {
    appointments: PaginatedAppointments
    onChange: (page: number) => void;
    confirmDelete: (appointment: Appointment) => void
}

export function AppointmentList({ appointments, onChange, confirmDelete }: AppointmentProps) {

    const handleAlignment = (currentPage: number) => {
        if (currentPage < appointments?.last_page) {
            return 'flex justify-end p-2'
        } else if (currentPage > 1) {
            return 'flex justify-start p-2'
        }
    }

    return (
        <div className="container mx-auto">
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader className="bg-indigo-100">
                            <TableRow className="text-left text-sm font-semibold text-gray-700">
                                <TableHead className="p-3 font-bold">Nombre del Cliente</TableHead>
                                <TableHead className="p-3 font-bold">Fecha</TableHead>
                                <TableHead className="p-3 font-bold">Hora</TableHead>
                                <TableHead className="p-3 font-bold">Estado</TableHead>
                                <TableHead className="p-3 font-bold">Estilista</TableHead>
                                <TableHead className="p-3 font-bold text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {appointments.data.map((appointment) => (
                                <TableRow key={appointment.id} className="hover:bg-indigo-200">
                                    <TableCell className="p-3 font-medium">{appointment.user?.name}</TableCell>
                                    <TableCell className="py-3 px-4">{formatDate(appointment.appointment_date)}</TableCell>
                                    <TableCell className="p-3 font-medium">{appointment.appointment_time}</TableCell>
                                    <TableCell className="p-3 font-medium">{getStatusBadge(appointment.status)}</TableCell>
                                    <TableCell className="p-3 font-medium">{appointment.staff_id ?? "no asignado"}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menú</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end" className="bg-white border rounded shadow-sm flex flex-col gap-3">
                                                <DropdownMenuItem className="cursor-pointer px-2 py-1 w-full hover:bg-indigo-100 flex items-center border-none">
                                                    <ListCollapse className="mr-2 h-4 w-4" />
                                                    Ver detalles
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer px-2 py-1 w-full hover:bg-indigo-100 flex items-center border-none">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Reagendar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer px-2 py-1 w-full hover:bg-indigo-100 flex items-center">
                                                    <UserPlus className="mr-2 h-4 w-4" />
                                                    Asignar estilista
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => confirmDelete(appointment)} className="cursor-pointer px-2 py-1 w-full hover:bg-indigo-100 flex items-center text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
                <div className={handleAlignment(appointments.current_page)}>
                    {appointments?.current_page > 1 && (
                        <Button onClick={() => onChange(appointments?.current_page - 1)}>
                            Anterior
                        </Button>
                    )}
                    {appointments?.current_page < appointments?.last_page && (
                        <Button onClick={() => onChange(appointments?.current_page + 1)}>
                            Siguiente
                        </Button>
                    )}
                </div>
            </CardContent>
        </div>
    )
}
