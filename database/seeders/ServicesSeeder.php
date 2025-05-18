<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Tinte de Cabello',
                'description' => 'Tinte estilizado por nuestros expertos.',
                'price' => 15.99,
                'discount' => 2.00,
                'duration' => 45,
                'image' => 'tinte.png',
                'category_id' => 2, // Suponiendo que la categoría "Cabello" tiene ID 2
            ],
            [
                'name' => 'Manicure Completo',
                'description' => 'Servicio de manicure con decoración.',
                'price' => 25.00,
                'discount' => 5.00,
                'duration' => 60,
                'image' => 'unias.png',
                'category_id' => 3, // Suponiendo que "Uñas" tiene ID 1
            ],
            [
                'name' => 'Pedicure completo',
                'description' => 'Servicio de pedicure con spa.',
                'price' => 50.00,
                'discount' => 10.00,
                'duration' => 90,
                'image' => 'pedicure.png',
                'category_id' => 4, // Suponiendo que "Maquillaje" tiene ID 3
            ]
        ];

        foreach ($services as $service) {
                Service::create($service);
            }
    }
}

/**
 * mysql> select * from categories
+----+--------------+---------------------+---------------------+
| id | name         | created_at          | updated_at          |
+----+--------------+---------------------+---------------------+
|  1 | Uñas         | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  2 | Cabello      | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  3 | Manos        | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  4 | Pies         | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  5 | Maquillaje   | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  6 | Tratamientos | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
|  7 | Spa          | 2025-05-11 08:50:57 | 2025-05-11 08:50:57 |
+----+--------------+---------------------+---------------------+
7 rows in set (0.00 sec)
 */
