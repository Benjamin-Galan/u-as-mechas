import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectFilterProps {
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectFilter({ options, onValueChange, placeholder = "Seleccionar..." }: SelectFilterProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
