<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Services\ServicesService;
use Illuminate\Support\Facades\Log;

class ServiceController extends Controller
{
    protected ServicesService $serviceService;

    public function __construct(ServicesService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Service::with('category');

        // Filtro por nombre
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        // Filtro por categoría
        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        // Orden por precio
        if ($request->filled('price_sort') && in_array($request->price_sort, ['asc', 'desc'])) {
            $query->orderBy('price', $request->price_sort);
        } else {
            $query->orderBy('name', 'asc'); // Orden por defecto
        }

        // Paginación
        $services = $query->paginate(10)->appends($request->query());

        // Traer todas las categorías para el filtro
        $categories = Category::all();

        return Inertia::render('admin/services/page', [
            'services' => $services,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'price_sort']),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        try {

            $this->serviceService->store($request->validated());
            return redirect()->back()->with('success', 'Servicio creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating service: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['general' => 'Error al crear el servicio. Inténtalo de nuevo.'])
                ->withInput();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, string $id)
    {
        // dd($request->all());

        try {
            $service = Service::findOrFail($id);
            $this->serviceService->update($service, $request->validated());

            return redirect()->back()->with('success', 'Servicio actualizado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating service: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['general' => 'Error al actualizar el servicio. Inténtalo de nuevo.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $service = Service::findOrFail($id);
            $this->serviceService->destroy($service);

            return redirect()->back()->with('success', 'Servicio eliminado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error deleting service: ' . $e->getMessage());

            return redirect()->back()
                ->withErrors(['general' => 'Error al eliminar el servicio. Inténtalo de nuevo.']);
        }
    }
}
