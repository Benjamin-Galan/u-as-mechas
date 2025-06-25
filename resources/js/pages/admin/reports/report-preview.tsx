"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText } from "lucide-react"

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

interface ReportPreviewProps {
  selectedReports: string[]
  reportTypes: ReportType[]
}

export function ReportPreview({ selectedReports, reportTypes }: ReportPreviewProps) {
  const selectedReportData = reportTypes.filter((report) => selectedReports.includes(report.id))

  if (selectedReports.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Vista Previa</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Selecciona reportes para ver una vista previa</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Vista Previa</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Reportes seleccionados</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {selectedReportData.map((report, index) => (
            <div
              key={report.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
            >
              <div
                className={`h-8 w-8 rounded-lg bg-gradient-to-br ${report.gradient} flex items-center justify-center text-white flex-shrink-0`}
              >
                {report.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{report.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{report.description}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                #{index + 1}
              </Badge>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium text-indigo-900 dark:text-indigo-100 text-sm">Resumen de Exportación</span>
          </div>
          <div className="space-y-1 text-xs text-indigo-700 dark:text-indigo-300">
            <p>• {selectedReports.length} reporte(s) seleccionado(s)</p>
            <p>• Incluye datos y estadísticas</p>
            <p>• Formato profesional con gráficos</p>
            <p>• Listo para compartir</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
