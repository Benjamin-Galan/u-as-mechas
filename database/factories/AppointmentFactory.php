<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Service;
use App\Models\Staff;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Appointment::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'staff_id' => Staff::inRandomOrder()->first()?->id,
            'appointment_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'appointment_time' => $this->faker->randomElement($this->getTimeSlots('08:00', '18:00')),
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
            'secure_token' => Str::uuid(),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    // Genera una lista de horas en intervalos de 30 minutos entre $start y $end
    private function getTimeSlots($start, $end, $interval = 30): array
    {
        $startTime = strtotime($start);
        $endTime = strtotime($end);
        $timeSlots = [];

        //Se ejecuta mientras la hora de inicio sea menor que la hora de fin
        while ($startTime < $endTime) {
            $timeSlots[] = date('H:i', $startTime);
            $startTime = strtotime("+$interval minutes", $startTime);
        }

        return $timeSlots;
    }

    public function configure()
    {
        return $this->afterCreating(function (Appointment $appointment) {
            // Asegurar que existan servicios
            $serviceIds = Service::pluck('id');
            if ($serviceIds->count() === 0) {
                Service::factory(5)->create();
                $serviceIds = Service::pluck('id');
            }

            // Seleccionar de 1 a 3 servicios aleatorios
            $selectedServices = $serviceIds->random(rand(1, 3))->all();

            // Adjuntar los servicios a la cita
            $appointment->services()->attach($selectedServices);

            // Obtener los modelos completos de los servicios
            $services = Service::whereIn('id', $selectedServices)->get();

            // Sumar precios (puedes aplicar descuento si deseas)
            $totalPrice = $services->sum(function ($service) {
                $price = floatval($service->price);
                $discount = floatval($service->discount);
                return $price - $discount;
            });

            // Actualizar el total en la cita
            $appointment->update(['total_price' => $totalPrice]);
        });
    }
}
