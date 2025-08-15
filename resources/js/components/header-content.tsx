import { FolderOpen } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    titleIcon: React.ReactNode;
    buttonIcon: React.ReactNode;
    section: string;
    article: string;
    onOpenModal: () => void;
    onCategories?: () => void;
}

export function HeaderContent({ titleIcon, buttonIcon, section, onOpenModal, article, onCategories }: Props) {
    return (
        <div className="py-4 w-full">
            <div className="flex md:justify-between items-center rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        {titleIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestión de {section}</h1>
                        <p className="text-gray-600 dark:text-gray-400">Aquí puedes gestionar {article} {section} disponibles.</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={onOpenModal}>
                        {buttonIcon}
                        Agregar {section}
                    </Button>

                    {onCategories && (
                        <Button
                            onClick={onCategories}
                            variant="outline"
                            className="ml-4 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                        >
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Gestionar Categorías
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}