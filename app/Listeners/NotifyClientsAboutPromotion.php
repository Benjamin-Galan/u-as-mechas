<?php

namespace App\Listeners;

use App\Events\PromotionCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyClientsAboutPromotion
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
    public function handle(PromotionCreated $event): void
    {
        $promotion = $event->promotion;

        $clients = User::where('role', 'cliente')->get();

        foreach ($clients as $client) {
            Notification::create([
                'user_id' => $client->id,
                'title' => 'Nueva promoción disponible',
                'message' => "Hemos agregado una nueva promoción: '{$promotion->name}'. ¡Dale un vistazo!",
                'type' => 'promotion',
                'read' => false,
                'sent_at' => now(),
            ]);
        }
    }
}
