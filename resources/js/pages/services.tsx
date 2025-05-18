"use client"

import { Head, usePage } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { useState, useEffect } from "react"
import { Edit, Trash, Plus, Tag, PenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { BreadcrumbItem } from "@/types"
import ServiceModal from "@/components/services/ServiceModal"
import CategoriesModal from "@/components/services/CategoriesModal"
import axios from "axios"
import { toast } from "sonner"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"

// Definimos las migas de pan para esta página
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

// Tipo para las categorías
interface Category {
  id: number
  name: string
  created_at: string
  updated_at: string
}

interface Service {
  id: number
  name: string
  description: string
  price: number
  discount: number
  duration: number
  image: string
  category_id: number
  created_at: string
  updated_at: string
}


export default function Services() {
  // Obtener categorías de las props (o usar datos de ejemplo si no están disponibles)
  const { categories: propCategories = [], services: propServices = [] } = usePage().props as {
    categories?: Category[]
    services?: Service[]
  }

  // Si no hay categorías en las props, usar estas categorías de ejemplo

  //const categories = propCategories.length > 0 ? propCategories : []

  const [services, setServices] = useState<Service[]>(propServices)
  const [categories, setCategories] = useState<Category[]>(propCategories)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<Service[]>(propServices)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [servicemodalOpen, setServiceModalOpen] = useState(false)
  const [categoryModalOpen, setcategoryModalOpen] = useState(false)
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null)
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null)
  const [, setCategoryToDelete] = useState<number | null>(null)

  // Filtrar servicios cuando cambia la categoría seleccionada
  useEffect(() => {
    let filtered = services

    if (selectedCategory !== null) {
      filtered = filtered.filter((service) => service.category_id === selectedCategory)
    }

    if (searchTerm.trim() !== "") {
      const lowerSearh = searchTerm.toLowerCase()
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(lowerSearh) ||
        service.description.toLowerCase().includes(lowerSearh)
      )
    }

    setFilteredServices(filtered)
  }, [selectedCategory, searchTerm, services])

  //Abrir el modal de servicios
  const openCreateModal = () => {
    setServiceToEdit(null)
    setServiceModalOpen(true)
  }

  //Abrir el modal de edicion servicios
  const openEditModal = (service: Service) => {
    setServiceToEdit(service)
    setServiceModalOpen(true)
  }

  //Guardar el servicio
  const handleServiceSaved = (service: Service) => {
    const updated = services.filter((s) => s.id !== service.id).concat(service)
    setServices(updated)
  }

  const openCreateCategoryModal = () => {
    setCategoryToEdit(null)
    setcategoryModalOpen(true)
  }

  const openEditCategoryModal = (category: Category) => {
    setCategoryToEdit(category)
    setcategoryModalOpen(true)
  }

  const handleCategorySaved = (category: Category) => {
    const updated = categories.filter((c) => c.id !== category.id).concat(category)
    setCategories(updated)
  }

  const handleDeleteRequest = (id: number) => {
    setServiceToDelete(id)
    setDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!serviceToDelete) return

    try {
      await axios.delete(`/services/${serviceToDelete}`)
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete))
      toast.success("Servicio eliminado exitosamente.")
    } catch (error) {
      console.error("Error al eliminar el servicio", error)
      toast.error("Hubo un error al eliminar el registro")
    }
  }

  const handleDeleteCategoryRequest = (id: number) => {
    setCategoryToDelete(id);
    setDialogOpen(true);
  };

  // const handleDeleteCategory = async () => {
  //   if (!categoryToDelete) return;

  //   try {
  //     await axios.delete(`/categories/${categoryToDelete}`);
  //     setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete));
  //     toast.success("Categoría eliminada exitosamente.");
  //   } catch (error) {
  //     console.error("Error al eliminar la categoría", error);
  //     toast.error("Hubo un error al eliminar el registro");
  //   } finally {
  //     setDialogOpen(false);
  //     setCategoryToDelete(null); // Limpieza
  //   }
  // };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de Servicios" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Servicios</h1>
            <p className="text-gray-600">
              {selectedCategory === null
                ? "Administra todos los servicios ofrecidos por el salón"
                : `Mostrando servicios de ${categories.find((c) => c.id === selectedCategory)?.name}`}
            </p>
          </div>

          <Button className="bg-pink-500 hover:bg-pink-600" onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servicio
          </Button>
        </div>

        <div className="py-5 border-indigo-200 flex gap-5">
          <Button>
            Filtros
          </Button>

          <input
            type="text"
            placeholder="Buscar Servicio..."
            value={searchTerm}
            className="focus:ring-indigo-500 border-indigo-500 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Barra lateral de categorías */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-800 flex items-center">
                  <Tag className="mr-2 h-4 w-4 text-pink-500" />
                  Categorías
                </h2>
              </div>
              <ul className="divide-y divide-gray-200">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn(
                      "w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors",
                      selectedCategory === null ? "bg-pink-50 text-pink-600 font-medium" : "text-gray-700",
                    )}
                  >
                    Todos los servicios
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        "text-left flex-1",
                        selectedCategory === category.id ? "text-pink-600 font-medium" : "text-gray-700"
                      )}
                    >
                      {category.name}
                    </button>

                    <div className="flex gap-2 ml-2">
                      <button onClick={() => openEditCategoryModal(category)}>
                        <PenIcon className="h-4 w-4 text-gray-500 hover:text-pink-500" />
                      </button>
                      <button onClick={() => handleDeleteCategoryRequest(category.id)}>
                        <Trash className="h-4 w-4 text-gray-500 hover:text-red-500" />
                      </button>
                    </div>
                  </li>

                ))}
              </ul>
              <div className="p-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full" onClick={openCreateCategoryModal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Categoría
                </Button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="md:col-span-4">

            {filteredServices.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">No hay servicios en esta categoría</h3>
                <p className="text-gray-600 mb-4">Agrega un nuevo servicio para comenzar.</p>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Servicio
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow py-0"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img

                        src={service.image ? `/storage/services/${service.image}` : "/placeholder.svg?height=200&width=400"}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-white/80 backdrop-blur-sm text-pink-500 px-2 py-1 rounded-full text-xs font-medium">
                          ${service.price}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-pink-500">
                          {categories.find((c) => c.id === service.category_id)?.name || "Sin categoría"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="flex justify-between  py-6 space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(service)}
                          className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-white">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-red-600 border-red-600 bg-red-200 hover:bg-red-50 dark:text-white"
                          onClick={() => handleDeleteRequest(service.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ServiceModal
        open={servicemodalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSaved={handleServiceSaved}
        categories={categories}
        serviceToEdit={serviceToEdit}
      />

      <CategoriesModal
        open={categoryModalOpen}
        onClose={() => setcategoryModalOpen(false)}
        onSaved={handleCategorySaved}
        categories={categories}
        categoryToEdit={categoryToEdit}
      />

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar servicio"
        description="¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />  

    </AppLayout>
  )
}
