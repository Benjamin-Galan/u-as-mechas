import type { Appointment, CartItem } from "@/types";

export function TransformItem(appointment: Appointment): CartItem[] {
    const cartItems: CartItem[] = [];

    // Servicios
    appointment.services.forEach((service) => {
        cartItems.push({
            type: "service",
            id: service.id,
            name: service.name,
            price: Number(service.price),
            discount: Number(service.discount ?? 0),
            duration: service.duration,
            image: service.image,
        });
    });

    // Promociones
    appointment.promotions.forEach((promo) => {
        // calcula duración total de los servicios dentro de la promoción
        const duration = promo.services?.reduce((sum, s) => sum + s.duration, 0) ?? 0;

        cartItems.push({
            type: "promotion",
            id: promo.id,
            name: promo.name,
            price: Number(promo.total ?? 0),
            discount: Number(promo.discount ?? 0),
            duration,
            image: promo.image,
            services: promo.services, // para mostrar qué incluye
        });
    });

    // Paquetes
    appointment.packages.forEach((pack) => {
        const duration = pack.services?.reduce((sum, s) => sum + s.duration, 0) ?? 0;

        cartItems.push({
            type: "package",
            id: pack.id,
            name: pack.name,
            price: Number(pack.total ?? 0),
            discount: Number(pack.discount ?? 0),
            duration,
            image: pack.image,
            services: pack.services,
        });
    });

    return cartItems;
}
