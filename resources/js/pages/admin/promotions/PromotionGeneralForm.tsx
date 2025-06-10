"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Service } from "@/types"

interface Props {
  services: Service[]
  selectedServices: {
    service_id: number
    name: string
    price: number
    discount: number
    is_bogo?: boolean
  }[]
  onChange: (services: Props["selectedServices"]) => void
}

export default function PromotionGeneralForm({ services, selectedServices, onChange }: Props) {
  const [generalDiscount, setGeneralDiscount] = useState<number>(0)
  const [selectedServiceId, setSelectedServiceId] = useState<string>("")

  const applyDiscount = (price: number) => Number.parseFloat((price - (price * generalDiscount) / 100).toFixed(2))

  const handleAddService = () => {
    const service = services.find((s) => s.id === Number.parseInt(selectedServiceId))
    if (!service) return

    const alreadyAdded = selectedServices.some((s) => s.service_id === service.id)
    if (alreadyAdded) return

    const newService = {
      service_id: service.id,
      name: service.name,
      price: service.price,
      discount: generalDiscount,
      is_bogo: false, // Agregar campo faltante
    }

    onChange([...selectedServices, newService])
    setSelectedServiceId("")
  }

  const handleRemoveService = (id: number) => {
    onChange(selectedServices.filter((s) => s.service_id !== id))
  }

  useEffect(() => {
    // Actualiza los descuentos si cambia el porcentaje general
    const updated = selectedServices.map((service) => ({
      ...service,
      discount: generalDiscount,
    }))
    onChange(updated)
  }, [generalDiscount])

  // Debug: mostrar servicios seleccionados
  console.log("Servicios seleccionados en PromotionGeneralForm:", selectedServices)

  return (
    <div className="space-y-4">
      <div>
        <Label>Descuento General (%)</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={generalDiscount}
          onChange={(e) => setGeneralDiscount(Number.parseFloat(e.target.value) || 0)}
        />
      </div>

      <div>
        <Label>Agregar servicio</Label>
        <div className="flex items-center gap-2">
          <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} - ${service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={handleAddService}>
            Agregar
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {selectedServices.map((service) => (
          <div key={service.service_id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">
                {service.name} <span className="text-sm text-muted-foreground">(${service.price})</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Descuento aplicado: <Badge variant="secondary">{service.discount}%</Badge> →{" "}
                <span className="text-green-600 font-semibold">${applyDiscount(service.price)}</span>
              </p>
            </div>
            <Button variant="destructive" onClick={() => handleRemoveService(service.service_id)}>
              Quitar
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
