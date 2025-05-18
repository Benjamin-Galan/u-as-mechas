<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Uñas', 'Cabello', 'Manos', 'Pies', 'Maquillaje', 'Tratamientos', 'Spa'];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
