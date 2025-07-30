import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Tag } from "lucide-react"
import GenericMenu from "@/components/generic-menu"
import PackageServices from "./package-services"
import type { Packages } from "@/types"
import { CreateNew } from "../services/create-new"

interface Props {
    allPackages?: Packages[]
    onEdit: (packageToEdit: Packages) => void
    onDelete: (packageToDelete: Packages) => void
}

export default function PackageList({ allPackages, onEdit, onDelete }: Props) {
    console.log(allPackages)
    if (!allPackages || allPackages.length === 0) {
        return <CreateNew type="paquetes" />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPackages.map((pkg) => (
                <Card
                    key={pkg.id}
                    className="group hover:shadow-lg transition-all duration-300 shadow-md 
                     bg-rose-50 border-rose-100 
                     dark:bg-gray-800/50 dark:border-gray-700
                      dark:hover:shadow-gray-900/20"
                >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary dark:text-rose-400" />
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{pkg.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant={pkg.is_active ? "default" : "secondary"}
                                    className={
                                        pkg.is_active
                                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40"
                                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                    }
                                >
                                    {pkg.is_active ? "Activo" : "Inactivo"}
                                </Badge>
                                <GenericMenu<Packages> item={pkg} onEdit={onEdit} onDelete={onDelete} />
                            </div>
                        </div>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {pkg.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {/* Pricing Section */}
                        <div
                            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-100
                            dark:from-pink-900/20 dark:to-purple-900/20 dark:border-pink-800/30
                            dark:bg-gradient-to-r"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pkg.total} C$</span>
                                </div>
                                {/* {pkg.discount > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Tag className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                                        <Badge
                                            variant="outline"
                                            className="bg-pink-100 text-pink-700 border-pink-200
                                 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700"
                                        >
                                            -{pkg.discount}% OFF
                                        </Badge>
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <Separator className="dark:bg-gray-700" />

                        {/* Services Section - Now using the separate component */}
                        <PackageServices services={pkg.services} />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
