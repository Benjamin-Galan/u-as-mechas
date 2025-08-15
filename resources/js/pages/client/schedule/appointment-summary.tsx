import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, CreditCard } from "lucide-react"
import { CartItem } from "@/types"

interface AppointmentSummaryProps {
    cart: CartItem[]
    date: Date
    time: string
    total: number
    totalDuration: number
    onConfirm: () => void
    onBack: () => void
}

export function AppointmentSummary({
    cart,
    date,
    time,
    total,
    totalDuration,
    onConfirm,
    onBack,
}: AppointmentSummaryProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resumen de tu cita</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                            <p className="font-medium">{formatDate(date)}</p>
                            <p className="text-sm text-muted-foreground">Fecha de la cita</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                            <p className="font-medium">{time}</p>
                            <p className="text-sm text-muted-foreground">Duración estimada: {totalDuration} minutos</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                            <p className="font-medium">Uñas & Mechas</p>
                            <p className="text-sm text-muted-foreground">Portón sur, Multicentro Las Americas, 50 metros abajo, Managua</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Servicios seleccionados</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {cart.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <Badge variant="outline" className="text-xs mt-1">
                                        {item.type === "service" ? "Servicio" : item.type === "promotion" ? "Promoción" : "Paquete"}
                                    </Badge>

                                    {item.services && (
                                        <div className="mt-2">
                                            <p className="text-xs text-muted-foreground mb-1">Incluye:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {item.services.map((service) => (
                                                    <Badge key={service.id} variant="secondary" className="text-xs">
                                                        {service.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-right">
                                    {item.discount > 0 && (
                                        <p className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</p>
                                    )}
                                    <p className="font-semibold">${(item.price - item.discount).toFixed(2)}</p>
                                </div>
                            </div>
                            {index < cart.length - 1 && <Separator />}
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between text-lg font-bold">
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Total a pagar:
                        </div>
                        <span className="text-primary">C$ {total.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-3">
                <Button variant="outline" onClick={onBack} className="flex-1">
                    Volver
                </Button>
                <Button onClick={onConfirm} className="flex-1" size="lg">
                    Confirmar cita
                </Button>
            </div>
        </div>
    )
}