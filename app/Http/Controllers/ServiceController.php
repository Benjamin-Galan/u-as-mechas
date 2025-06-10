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
use Illuminate\Contracts\Cache\Store;

class ServiceController extends Controller
{
    protected ServicesService $serviceService;
    /**
     * Create a new controller instance.
     *
     * @param ServicesService $serviceService
     */

    // Constructor para inyectar el servicio

    public function __construct(ServicesService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/services/page', [
            'services' => Service::all(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        //Validar los datos de la peticion
        
        $service = $this->serviceService->store($request->validated());

        //Llamar al servicio para manejar la logica de creacion
        return response()->json([
            'message' => 'Servicio creado correctamente',
            'service' => $service
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, string $id)
    {
        //Validar los datos de la peticion
        $service = Service::findOrFail($id);
        $updated = $this->serviceService->update($service, $request->validated());

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'service' => $updated->load('category')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);
        $this->serviceService->destroy($service);

        return response()->json(['message' => 'Servicio eliminado']);
    }

    public function search(Request $request)
    {
        $query = Service::query();

        // Buscar por nombre
        if ($request->filled('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }

        // Filtrar por categoría
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filtrar por rango de precios
        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        // Filtrar por descuento mínimo
        if ($request->filled('min_discount')) {
            $query->where('discount', '>=', $request->min_discount);
        }

        $services = $query->get();

        return response()->json($services);
    }
}
