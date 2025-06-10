"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { ServiceList } from "@/types"

interface ServicesProps {
  services: ServiceList
}

export default function Services({ services }: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-b from-beauty-light to-white relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-beauty-light blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full bg-beauty-soft blur-[100px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título de sección con decoración */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
            <div className="h-[1px] w-8 bg-beauty-medium"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestros Servicios</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Descubre nuestra exclusiva gama de servicios diseñados para realzar tu belleza natural
          </p>
        </div>

        {/* Grid de servicios con diseño mejorado */}
        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:space-y-0">
          {services.map((servicio) => (
            <div
              key={servicio.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex sm:flex-col"
              onMouseEnter={() => setHoveredCard(servicio.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Imagen con efecto hover */}
              <div className="w-32 sm:w-full aspect-square sm:aspect-[4/3] overflow-hidden flex-shrink-0">
                <img
                  src={`/storage/services/${servicio.image}`}
                  alt={servicio.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === servicio.id ? "scale-110" : "scale-100"
                  }`}
                />
              </div>

              {/* Contenido */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{servicio.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                    {servicio.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-beauty-deep font-bold text-base sm:text-lg">${servicio.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-beauty-medium text-beauty-deep hover:bg-beauty-medium hover:text-white transition-colors duration-300 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
                    onClick={() => alert(`Reservando ${servicio.name}`)}
                  >
                    Reservar
                  </Button>
                </div>
              </div>

              {/* Badge decorativo */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm text-beauty-deep hover:bg-white/80 px-2 py-1 rounded-full text-xs font-medium"
                >
                  Popular
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Botón "Ver todos los servicios" */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="border-beauty-medium text-beauty-deep hover:bg-beauty-medium hover:text-white transition-colors duration-300 px-8 py-3 rounded-full"
          >
            Ver todos los servicios
          </Button>
        </div>
      </div>
    </section>
  )
}
