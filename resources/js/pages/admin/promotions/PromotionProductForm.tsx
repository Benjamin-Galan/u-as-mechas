import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Service } from "@/types"

interface Props {
  services: Service[]
  selectedServices: {
    service_id: number
    name: string
    price: number
    discount: number
  }[]
  onChange: (services: Props["selectedServices"]) => void
}

export default function PromotionProductForm({ services, selectedServices, onChange }: Props) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("")

  const applyDiscount = (price: number, discount: number) => parseFloat((price - (price * discount / 100)).toFixed(2))

  const handleAddService = () => {
    const service = services.find(s => s.id === parseInt(selectedServiceId))
    if (!service) return

    const alreadyAdded = selectedServices.some(s => s.service_id === service.id)
    if (alreadyAdded) return

    const newService = {
      service_id: service.id,
      name: service.name,
      price: service.price,
      discount: 0 // Se define manualmente luego
    }

    onChange([...selectedServices, newService])
    setSelectedServiceId("")
  }

  const handleDiscountChange = (index: number, discount: number) => {
    const updated = [...selectedServices]
    updated[index].discount = discount
    onChange(updated)
  }

  const handleRemoveService = (id: number) => {
    onChange(selectedServices.filter(s => s.service_id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Agregar servicio</Label>
        <div className="flex items-center gap-2">
          <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map(service => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} - ${service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" onClick={handleAddService}>Agregar</Button>
        </div>
      </div>

      <div className="space-y-2">
        {selectedServices.map((service, index) => (
          <div key={service.service_id} className="border p-3 rounded space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{service.name} <span className="text-sm text-muted-foreground">(${service.price})</span></p>
                <p className="text-sm text-muted-foreground">
                  Precio final:{" "}
                  <span className="text-green-600 font-semibold">
                    ${applyDiscount(service.price, service.discount)}
                  </span>
                </p>
              </div>
              <Button variant="destructive" onClick={() => handleRemoveService(service.service_id)}>Quitar</Button>
            </div>

            <div className="flex items-center gap-2">
              <Label>Descuento (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={service.discount}
                onChange={(e) => handleDiscountChange(index, parseFloat(e.target.value))}
              />
              <Badge variant="secondary">{service.discount}%</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
