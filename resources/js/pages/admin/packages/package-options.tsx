"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, X } from "lucide-react"

export default function PackageMenu() {
  return (
    <DropdownMenu>
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
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
      >
        <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200 rounded-md transition-colors duration-200">
          <Pencil className="h-4 w-4 mr-3 text-blue-600 dark:text-blue-400" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-sm text-red-600 dark:text-red-400 rounded-md transition-colors duration-200">
          <X className="h-4 w-4 mr-3" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
