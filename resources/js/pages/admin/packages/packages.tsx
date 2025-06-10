import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import appLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { BreadcrumbItem, Packages, Service } from "@/types";
import AppLayout from "@/layouts/app-layout";
import PackageModal from "./PackageModal";

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
    const { packages: packagesProps = [], services: allServices = [] } = usePage().props as {
        packages?: [],
        services?: Service[]
    }


    const [packages, setPackages] = useState<Packages[]>(packagesProps)

    console.log(packages, 'paquetes');

    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de paquetes" />

            <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Gestión de Paquetes</h1>
                        <p className="text-gray-600">Aquí puedes gestionar todas los paquetes disponibles.</p>
                    </div>

                    <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => setOpenModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Paquete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="p-4 border rounded-lg shadow">
                        <h2 className="font-bold text-lg">{pkg.name}</h2>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        <p className="text-sm text-pink-500 font-semibold">Descuento: {pkg.discount}%</p>
                    </div>
                ))}
            </div>


            <PackageModal
                open={openModal}
                onClose={handleCloseModal}
                packageToEdit={null}
                services={allServices}
            />
        </AppLayout>
    )
}
