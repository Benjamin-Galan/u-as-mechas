"use client"

import type { Staff } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Trash2, User, Mail, Phone, Briefcase } from "lucide-react"
import { getStatusBadge } from "@/utils/getStatusBagde"

interface Props {
  members: Staff[]
  onEdit: (member: Staff) => void
  confirmDelete: (member: Staff) => void
}

export default function StaffList({ members, onEdit, confirmDelete }: Props) {
  const getStaffInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  const getAvatarColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-red-500",
    ]
    return colors[id % colors.length]
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card
          key={member.id}
          className="transition-all duration-200 hover:shadow-md border  bg-rose-50 border-rose-100 dark:border-gray-700 dark:bg-gray-800/50"
        >
          <CardContent className="">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar circular con iniciales */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(member.id)}`}
                >
                  {getStaffInitials(member.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  onClick={() => onEdit(member)}
                >
                  <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="sr-only">Editar</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => confirmDelete(member)}
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{member.email}</div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Teléfono</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.phone}</div>
                </div>
              </div>

              {/* Puesto */}
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Puesto</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.position}</div>
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Estado</div>
                  <div className="flex items-center">{getStatusBadge(member.available)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
