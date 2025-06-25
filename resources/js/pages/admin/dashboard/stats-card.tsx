import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
    change?: number
    changeText?: string
    className?: string
}

export function StatsCard({ title, value, icon, change, changeText, className }: StatsCardProps) {
    const isPositive = change && change > 0

    return (
        <Card className={cn("overflow-hidden dark:bg-gray-800 shadow-lg", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary">{icon}</div>
                </div>
                <div className="mt-2">
                    <p className="text-2xl font-bold">{value}</p>
                    {change !== undefined && (
                        <div className="mt-1 flex items-center gap-1 text-xs">
                            <span className={cn("flex items-center", isPositive ? "text-emerald-500" : "text-rose-500")}>
                                {isPositive ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                                {Math.abs(change)}%
                            </span>
                            <span className="text-muted-foreground">{changeText}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
