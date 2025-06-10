import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Promotions, Service } from "@/types"
import { useState } from "react"
import axios from "axios"
import PromotionGeneralForm from "./PromotionGeneralForm"
import PromotionProductForm from "./PromotionProductForm"
import PromotionCategoryForm from "./PromotionCategoryForm"

interface Props {
    open: boolean
    onClose: () => void
    onSaved: (promotion: Promotions) => void
    promotionToEdit?: Promotions | null
    services: Service[]
}

export default function PromotionModal({ open, onClose, services, onSaved, promotionToEdit = null }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: null as File | null,
        type: "",
        start_date: "",
        end_date: "",
        is_active: true,
        subtotal: 0,
        total: 0,
        services: [] as {
            service_id: number
            name: string
            price: number
            discount: number
        }[]
    })

    const [errors, setErrors] = useState<Record<string, string[]>>({})

    console.log(services)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setForm({ ...form, image: e.target.files[0] })
        }
    }

    const calculatePrices = (services: typeof form.services) => {
        const subtotal = services.reduce((acc, s) => + s.price, 0)
        const total = services.reduce((acc, s) => acc + (s.price - (s.price * s.discount / 100)), 0)
        return { subtotal, total }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        const { subtotal, total } = calculatePrices(form.services)

        const payload = new FormData()
        payload.append("name", form.name)
        payload.append("description", form.description)
        payload.append("type", form.type)
        payload.append("start_date", form.start_date)
        payload.append("end_date", form.end_date)
        payload.append("is_active", form.is_active ? "1" : "0")
        payload.append("subtotal", subtotal.toString())
        payload.append("total", total.toString())
        payload.append("services", JSON.stringify(form.services))

        if (form.image) {
            payload.append("image", form.image)
        }

        try {
            let response;

            if (promotionToEdit) {
                payload.append('_method', 'PUT')
                response = await axios.post(`/promotions/${promotionToEdit.id}`, payload)
            } else {
                response = await axios.post("/promotions", payload)
            }

            onSaved(response.data)
            onClose()
        } catch (error: any) {
            if (error.response?.status === 422) {
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
                    <DialogTitle>{promotionToEdit ? "Editar promoción" : "Agregar promoción"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Nombre</Label>
                        <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ej: Promoción de Verano"
                        />
                    </div>

                    <div>
                        <Label>Descripción</Label>
                        <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Ej: Nueva promoción de verano" />
                    </div>

                    <div>
                        <Label>Imagen</Label>
                        <Input name="image" type="file" accept="image/*" onChange={handleImageChange} />
                        {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image[0]}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="promo-type">Tipo de promoción</Label>
                        <Select name="type" value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                            <SelectTrigger id="promo-type">
                                <SelectValue placeholder="Selecciona un tipo de promoción" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">Descuento General</SelectItem>
                                <SelectItem value="individual">Descuento por Producto</SelectItem>
                                <SelectItem value="mixed">Variados (Descuentos o 2x1</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {form.type === "general" && (
                        <PromotionGeneralForm
                            services={services}
                            selectedServices={form.services}
                            onChange={(updatedServices) => setForm(prev => ({ ...prev, services: updatedServices }))}
                        />
                    )}

                    {form.type === "individual" && (
                        <PromotionProductForm
                            services={services}
                            selectedServices={form.services}
                            onChange={(updatedServices) => setForm(prev => ({ ...prev, services: updatedServices }))}
                        />
                    )}

                    {form.type === "mixed" && (
                        <PromotionCategoryForm
                            services={services}
                            selectedServices={form.services}
                            onChange={(updatedServices) => setForm(prev => ({ ...prev, services: updatedServices }))}
                        />
                    )}

                    <div>
                        <Label>Fecha de inicio</Label>
                        <Input
                            type="date"
                            name="start_date"
                            value={form.start_date}
                            onChange={handleChange}
                            placeholder="Selecciona la fecha de inicio"
                        />
                    </div>

                    <div>
                        <Label>Fecha de finalización</Label>
                        <Input
                            type="date"
                            name="end_date"
                            value={form.end_date}
                            onChange={handleChange}
                            placeholder="Selecciona la fecha de finalización"
                        />
                    </div>


                    <Button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 w-full"
                    >
                        {promotionToEdit ? "Actualizar promoción" : "Guardar promoción"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}