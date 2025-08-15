import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {useCategoryForm} from '@/hooks/use-category-form'
import { Category } from '@/types'

interface Props {
    category?: Category | null
    onSuccess: () => void
}

export function CategoryForm({ category, onSuccess }: Props) {
    const { data, setData, errors, processing, isEdit, handleSubmit } = useCategoryForm(category, onSuccess)

    return (

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Ingresa el nombre de la categoría"
                    disabled={processing}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Botón de envío */}
            <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={processing} className="flex-1">
                    {processing ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            {isEdit ? "Actualizando..." : "Creando..."}
                        </>
                    ) : (
                        <>{isEdit ? "Actualizar Categoría" : "Crear Categoría"}</>
                    )}
                </Button>
            </div>
        </form>
    )
}