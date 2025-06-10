
export function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const formattedHour = hour % 12 || 12

  return `${formattedHour}:${minutes} ${ampm}`
}

export function formatDate(dateString: string): string {
    if (!dateString) return ""

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date)
}