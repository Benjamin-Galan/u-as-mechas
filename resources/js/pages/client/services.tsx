import AppLayout from '@/layouts/app-layout';
import { CartItem, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Service, Promotions, Packages, Appointment } from '@/types';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ShoppingCart } from 'lucide-react';

import { ProductsCard } from './schedule/product-card';
import { CartSummary } from './schedule/cart-summary';
import { DatetimePicker } from './schedule/datetime-picker'
import { AppointmentSummary } from './schedule/appointment-summary';

import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
    },
    {
        title: 'Servicios',
        href: '/client/services',
    }
];

type Screen = "services" | "cart" | "datetime" | "summary" | "status" | "appointments"

export default function ClientServices() {
    const {
        services: servicesProps = [],
        promotions: promotionsProps = [],
        packages: packagesProps = [],
        appointments: appointmentsProps = []
    } = usePage().props as {
        services?: Service[]
        promotions?: Promotions[]
        packages?: Packages[]
        appointments?: Appointment[]
    }

    console.log(appointmentsProps, 'Citas')

    type ItemType = CartItem;

    const [currentScreen, setCurrentScreen] = useState<Screen>("services")
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<string>()
    const { cart, addToCart, removeFromCart, clearCart, getTotalDuration, getTotal } = useCart()

    //Agregar los servicios al carrito
    const handleAddService = (service: ItemType, type: "service" | "promotion" | "package") => {
        const cartItem: CartItem = {
            type,
            id: service.id,
            name: service.name,
            price: type === "service" ? Number.parseFloat(service.price) : Number.parseFloat(service.total || service.subtotal),
            discount: type === "service" ? Number.parseFloat(service.discount) : Number.parseFloat(service.discount || "0"),
            duration: type === "service" ? service.duration : service.services?.reduce((total: number, s: Service) => total + s.duration, 0) || 0,
            image: service.image,
            services: service.services || undefined,
        }
        addToCart(cartItem)
    }

    //Asignar la fecha y hora seleccionadas
    const handleDatetimeSelect = (date: Date, time: string) => {
        setSelectedDate(date)
        setSelectedTime(time)
    }

    function handleSendToAppointments() {
        router.visit('/client/appointments', { method: 'get' })
    }

    const handleConfirmAppointment = async () => {
        if (!selectedDate || !selectedTime) return

        const payload = {
            date: selectedDate.toISOString().split('T')[0], // "2025-06-03"
            time: selectedTime, // por ejemplo "14:00"
            total: getTotal(),
            duration: getTotalDuration(),
            items: cart.map(item => ({
                id: item.id,
                type: item.type,
                price: item.price,
                discount: item.discount,
            })),
        }

        try {
            const response = await axios.post('/client/appointments', payload)
            // setCurrentScreen("status")
            console.log(response)
            clearCart()
        } catch (error) {
            console.error("Error al crear la cita:", error)
        }
    }

    const renderScreen = () => {
        switch (currentScreen) {
            case "services":
                return (
                    <div className='space-y-6'>
                        <div className='flex items-center justify-between'>
                            <h1 className={`font-bold sm:text-2xl`}>Servicios</h1>
                            <div className='flex gap-2'>
                                <Button variant="outline" size="sm" onClick={() => setCurrentScreen("cart")} className="relative">
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Carrito
                                    {cart.length > 0 && (
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                            {cart.length}
                                        </Badge>
                                    )}
                                </Button>

                                <Button variant="outline" size="sm" onClick={() => setCurrentScreen("appointments")}>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Mis Citas
                                </Button>
                            </div>
                        </div>

                        <Tabs defaultValue='services' className='w-full'>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="services">Servicios</TabsTrigger>
                                <TabsTrigger value="promotions">Promociones</TabsTrigger>
                                <TabsTrigger value="packages">Paquetes</TabsTrigger>
                            </TabsList>

                            <TabsContent value='services' className='space-y-4'>
                                <div className='grid gap-4'>
                                    {servicesProps.map((service) => (
                                        <ProductsCard
                                            key={service.id}
                                            item={service}
                                            type='service'
                                            onAdd={() => handleAddService(service, "service")}
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value='promotions' className='space-y-4'>
                                <div className='grid gap-4'>
                                    {promotionsProps.map((promotion) => (
                                        <ProductsCard
                                            key={promotion.id}
                                            item={promotion}
                                            type='promotion'
                                            onAdd={() => handleAddService(promotion, "promotion")}
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value='packages' className='space-y-4'>
                                <div className='grid gap-4'>
                                    {packagesProps.map((packages) => (
                                        <ProductsCard
                                            key={packages.id}
                                            item={packages}
                                            type='package'
                                            onAdd={() => handleAddService(packages, "package")}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                )
            case "cart":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Carrito</h1>
                            <Button variant="outline" onClick={() => setCurrentScreen("services")}>
                                Seguir comprando
                            </Button>
                        </div>
                        <CartSummary cart={cart} onRemove={removeFromCart} onContinue={() => setCurrentScreen("datetime")} />
                    </div>
                )

            case "datetime":
                return (
                    <div className='space-y-6'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-2xl font-bold'>Fecha y hora</h1>

                            <Button variant="outline" onClick={() => setCurrentScreen("cart")}>
                                Volver
                            </Button>
                        </div>

                        <DatetimePicker
                            totalDuration={getTotalDuration()}
                            onSelect={handleDatetimeSelect}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                        />

                        <Button onClick={() => setCurrentScreen("summary")} className="w-full" size="lg">
                            Continuar
                        </Button>
                    </div>
                )

            case "summary":
                return (
                    <div className='space-y-6'>
                        <h1 className='text-2xl font-bold'>Confirmar cita</h1>
                        {selectedDate && selectedTime && (
                            <AppointmentSummary
                                cart={cart}
                                date={selectedDate}
                                time={selectedTime}
                                total={getTotal()}
                                totalDuration={getTotalDuration()}
                                onConfirm={handleConfirmAppointment}
                                onBack={() => setCurrentScreen("datetime")}
                            />
                        )}
                    </div>
                )

            case "appointments":
                handleSendToAppointments();
                 return <p>Redirigiendo a tus citas...</p>;
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Servicios' />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-6 max-w-md">{renderScreen()}</div>
            </div>
        </AppLayout>
    )
}