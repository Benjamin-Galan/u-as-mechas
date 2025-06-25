"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface RevenueChartProps {
  data: {
    month: string
    earnings: number
    year: number
  }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
  const averageRevenue = data.reduce((sum, item) => sum + item.earnings, 0) / data.length
  const today = new Date()
  const currentYear = today.getFullYear()

  return (
    <Card className=" shadow-lg bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Ganancias Mensuales</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tendencia de ingresos de los últimos 6 meses</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">Año actual</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{currentYear}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                width={60}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Ingresos"]}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <ReferenceLine y={averageRevenue} stroke="#6366F1" strokeDasharray="5 5" opacity={0.6} />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#6366F1" }}
                activeDot={{ r: 7, strokeWidth: 3, fill: "#6366F1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
