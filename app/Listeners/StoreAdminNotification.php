<?php

namespace App\Listeners;

use App\Events\AppointmentCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class StoreAdminNotification
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
    // public function handle(AppointmentCreated $event): void
    // {
    //     $appointment = $event->appointment;
    //     $adminUsers = User::where('role', 'admin')->get();

    //     foreach ($adminUsers as $admin) {
    //         Notification::create([
    //             'user_id' => $admin->id,
    //             'title' => 'Nueva cita',
    //             'message' => 'El usuario ' . $appointment->user->name . ' ha agendado una nueva cita para el ' .
    //                          $appointment->appointment_date->format('d/m/Y') . ' a las ' . $appointment->appointment_time,
    //             'type' => 'appointment',
    //             'read' => false,
    //             'scheduled_at' => $appointment->appointment_date->copy()->setTimeFromTimeString($appointment->appointment_time),
    //             'sent_at' => now(),
    //         ]);
    //     }
    // }
}
