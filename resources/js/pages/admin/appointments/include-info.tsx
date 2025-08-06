import { Appointment } from "@/types";
import { Clock, DollarSign, UserCheck, UserIcon } from "lucide-react";

interface Props {
  appointment: Appointment;
}

export default function IncludeList({ appointment }: Props) {
  return (
    <div className="grid grid-cols-2 shadow-sm p-4 gap-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
      {/* Cliente */}
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
          <UserIcon width={14} />
          Cliente
        </p>
        <p className="font-medium text-zinc-800 dark:text-zinc-100">
          {appointment?.user.name}
        </p>
      </div>

      {/* Hora */}
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
          <Clock width={14} />
          Hora
        </p>
        <p className="font-medium text-zinc-800 dark:text-zinc-100">
          {appointment?.appointment_time}
        </p>
      </div>

      {/* Estilista asignado */}
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
          <UserCheck width={14} />
          Estilista asignado
        </p>
        <p className="font-medium text-zinc-800 dark:text-zinc-100">
          {appointment?.staff?.name || "No asignado"}
        </p>
      </div>

      {/* Precio total */}
      <div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
          <DollarSign width={14} />
          Precio total
        </p>
        <p className="font-semibold text-lime-700 dark:text-lime-400">
          C$ {appointment?.total_price}
        </p>
      </div>
    </div>
  );
}
