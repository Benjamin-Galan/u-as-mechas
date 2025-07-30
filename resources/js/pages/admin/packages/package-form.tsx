import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category, Packages, Service } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";

interface Props {
    services?: Service[]
    currentPackage: Packages | null
    onClose: () => void
}

export function PackageForm ({services, currentPackage, onClose}: Props) {
    const isEdit = !!currentPackage
    const { errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        name: currentPackage?.name ?? "",
        description: currentPackage?.description ?? "",
        is_active: currentPackage?.is_active ?? false,
        discount: currentPackage?.discount ?? 0.00,
        subtotal: currentPackage?.subtotal ?? 0.00,
        total: currentPackage?.total ?? 0.00,
        services: currentPackage?.services ?? []
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        console.log('Enviando...')
    }

    return (
        <form action="">
            <div className="space-y-2">
                <Label>Nombre del paquete</Label>
                <Input 
                    name=""
                />
            </div>
        </form>
    )
}