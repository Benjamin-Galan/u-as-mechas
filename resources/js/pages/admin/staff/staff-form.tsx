"use client"

import type React from "react"

import { useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, Briefcase, UserCheck } from "lucide-react"
import type { Staff } from "@/types"

interface Props {
  staff?: Staff | null
  onSuccess: () => void
}

export default function StaffForm({ staff, onSuccess }: Props) {
  const isEdit = !!staff

  const { data, setData, post, put, processing, errors } = useForm({
    name: staff?.name ?? "",
    email: staff?.email ?? "",
    phone: staff?.phone ?? "",
    position: staff?.position ?? "",
    available: staff?.available ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const routeName = isEdit ? "staff.update" : "staff.store"
    const method = isEdit ? put : post
    const url = isEdit ? route(routeName, staff!.id) : route(routeName)

    method(url, {
      onSuccess,
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          {isEdit ? "Editar Personal" : "Agregar Personal"}
        </CardTitle>
        <CardDescription>
          {isEdit
            ? "Actualiza la información del miembro del personal"
            : "Completa los datos para agregar un nuevo miembro al equipo"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4" />
              Nombre completo
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              placeholder="Ingresa el nombre completo"
              className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4" />
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="ejemplo@correo.com"
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4" />
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Posición */}
          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center gap-2 text-sm font-medium">
              <Briefcase className="h-4 w-4" />
              Puesto de trabajo
            </Label>
            <Input
              id="position"
              value={data.position}
              onChange={(e) => setData("position", e.target.value)}
              placeholder="Ej: Desarrollador, Diseñador, Gerente..."
              className={errors.position ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
            {errors.position && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {errors.position}
              </p>
            )}
          </div>

          {/* Estado de disponibilidad - Solo en modo edición */}
          {isEdit && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <UserCheck className="h-4 w-4" />
                Estado de disponibilidad
              </Label>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{data.available ? "Disponible" : "No disponible"}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.available
                      ? "El personal está disponible para asignaciones"
                      : "El personal no está disponible actualmente"}
                  </p>
                </div>
                <Switch
                  id="available"
                  checked={data.available}
                  onCheckedChange={(checked) => setData("available", checked)}
                />
              </div>
            </div>
          )}

          {/* Botón de envío */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={processing} className="flex-1">
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {isEdit ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                <>{isEdit ? "Actualizar Personal" : "Crear Personal"}</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
