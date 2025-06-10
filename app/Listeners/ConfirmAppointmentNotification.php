<?php

namespace App\Listeners;

use App\Events\AppointmentConfirmed;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ConfirmAppointmentNotification
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
    public function handle(AppointmentConfirmed $event): void
    {
        $appointment = $event->appointment;
        $users = User::where('role', 'cliente')->get();

        // Notificar al usuario
        Notification::create([
            'user_id' => $appointment->user_id,
            'title' => 'Cita confirmada',
            'message' => 'Tu cita para el ' . $appointment->appointment_date . 'a las ' . $appointment->appointment_time .' ha sido confirmada',
            'type' => 'confirmation',
            'read' => false,
            'scheduled_at' => now(),
            'sent_at' => now(),
        ]);
    }
}
