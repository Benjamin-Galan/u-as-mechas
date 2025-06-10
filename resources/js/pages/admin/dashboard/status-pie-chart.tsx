"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface StatusPieChartProps {
    data: {
        name: string
        value?: number
        color: string
    }[]
    sum?: number
}

export function StatusPieChart({ data, sum }: StatusPieChartProps) {
    return (
        <Card className="col-span-1 border-indigo-200 dark:border-indigo-900 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Estado de Citas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value} citas`, ""]} labelFormatter={() => ""} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <div className="flex w-full flex-col justify-between">
                                <div className="flex items-center  gap-3">
                                    <p className="text-sm font-medium">{item.name}:</p>
                                    <p className="text-sm font-medium">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-gray-200" />
                        <div className="flex w-full flex-col">
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-medium">Total:</p>
                                <p className="text-sm font-medium">{sum}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
