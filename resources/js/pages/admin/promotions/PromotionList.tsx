"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import PromotionCard from "./PromotionCard"
import type { Promotions } from "@/types"

interface PromotionListProps {
  promotions: Promotions[]
  onEdit: (promotion: Promotions) => void
  onDelete: (promotionId: number) => void
  onToggleStatus: (promotionId: number, isActive: boolean) => void
}

export default function PromotionList({ promotions, onEdit, onDelete, onToggleStatus }: PromotionListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filtrar promociones
  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())

    const isExpired = new Date(promotion.end_date) < new Date()
    const isActive = promotion.is_active && !isExpired

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && isActive) ||
      (statusFilter === "inactive" && !isActive) ||
      (statusFilter === "expired" && isExpired)

    const matchesType = typeFilter === "all" || promotion.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Estadísticas
  const stats = {
    total: promotions.length,
    active: promotions.filter((p) => p.is_active && new Date(p.end_date) >= new Date()).length,
    expired: promotions.filter((p) => new Date(p.end_date) < new Date()).length,
    inactive: promotions.filter((p) => !p.is_active).length,
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-gray-500">Activas</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
          <div className="text-sm text-gray-500">Expiradas</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          <div className="text-sm text-gray-500">Inactivas</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtros</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar promociones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro por estado */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activas</SelectItem>
              <SelectItem value="inactive">Inactivas</SelectItem>
              <SelectItem value="expired">Expiradas</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtro por tipo */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="general">Descuento General</SelectItem>
              <SelectItem value="individual">Por Producto</SelectItem>
              <SelectItem value="mixed">Variados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resultados de filtros */}
        {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <span className="text-sm text-gray-500">
              Mostrando {filteredPromotions.length} de {promotions.length} promociones
            </span>
            {searchTerm && <Badge variant="secondary">Búsqueda: "{searchTerm}"</Badge>}
            {statusFilter !== "all" && <Badge variant="secondary">Estado: {statusFilter}</Badge>}
            {typeFilter !== "all" && <Badge variant="secondary">Tipo: {typeFilter}</Badge>}
          </div>
        )}
      </div>

      {/* Lista de promociones */}
      {filteredPromotions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "No se encontraron promociones"
              : "No hay promociones disponibles"}
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Intenta ajustar los filtros de búsqueda"
              : "Crea tu primera promoción para comenzar"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <PromotionCard
              key={promotion.id}
              promotion={promotion}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}
