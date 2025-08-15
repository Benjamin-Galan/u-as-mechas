<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Staff::insert([
            [
                'name' => 'Ana López',
                'email' => 'ana.lopez@example.com',
                'phone' => '8888-0001',
                'position' => 'Estilista',
                'available' => true,
            ],
            [
                'name' => 'María Pérez',
                'email' => 'maria.perez@example.com',
                'phone' => '8888-0002',
                'position' => 'Manicurista',
                'available' => true,
            ],
            [
                'name' => 'José Martínez',
                'email' => 'jose.martinez@example.com',
                'phone' => '8888-0003',
                'position' => 'Colorista',
                'available' => false,
            ],
        ]);
    }
}
