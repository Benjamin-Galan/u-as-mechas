import { Badge } from "@/components/ui/badge";

export const getStatusBadge = (status: boolean | string) => {
    switch (status) {
        case true:
            return (
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Disponible
                </Badge>
            )
        case false:
            return (
                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                    Ocupado
                </Badge>
            )
        case "pending":
            return (
                <Badge variant="secondary" className="bg-yellow-100 text-orange-800 hover:bg-red-100">
                    Pendiente
                </Badge>
            )
        case "confirmed":
            return (
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                    Confirmada
                </Badge>
            )
        case "cancelled":
            return (
                <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-green-100">
                    Cancelada
                </Badge>
            )
            case "completed":
            return (
                <Badge variant="default" className="bg-blue-200 text-blue-800 hover:bg-green-100">
                    Completada
                </Badge>
            )
            case "cancelation":
            return (
                <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-green-100">
                    Cancelada
                </Badge>
            )
            case "appointment":
            return (
                <Badge variant="default" className="bg-blue-200 text-blue-800 hover:bg-green-100">
                    Nueva Cita
                </Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}