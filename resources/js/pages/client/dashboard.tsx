import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/client/dashboard' },
];

export default function ClientDashboard() {
    const {
        totalAppointments,
        upcomingAppointments,
        cancelledAppointments,
        totalSpent,
    } = usePage<{
        totalAppointments: number;
        upcomingAppointments: number;
        cancelledAppointments: number;
        totalSpent: number;
    }>().props;

    // Datos para el gráfico circular
    const pieData = [
        { name: 'Próximas', value: upcomingAppointments },
        { name: 'Canceladas', value: cancelledAppointments },
        { name: 'Completadas', value: totalAppointments - (upcomingAppointments + cancelledAppointments) },
    ];

    const COLORS = ['#4ade80', '#f87171', '#60a5fa'];

    // Datos de ejemplo para gasto mensual (puedes traerlo del backend)
    const barData = [
        { month: 'Ene', amount: 40 },
        { month: 'Feb', amount: 80 },
        { month: 'Mar', amount: 30 },
        { month: 'Abr', amount: 60 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-4 space-y-4">
                {/* Tarjetas */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Citas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{totalAppointments}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Citas Próximas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{upcomingAppointments}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Citas Canceladas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{cancelledAppointments}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Gastado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">C${totalSpent.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Gráficos */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Distribución de Citas</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gasto Mensual</CardTitle>
                        </CardHeader>
                        <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#60a5fa" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
