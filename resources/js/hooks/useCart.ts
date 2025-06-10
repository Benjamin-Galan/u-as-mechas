import { useState } from "react";
import type { CartItem } from "@/types";

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => {
        setCart((prev) => [...prev, item])
    }

    //incluye todos los elementos cuyo índice NO sea igual al índice que quiero eliminar
    const removeFromCart = (index: number) => {
        setCart((prev) => prev.filter((_, i) => i !== index))
    }

    const clearCart = () => {
        setCart([])
    }

    //Calcula el total a pagar por todos los productos en el carrito (cart), restando el descuento de cada uno.
    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price - item.discount), 0)
    }

    //Calcula la duracion total de todos los servicios
    const getTotalDuration = () => {
        return cart.reduce((total, item) => total + item.duration, 0)
    }

    /**
     * array.reduce((acumulador, elementoActual) => {
    // lógica de acumulación
       return nuevoAcumulador
    }, valorInicial)

     */

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getTotalDuration
    }
}