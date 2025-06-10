<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    //['name', 'description', 'price', 'discount', 'duration', 'image', 'category_id'];
    protected $model = Service::class;

    public function definition(): array
    {
        $category = Category::inRandomOrder()->first() ?? Category::factory()->create();

        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 100, 500),
            'discount' => $this->faker->randomFloat(2, 0, 50),
            'duration' => $this->faker->numberBetween(15, 120),
            'image' => 'placeholder.jpg', // Puedes actualizar esto para imágenes reales
            'category_id' => $category->id,
        ];
    }
}
