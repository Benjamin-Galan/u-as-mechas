"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, DollarSign, XCircle, CheckCircle, Clock, Users, TrendingUp, BarChart3 } from "lucide-react"
import { ReportFilters } from "./report-filters"
import { ReportPreview } from "./report-preview"
import { ExportOptions } from "./export-options"

interface ReportType {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  stats: {
    total: number
    period: string
    change: number
  }
  available: boolean
}

export default function ReportsPage() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [exportFormat, setExportFormat] = useState("pdf")

  const reportTypes: ReportType[] = [
    {
      id: "monthly-appointments",
      title: "Citas del Mes",
      description: "Reporte completo de todas las citas programadas en el período seleccionado",
      icon: <Calendar className="h-6 w-6" />,
      gradient: "from-blue-500 to-blue-600",
      stats: { total: 156, period: "Este mes", change: 12 },
      available: true,
    },
    {
      id: "revenue-report",
      title: "Ganancias por Citas",
      description: "Análisis detallado de ingresos generados por servicios y citas",
      icon: <DollarSign className="h-6 w-6" />,
      gradient: "from-emerald-500 to-emerald-600",
      stats: { total: 15420, period: "Este mes", change: 8 },
      available: true,
    },
    {
      id: "cancelled-appointments",
      title: "Citas Canceladas",
      description: "Reporte de citas canceladas con motivos y análisis de tendencias",
      icon: <XCircle className="h-6 w-6" />,
      gradient: "from-red-500 to-red-600",
      stats: { total: 23, period: "Este mes", change: -15 },
      available: true,
    },
    {
      id: "completed-appointments",
      title: "Citas Completadas",
      description: "Resumen de servicios completados y satisfacción del cliente",
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-green-500 to-green-600",
      stats: { total: 142, period: "Este mes", change: 18 },
      available: true,
    },
    {
      id: "pending-appointments",
      title: "Citas Pendientes",
      description: "Lista de citas por confirmar y seguimiento requerido",
      icon: <Clock className="h-6 w-6" />,
      gradient: "from-amber-500 to-amber-600",
      stats: { total: 34, period: "Actuales", change: 5 },
      available: true,
    },
    {
      id: "client-analytics",
      title: "Análisis de Clientes",
      description: "Estadísticas de clientes nuevos, recurrentes y comportamiento",
      icon: <Users className="h-6 w-6" />,
      gradient: "from-purple-500 to-purple-600",
      stats: { total: 89, period: "Clientes activos", change: 22 },
      available: true,
    },
    {
      id: "staff-performance",
      title: "Rendimiento del Personal",
      description: "Evaluación de productividad y desempeño por estilista",
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-indigo-500 to-indigo-600",
      stats: { total: 8, period: "Empleados", change: 0 },
      available: true,
    },
    {
      id: "service-analytics",
      title: "Análisis de Servicios",
      description: "Popularidad y rentabilidad de servicios ofrecidos",
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-teal-500 to-teal-600",
      stats: { total: 12, period: "Servicios", change: 3 },
      available: false,
    },
  ]

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                Exportar Reportes
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Genera y descarga reportes detallados de tu negocio
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                {selectedReports.length} reportes seleccionados
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Report Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <ReportFilters dateRange={dateRange} setDateRange={setDateRange} />

            {/* Report Types */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Tipos de Reportes Disponibles
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Selecciona los reportes que deseas generar</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportTypes.map((report) => (
                    <div
                      key={report.id}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        selectedReports.includes(report.id)
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      } ${!report.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => report.available && toggleReportSelection(report.id)}
                    >
                      {selectedReports.includes(report.id) && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-5 w-5 text-indigo-600" />
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center text-white`}
                        >
                          {report.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{report.title}</h3>
                            {!report.available && (
                              <Badge variant="secondary" className="text-xs">
                                Próximamente
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {report.id === "revenue-report"
                                ? `$${formatNumber(report.stats.total)}`
                                : formatNumber(report.stats.total)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{report.stats.period}</span>
                            <span
                              className={`text-xs font-medium ${
                                report.stats.change > 0
                                  ? "text-emerald-600"
                                  : report.stats.change < 0
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {report.stats.change > 0 ? "+" : ""}
                              {report.stats.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Export Options */}
          <div className="space-y-6">
            <ExportOptions
              selectedReports={selectedReports}
              exportFormat={exportFormat}
              setExportFormat={setExportFormat}
            />
            <ReportPreview selectedReports={selectedReports} reportTypes={reportTypes} />
          </div>
        </div>
      </div>
    </div>
  )
}
