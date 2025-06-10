export function formatDate(dateString: string): string {
    if (!dateString) return ""

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date)
}