// components/ui/stats-grid.tsx

import { cn } from "@/lib/utils"

interface StatItem {
  label: string
  value: number | string
  color?: string // puede ser: "text-green-600", "text-red-600", etc.
}

interface StatsGridProps {
  stats: StatItem[]
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg border">
          <div className={cn("text-2xl font-bold", stat.color || "text-gray-900")}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
