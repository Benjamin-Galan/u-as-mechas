<?php

namespace App\Services;

use App\Events\ServiceCreatedOrDiscounted;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServicesService
{
    public function store(array $data)
    {
        if (isset($data['image']) && $data['image']->isValid()) {
            $image = $data['image'];
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('services', $imgName, 'public');
            $data['image'] = $imgName;
        }

        $service = Service::create($data)->load('category');

        // event(new ServiceCreatedOrDiscounted($service));

        return $service;
    }

    public function update(Service $service, array $data)
    {
        $originalDiscount = $service->discount;

        if (isset($data['image']) && $data['image']->isValid()) {
            // Eliminar la imagen anterior si existe
            if ($service->image && Storage::disk('public')->exists("services/{$service->image}")) {
                Storage::disk('public')->delete("services/{$service->image}");
            }

            $image = $data['image'];
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('services', $imgName, 'public');
            $data['image'] = $imgName;
        }

        $service->update($data);

        $updatedService = $service->load('category');

        // Si el descuento cambió y es mayor a 0
        // if ($originalDiscount != $updatedService->discount && $updatedService->discount > 0) {
        //     event(new ServiceCreatedOrDiscounted($updatedService));
        // }

        return $updatedService;
    }

    public function destroy(Service $service)
    {
        // Eliminar la imagen del servicio
        if ($service->image && Storage::disk('public')->exists("services/{$service->image}")) {
            Storage::disk('public')->delete("services/{$service->image}");
        }

        $service->delete();
    }
}
