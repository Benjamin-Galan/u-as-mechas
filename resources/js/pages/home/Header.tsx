"use client"

import { useState, useEffect } from "react"
import { Link } from "@inertiajs/react"
import { Menu, X } from "lucide-react"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Detectar scroll para cambiar el estilo del header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Controlar el scroll del body cuando el menú está abierto
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [mobileMenuOpen])

    return (
        <header
            className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-sm py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 z-50 relative">
                        <img src="/logo.png" alt="" className="w-6" />
                        <span className="font-serif font-bold text-xl text-white">Uñas&Mechas</span>
                    </Link>

                    {/* Navegación de escritorio */}
                    <nav className="hidden lg:flex space-x-8">
                        <Link href="/" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Inicio
                        </Link>
                        <Link href="/servicios" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Servicios
                        </Link>
                        <Link href="/paquetes" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Paquetes
                        </Link>
                        <Link href="/promociones" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Promociones
                        </Link>
                        <Link href="/nosotros" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Nosotros
                        </Link>
                        <Link href="/contacto" className="font-medium text-white hover:text-pink-400 transition-colors">
                            Contacto
                        </Link>
                    </nav>

                    {/* Botón de cita (escritorio) */}
                    <div className="hidden md:block">
                        <Link
                            href="/agendar"
                            className="inline-flex items-center justify-center px-4 py-2 bg-gray-950 text-white border border-yellow-700 rounded-full hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            Agenda tu cita
                        </Link>
                    </div>

                    {/* Botón de menú móvil */}
                    <button
                        className="md:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors z-50 relative"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>

                    {/* Menú móvil overlay */}
                    <div
                        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Contenido del menú móvil */}
                            <div className="flex-1 flex flex-col justify-center px-8">
                                <nav className="space-y-8 text-center">
                                    <Link
                                        href="/"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        href="/servicios"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Servicios
                                    </Link>
                                    <Link
                                        href="/paquetes"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Paquetes
                                    </Link>
                                    <Link
                                        href="/promociones"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Promociones
                                    </Link>
                                    <Link
                                        href="/nosotros"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Nosotros
                                    </Link>
                                    <Link
                                        href="/contacto"
                                        className="block text-xl font-medium text-white hover:text-pink-400 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Contacto
                                    </Link>
                                    <div className="pt-6">
                                        <Link
                                            href="/agendar"
                                            className="inline-block w-full py-3 bg-gray-950 text-white border border-yellow-700 rounded-full hover:bg-pink-400/90 transition-colors shadow-lg"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Agenda tu cita
                                        </Link>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
