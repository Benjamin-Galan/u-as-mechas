"use client"

import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem, Category, PaginatedService } from "@/types"
import ServicesList from "./services-list"
import Filters from "./filters"
import ServiceStats from "./service-stats"
import ServiceModal from "./service-modal"
import CategoriesModal from "./categories-modal"
import CategoriesSidebar from "./categories-sidebar"
import { useState } from "react"
import { HandHelping, Plus } from "lucide-react"
import { useServiceManager } from "@/hooks/useServiceManager"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"
import { HeaderContent } from "@/components/header-content"
import { useCategoryManager } from "@/hooks/use-category-manager"

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
  const { categories: initialCategories, services: servicesProps } = usePage().props as {
    services?: PaginatedService
    categories?: Category[]
  }

  console.log(servicesProps, 'servicios')
  console.log(initialCategories, 'categorías')

  const [isCategoriesSidebarOpen, setIsCategoriesSidebarOpen] = useState(false)

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

  const {
    categoryModalOpen,
    categoryToEdit,
    handleOpenModal,
    handleCloseCatModal,
    handleDeleteCategory,
  } = useCategoryManager();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Servicios" />

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <HeaderContent
            titleIcon={<HandHelping className="w-6 h-6 text-purple-600" />}
            buttonIcon={<Plus className="w-4 h-4" />}
            section="Servicios"
            article="todos los"
            onOpenModal={() => setOpenModal(true)}
            onCategories={() => setIsCategoriesSidebarOpen(true)}
          />
        </div>

        <ServiceStats services={servicesProps!} categories={initialCategories} />

        <Filters categories={initialCategories!} />

        <ServicesList services={servicesProps!} onEdit={handleEdit} onDelete={confirmDelete} />

        <ServiceModal
          open={openModal}
          onClose={handleCloseModal}
          categories={initialCategories || []}
          service={serviceToEdit}
        />

        <CategoriesModal
          open={categoryModalOpen}
          onClose={handleCloseCatModal}
          category={categoryToEdit}
        />

        <CategoriesSidebar
          isOpen={isCategoriesSidebarOpen}
          onClose={() => setIsCategoriesSidebarOpen(false)}
          categories={initialCategories!}
          onOpenModal={handleOpenModal}
          onCategoryDeleted={handleDeleteCategory}
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
