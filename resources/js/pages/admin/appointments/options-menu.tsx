import { useState } from "react";
import { Appointment } from "@/types";
import { Check, Eye, MoreVertical, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface OptionsMenuProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onConfirm: (appointment: Appointment) => void; 
}

export function OptionsMenu({
  appointment,
  onEdit,
  onConfirm,
  onCancel
}: OptionsMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Opciones"
        >
          <MoreVertical className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex flex-col w-44 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden"
        sideOffset={4}
      >
        {/* Detalles */}
        <DropdownMenuItem asChild className="w-full">
          <button
            className="flex items-center w-full px-3 py-2 text-blue-700 dark:text-blue-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => {
              setOpen(false);
              setTimeout(() => onEdit(appointment), 100);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            Revisar
          </button>
        </DropdownMenuItem>

        {/* Confirmar */}
        <DropdownMenuItem asChild className="w-full">
          <button
            className="flex items-center w-full px-3 py-2 text-lime-500 dark:text-lime-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => {
              setOpen(false);
              onConfirm(appointment);
            }}
          >
            <Check className="mr-2 h-4 w-4" />
            Confirmar
          </button>
        </DropdownMenuItem>

        {/* Cancelar */}
        <DropdownMenuItem asChild className="w-full">
          <button
            className="flex items-center w-full px-3 py-2 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
            onClick={() => {
              setOpen(false);
              onCancel(appointment);
            }}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
