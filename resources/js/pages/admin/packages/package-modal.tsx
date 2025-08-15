import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import type { Packages, Service } from "@/types"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"

interface Props {
    open: boolean
    onClose: () => void
    onSaved?: (savedPackage: Packages) => void
    packageToEdit: Packages | null
    services: Service[]
}

export default function PackageModal({ open, onClose, packageToEdit = null, services }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        discount: 0,
        is_active: true,
        services: [] as { service_id: number }[]
    })

    const [errors, setErrors] = useState<Record<string, string[]>>({})
    const [selectedServiceId, setSelectedServiceId] = useState<string>("")

    useEffect(() => {
        if (packageToEdit) {
            setForm({
                name: packageToEdit.name,
                description: packageToEdit.description,
                discount: packageToEdit.discount,
                is_active: packageToEdit.is_active,
                services: packageToEdit.services.map(s => ({ service_id: s.id })),
            })
        } else {
            setForm({
                name: "",
                description: "",
                discount: 0,
                is_active: true,
                services: []
            })
        }
    }, [packageToEdit])


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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const payload = {
            name: form.name,
            description: form.description,
            discount: form.discount,
            is_active: form.is_active,
            services: form.services
        }

        if (packageToEdit) {
            // Editar paquete
            router.put(`/packages/${packageToEdit.id}`, payload, {
                onSuccess: () => {
                    onClose()
                },
                onError: (errors) => setErrors(errors || {})
            })
        } else {
            // Crear paquete nuevo
            router.post('/packages', payload, {
                onSuccess: () => {
                    onClose()
                },
                onError: (errors) => setErrors(errors || {})
            })
        }
    }


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
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