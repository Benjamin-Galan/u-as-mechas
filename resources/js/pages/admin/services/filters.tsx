"use client"

import { Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import { Select } from "@/components/ui/select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FiltersProps {
  categories: { id: number; name: string }[]
}

export default function AppointmentFilters({ categories }: FiltersProps) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all") // sigue siendo string
  const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | "">("")


  const applyFilters = () => {
    router.get("/admin/services", {
      search: search || undefined,
      category_id: category !== "all" ? category : undefined,
      price_sort: priceOrder !== "" ? priceOrder : undefined,
    }, { preserveState: true, replace: true });

  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      applyFilters()
    }, 400)
    return () => clearTimeout(timeout)
  }, [search, category, priceOrder]) // agregar priceOrder

  const clearFilters = () => {
    setSearch("")
    setCategory("all") // reset categoría
    setPriceOrder("")
    router.get("/admin/services", {}, { preserveState: true, replace: true })
  }

  return (
    <div className="py-6">
      <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
            <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Filtros de Búsqueda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Encuentra servicios específicos usando los filtros
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Categorías</label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ordenar por precio</label>
            <Select value={priceOrder} onValueChange={(v) => setPriceOrder(v as "asc" | "desc" | "")}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar orden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Ninguno</SelectItem> {/* NO usar value="" */}
                <SelectItem value="asc">Precio más bajo</SelectItem>
                <SelectItem value="desc">Precio más alto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-3 pt-3">
          <Button variant="outline" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" /> Limpiar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
