<?php

namespace App\Services;

use App\Events\PromotionCreated;
use App\Models\Promotion;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PromotionService
{
    public function store(array $data)
    {
        if (isset($data['image']) && $data['image']->isValid()) {
            $image = $data['image'];
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('promotions', $imgName, 'public');
            $data['image'] = $imgName;
        }

        // Decodificar servicios si vienen como string (FormData + JSON.stringify)
        if (isset($data['services']) && is_string($data['services'])) {
            $data['services'] = json_decode($data['services'], true);
        }

        $services = $data['services'] ?? [];
        unset($data['services']);

        // Log para debugging
        Log::info('Creando promoción con servicios:', ['services' => $services]);

        $promotion = Promotion::create($data);

        if (!empty($services)) {
            $syncData = [];

            foreach ($services as $service) {
                // Asegurar que tenemos service_id
                $serviceId = $service['service_id'] ?? null;

                if (!$serviceId) {
                    Log::warning('Servicio sin service_id:', $service);
                    continue;
                }

                $syncData[$serviceId] = [
                    'individual_price' => $service['price'] ?? 0.00,
                    'individual_discount' => $service['discount'] ?? 0.00,
                    'is_bogo' => $service['is_bogo'] ?? false,
                ];
            }

            Log::info('Datos para sync:', ['syncData' => $syncData]);

            $result = $promotion->services()->sync($syncData);
            Log::info('Resultado del sync:', ['result' => $result]);
        }

        event(new PromotionCreated($promotion));

        // Recargar la promoción con sus servicios
        return $promotion->load('services');
    }

    public function update(array $data, Promotion $promotion)
    {
        if (isset($data['image']) && $data['image']->isValid()) {
            if ($promotion->image && Storage::disk('public')->exists("promotions/{$promotion->image}")) {
                Storage::disk('public')->delete("promotions/{$promotion->image}");
            }

            $image = $data['image'];
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('promotions', $imgName, 'public');
            $data['image'] = $imgName;
        }

        // Decodificar servicios si vienen como string
        if (isset($data['services']) && is_string($data['services'])) {
            $data['services'] = json_decode($data['services'], true);
        }

        // Extraer servicios
        $services = $data['services'] ?? [];
        unset($data['services']);

        // Actualizar la promoción
        $promotion->update($data);

        // Sincronizar servicios
        if (!empty($services)) {
            $syncData = [];

            foreach ($services as $service) {
                // Manejar tanto service_id como id
                $serviceId = $service['service_id'] ?? $service['id'] ?? null;

                if (!$serviceId) {
                    continue;
                }

                $syncData[$serviceId] = [
                    'individual_price' => $service['price'] ?? $service['individual_price'] ?? 0.00,
                    'individual_discount' => $service['discount'] ?? $service['individual_discount'] ?? 0.00,
                    'is_bogo' => $service['is_bogo'] ?? false,
                ];
            }

            $promotion->services()->sync($syncData);
        } else {
            // Si no hay servicios, desvincular todos
            $promotion->services()->detach();
        }

        return $promotion->load('services');
    }

    public function destroy(Promotion $promotion)
    {
        // Eliminar la imagen de la promoción
        if ($promotion->image && Storage::disk('public')->exists("promotions/{$promotion->image}")) {
            Storage::disk('public')->delete("promotions/{$promotion->image}");
        }

        // Desvincular los servicios de la promoción
        $promotion->services()->detach();

        return $promotion->delete();
    }
}
