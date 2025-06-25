import { Head, usePage } from "@inertiajs/react"
import { Plus, Gift } from "lucide-react"
import type { BreadcrumbItem, Packages, Service } from "@/types"
import AppLayout from "@/layouts/app-layout"
import PackageList from "./package-list"
import { HeaderContent } from "@/components/header-content"
import { GenericModal } from "@/components/generic-modal"
import { PackageForm } from "./package-form"
import { usePackageManager } from "@/hooks/usePackageManager"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Paquetes",
    href: "/packages",
  },
]

export default function PackagesPage() {
  const { packages, services } = usePage().props as {
    packages?: Packages[]
    services?: Service[]
  }

  const {
    packageModal,
    packageToEdit,
    packageToDelete,
    deleteDialog,
    setPackageModal,
    setDeleteDialog,
    handleCloseModal,
    handleEdit,
    confirmDelete,
    handleDelete
  } = usePackageManager()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de paquetes" />

      <div className="p-4">
        <HeaderContent
          titleIcon={<Gift className="w-6 h-6 text-purple-600" />}
          buttonIcon={<Plus className="w-4 h-4" />}
          section="Promociones"
          article="todas las"
          onOpenModal={() => setPackageModal(true)}
        />

        <PackageList allPackages={packages} onEdit={handleEdit} onDelete={confirmDelete} />

        <GenericModal
          open={packageModal}
          onClose={handleCloseModal}
          titleType="Paquete"
          isEditing={!!packageToEdit}
          children={
            <PackageForm 
              onClose={handleCloseModal}
              currentPackage={packageToEdit}
              services={services}
            />
          }
        />

        <ConfirmDialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          onConfirm={handleDelete}
          title="¿Eliminar Paquete?"
          description={`¿Estás seguro de que deseas eliminar el paquete ${packageToDelete?.name}? Esta acción no se puede deshacer.`}
          confirmText="Sí, eliminar"
        />
      </div>
    </AppLayout>
  )
}
