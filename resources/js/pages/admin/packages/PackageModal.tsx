import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import type { Packages, Service } from "@/types"
import { useState } from "react"
import axios from "axios"

interface Props {
    open: boolean
    onClose: () => void
    onSaved: (savedPackage: Packages) => void
    packageToEdit: Packages | null
    services: Service[]
}

export default function PackageModal({ open, onClose, packageToEdit = null, services }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        discount: "",
        is_active: true,
        services: [] as { service_id: number }[]
    })

    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [selectedServiceId, setSelectedServiceId] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleAddService = () => {
        const serviceId = Number.parseInt(selectedServiceId)
        if (!serviceId) return

        // Ya está en el array
        if (form.services.some((s) => s.service_id === serviceId)) return

        setForm((prevForm) => ({
            ...prevForm,
            services: [...prevForm.services, { service_id: serviceId }]
        }))

        setSelectedServiceId("") // limpiar selección
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const payload = new FormData()
        payload.append("name", form.name)
        payload.append("description", form.description)
        payload.append("discount", form.discount)
        payload.append("is_active", form.is_active ? 'true' : 'false')
        payload.append("services", JSON.stringify(form.services))

        try {


            if (packageToEdit) {
                payload.append('_method', 'PUT')
                await axios.post(`/packages/${packageToEdit.id}`, payload)
            } else {
                await axios.post("/packages", payload)
            }


            onClose()
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                setErrors(error.response.data.errors || {})
            } else {
                alert("Ocurrió un error al guardar la promoción.")
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{packageToEdit ? 'Editar Paquete' : 'Nuevo Paquete'}</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmit} >
                    <div>
                        <Label>Nombre</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Ej: Paquete básico"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}
                    </div>

                    <div>
                        <Label>Descripción</Label>
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label>Porcentaje de descuento</Label>
                        <Input
                            type="number"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
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

                    {form.services.length > 0 && (
                        <div className="mt-2 space-y-1">
                            <Label className="text-sm">Servicios seleccionados:</Label>
                            <ul className="text-sm text-gray-700 list-disc pl-5">
                                {form.services.map((item, index) => {
                                    const service = services.find(s => s.id === item.service_id)
                                    return (
                                        <li key={index}>
                                            {service?.name || "Servicio no encontrado"}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    <Button>
                        {packageToEdit ? 'Actualizar' : 'Guardar'}
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    )
}