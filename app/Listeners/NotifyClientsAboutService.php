<?php

namespace App\Listeners;

use App\Events\ServiceCreatedOrDiscounted;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyClientsAboutService
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ServiceCreatedOrDiscounted $event): void
    {
        $service = $event->service;

        $clients = User::where('role', 'cliente')->get();

        foreach ($clients as $client) {
            Notification::create([
                'user_id' => $client->id,
                'title' => $service->discount > 0 ? '¡Oferta en servicio!' : 'Nuevo servicio disponible',
                'message' => $service->discount > 0
                    ? "El servicio '{$service->name}' ahora tiene un descuento de {$service->discount}%."
                    : "Hemos agregado un nuevo servicio: '{$service->name}'. ¡Dale un vistazo!",
                'type' => 'service',
                'read' => false,
                'sent_at' => now(),
            ]);
        }
    }
}
