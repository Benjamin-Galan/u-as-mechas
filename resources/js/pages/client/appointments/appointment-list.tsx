"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import type { Appointment } from "@/types"

interface AppointmentListProps {
  item: Appointment
  type: "recent" | "all"
  onViewDetails: (id: number) => void
}

export function AppointmentList({ item, type, onViewDetails }: AppointmentListProps) {
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

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">Cita #{item.id}</span>
              {getStatusBadge(item.status)}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.appointment_date)}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{item.appointment_time.substring(0, 5)}</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => onViewDetails(item.id)}>
            Ver detalles
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
