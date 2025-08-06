import type { Service } from "@/types"
import { CreateNew } from "./create-new"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import ServiceOptions from "./service-options"
import { Badge } from "@/components/ui/badge"

interface ServicesProps {
  services?: Service[]
  onEdit?: (service: Service) => void
  onDelete?: (service: Service) => void
}

export default function ServicesList({ services, onEdit, onDelete }: ServicesProps) {
  if (!services || services.length === 0) {
    return <CreateNew type="servicios" />
  }

  const handleDiscount = (discount: string) => {
    const discountValue = Number.parseFloat(discount || "0")
    if (discountValue === 0) {
      return (
        <Badge
          variant="secondary"
          className="bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Sin descuento
        </Badge>
      )
    }
    return (
      <Badge
        variant="destructive"
        className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        -{discount}%
      </Badge>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <Card
          key={service.id}
          className="group  px-1 pt-1 pb-2transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden"
        >
          {/* Imagen del servicio */}
          <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={service.image ? `/storage/services/${service.image}` : "/placeholder.svg?height=200&width=400"}
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>


          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {service.name}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Categoría: {service.category?.name}</p>
              </div>
              <ServiceOptions onEdit={onEdit!} onDelete={onDelete!} service={service} />
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-0">
            {/* Precio y descuento */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">{service.price} C$</span>
              </div>
              {handleDiscount(String(service.discount))}
            </div>

            {/* Duración */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-full w-fit">
              <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              <span className="font-medium">{service.duration} minutos</span>
            </div>

            {/* Descripción */}
            {service.description && (
              <div className="space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
