<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('services', [
            'services' => Service::all(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('services', $imgName, 'public');
            $validate['image'] = $imgName;
        }

        $service = Service::create($validate);

        //devuelve el nuevo servicio para añadirlo al frontend
        return response()->json([
            'service' => $service->load('category'),
            'message' => 'Servicio creado correctamente'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048'
        ]);

        $service = Service::findOrFail($id);

        //If there's a new image, save and delete old one 
        if ($request->hasFile('image')) {
            if ($service->image && Storage::disk('public')->exists("services/{$service->image}")) {
                Storage::disk('public')->delete("services/{$service->image}");
            }

            $image = $request->file('image');
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('services', $imgName, 'public');
            $validated['image'] = $imgName;
        }

        $service->update($validated);

        return response()->json([
            'message' => 'Servicio actualizado correctamente',
            'service' => $service->load('category')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);

        if ($service->image && Storage::exists("public/services/{$service->image}")) {
            Storage::delete("public/services/{$service->image}");
        }

        //Eliminar el servicio de la base de datos
        $service->delete();

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
