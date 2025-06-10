import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, CalendarIcon } from "lucide-react"
import { TimeSlot } from "@/types"

interface DatetimePickerProps {
    totalDuration: number
    onSelect: (date: Date, time: string) => void
    selectedDate?: Date
    selectedTime?: string
}

export function DatetimePicker({ totalDuration, onSelect, selectedDate, selectedTime }: DatetimePickerProps) {
    const [date, setDate] = useState<Date | undefined>(selectedDate)

    const generateTimeSlots = (): TimeSlot[] => {
        const slots: TimeSlot[] = []
        const startHour = 8
        const endHour = 17 // Hasta las 5pm (17:00)

        for (let hour = startHour; hour <= endHour; hour++) {
            // Saltar la hora de almuerzo (12:00 a 12:59)
            if (hour === 12) continue

            const time = `${hour.toString().padStart(2, "0")}:00`
            slots.push({ time, available: true })
        }

        return slots
    }

    const timeSlots = generateTimeSlots()

    const handleTimeSelect = (time: string) => {
        if (date) {
            onSelect(date, time)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        Selecciona fecha
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0} // Deshabilitar domingos y fechas pasadas
                        className="rounded-md border flex justify-center"
                    />
                </CardContent>
            </Card>

            {date &&
                (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Horarios disponibles
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline">Duración estimada: {totalDuration} min</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                    <Button
                                        key={slot.time}
                                        variant={selectedTime === slot.time ? "default" : "outline"}
                                        size="sm"
                                        disabled={!slot.available}
                                        onClick={() => handleTimeSelect(slot.time)}
                                        className="text-sm"
                                    >
                                        {slot.time}
                                    </Button>
                                ))}
                            </div>

                            <div className="mt-4 text-xs text-muted-foreground">
                                <p>• Los horarios en gris no están disponibles</p>
                                <p>• La duración puede variar según el servicio</p>
                            </div>
                        </CardContent>
                    </Card>
                )}
        </div>
    )
}