import { Button } from "./ui/button";

interface Props {
    titleIcon: React.ReactNode;
    buttonIcon: React.ReactNode;
    section: string;
    article: string;
    onOpenModal: () => void;
}

export function HeaderContent({ titleIcon, buttonIcon, section, onOpenModal, article }: Props) {
    return (
        <div className="py-4">
            <div className="flex justify-between items-center rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        {titleIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestión de {section}</h1>
                        <p className="text-gray-600 dark:text-gray-400">Aquí puedes gestionar {article} {section} disponibles.</p>
                    </div>
                </div>

                <Button className="bg-blue-800 hover:bg-blue-900 text-white" onClick={onOpenModal}>
                    {buttonIcon}
                    Agregar {section}
                </Button>
            </div>
        </div>
    )
}