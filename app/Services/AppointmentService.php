<?php

namespace App\Services;

use App\Events\AppointmentCreated;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AppointmentService
{
    public function store(array $data): Appointment
    {
        return DB::transaction(function () use ($data) {
            $appointment = Appointment::create([
                'user_id' => Auth::id(),
                'staff_id' => $data['staff_id'] ?? null,
                'appointment_date' => $data['date'],
                'appointment_time' => $data['time'],
                'total_price' => $data['total'],
                'secure_token' => Str::uuid(),
                'status' => 'pending',
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($data['items'] as $item) {
                if ($item['type'] === 'service') {
                    $appointment->services()->attach([
                        $item['id'] => [
                            'price' => $item['price'],
                            'discount_applied' => $item['discount'],
                        ]
                    ]);
                }

                if ($item['type'] === 'promotion') {
                    $appointment->promotions()->attach([
                        $item['id'] => [
                            'price' => $item['price'],
                            'discount_applied' => $item['discount'],
                        ]
                    ]);
                }

                if ($item['type'] === 'package') {
                    $appointment->packages()->attach([
                        $item['id'] => [
                            'price' => $item['price'],
                            'discount_applied' => $item['discount'],
                        ]
                    ]);
                }
            }

            // Emitir evento después de guardar todo
            // event(new AppointmentCreated($appointment));

            return $appointment;
        });
    }

    public function update(Appointment $appointment, array $data): Appointment
    {
        return DB::transaction(function () use ($appointment, $data) {
            $appointment->update([
                'staff_id' => $data['staff_id'] ?? $appointment->staff_id,
                'appointment_date' => $data['date'],
                'appointment_time' => $data['time'],
                'total_price' => $data['total'],
                'status' => $data['status'] ?? $appointment->status,
                'notes' => $data['notes'] ?? $appointment->notes
            ]);

            $services = [];
            $promotions = [];
            $packages = [];

            foreach ($data['items'] as $item) {
                $entry = [
                    'price' => $item['price'],
                    'discount_applied' => $item['discount'],
                ];

                if ($item['type'] === 'service') {
                    $services[$item['id']] = $entry;
                }

                if ($item['type'] === 'promotion') {
                    $promotions[$item['id']] = $entry;
                }

                if ($item['type'] === 'package') {
                    $packages[$item['id']] = $entry;
                }
            }

            $appointment->services()->sync($services);
            $appointment->promotions()->sync($promotions);
            $appointment->packages()->sync($packages);

            // Emitir un evento
            // event(new AppointmentUpdated ($appointment));

            return $appointment;
        });
    }

    public function destroy(Appointment $appointment)
    {
        DB::transaction(function () use ($appointment) {
            $appointment->services()->detach();
            $appointment->promotions()->detach();
            $appointment->packages()->detach();

            $appointment->delete();

            // Emitir un evento
            // event(new AppointmentDeleted($appointment));
        });
    }    
}
