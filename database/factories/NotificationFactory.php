<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Notification::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'title' => $this->faker->sentence(4),
            'message' => $this->faker->paragraph(),
            'type' => $this->faker->randomElement(['appointment', 'promotion', 'reminder', 'cancelation', 'confirmation']),
            'read' => $this->faker->boolean(30), // 30% de probabilidad que esté leída
            'scheduled_at' => $this->faker->optional()->dateTimeBetween('-1 week', '+1 week'),
            'sent_at' => $this->faker->optional()->dateTimeBetween('-1 week', 'now'),
        ];
    }
}
