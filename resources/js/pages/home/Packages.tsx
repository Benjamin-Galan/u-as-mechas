"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import type { PackagesList } from "@/types"

interface PackageListProps {
  packages: PackagesList
}

export default function Packages({ packages }: PackageListProps) {
  const handleBadge = (packageName: string) => {
    switch (packageName) {
      case "Paquete básico":
        return (
          <Badge
            variant="secondary"
            className="bg-beauty-light text-beauty-deep hover:bg-beauty-light px-3 py-1 rounded-full text-sm font-semibold"
          >
            Básico
          </Badge>
        )
      case "Paquete premium":
        return (
          <Badge
            variant="secondary"
            className="bg-beauty-soft text-beauty-dark hover:bg-beauty-soft px-3 py-1 rounded-full text-sm font-semibold"
          >
            Premium
          </Badge>
        )
      case "Paquete Deluxe":
        return (
          <Badge
            variant="secondary"
            className="bg-beauty-medium text-white hover:bg-beauty-medium px-3 py-1 rounded-full text-sm font-semibold"
          >
            Deluxe
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-beauty-light to-beauty-soft/20">
      <div className="container mx-auto px-4">
        {/* Título y Descripción */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Paquetes Especiales</h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Combina nuestros servicios y ahorra con estos paquetes diseñados para ti.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pack) => (
            <Card
              key={pack.id}
              className="flex flex-col justify-between hover:scale-105 hover:shadow-lg transition-all duration-300 bg-white border border-gray-200"
            >
              <CardHeader className="relative">
                <div className="absolute top-0 right-2">{handleBadge(pack.name)}</div>
                <CardTitle className="text-xl font-bold text-gray-800 pr-20">{pack.name}</CardTitle>
                <CardDescription className="text-gray-600">{pack.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-2xl font-bold text-beauty-deep">
                    ${pack.total}
                    <span className="text-xs text-gray-500 font-normal"> / sesión</span>
                  </span>
                </div>

                {/* Lista de servicios con checkmarks */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {pack.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-beauty-medium flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{service.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="bg-beauty-deep hover:bg-beauty-dark text-white transition-all duration-300 w-full"
                  onClick={() => alert(`Reservando ${pack.name}`)}
                >
                  Reservar ahora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
