import { CalendarIcon, Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface AppointmentFiltersProps {
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSortOrderChange: (value: string) => void;
    onDateChange: (date: Date | null) => void;
    selectedDate: Date | null;
}


export default function AppointmentFilters({
    onSearchChange,
    onStatusChange,
    onSortOrderChange,
    onDateChange,
    selectedDate
}: AppointmentFiltersProps) {
    return (

        <div className="p-6">
            <div className="bg-white p-4 rounded-lg border space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtros</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Búsqueda */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Buscar citas..."
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Filtro por estado */}
                    <Select onValueChange={onStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="confirmed">Confirmada</SelectItem>
                            <SelectItem value="completed">Completada</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filtro por orden */}
                    <Select onValueChange={(val) => {
                        onSortOrderChange(val === "asc" ? "asc" : "desc")
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Orden" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Más reciente</SelectItem>
                            <SelectItem value="asc">Más antigua</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Filtro por tipo, cambiar por selector de fecha */}
                    <div className="flex flex-col gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : <span>Seleccionar fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => onDateChange(date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {selectedDate && (
                            <Button
                                variant="ghost"
                                className="text-sm text-red-500 hover:underline p-0 self-start"
                                onClick={() => onDateChange(null)}
                            >
                                <X className="h-4 w-4 mr-1" />
                                Limpiar fecha
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}