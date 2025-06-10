/* eslint-disable @typescript-eslint/no-unused-vars */
import { Head, usePage, router } from "@inertiajs/react";
import { Appointment, BreadcrumbItem, PaginatedAppointments } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { AppointmentList } from "./appointment-list"
import AppointmentFilters from "./appointment-filters";
import { useMemo, useState } from "react";
import { toast } from "@/components/ui/use-toast"
import { ConfirmDialog } from "@/components/confirm-delete-dialog";
import axios from "axios";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Citas", href: "/admin/appointments" },
]

export default function AdminAppointments() {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortOrder, setSortOrder] = useState("desc")
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { appointments } = usePage().props as {
        appointments?: PaginatedAppointments
    };

    console.log(appointments)

    const handlePageChange = (page: number) => {
        router.get(`/admin/appointments?page=${page}`);
        setCurrentPage(page)
    }

    const confirmDelete = (appointment: Appointment) => {
        setSelectedAppointment(appointment)
        setIsDialogOpen(true)
    }

    const handleDelete = () => {
        if (!selectedAppointment) return

        router.delete(route("appointments.destroy", selectedAppointment.id), {
            onSuccess: () => {
                toast({
                    title: "Cita eliminada",
                    description: `${selectedAppointment.user?.name} ha sido eliminado exitosamente.`,
                })
            },
            onError: () => {
                toast({
                    title: "Error",
                    description: `No se pudo eliminar a ${selectedAppointment.user?.name}.`,
                    variant: "destructive",
                })
            },
        })
    }

    const filteredAppointments = useMemo(() => {
        return appointments?.data
            ?.filter((appointment) => {
                const name = appointment.user?.name?.toLowerCase() || "";
                const matchesName = name.includes(search.toLowerCase());

                const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

                const matchesDate = selectedDate
                    ? new Date(appointment.appointment_date).toDateString() === selectedDate.toDateString()
                    : true;

                return matchesName && matchesStatus && matchesDate;
            })
            .sort((a, b) => {
                const dateA = new Date(a.appointment_date).getTime();
                const dateB = new Date(b.appointment_date).getTime();
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });
    }, [appointments?.data, search, statusFilter, sortOrder, selectedDate]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Citas" />

            <div className="p-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Gestión de Citas</h1>
                    <p className="text-gray-600">Aquí puedes gestionar todas las citas de tus clientes.</p>
                </div>
            </div>

            <AppointmentFilters
                onSearchChange={setSearch}
                onStatusChange={setStatusFilter}
                onSortOrderChange={setSortOrder}
                onDateChange={setSelectedDate}
                selectedDate={selectedDate}
            />

            <AppointmentList
                appointments={appointments}
                filteredAppointments={filteredAppointments} // Opcional si necesitas los datos filtrados dentro del componente
                onChange={handlePageChange}
                confirmDelete={confirmDelete} 
            />

            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDelete}
                title="¿Eliminar miembro?"
                description={`¿Estás seguro de que deseas eliminar la cita de ${selectedAppointment?.user?.name}? Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar"
            />
        </AppLayout>
    )
}