import { Head, usePage, route } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Category, Service, ServiceList } from "@/types"

import { Edit, Trash, Plus, Tag, PenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ServicesList from './services-list'
import Filters from './filters'
import { useMemo, useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Servicios",
        href: "/services",
    },
]

export default function Services() {
    const { categories, services: servicesProps = [] } = usePage().props as {
        services?: Service[]
        categories?: Category[]
    }
    const [search, setSearch] = useState("")


     const filteredServices = useMemo(() => {
        return servicesProps.filter((service) => {
            const name = service.name.toLowerCase() || "";
            const matchesName = name.includes(search.toLowerCase());

            return matchesName
        })
     }, [servicesProps, search])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h1>
                        <p className="text-gray-600">Aquí puedes gestionar todos los servicios disponibles</p>
                    </div>

                    <Button >
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo servicio
                    </Button>
                </div>

                <Filters 
                    onSearchChange={setSearch}
                />

                <ServicesList
                    services={filteredServices}
                    // onEdit={handleEdit}
                    // onDelete={handleDelete}
                    // onToggleStatus={handleToggleStatus}
                />
            </div>

        </AppLayout>
    )
}