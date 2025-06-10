/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import axios from "axios"
import type { Category, Service } from "@/types"
import { toast } from "sonner"

interface Props {
    open: boolean
    onClose: () => void
    onSaved: (service: Service) => void
    categories: Category[]
    serviceToEdit?: Service | null
}

export default function ServiceModal({ open, onClose, onSaved, categories, serviceToEdit = null }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        duration: "",
        category_id: "",
        image: null as File | null,
    })
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    useEffect(() => {
        if (serviceToEdit) {
            setForm({
                name: serviceToEdit.name,
                description: serviceToEdit.description,
                price: serviceToEdit.price.toString(),
                discount: serviceToEdit.discount.toString() ? serviceToEdit.discount.toString() : "0",
                duration: serviceToEdit.duration.toString(),
                category_id: serviceToEdit.category_id.toString(),
                image: null,
            })
        } else {
            setForm({
                name: "",
                description: "",
                price: "",
                discount: "",
                duration: "",
                category_id: "",
                image: null,
            })
        }
    }, [serviceToEdit])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, image: e.target.files[0] })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = new FormData()
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) data.append(key, value)
        })

        if (serviceToEdit) {
            data.append('_method', 'PUT')
        }

        try {
            const response = serviceToEdit
                ? await axios.post(`/services/${serviceToEdit.id}`, data)
                : await axios.post("/services", data)


            onSaved(response.data.service)
            onClose()
            setErrors({})
            toast.success("Event has been created.")
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                toast.error("Error al guardar el servicio.")
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{serviceToEdit ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Nombre</Label>
                        <Input name="name" value={form.name} onChange={handleChange} />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>}
                    </div>
                    <div>
                        <Label>Descripción</Label>
                        <Textarea name="description" value={form.description} onChange={handleChange} />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description[0]}</p>}
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label>Precio</Label>
                            <Input name="price" type="number" value={form.price} onChange={handleChange} />
                            {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price[0]}</p>}
                        </div>
                        <div className="flex-1">
                            <Label>Descuento</Label>
                            <Input name="discount" type="number" value={form.discount ? form.discount : 0.00} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <Label>Duración (min)</Label>
                        <Input name="duration" type="number" value={form.duration} onChange={handleChange} />
                        {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration[0]}</p>}
                    </div>
                    <div>
                        <Label>Categoría</Label>
                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}

                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-sm text-red-500 mt-1">{errors.category_id[0]}</p>}
                    </div>
                    <div>
                        <Label>Imagen</Label>
                        <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
                        {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image[0]}</p>}
                    </div>

                    <div className="text-right">
                        <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                            {serviceToEdit ? "Actualizar" : "Guardar"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
