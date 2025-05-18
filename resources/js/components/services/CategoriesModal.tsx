import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { useState, useEffect } from "react"
import axios from "axios"
import type { Category } from "@/types"
import { toast } from "sonner"

interface Props {
    open: boolean,
    onClose: () => void,
    onSaved: (category: Category) => void
    categories: Category[]
    categoryToEdit?: Category | null
}

export default function CategoriesModal({ open, onClose, onSaved, categoryToEdit = null }: Props) {
    const [form, setForm] = useState({
        name: ""
    })
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    useEffect(() => {
        if (categoryToEdit) {
            setForm({
                name: categoryToEdit.name
            })
        } else {
            setForm({
                name: ""
            })
        }
    }, [categoryToEdit])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = new FormData
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) data.append(key, value)
        })

        if (categoryToEdit) {
            data.append('_method', 'PUT')
        }

        try {
            const response = categoryToEdit
                ? await axios.post(`/categories/${categoryToEdit.id}`, data)
                : await axios.post('/categories', data)

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
                    <DialogTitle>{categoryToEdit ? 'Editar categoría' : 'Nueva Categoría'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Nombre</Label>
                        <Input name="name" value={form.name} onChange={handleChange} />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name[0]}</p>}
                    </div>

                    <div className="text-right">
                        <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                            {categoryToEdit ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}