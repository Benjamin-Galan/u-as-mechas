import type { Category, ServiceList } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Tag, Percent, DollarSign } from "lucide-react"

interface ServiceStatsProps {
  services: ServiceList
  categories?: Category[]
}

export default function ServiceStats({ services, categories }: ServiceStatsProps) {
  const stats = [
    {
      title: "Total Servicios",
      value: services.length,
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Categorías",
      value: categories?.length || 0,
      icon: Tag,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Con Descuento",
      value: services.filter((s) => Number.parseFloat(s.discount || "0") > 0).length,
      icon: Percent,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      title: "Precio Promedio",
      value: `${(services.reduce((acc, s) => acc + Number.parseFloat(s.price), 0) / services.length || 0).toFixed(0)} C$`,
      icon: DollarSign,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
            <CardContent className="">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
