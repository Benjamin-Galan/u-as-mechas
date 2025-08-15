import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Appointment } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LoadAppointmentDetails } from './appointment-details'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mis citas',
        href: '/client/appointments',
    },
    {
        title: 'Reagendar',
        href: '/client/reschedule',
    },
];

export default function Reschedule() {
    const { appointment: Appointments } = usePage().props as {
        appointment?: Appointment
    }

    console.log(Appointments, 'Detalles de la cita')

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reagendar" />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-6 max-w-md"><LoadAppointmentDetails /></div>
            </div>
        </AppLayout>
    );
}
