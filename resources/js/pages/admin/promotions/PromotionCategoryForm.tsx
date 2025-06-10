import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function PromotionCategoryForm({ services, selectedServices, onChange }: Props) {
  const [generalDiscount, setGeneralDiscount] = useState<number>(0)
  const [isTwoForOne, setIsTwoForOne] = useState<boolean>(false)
  const [selectedServiceId, setSelectedServiceId] = useState<string>("")

  useEffect(() => {
    if (isTwoForOne) {
      const updated = selectedServices.map(service => ({
        ...service,
        discount: 50, // 2x1 equivale a 50%
      }))
      onChange(updated)
    } else {
      const updated = selectedServices.map(service => ({
        ...service,
        discount: generalDiscount,
      }))
      onChange(updated)
    }
  }, [generalDiscount, isTwoForOne])

  const applyDiscount = (price: number, discount: number) => parseFloat((price - (price * discount / 100)).toFixed(2))

  const handleAddService = () => {
    const service = services.find(s => s.id === parseInt(selectedServiceId))
    if (!service) return

    const alreadyAdded = selectedServices.some(s => s.service_id === service.id)
    if (alreadyAdded) return

    const discount = isTwoForOne ? 50 : generalDiscount

    const newService = {
      service_id: service.id,
      name: service.name,
      price: service.price,
      discount
    }

    onChange([...selectedServices, newService])
    setSelectedServiceId("")
  }

  const handleRemoveService = (id: number) => {
    onChange(selectedServices.filter(s => s.service_id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isTwoForOne}
          onCheckedChange={(checked) => setIsTwoForOne(!!checked)}
        />
        <Label>¿Aplicar 2x1 en vez de descuento?</Label>
      </div>

      {!isTwoForOne && (
        <div>
          <Label>Descuento General (%)</Label>
          <Input
            type="number"
            value={generalDiscount}
            onChange={(e) => setGeneralDiscount(parseFloat(e.target.value))}
            min={0}
            max={100}
          />
        </div>
      )}

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
        {selectedServices.map(service => (
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

            <p className="text-sm text-muted-foreground">
              {isTwoForOne
                ? <>Descuento 2x1 aplicado: <Badge variant="outline">50%</Badge></>
                : <>Descuento aplicado: <Badge variant="secondary">{service.discount}%</Badge></>
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
