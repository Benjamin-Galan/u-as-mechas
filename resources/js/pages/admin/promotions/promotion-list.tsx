import { Promotions } from "@/types";
import { CreateNew } from "../services/create-new";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import GenericMenu from "@/components/generic-menu";

interface Props {
    promotions?: Promotions[]
    onEdit: (promotion: Promotions) => void;
    onDelete: (promotion: Promotions) => void;
}

export default function PromotionList({ promotions, onEdit, onDelete }: Props) {
    if (!promotions || promotions.length === 0) {
        return <CreateNew type="promociones" />
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
                <Card
                    key={promotion.id}
                    className="group  px-1 pt-1 pb-2transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 overflow-hidden"
                >
                    <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={promotion.image ? `/storage/promotions/${promotion.image}` : "/placeholder.svg?height=200&width=400"}
                            alt={promotion.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <CardHeader className="">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                                    {promotion.name}
                                </CardTitle>
                            </div>
                            <GenericMenu<Promotions> item={promotion} onEdit={onEdit} onDelete={onDelete} />
                        </div>

                        {/* Descripción */}
                        {promotion.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                {promotion.description}
                            </p>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-4 pt-0">
                        {/* Precio y descuento */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">{promotion.total} C$</span>
                            </div>
                        </div>

                        {/* Duración */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-full w-fit">
                            <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                            <span className="font-medium">{promotion.services.reduce((total, service) => total + Number(service.duration), 0)} minutos</span>
                        </div>

                        {/* Servicios incluidos */}
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Servicios incluidos:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {promotion.services.map((service) => (
                                    <li key={service.id} className="text-sm text-gray-700 dark:text-gray-300">
                                        {service.name} - {service.duration} minutos
                                    </li>
                                ))}
                            </ul>
                        </div>

                        { /**Fecha de inicio y finalización */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-full w-fit">
                            <span className="font-medium">
                                Desde: {new Date(promotion.start_date).toLocaleDateString()} - Hasta: {new Date(promotion.end_date).toLocaleDateString()}
                            </span>
                        </div>

                    </CardContent>

                </Card>
            ))}
        </div>
    )
}