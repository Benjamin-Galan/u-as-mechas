import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { DashboardContent } from './dashboard-content'
import { DashboardPageProps } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const {
        new_clients_this_month,
        total_appointments,
        monthly_revenue,
        status_percentaje,
        monthly_earnings,
        pending_appointments
    } = usePage<DashboardPageProps>().props;

    console.log(new_clients_this_month, 'total de nuevos clientes')
    console.log(total_appointments, 'total de citas')
    console.log(monthly_revenue, 'ingresos por mes')
    console.log(status_percentaje, 'citas por estado')
    console.log(monthly_earnings, 'ganancias del mes')
    console.log(pending_appointments, 'citas del día')

    if (!new_clients_this_month) return

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DashboardContent
                    newClientsThisMonth={String(new_clients_this_month)}
                    totalAppointments={String(total_appointments)}
                    monthlyRevenue={String(monthly_revenue)}
                    statusPercentage={status_percentaje}
                    monthlyEarnings={monthly_earnings}
                    pendingAppointments={pending_appointments || []}
                />
            </div>
        </AppLayout>
    );
}
