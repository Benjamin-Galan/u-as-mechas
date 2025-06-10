interface CreateNewProps {
  type: string;
}

export function CreateNew({ type }: CreateNewProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
      <h3 className="text-lg font-medium text-gray-800 mb-2">No hay {type} aún</h3>
      <p className="text-gray-600 mb-4">Comienza agregando algo nuevo.</p>
    </div>
  );
}
