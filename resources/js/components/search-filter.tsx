import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFiltersProps {
    onSearchChange: (value: string) => void;
    placeholder: string
}

export default function SerchFilter({ onSearchChange, placeholder = "Buscar..." }: SearchFiltersProps) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
                placeholder={placeholder}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}