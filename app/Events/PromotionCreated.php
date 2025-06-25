<?php

namespace App\Events;

use App\Models\Promotion;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PromotionCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $promotion;
    /**
     * Create a new event instance.
     */
    public function __construct(Promotion $promotion)
    {
        $this->promotion = $promotion;
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
            'promotion_id' => $this->promotion->id,
            'promotion_name' => $this->promotion->name,
            'promotion_total' => $this->promotion->total,
            'promotion_end_date' => $this->promotion->end_date,
            'promotion_image' => $this->promotion->image,
            'promotion_sent_at' => now()->toDateTimeString(),
        ];
    }
}
