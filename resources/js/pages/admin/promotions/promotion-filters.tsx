"use client"

import { Filter } from "lucide-react"
import SearchFilter from "@/components/search-filter"
import SelectFilter from "@/components/select-filter"

interface FiltersProps {
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceOrderChange: (value: "asc" | "desc") => void
  categories: { label: string; value: string }[]
}

export function Filters({
  onSearchChange,
  onCategoryChange,
  onPriceOrderChange,
  categories,
}: FiltersProps) {
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
          <SearchFilter onSearchChange={onSearchChange} placeholder="Buscar servicios..." />

          <SelectFilter options={categories} onValueChange={onCategoryChange} placeholder="Seleccionar categoría" />

          <SelectFilter
            options={[
              { label: "Precio ascendente", value: "asc" },
              { label: "Precio descendente", value: "desc" },
            ]}
            onValueChange={(value) => onPriceOrderChange(value as "asc" | "desc")}
            placeholder="Ordenar por precio"
          />
        </div>
      </div>
    </div>
  )
}
