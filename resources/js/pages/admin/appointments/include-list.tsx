import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment } from "@/types";

interface Props {
  appointment: Appointment;
}

export default function IncludeList({ appointment }: Props) {
  return (
    <div className="space-y-6">
      {/* Servicios */}
      <Card className="border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 shadow-sm rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-zinc-800 dark:text-zinc-100">
            Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointment.services.length > 0 ? (
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {appointment.services.map((service) => (
                <li
                  key={service.id}
                  className="flex justify-between py-2 text-zinc-700 dark:text-zinc-300"
                >
                  <span>{service.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    C${service.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              No hay servicios registrados para esta cita.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Promociones */}
      {appointment.promotions?.length > 0 && (
        <Card className="border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-800 dark:text-zinc-100">
              Promociones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {appointment.promotions.map((promo) => (
                <li
                  key={promo.id}
                  className="py-2 text-zinc-700 dark:text-zinc-300"
                >
                  {promo.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Paquetes */}
      {appointment.packages?.length > 0 && (
        <Card className="border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-800 dark:text-zinc-100">
              Paquetes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {appointment.packages.map((pack) => (
                <li
                  key={pack.id}
                  className="py-2 text-zinc-700 dark:text-zinc-300"
                >
                  {pack.name}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
