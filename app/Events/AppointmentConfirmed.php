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

class AppointmentConfirmed implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $appointment;

    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment->load('user', 'staff');
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('client.notifications'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->appointment->id,
            'user' => [
                'id' => $this->appointment->user_id,
            ],
            'date' => $this->appointment->appointment_date->format('d/m/Y'),
            'time' => $this->appointment->appointment_time,
            'status' => $this->appointment->status,
            'sent_at' => now()->toDateTimeString(),
        ];
    }
}
