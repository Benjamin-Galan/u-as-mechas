import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, User, UserCheck } from "lucide-react";

export default function ListHeader() {
    return (
        <TableHeader>
            <TableRow className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Cliente
                    </div>
                </TableHead>
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Fecha
                    </div>
                </TableHead>
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Hora
                    </div>
                </TableHead>
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300">Estado</TableHead>
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Estilista
                    </div>
                </TableHead>
                <TableHead className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-center">
                    Acciones
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}