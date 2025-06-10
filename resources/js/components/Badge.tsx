type BadgeProps = {
    children: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    rounded?: string;
    padding?: string;
    className?: string; // 👈 Agregamos esta prop
  };
  
  export default function Badge({
    children,
    bgColor = "bg-gray-200",
    textColor = "text-gray-600",
    borderColor = "border-gray-300",
    rounded = "rounded-lg",
    padding = "px-4 py-2",
    className = "",
  }: BadgeProps) {
    return (
      <div
        className={`${bgColor} ${borderColor} ${rounded} ${padding} flex items-center space-x-2 ${className}`}
      >
        <span className={`${textColor} font-semibold`}>{children}</span>
      </div>
    );
  }
  