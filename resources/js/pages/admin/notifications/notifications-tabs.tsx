"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Props {
  readFilter: string
  onChange: (filter: string) => void
}

export function NotificationsTabs({ readFilter, onChange }: Props) {
  return (
    <div className="flex items-center">
      <Tabs value={readFilter} onValueChange={onChange}>
        <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
          <TabsTrigger
            value="unread"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-gray-700 dark:text-gray-300 rounded-md px-4 py-2 transition-all"
          >
            No Leídas
          </TabsTrigger>
          <TabsTrigger
            value="read"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-gray-700 dark:text-gray-300 rounded-md px-4 py-2 transition-all"
          >
            Leídas
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-gray-700 dark:text-gray-300 rounded-md px-4 py-2 transition-all"
          >
            Todas
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
