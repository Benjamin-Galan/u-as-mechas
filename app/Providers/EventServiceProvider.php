<?php

namespace App\Providers;

use App\Events\AppointmentCreated;
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
    public function boot(): void
    {
        Event::listen(
            AppointmentCreated::class,
            [StoreAdminNotification::class, 'handle']
        );
    }
}
