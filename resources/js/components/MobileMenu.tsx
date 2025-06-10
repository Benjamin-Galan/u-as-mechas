"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { X, Scissors } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Cerrar el menú al hacer clic en un enlace
  const handleLinkClick = () => {
    onClose()
  }

  // Variantes para animaciones
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: 10 },
    open: { opacity: 1, y: 0 },
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />

          {/* Panel del menú */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-gray-900 text-white z-50 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Cabecera del menú */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-beauty-pink" />
                <span className="text-xl font-serif font-bold">Uñas&Mechas</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Enlaces de navegación */}
            <nav className="flex-1 overflow-y-auto py-8 px-6">
              <ul className="space-y-6">
                <motion.li variants={itemVariants}>
                  <Link
                    to="/"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Inicio
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to="/servicios"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Servicios
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to="/paquetes"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Paquetes
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to="/promociones"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Promociones
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to="/nosotros"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Nosotros
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to="/contacto"
                    className="text-2xl font-serif font-medium hover:text-beauty-pink transition-colors block"
                    onClick={handleLinkClick}
                  >
                    Contacto
                  </Link>
                </motion.li>
              </ul>
            </nav>

            {/* Pie del menú */}
            <div className="p-6 border-t border-gray-800">
              <motion.div variants={itemVariants} className="space-y-4">
                <Link
                  to="/contacto"
                  className="block w-full py-3 px-4 bg-beauty-pink text-white text-center rounded-full font-medium hover:bg-beauty-pink/90 transition-colors"
                  onClick={handleLinkClick}
                >
                  Agenda tu cita
                </Link>
                <div className="flex justify-center gap-4 pt-4">
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-beauty-pink transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-beauty-pink transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
