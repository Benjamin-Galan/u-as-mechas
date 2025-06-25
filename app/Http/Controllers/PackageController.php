<?php

namespace App\Http\Controllers;

use App\Http\Requests\PackageRequest;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\PackageService;

class PackageController extends Controller
{
    protected PackageService $packageService;

    public function __construct(PackageService $packageService)
    {
        $this->packageService = $packageService;
    }

    public function index()
    {
        return Inertia::render('admin/packages/page', [
            'packages' => Package::with('services')->get(),
            'services' => Service::all()
        ]);
    }

    public function store(PackageRequest $request)
    {
        //Llamar al servicio para manejar la lógica de creación
        $this->packageService->store($request->validated());

        //Retornar la respuesta
        return redirect()->back()->with('success', 'Paquete creado exitosamente');
    }

    public function update(PackageRequest $request, string $id)
    {
        $package = Package::findOrFail($id);
        $this->packageService->update($package, $request->validated());

        return redirect()->back()->with('success', 'Paquete actualizado exitosamente');
    }

    public function destroy(string $id)
    {
        $package = Package::findOrFail($id);

        //Llamar al servicio para manejar la lógica de eliminación
        $this->packageService->destroy($package);

        return redirect()->back()->with('success', 'Paquete Eliminado exitosamente');
    }
}
