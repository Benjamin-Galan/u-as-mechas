import { Star } from "lucide-react"

type RatingProps = {
  value: number
  total: number
  className?: string
}

export default function Rating({ value, total, className = "" }: RatingProps) {
  return (
    <div className={`flex flex-col items-center bg-white rounded-lg p-6 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.floor(value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {value}/{total}
      </div>
      <div className="text-sm text-gray-500">Calificación de clientes</div>
    </div>
  )
}
