import { Check } from "lucide-react"

type CheckListProps = {
    items?: string[];
    textColor?: string;
    iconColor?: string;
    iconSize?: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function CheckList({
    items,
    icon = <Check />,
    textColor = "text-gray-800",
    iconColor = "text-gray-800",
    iconSize = "w-6 h-6",
    className = ""
}: CheckListProps) {
    return (
        <ul className={`flex flex-col gap-2 ${className}`}>
            {items?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                    <div className={`${iconColor} ${iconSize}`}>
                        {icon}
                    </div>
                    <span className={`${textColor}`}>{item}</span>
                </li>
            ))}
        </ul>
    )
}