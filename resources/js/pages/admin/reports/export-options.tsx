"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, FileSpreadsheet, Mail, Cloud, Settings, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ExportOptionsProps {
  selectedReports: string[]
  exportFormat: string
  setExportFormat: (format: string) => void
}

export function ExportOptions({ selectedReports, exportFormat, setExportFormat }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [includeCharts, setIncludeCharts] = useState(true)
  const [sendByEmail, setSendByEmail] = useState(false)
  const [saveToCloud, setSaveToCloud] = useState(false)

  const formatOptions = [
    {
      value: "pdf",
      label: "PDF",
      description: "Documento portable con formato profesional",
      icon: <FileText className="h-5 w-5 text-red-600" />,
      recommended: true,
    },
    {
      value: "excel",
      label: "Excel",
      description: "Hoja de cálculo para análisis avanzado",
      icon: <FileSpreadsheet className="h-5 w-5 text-green-600" />,
      recommended: false,
    },
    {
      value: "csv",
      label: "CSV",
      description: "Datos en formato de texto separado por comas",
      icon: <FileSpreadsheet className="h-5 w-5 text-blue-600" />,
      recommended: false,
    },
  ]

  const handleExport = async () => {
    if (selectedReports.length === 0) {
      toast.error("Selecciona al menos un reporte para exportar")
      return
    }

    setIsExporting(true)

    try {
      // Simular proceso de exportación
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast.success(`Reportes exportados exitosamente en formato ${exportFormat.toUpperCase()}`, {
        description: `${selectedReports.length} reporte(s) generado(s)`,
        action: {
          label: "Descargar",
          onClick: () => console.log("Descargando..."),
        },
      })
    } catch (error) {
      toast.error("Error al exportar los reportes")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 sticky top-6">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Download className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              Opciones de Exportación
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Configura cómo deseas exportar</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Formato de Archivo</label>
          <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="space-y-3">
            {formatOptions.map((format) => (
              <div key={format.value} className="flex items-center space-x-3">
                <RadioGroupItem value={format.value} id={format.value} />
                <Label htmlFor={format.value} className="flex items-center gap-3 cursor-pointer flex-1">
                  {format.icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{format.label}</span>
                      {format.recommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recomendado
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{format.description}</p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Opciones Adicionales</label>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox id="charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
              <Label htmlFor="charts" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Incluir gráficos y visualizaciones
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="email" checked={sendByEmail} onCheckedChange={setSendByEmail} />
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                Enviar por correo electrónico
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="cloud" checked={saveToCloud} onCheckedChange={setSaveToCloud} />
              <Label
                htmlFor="cloud"
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                <Cloud className="h-4 w-4" />
                Guardar en la nube
              </Label>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleExport}
            disabled={selectedReports.length === 0 || isExporting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            size="lg"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generando Reportes...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exportar {selectedReports.length} Reporte{selectedReports.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>

          {selectedReports.length === 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Selecciona al menos un reporte para continuar
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Configurar Plantillas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
