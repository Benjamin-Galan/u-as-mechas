<?php

namespace App\Services;

use App\Models\Package;
use App\Models\Service;
use Illuminate\Support\Facades\Log;

class PackageService
{
    public function store(array $data)
    {
        // Decodificar servicios si vienen como string
        if (isset($data['services']) && is_string($data['services'])) {
            $data['services'] = json_decode($data['services'], true);
        }

        // Obtener los IDs de los servicios
        $servicesIds = collect($data['services'] ?? [])
            ->pluck('service_id')
            ->filter()
            ->toArray();

        // Obtener el descuento como porcentaje
        $discountPercent = floatval($data['discount'] ?? 0);

        // Calcular montos
        extract($this->calcularMontos($servicesIds, $discountPercent));

        // Agregar cálculos al array de datos
        $data['subtotal'] = $subtotal;
        $data['total'] = $total;
        $data['discount'] = $discountPercent; // guardamos porcentaje


        unset($data['services']);

        $package = Package::create($data);
        $package->services()->sync($servicesIds);

        Log::info('Paquete creado', [
            'package_id' => $package->id,
            'services' => $servicesIds,
            'subtotal' => $subtotal,
            'discount' => $discountAmount,
            'total' => $total
        ]);

        return $package->load('services');
    }

    public function update(Package $package, array $data)
    {
        if (isset($data['services']) && is_string($data['services'])) {
            $data['services'] = json_decode($data['services'], true);
        }

        $serviceIds = collect($data['services'] ?? [])
            ->pluck('service_id')
            ->filter()
            ->all();

        $discountPercent = floatval($data['discount'] ?? 0);

        extract($this->calcularMontos($serviceIds, $discountPercent));

        $data['subtotal'] = $subtotal;
        $data['total'] = $total;
        $data['discount'] = $discountPercent; // Guardamos el porcentaje

        unset($data['services']);

        $package->update($data);
        $package->services()->sync($serviceIds);

        return $package->load('services');
    }

    public function destroy(Package $package)
    {
        $package->services()->detach();
        return $package->delete();
    }

    private function calcularMontos(array $serviceIds, float $descuentoPorcentaje): array
    {
        $services = Service::whereIn('id', $serviceIds)->get();
        $subtotal = $services->sum('price');
        $discountAmount = round($subtotal * ($descuentoPorcentaje / 100), 2);
        $total = round($subtotal - $discountAmount, 2);

        return compact('services', 'subtotal', 'discountAmount', 'total');
    }
}
