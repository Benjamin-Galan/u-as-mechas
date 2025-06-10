import type React from "react"

type InfoCardProps = {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  className?: string
}

export default function InfoCard({ icon, title, children, className = "" }: InfoCardProps) {
  return (
    <div className={`flex items-start gap-4 mb-6 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mt-1 shrink-0">
        <div className="text-beauty-purple">{icon}</div>
      </div>
      <div>
        <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  )
}
