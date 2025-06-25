interface ErrorFieldProps {
    message?: string | null;
}

export const ErrorField = ({ message }: ErrorFieldProps) => {
    if (!message) return null;

    return (
        <p className="text-sm text-red-500 flex items-center gap-1">
            <span className="text-red-500">•</span>
            {message}
        </p>
    );
}