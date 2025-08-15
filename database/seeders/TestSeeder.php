<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Category;
use App\Models\Notification;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear 10 usuarios
        User::factory(10)->create();

        // Crear 20+ citas con fechas variadas
        Appointment::factory(25)->create();

        // Crear categorías
        Category::factory(5)->create()->each(function ($category) {

            // Crear servicios relacionados a cada categoría
            Service::factory(4)->create(['category_id' => $category->id]);
        });

        // Crear notificaciones para cada cliente
        User::where('role', 'cliente')->get()->each(function ($user) {
            Notification::factory(3)->create();
        });
    }
}
