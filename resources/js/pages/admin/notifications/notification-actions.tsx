import { CheckCheckIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Props {
  activeType: string;
  onChangeType: (type: string) => void;
  onMarkAllAsRead: () => void;
}

export default function AppointmentFilters({
  activeType,
  onChangeType,
  onMarkAllAsRead,
}: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm">
      <div className="w-full grid gap-3 sm:grid-cols-1 md:grid-cols-2">
        <Select value={activeType} onValueChange={onChangeType}>
          <SelectTrigger className="bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-zinc-700">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border dark:border-zinc-700">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="appointment">Nueva Cita</SelectItem>
            <SelectItem value="cancelation">Citas Canceladas</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={onMarkAllAsRead}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
        >
          <CheckCheckIcon className="mr-2 h-4 w-4" />
          Marcar todas como leídas
        </Button>
      </div>
    </div>
  );
}
