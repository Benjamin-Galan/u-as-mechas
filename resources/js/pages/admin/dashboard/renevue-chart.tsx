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
  // Calcular el promedio de ingresos
  const averageRevenue = data.reduce((sum, item) => sum + item.earnings, 0) / data.length
  const today = new Date
  const currentYear = today.getFullYear()

  return (
    <Card className="col-span-2 border-indigo-900 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Ganancias Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} width={60} />
              <Tooltip formatter={(value) => [`$${value}`, "Ingresos"]} labelFormatter={(label) => `Mes: ${label}`} />
              <ReferenceLine y={averageRevenue} stroke="#8884d8" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <div className="flex flex-col items-end px-5">
        <p>Año actual: {currentYear}</p>
        <p>Las ganancias se muestran conforme a los últimos 6 meses</p>
      </div>
    </Card>
  )
}
