<?php

namespace App\Events;

use App\Models\Service;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ServiceCreatedOrDiscounted implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service->load('category');
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

    public function broadcastWith()
    {
        return [
            'service_id' => $this->service->id,
            'service_name' => $this->service->name,
            'service_price' => $this->service->price,
            'service_discount' => $this->service->discount,
            'service_category' => $this->service->category->name,
            'service_image' => $this->service->image,
            'service_sent_at' => now()->toDateTimeString(),
        ];
    }
}
