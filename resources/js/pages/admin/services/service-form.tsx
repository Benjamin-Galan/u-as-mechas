import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category, Service } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";

interface Props {
    categories: Category[]
    service?: Service | null
    onSuccess: () => void
}

export default function ServiceForm({ categories, service, onSuccess }: Props) {
    const isEdit = !!service;
    const { errors } = usePage().props;

    const { data, setData, post, processing } = useForm<{
        name: string
        description: string
        price: string
        discount: string
        duration: string
        category_id: string
        image: File | null // <- aquí le dices que puede ser File
    }>({
        name: service?.name ?? "",
        description: service?.description ?? "",
        price: service?.price.toString() ?? "",
        discount: service?.discount.toString() ?? "0.00",
        duration: service?.duration.toString() ?? "0",
        category_id: service?.category_id.toString() ?? "",
        image: null,
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            router.post(`/services/${service?.id}`, {
                _method: 'put',
                ...data,
            }, {
                onSuccess
            })
        } else {
            post('/services', {
                onSuccess
            })
        }
    };


    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 grid grid-cols-2 gap-2">
            <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    Nombre del Servicio
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

            <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                    Precio del servicio
                </Label>
                <Input
                    id="price"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    placeholder="Ingresa el precio"
                    className={errors.price ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.price && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.price}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="discount" className="flex items-center gap-2 text-sm font-medium">
                    Descuento del servicio
                </Label>
                <Input
                    id="discount"
                    value={data.discount}
                    onChange={(e) => setData("discount", e.target.value)}
                    placeholder="Ingresa el precio"
                    className={errors.discount ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.discount && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.discount}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium">
                    Duracion del servicio
                </Label>
                <Input
                    id="duration"
                    value={data.duration}
                    onChange={(e) => setData("duration", e.target.value)}
                    placeholder="Ingresa el precio"
                    className={errors.duration ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.duration && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.duration}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="category_id" className="text-sm font-medium">
                    Categoría
                </Label>
                <Select
                    value={data.category_id}
                    onValueChange={(value) => setData("category_id", value)}
                >
                    <SelectTrigger id="category_id">
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>

                    <SelectContent className="overflow-y-scroll max-h-60">
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="text-red-500">•</span>
                        {errors.category_id}
                    </p>
                )}
            </div>

            <div>
                <Label>Imagen</Label>
                <Input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                />
                {errors.image && <p className="text-sm text-red-500 mt-1">{errors.image[0]}</p>}
            </div>

            <div className="col-span-2">
                <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                        Descripción del Servicio
                    </Label>
                    <Textarea name="description" value={data.description} onChange={(e) => setData("description", e.target.value)} />
                    {errors.description && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <span className="text-red-500">•</span>
                            {errors.description}
                        </p>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={processing} className="flex-1">
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                {isEdit ? "Actualizando..." : "Creando..."}
                            </>
                        ) : (
                            <>{isEdit ? "Actualizar Servicio" : "Crear Servicio"}</>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    )
}