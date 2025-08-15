import { X, Plus, Edit, Trash2, FolderOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Category } from "@/types"
import { ConfirmDialog } from "@/components/confirm-delete-dialog"
import { useCategoryManager } from "@/hooks/use-category-manager"

interface CategoriesSidebarProps {
    isOpen: boolean
    onClose: () => void
    categories: Category[]
    onOpenModal: (category?: Category) => void
    onCategoryDeleted: (categoryId: number) => void
}

export default function CategoriesSidebar({
    isOpen,
    onClose,
    categories,
    onOpenModal,
}: CategoriesSidebarProps) {
    const { 
        handleDeleteCategory, 
        confirmDelete, 
        categoryToDelete,
        isDialogOpen,
        setIsDialogOpen
    } = useCategoryManager();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed overflow-scroll right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <FolderOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Categorías</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona las categorías de servicios</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Add Category Button */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <Button onClick={() => onOpenModal()} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Categoría
                        </Button>
                    </div>

                    {/* Categories List */}
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-3">
                            {categories.length === 0 ? (
                                <div className="text-center py-12">
                                    <FolderOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">No hay categorías creadas</p>
                                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                        Crea tu primera categoría para organizar los servicios
                                    </p>
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="group flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{category.name}</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">ID: {category.id}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onOpenModal(category)}
                                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => confirmDelete(category)}
                                               
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 disabled:opacity-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>

                    {/* Footer Stats */}
                    {categories.length > 0 && (
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Total de categorías</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                >
                                    {categories.length}
                                </Badge>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleDeleteCategory}
                title="¿Eliminar categoría?"
                description={`¿Estás seguro de que deseas eliminar la categoría "${categoryToDelete?.name}"? Esta acción no se puede deshacer.`}
                confirmText="Sí, eliminar"

            />
        </>
    )
}
