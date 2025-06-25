import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { BreadcrumbItem, type Staff } from "@/types";
import StaffModal from "./staff-modal";
import StaffList from "./staff-list";
import { ConfirmDialog } from "@/components/confirm-delete-dialog";
import { useStaffManager } from "@/hooks/useStaffManager"


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Personal",
    href: "/staff",
  },
];

export default function Staff() {
  const { members: propsStaff = [] } = usePage().props as { members?: Staff[] };

  const {
    openModal,
    selectedStaff,
    selectedMember,
    isDialogOpen,
    setOpenModal,
    setIsDialogOpen,
    handleEdit,
    handleCloseModal,
    confirmDelete,
    handleDelete,
  } = useStaffManager();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Personal" />

      <div className="p-6">
          <div className="flex  justify-between items-center rounded-xl dark:shadow-sm mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestión de Personal</h1>
                <p className="text-gray-600 dark:text-gray-400">Aquí puedes gestionar todos los paquetes disponibles.</p>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpenModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Miembro
            </Button>
          </div>

        <StaffModal
          open={openModal}
          onClose={handleCloseModal}
          staff={selectedStaff}
        />

        <StaffList
          members={propsStaff}
          onEdit={handleEdit}
          confirmDelete={confirmDelete}
        />

        <ConfirmDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
          title="¿Eliminar miembro?"
          description={`¿Estás seguro de que deseas eliminar a ${selectedMember?.name}? Esta acción no se puede deshacer.`}
          confirmText="Sí, eliminar"
        />
      </div>
    </AppLayout>
  );
}
