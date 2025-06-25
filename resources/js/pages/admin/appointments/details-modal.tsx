import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment, } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formatTime, formatDate } from "@/utils/format-time";

interface props {
  open: boolean;
  onCancel: () => void;
  appointments: Appointment
}

export const DetailsModal = ({ open, onCancel, appointments }: props) => {
  console.log(appointments, 'Desde details modal')

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-zinc-800">Detalles de la cita</DialogTitle>
        </DialogHeader>

        <DialogDescription className="space-y-4 text-sm text-zinc-700">
          <div>
            <h2 className="font-semibold text-base">Cliente:</h2>
            <p>{appointments.user.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Fecha:</p>
              <p>{formatDate(appointments.appointment_date)}</p>
            </div>
            <div>
              <p className="font-semibold">Hora:</p>
              <p>{formatTime(appointments.appointment_time)}</p>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <p className="font-semibold mb-1">Servicios contratados:</p>
            <ul className="space-y-1">
              {appointments.services.map((service) => (
                <li key={service.id} className="border p-2 rounded-md bg-zinc-50">
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Promociones */}
          {appointments.promotions.length > 0 && (
            <div>
              <p className="font-semibold mt-4 mb-1">Promociones aplicadas:</p>
              {appointments.promotions.map((prom) => (
                <div key={prom.id} className="border p-3 rounded-md mb-2 bg-emerald-50">
                  <p className="font-semibold">{prom.name}</p>
                  <p className="text-sm text-zinc-600">Incluye:</p>
                  <ul className="list-disc list-inside">
                    {prom.services.map((service) => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Paquetes */}
          {appointments.packages.length > 0 && (
            <div>
              <p className="font-semibold mt-4 mb-1">Paquetes:</p>
              {appointments.packages.map((pack) => (
                <div key={pack.id} className="border p-3 rounded-md mb-2 bg-indigo-50">
                  <p className="font-semibold">{pack.name}</p>
                  <p className="text-sm text-zinc-600">Incluye:</p>
                  <ul className="list-disc list-inside">
                    {pack.services.map((service) => (
                      <li key={service.id}>{service.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Atiende:</p>
              <p>{appointments.staff?.name ?? "No asignado"}</p>
            </div>
            <div>
              <p className="font-semibold">Notas:</p>
              <p>{appointments.notes ? appointments.notes : 'Sin observaciones'}</p>
            </div>
          </div>

          <div className="text-right pt-2 border-t">
            <p className="font-semibold">Total: <span className="text-green-600">{appointments.total_price} C$</span></p>
          </div>
        </DialogDescription>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel} className="hover:cursor-pointer">
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

/** */