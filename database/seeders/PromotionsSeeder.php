<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $promotions = [
            [
                'name' => '10% de Descuento en Spa',
                'description' => 'Obtén un 10% de descuento en cualquier servicio de spa.',
                'image' => 'pedicure.png',
                'type' => 'percentaje',
                'value' => 10.00,
            ],
            [
                'name' => 'Descuento fijo de $5',
                'description' => 'Descuento de $5 en tratamientos seleccionados.',
                'image' => 'tinte.png',
                'type' => 'fixed',
                'value' => 5.00,
            ],
            [
                'name' => '2x1 en Manicure',
                'description' => 'Paga 1 y lleva 2 manicures.',
                'image' => 'unias.png',
                'type' => 'bogo',
                'value' => null,
            ],
            [
                'name' => 'Promoción General',
                'description' => 'Promoción válida para varios servicios por tiempo limitado.',
                'image' => 'tinte.png',
                'type' => 'general',
                'value' => null,
            ]
        ];

        foreach ($promotions as $promotion) {
            Promotion::create($promotion);
        }
    }
}
