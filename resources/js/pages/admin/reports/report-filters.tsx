"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useState } from "react"

interface ReportFiltersProps {
  dateRange: { from: string; to: string }
  setDateRange: (range: { from: string; to: string }) => void
}

export function ReportFilters({ dateRange, setDateRange }: ReportFiltersProps) {
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [quickFilter, setQuickFilter] = useState("")

  const handleQuickFilter = (period: string) => {
    const today = new Date()
    let from: Date
    const to: Date = today

    switch (period) {
      case "today":
        from = today
        break
      case "week":
        from = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "month":
        from = new Date(today.getFullYear(), today.getMonth(), 1)
        break
      case "quarter":
        from = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1)
        break
      case "year":
        from = new Date(today.getFullYear(), 0, 1)
        break
      default:
        return
    }

    setFromDate(from)
    setToDate(to)
    setDateRange({
      from: from.toISOString().split("T")[0],
      to: to.toISOString().split("T")[0],
    })
    setQuickFilter(period)
  }

  const resetFilters = () => {
    setFromDate(undefined)
    setToDate(undefined)
    setDateRange({ from: "", to: "" })
    setQuickFilter("")
  }

  return (
    <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Filtros de Período</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">Selecciona el rango de fechas para los reportes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Filters */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Períodos Rápidos</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {[
                { value: "today", label: "Hoy" },
                { value: "week", label: "7 días" },
                { value: "month", label: "Este mes" },
                { value: "quarter", label: "Trimestre" },
                { value: "year", label: "Este año" },
              ].map((period) => (
                <Button
                  key={period.value}
                  variant={quickFilter === period.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickFilter(period.value)}
                  className={quickFilter === period.value ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Fecha Desde</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-700"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => {
                      setFromDate(date)
                      if (date) {
                        setDateRange({
                          ...dateRange,
                          from: date.toISOString().split("T")[0],
                        })
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Fecha Hasta</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-700"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => {
                      setToDate(date)
                      if (date) {
                        setDateRange({
                          ...dateRange,
                          to: date.toISOString().split("T")[0],
                        })
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-600 dark:text-gray-400">
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
