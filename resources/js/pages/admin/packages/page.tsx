import { Head, usePage } from "@inertiajs/react"
import { Plus, Gift } from "lucide-react"
import type { BreadcrumbItem, Packages, Service } from "@/types"
import AppLayout from "@/layouts/app-layout"
import PackageList from "./package-list"
import { HeaderContent } from "@/components/header-content"
import { usePackageManager } from "@/hooks/usePackageManager"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"
import PackageModal from "./package-modal"

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
          section="Paquetes"
          article="todos los"
          onOpenModal={() => setPackageModal(true)}
        />

        <PackageList allPackages={packages} onEdit={handleEdit} onDelete={confirmDelete} />

        <PackageModal
          open={packageModal}
          onClose={handleCloseModal}
          packageToEdit={packageToEdit}
          services={services!}
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
