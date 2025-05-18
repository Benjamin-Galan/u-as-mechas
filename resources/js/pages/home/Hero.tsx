import { Sparkles } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center text-white overflow-hidden">
      {/* Imagen de Fondo */}
      <div className="absolute inset-0 w-full h-full">
        <img src="/bg.png" alt="Salón de Belleza" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Overlay con gradiente */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center space-y-4 px-4 max-w-5xl mx-auto text-center">
        {/* Elemento decorativo superior */}
        <div className="flex items-center justify-center mb-2">
          <div className="h-[1px] w-10 bg-yellow-600"></div>
          <Sparkles className="mx-3 text-yellow-600 h-5 w-5" />
          <div className="h-[1px] w-10 bg-yellow-600"></div>
        </div>

        {/* Subtítulo superior */}
        <p className="text-sm md:text-base uppercase tracking-[0.2em] text-yellow-100 font-light">BELLEZA & ESTILO</p>

        {/* Título principal */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
          <span className="block">Uñas</span>
          <span className="inline-block mx-2 text-yellow-600">&</span>
          <span className="block">Mechas</span>
        </h1>

        {/* Descripción */}
        <p className="text-lg md:text-xl font-light max-w-2xl text-gray-100 leading-relaxed">
          Descubre la experiencia de belleza definitiva con nuestros servicios exclusivos y profesionales diseñados para
          realzar tu belleza natural.
        </p>

        {/* Botones */}
        <div className="flex flex-col justify-center sm:flex-row gap-5 mt-8 w-full max-w-md">
          <Link
            href="/agendar"
            className="bg-white text-gray-900 border-transparent px-8 py-3 rounded-full font-medium text-base hover:bg-gray-100 transition-all duration-300 shadow-lg w-full sm:w-auto flex items-center justify-center"
          >
            Agendar cita
          </Link>

          <Link
            href="/servicios"
            className="bg-transparent text-white border border-yellow-700 px-8 py-3 rounded-full font-medium text-base hover:bg-yellow-700/10 transition-all duration-300 w-full sm:w-auto flex items-center justify-center"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
