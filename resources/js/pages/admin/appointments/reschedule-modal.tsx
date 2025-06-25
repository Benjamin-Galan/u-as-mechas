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
}

export const RescheduleModal = ({ open, onConfirm, onCancel, isAlreadyCompleted }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [unavailableHours, setUnavailableHours] = useState<string[]>([]);

  const availableHours = [
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30'
  ];

  useEffect(() => {
    if (!selectedDate) return;

    axios.get('/admin/appointments/unavailable-hours', {
      params: { date: selectedDate.toISOString().split('T')[0] }
    }).then(res => {
      setUnavailableHours(res.data.unavailable_hours);
    });
  }, [selectedDate]);

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reagendar cita</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
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

          <div className="grid gap-2">
            <Label htmlFor="time">Hora</Label>
            <div className="grid grid-cols-3 gap-2">
              {availableHours.map((hour) => {
                const isUnavailable = unavailableHours.includes(hour);
                const isSelected = selectedTime === hour;

                return (
                  <Button
                    key={hour}
                    variant={isSelected ? "secondary" : "default"} // o usa "outline" si prefieres
                    onClick={() => !isUnavailable && setSelectedTime(hour)}
                    className={`
    text-sm
    ${isUnavailable ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
    ${isSelected && !isUnavailable ? "ring-2 ring-primary" : ""}
  `}
                    disabled={isUnavailable}
                  >
                    {hour}
                  </Button>

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

