import { StatsCard } from "./stats-card"
import { BarChart3, Calendar, DollarSign, Users } from "lucide-react"
import { StatusPieChart } from "./status-pie-chart"
import { RevenueChart } from "./renevue-chart"
import { AppointmentsTable } from "./appointments-table"
import { TodayAppointment } from "@/types"

interface DashboardPageProps {
    newClientsThisMonth: string
    totalAppointments: string
    monthlyRevenue: string
    statusPercentage?: {
        cancelled: number
        completed: number
        pending: number
        sum: number
    }
    monthlyEarnings?: {
        earnings: string
        month: number
        year: number
    }[]
    pendingAppointments?: TodayAppointment[]
}

export function DashboardContent({
    newClientsThisMonth,
    totalAppointments,
    monthlyRevenue,
    statusPercentage,
    monthlyEarnings,
    pendingAppointments
}: DashboardPageProps) {

    const pieChartData = [
        { name: "Completadas", value: statusPercentage?.completed, color: "#10b981" },
        { name: "Canceladas", value: statusPercentage?.cancelled, color: "#ef4444" },
        { name: "Pendientes", value: statusPercentage?.pending, color: "#f59e0b" },
    ]

    const monthNames = [
        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ]

    function getMonthName(index: number): string {
        return monthNames[index]
    }

    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const monthsToShow = 6
    const chartData = []

    for (let i = monthsToShow - 1; i >= 0; i--) {
        const month = (currentMonth - i + 12) % 12
        const year = currentMonth - i < 0 ? currentYear - 1 : currentYear

        //Buscar si hay datos para este mes
        const earningsItem = monthlyEarnings?.find(
            (item) => item.month === month + 1 && item.year === year
        )

        chartData.push({
            month: getMonthName(month),
            earnings: earningsItem ? parseFloat(earningsItem.earnings) : 0,
            year
        })
    }


    return (
        <div className="space-y-6">
            <div className="grid gap-6 w-full md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Nuevos Usuarios"
                    value={newClientsThisMonth}
                    icon={<Users className="h-5 w-5" />}
                    change={12}
                    changeText="Este mes"
                />

                <StatsCard
                    title="Citas Totales"
                    value={totalAppointments}
                    icon={<Calendar className="h-5 w-5" />}
                    change={8}
                    changeText="desde el mes pasado"
                />
                <StatsCard
                    title="Ingresos del Mes"
                    value={`$${Number.parseFloat(monthlyRevenue).toFixed(2)}`}
                    icon={<DollarSign className="h-5 w-5" />}
                    change={5}
                    changeText="desde el mes pasado"
                />
                <StatsCard
                    title="Tasa de Completadas"
                    value={`${statusPercentage?.completed}%`}
                    icon={<BarChart3 className="h-5 w-5" />}
                    change={-3}
                    changeText="desde el mes pasado"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <StatusPieChart data={pieChartData} sum={statusPercentage?.sum} />
                <RevenueChart data={chartData}  />
            </div>

            <AppointmentsTable appointments={pendingAppointments ?? []} />
        </div>
    )
}