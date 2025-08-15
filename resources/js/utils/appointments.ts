// export type HourStatus = "pending" | "confirmed" | "completed" | null;

// interface UnavailableHour {
//     hour: string;
//     status: HourStatus;
// }

// export function getHourAvailability(
//     hour: string,
//     unavailableHours: UnavailableHour[],
//     initialDate: Date,
//     initialTime: string,
//     selectedDate?: Date
// ): { isUnavailable: boolean; status: HourStatus } {
//     const entry = unavailableHours.find(h => h.hour === hour);
//     const status = entry?.status ?? null;

//     const isSameDate = selectedDate?.toDateString() === initialDate.toDateString();
//     const isUnavailable = !!status && !(hour === initialTime && isSameDate);

//     return { isUnavailable, status };
// }
