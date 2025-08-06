import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  open: boolean;
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
  isAlreadyCompleted: boolean;
  initialDate: Date;
  initialTime: string;
}

export const RescheduleModal = ({ open, onConfirm, onCancel, isAlreadyCompleted, initialDate, initialTime }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string>(initialTime);
  const [unavailableHours, setUnavailableHours] = useState<{ hour: string; status: string }[]>([]);

  const availableHours = [
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30'
  ];

  useEffect(() => {
    if (!selectedDate) return;
    axios.get('/admin/appointments/unavailable-hours', {
      params: { date: selectedDate.toISOString().split('T')[0] }
    }).then(res => {
      setUnavailableHours(res.data.unavailable_hours);
    });
  }, [selectedDate, open]);

  const getHourStatus = (hour: string) => {
    const entry = unavailableHours.find(h => h.hour === hour);
    return entry ? entry.status : null;
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-xl w-full p-5">
        <DialogHeader>
          <DialogTitle>Reagendar cita</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10 m-5">
          <div className="grid gap-2 place-content-center">
            <Label htmlFor="date">Fecha</Label>
            <div className="border rounded-md p-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="time">Hora</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableHours.map((hour) => {
                const status = getHourStatus(hour);
                const isUnavailable = !!status && !(hour === initialTime && selectedDate.toDateString() === initialDate.toDateString());
                const isSelected = selectedTime === hour;

                return (
                  <div key={hour} className="flex flex-col items-center">
                    <Button
                      variant={isSelected ? "secondary" : "default"}
                      onClick={() => !isUnavailable && setSelectedTime(hour)}
                      className={`text-sm ${isUnavailable ? "bg-muted text-muted-foreground cursor-not-allowed" : ""} ${isSelected && !isUnavailable ? "ring-2 ring-primary" : ""}`}
                      disabled={isUnavailable}
                    >
                      {hour}
                    </Button>
                    {isUnavailable && (
                      <span className="text-xs text-gray-500 mt-1">
                        {status === "pending" && "Pendiente de confirmar"}
                        {status === "confirmed" && "Confirmada"}
                        {status === "completed" && "Completada"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
          {!isAlreadyCompleted && (
            <Button
              onClick={() => {
                if (selectedDate && selectedTime) {
                  const formattedDate = selectedDate.toISOString().split('T')[0];
                  onConfirm(formattedDate, selectedTime);
                }
              }}
            >
              Confirmar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
