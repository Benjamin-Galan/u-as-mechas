<?php

namespace App\Providers;

use App\Events\AppointmentCreated;
use App\Events\PromotionCreated;
use App\Events\ServiceCreatedOrDiscounted;
use App\Listeners\NotifyClientsAboutPromotion;
use App\Listeners\NotifyClientsAboutService;
use App\Listeners\StoreAdminNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    protected $listen = [
        AppointmentCreated::class => [
            StoreAdminNotification::class,
        ],

        ServiceCreatedOrDiscounted::class => [
            NotifyClientsAboutService::class,
        ],

        PromotionCreated::class => [
            NotifyClientsAboutPromotion::class,
        ]
    ];
}
