import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Category, ServiceList } from "@/types"
import ServicesList from './services-list'
import Filters from './filters'
import ServiceStats from './service-stats'
import ServiceModal from "./service-modal"
import { useMemo, useState } from "react"
import { HandHelping, Plus } from "lucide-react"
import { useServiceManager } from "@/hooks/useServiceManager"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"
import { HeaderContent } from "@/components/header-content"

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
        services?: ServiceList
        categories?: Category[]
    }
    const categoryOptions = categories?.map((cat) => ({
        label: cat.name,
        value: String(cat.id),
    })) || []

    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [priceOrder, setPriceOrder] = useState<"asc" | "desc">("asc")
    const {
        openModal,
        serviceToEdit,
        serviceToDelete,
        isDialogOpen,
        setOpenModal,
        setIsDialogOpen,
        handleEdit,
        handleCloseModal,
        confirmDelete,
        handleDelete,
    } = useServiceManager()

    const filteredServices = useMemo(() => {
        const filtered = servicesProps.filter((service) => {
            const name = service.name.toLowerCase()
            const matchesName = name.includes(search.toLowerCase())
            const matchesCategory = selectedCategory ? service.category_id === selectedCategory : true
            return matchesName && matchesCategory
        })

        const sorted = [...filtered].sort((a, b) => {
            const priceA = parseFloat(a.price)
            const priceB = parseFloat(b.price)
            return priceOrder === "asc" ? priceA - priceB : priceB - priceA
        })

        return sorted
    }, [servicesProps, search, selectedCategory, priceOrder])


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />

            <div className="p-4">
                <HeaderContent
                    titleIcon={<HandHelping className="w-6 h-6 text-purple-600" />}
                    buttonIcon={<Plus className="w-4 h-4" />}
                    section="Servicios"
                    article="todos los"
                    onOpenModal={() => setOpenModal(true)}
                />

                <ServiceStats
                    services={servicesProps}
                    categories={categories}
                />

                <Filters
                    onSearchChange={setSearch}
                    onCategoryChange={(value) => setSelectedCategory(Number(value))}
                    onPriceOrderChange={setPriceOrder}
                    categories={categoryOptions}
                />

                <ServicesList
                    services={filteredServices}
                    onEdit={handleEdit}
                    onDelete={confirmDelete}
                />

                <ServiceModal
                    open={openModal}
                    onClose={handleCloseModal}
                    categories={categories || []}
                    service={serviceToEdit}
                />

                <ConfirmDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onConfirm={handleDelete}
                    title="¿Eliminar servicio?"
                    description={`¿Estás seguro de que deseas eliminar el servicio ${serviceToDelete?.name}? Esta acción no se puede deshacer.`}
                    confirmText="Sí, eliminar"
                />
            </div>
        </AppLayout>
    )
}