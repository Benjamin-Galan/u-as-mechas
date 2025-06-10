"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Calendar, Edit, MoreVertical, Trash2, Users, DollarSign, Tag, Clock } from "lucide-react"
import type { Promotions } from "@/types"

interface PromotionCardProps {
  promotion: Promotions
  onEdit: (promotion: Promotions) => void
  onDelete: (promotionId: number) => void
  onToggleStatus: (promotionId: number, isActive: boolean) => void
}

export default function PromotionCard({ promotion, onEdit, onDelete, onToggleStatus }: PromotionCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getTypeLabel = (type: string) => {
    const types = {
      general: "Descuento General",
      individual: "Por Producto",
      mixed: "Variados",
    }
    return types[type as keyof typeof types] || type
  }

  const getTypeColor = (type: string) => {
    const colors = {
      general: "bg-blue-100 text-blue-800",
      individual: "bg-green-100 text-green-800",
      mixed: "bg-purple-100 text-purple-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const isExpired = new Date(promotion.end_date) < new Date()
  const isActive = promotion.is_active && !isExpired

  return (
    <>
      <Card
        className={`h-full transition-all duration-200 hover:shadow-lg ${
          !isActive ? "opacity-75 border-gray-300" : "border-gray-200"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{promotion.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getTypeColor(promotion.type)}>
                  <Tag className="w-3 h-3 mr-1" />
                  {getTypeLabel(promotion.type)}
                </Badge>
                <Badge variant={isActive ? "default" : "secondary"}>
                  {isActive ? "Activa" : isExpired ? "Expirada" : "Inactiva"}
                </Badge>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(promotion)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(promotion.id, !promotion.is_active)}>
                  <Clock className="mr-2 h-4 w-4" />
                  {promotion.is_active ? "Desactivar" : "Activar"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600 focus:text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Imagen de la promoción */}
          {promotion.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={`/storage/promotions/${promotion.image}`}
                alt={promotion.name}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=128&width=256"
                }}
              />
            </div>
          )}

          {/* Descripción */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{promotion.description}</p>

          {/* Información de precios */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500">Subtotal</p>
              <p className="font-semibold text-gray-900">${promotion.subtotal}</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-green-600">Total</p>
              <p className="font-semibold text-green-700">${promotion.total}</p>
            </div>
          </div>

          {/* Servicios incluidos */}
          {promotion.services && promotion.services.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-500">
                  {promotion.services.length} servicio{promotion.services.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {promotion.services.slice(0, 3).map((service) => (
                  <Badge key={service.id} variant="outline" className="text-xs">
                    {service.name}
                  </Badge>
                ))}
                {promotion.services.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{promotion.services.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex items-center justify-between w-full text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Inicio: {formatDate(promotion.start_date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>Fin: {formatDate(promotion.end_date)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Dialog de confirmación para eliminar */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la promoción "{promotion.name}" y se
              desvinculará de todos los servicios asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(promotion.id)
                setShowDeleteDialog(false)
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
