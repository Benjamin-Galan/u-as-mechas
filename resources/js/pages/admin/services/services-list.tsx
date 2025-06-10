import { Service } from "@/types"
import { CreateNew } from "./create-new"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface ServicesProps {
    services?: Service[]
}

export default function ServicesList({ services }: ServicesProps) {
    if (!services || services.length === 0) {
        return <CreateNew type="servicios" />;
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
                <Card key={service.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow py-0">
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
                            {/* <Badge className="bg-pink-500">
                                {categories.find((c) => c.id === service.category_id)?.name || "Sin categoría"}
                            </Badge> */}
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
    )
}
