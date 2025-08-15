import { CalendarIcon, Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"

export default function AppointmentFilters() {
  const [openContainer, setOpenContainer] = useState(false);
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const toggleFilters = () => {
    setOpenContainer(!openContainer);
  }

  const applyFilters = () => {
    router.get("/admin/appointments", {
      search: search || undefined,
      status: status !== "all" ? status : undefined,
      date: date ? date.toISOString().split("T")[0] : undefined,
    }, {
      preserveState: true,
      replace: true,
    })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      applyFilters()
    }, 400) // pequeño delay para evitar spam de peticiones
    return () => clearTimeout(timeout)
  }, [search, status, date])

  const clearFilters = () => {
    setSearch("")
    setStatus("all")
    setDate(undefined)
    router.get("/admin/appointments", {}, { preserveState: true, replace: true })
  }

  return (
    <Card className="mb-8 shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
      <CardContent className="">
        <div className="flex items-center gap-3 mb-6">
          <div
            onClick={toggleFilters}
            className="h-8 hover:cursor-pointer w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
          >
            <Filter
              className="w-4 h-4 text-white "
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros de Búsqueda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Encuentra citas específicas usando los filtros</p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${openContainer ? 'max-h-screen' : 'max-h-0 overflow-hidden'}  `}
        >
          {/* Búsqueda */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar Cliente</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nombre del cliente..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtro por estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Estado de la Cita</label>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    Todos los estados
                  </div>
                </SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    Pendiente
                  </div>
                </SelectItem>
                <SelectItem value="confirmed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    Confirmada
                  </div>
                </SelectItem>
                <SelectItem value="completed">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    Completada
                  </div>
                </SelectItem>
                <SelectItem value="cancelled">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    Cancelada
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro por fecha */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por Fecha</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-3 pt-3">
            <Button variant="outline" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" /> Limpiar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
