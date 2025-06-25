"use client"

import { CheckCircle2 } from "lucide-react"

interface Service {
  name: string
}

interface PackageServicesProps {
  services: Service[]
  className?: string
}

export default function PackageServices({ services, className = "" }: PackageServicesProps) {
  if (!services || services.length === 0) {
    return (
      <div className={`text-sm text-gray-500 dark:text-gray-400 italic ${className}`}>No hay servicios incluidos</div>
    )
  }

  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        Servicios incluidos:
      </h4>
      <div className="space-y-2">
        {services.map((service, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full flex-shrink-0" />
            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
