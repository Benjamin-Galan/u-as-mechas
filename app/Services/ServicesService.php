<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServicesService
{
    public function store(array $data)
    {
        if(isset($data['image']) && $data['image']->isValid()) {
            $image = $data['image'];
            $imgName = Str::uuid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('services', $imgName, 'public');
            $data['image'] = $imgName;
        }

        return Service::create($data)->load('category');    
    }

    public function update(Service $service, array $data)
    {
        if(isset($data['image']) && $data['image']->isValid()) {
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

        return $service->load('category');
    }

    public function destroy(Service $service)
    {
        // Eliminar la imagen del servicio
        if ($service->image && Storage::disk('public')->exists("services/{$service->image}")) {
            Storage::disk('public')->delete("services/{$service->image}");
        }

        return $service->delete();
    }
}