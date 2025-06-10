<?php

namespace App\Events;

use App\Models\Appointment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AppointmentCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment->load(['user', 'services', 'packages', 'promotions']);
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('admin.notifications'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->appointment->id,
            'user' => [
                'id' => $this->appointment->user_id,
                'name' => $this->appointment->user->name,
            ],
            'date' => $this->appointment->appointment_date->format('d/m/Y'),
            'time' => $this->appointment->appointment_time,
            'total' => $this->appointment->total_price,
            'services' => $this->appointment->services,
            'packages' => $this->appointment->packages,
            'promotions' => $this->appointment->promotions,
            'sent_at' => now()->toDateTimeString(),
        ];
    }
}
