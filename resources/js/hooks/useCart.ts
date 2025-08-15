import { CartItem, Appointment } from "@/types"
import { useEffect, useState } from "react"

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem) => setCart(prev => [...prev, item])
    const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index))
    const clearCart = () => setCart([])

    const getTotal = () => cart.reduce((total, item) => total + (item.price - item.discount), 0)
    const getTotalDuration = () => cart.reduce((total, item) => total + item.duration, 0)

    const loadCartFromAppointment = (appointment: Appointment) => {
        const items: CartItem[] = []

        appointment.services.forEach(s => {
            items.push({ type: "service", id: s.id, name: s.name, price: Number(s.price), discount: Number(s.discount), duration: s.duration, image: s.image })
        })

        // appointment.promotions.forEach(p => {
        //     items.push({ type: "promotion", id: p.id, name: p.name, price: Number(p.total ?? 0), discount: Number(p.discount ?? 0), duration: p.services?.reduce((acc, s) => acc + s.duration, 0) ?? 0, services: p.services })
        // })

        appointment.packages.forEach(p => {
            items.push({ type: "package", id: p.id, name: p.name, price: Number(p.total ?? 0), discount: Number(p.discount ?? 0), duration: p.services?.reduce((acc, s) => acc + s.duration, 0) ?? 0, services: p.services })
        })

        setCart(items)
    }

    // Persistencia opcional
    useEffect(() => {
        const stored = localStorage.getItem("cart")
        if (stored) setCart(JSON.parse(stored))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return { cart, addToCart, removeFromCart, clearCart, getTotal, getTotalDuration, loadCartFromAppointment }
}
