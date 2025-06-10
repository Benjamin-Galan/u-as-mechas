import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Clock, ShoppingCart } from "lucide-react"
import { CartItem } from "@/types"

interface CardSummaryProps {
    cart: CartItem[],
    onRemove: (index: number) => void
    onContinue: () => void
}

export function CartSummary({ cart, onRemove, onContinue }: CardSummaryProps) {
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price - item.discount), 0)
    }

    const getTotalDuration = () => {
        return cart.reduce((total, item) => total + item.duration, 0)
    }

    if (cart.length === 0) {
        return (
            <Card>
                <CardContent className="p-6 text-center">
                    <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Tu carrito está vacío</p>
                </CardContent>
            </Card>
        )
    }
    
    console.log(cart)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Resumen de productos ({cart.length})
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {cart.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h4 className="font-medium">{item.name}</h4>
                                    <Badge variant="outline" className="text-xs mt-1">
                                        {item.type === "service" ? "Servicio" : item.type === "promotion" ? "Promoción" : "Paquete"}
                                    </Badge>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemove(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            {item.services && (
                                <div className="mb-2">
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {item.duration} min
                                </div>

                                <div className="text-right">
                                    {/*Imprime el precio original */}
                                    {item.discount > 0 && (
                                        <p className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</p>
                                    )}
                                    {/*Imprime el precio con descuento */}
                                    <p className="font-semibold text-primary">${(item.price - item.discount).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Duración total:</span>
                        <span className="font-medium">{getTotalDuration()} min</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${getTotal().toFixed(2)}</span>
                    </div>
                </div>

                <Button onClick={onContinue} className="w-full" size="lg">
                    Continuar con la reserva
                </Button>
            </CardContent>
        </Card>
    )
}