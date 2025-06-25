<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromotionRequest;
use App\Models\Promotion;
use App\Models\Service;
use App\Services\PromotionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PromotionController extends Controller
{
    /**
     * @var PromotionService
     */
    protected PromotionService $promotionService;

    // Constructor para inyectar el servicio
    public function __construct(PromotionService $promotionService)
    {
        $this->promotionService = $promotionService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/promotions/page', [
            // Obtener todas las promociones con sus servicios relacionados
            'promotions' => Promotion::with('services')->get(),
            'services' => Service::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PromotionRequest $request)
    {
        //Llamar al servicio para manejar la logica de creacion
        $promotion = $this->promotionService->store($request->validated());

        //Retornar la respuesta
        return response()->json([
            'message' => 'Promoción creada correctamente',
            'promotion' => $promotion
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PromotionRequest $request, $id)
    {
        $promotion = Promotion::findOrFail($id);
        $updated = $this->promotionService->update($request->validated(), $promotion);

        return response()->json([
            'message' => 'Promoción actualizada correctamente',
            'promotion' => $updated
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Buscar la promoción
        $promotion = Promotion::findOrFail($id);

        //Llamar al servicio para manejar la logica de eliminación
        $this->promotionService->destroy($promotion);

        //Retornar la respuesta
        return response()->json([
            'message' => 'Promoción eliminada correctamente'
        ]);
    }
}
