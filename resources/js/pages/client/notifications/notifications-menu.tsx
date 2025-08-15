"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Notifications } from "@/types"
import { Calendar, Check, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"

interface Props {
  notification: Notifications
  onNavigate: () => void
  onDelete?: (notification: Notifications) => void
  onRead: (notification: Notifications) => void
}

export function NotificationMenu({ notification, onNavigate, onDelete, onRead }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
        >
          <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[180px]"
      >
        <DropdownMenuItem
          className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 rounded-md transition-colors duration-200"
          onClick={onNavigate}
        >
          <Calendar className="h-4 w-4 mr-3 text-blue-500 dark:text-blue-400" />
          Ver en citas
        </DropdownMenuItem>

        <DropdownMenuItem
          className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 rounded-md transition-colors duration-200"
          onClick={() => onRead(notification)}
        >
          <Check className="h-4 w-4 mr-3 text-green-500 dark:text-green-400" />
          Marcar como leída
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />

        <DropdownMenuItem
          className="hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-sm text-red-600 dark:text-red-400 rounded-md transition-colors duration-200"
          onClick={() => {
            setOpen(false); // <- cerramos el dropdown primero
            onDelete?.(notification); // <- luego abrimos el modal
          }}
        >
          <Trash2 className="h-4 w-4 mr-3" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
