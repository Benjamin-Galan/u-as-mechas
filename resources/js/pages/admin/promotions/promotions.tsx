// "use client"

// import { Head, usePage } from "@inertiajs/react"
// import { useState } from "react"
// import axios from "axios"
// import AppLayout from "@/layouts/app-layout"
// import { Button } from "@/components/ui/button"
// import { Plus } from "lucide-react"
// // import { useToast } from "@/hooks/use-toast"
// import type { BreadcrumbItem, Service } from "@/types"
// import PromotionModal from "./promotion-modal"
// import PromotionList from "./PromotionList"


// const breadcrumbs: BreadcrumbItem[] = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//   },
//   {
//     title: "Promociones",
//     href: "/promotions",
//   },
// ]

// export default function PromotionsPage() {
//   const { promotions: propsPromotions = [], services: allServices = [] } = usePage().props as {
//     promotions?: any[]
//     services?: Service[]
//   }

//   const [promotions, setPromotions] = useState<any[]>(propsPromotions)
//   const [openModal, setOpenModal] = useState(false)
//   const [promotionToEdit, setPromotionToEdit] = useState<any | null>(null)
//   // const { toast } = useToast()

//   console.log(promotions, 'promociones');

//   const handleEdit = (promotion: any) => {
//     setPromotionToEdit(promotion)
//     setOpenModal(true)
//   }

//   const handleDelete = async (promotionId: number) => {
//     try {
//       await axios.delete(`/promotions/${promotionId}`)

//       setPromotions((prev) => prev.filter((p) => p.id !== promotionId))

//       // toast({
//       //   title: "Promoción eliminada",
//       //   description: "La promoción ha sido eliminada correctamente.",
//       // })
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       // toast({
//       //   title: "Error",
//       //   description: "No se pudo eliminar la promoción.",
//       //   variant: "destructive",
//       // })
//     }
//   }

//   const handleToggleStatus = async (promotionId: number, isActive: boolean) => {
//     try {
//       const response = await axios.patch(`/promotions/${promotionId}/toggle-status`, {
//         is_active: isActive,
//       })

//       setPromotions((prev) => prev.map((p) => (p.id === promotionId ? { ...p, is_active: isActive } : p)))

//       // toast({
//       //   title: isActive ? "Promoción activada" : "Promoción desactivada",
//       //   description: `La promoción ha sido ${isActive ? "activada" : "desactivada"} correctamente.`,
//       // })
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       // toast({
//       //   title: "Error",
//       //   description: "No se pudo cambiar el estado de la promoción.",
//       //   variant: "destructive",
//       // })
//     }
//   }

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleSaved = (savedPromotion: any) => {
//     if (promotionToEdit) {
//       // Actualizar promoción existente
//       setPromotions((prev) => prev.map((p) => (p.id === savedPromotion.id ? savedPromotion : p)))
//       // toast({
//       //   title: "Promoción actualizada",
//       //   description: "La promoción ha sido actualizada correctamente.",
//       // })
//     } else {
//       // Agregar nueva promoción
//       setPromotions((prev) => [...prev, savedPromotion])
//       // toast({
//       //   title: "Promoción creada",
//       //   description: "La promoción ha sido creada correctamente.",
//       // })
//     }

//     setPromotionToEdit(null)
//     setOpenModal(false)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setPromotionToEdit(null)
//   }

//   return (
//     <AppLayout breadcrumbs={breadcrumbs}>
//       <Head title="Gestión de promociones" />

//       <div className="p-4">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Gestión de Promociones</h1>
//             <p className="text-gray-600">Aquí puedes gestionar todas las promociones disponibles.</p>
//           </div>

//           <Button className="bg-zinc-900 hover:bg-zinc-700" onClick={() => setOpenModal(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Nueva Promoción
//           </Button>
//         </div>

//         <PromotionList
//           promotions={promotions}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onToggleStatus={handleToggleStatus}
//         />
//       </div>

//       <PromotionModal
//         open={openModal}
//         onClose={handleCloseModal}
//         onSaved={handleSaved}
//         promotionToEdit={promotionToEdit}
//         services={allServices}
//       />
//     </AppLayout>
//   )
// }
