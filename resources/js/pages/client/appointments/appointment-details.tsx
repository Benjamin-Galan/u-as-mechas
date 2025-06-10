"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Phone, Package, Sparkles, Scissors } from "lucide-react"
import type { Appointment } from "@/types"

interface AppointmentDetailsProps {
  appointment: Appointment
  onBack: () => void
}

export function AppointmentDetails({ appointment, onBack }: AppointmentDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Confirmada
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            En espera
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelada
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Completada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTotalItems = () => {
    return appointment.services.length + appointment.promotions.length + appointment.packages.length
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Cita #{appointment.id}</CardTitle>
            {getStatusBadge(appointment.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{formatDate(appointment.appointment_date)}</p>
                <p className="text-sm text-muted-foreground">Fecha</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{appointment.appointment_time.substring(0, 5)}</p>
                <p className="text-sm text-muted-foreground">Hora</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Salón de Belleza</p>
                <p className="text-sm text-muted-foreground">Ubicación</p>
              </div>
            </div>
          </div>

          {appointment.services.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Scissors className="w-4 h-4" />
                  Servicios:
                </h4>
                <div className="space-y-2">
                  {appointment.services.map((service) => (
                    <div key={service.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                      <p className="font-semibold">
                        ${(Number.parseFloat(service.price) - Number.parseFloat(service.discount)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {appointment.promotions.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Promociones:
                </h4>
                <div className="space-y-2">
                  {appointment.promotions.map((promotion) => (
                    <div key={promotion.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{promotion.name}</p>
                        <p className="text-xs text-muted-foreground">{promotion.description}</p>
                      </div>
                      <p className="font-semibold">${Number.parseFloat(promotion.pivot.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {appointment.packages.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Paquetes:
                </h4>
                <div className="space-y-2">
                  {appointment.packages.map((pkg) => (
                    <div key={pkg.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-xs text-muted-foreground">{pkg.description}</p>
                      </div>
                      <p className="font-semibold">${Number.parseFloat(pkg.pivot.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold text-primary">
              ${Number.parseFloat(appointment.total_price).toFixed(2)}
            </span>
          </div>

          {appointment.status === "pending" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-700">
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={onBack} className="w-full">
        Volver a mis citas
      </Button>
    </div>
  )
}
