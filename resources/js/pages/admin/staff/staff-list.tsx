import { Staff } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import { getStatusBadge } from "@/utils/getStatusBagde";

interface Props {
    members: Staff[]
    onEdit: (member: Staff) => void
    confirmDelete: (member: Staff) => void
}

export default function StaffList({ members, onEdit, confirmDelete }: Props) {
    return (
        <div className="container mx-auto px-6">
            <Card>
                <CardHeader>
                    <CardTitle>Lista de empleados</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-left text-sm font-semibold text-gray-700">
                                    <TableHead className="p-3">Nombre</TableHead>
                                    <TableHead className="p-3">Correo</TableHead>
                                    <TableHead className="p-3">Teléfono</TableHead>
                                    <TableHead className="p-3">Puesto</TableHead>
                                    <TableHead className="p-3">Estado</TableHead>
                                    <TableHead className="p-3 text-center">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id} className="hover:bg-gray-50">
                                        <TableCell className="p-3 font-medium">{member.name}</TableCell>
                                        <TableCell className="p-3 text-gray-600">{member.email}</TableCell>
                                        <TableCell className="p-3 text-gray-600">{member.phone}</TableCell>
                                        <TableCell className="p-3">{member.position}</TableCell>
                                        <TableCell>{getStatusBadge(member.available)}</TableCell>

                                        <TableCell className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => onEdit(member)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => confirmDelete(member)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Editar</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}