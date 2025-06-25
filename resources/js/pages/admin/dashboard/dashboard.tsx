import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { DashboardContent } from "./dashboard-content";
import { DashboardPageProps } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
];

export default function Dashboard() {
    const {
        new_clients_this_month,
        total_appointments,
        monthly_revenue,
        status_percentaje,
        monthly_earnings,
        pending_appointments,
    } = usePage<DashboardPageProps>().props;

    // Debug logs (descomenta si estás en desarrollo)
    // console.log({ new_clients_this_month, total_appointments, monthly_revenue, status_percentaje, monthly_earnings, pending_appointments });

    const isDataReady = new_clients_this_month !== undefined && total_appointments !== undefined;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col flex-1 gap-4 p-4 bg-white dark:bg-zinc-950 ">
                {isDataReady ? (
                    <DashboardContent
                        newClientsThisMonth={String(new_clients_this_month)}
                        totalAppointments={String(total_appointments)}
                        monthlyRevenue={String(monthly_revenue)}
                        statusPercentage={status_percentaje}
                        monthlyEarnings={monthly_earnings}
                        pendingAppointments={pending_appointments}
                    />
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                        Cargando datos del dashboard...
                    </p>
                )}
            </div>
        </AppLayout>
    );
}
