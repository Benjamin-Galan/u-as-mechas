<?php

namespace App\Services;

use App\Events\AppointmentConfirmed;
use App\Events\AppointmentCreated;
use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use Clue\Redis\Protocol\Model\Request;
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
            event(new AppointmentCreated($appointment));

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

    public function getFilteredAppointments(array $filters)
    {
        $query = Appointment::with(['user', 'staff', 'services', 'promotions', 'packages']);

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->join('users', 'appointments.user_id', '=', 'users.id')
                ->where('users.name', 'like', '%' . $search . '%')
                ->select('appointments.*'); // evita conflictos de columnas
        }

        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['date'])) {
            $query->whereDate('appointment_date', $filters['date']);
        }

        $sort = in_array($filters['sort'] ?? null, ['asc', 'desc']) ? $filters['sort'] : 'desc';
        $query->orderBy('appointment_date', $sort);

        return $query->paginate(10)->appends($filters);
    }

    public function updateStatus(Appointment $appointment, string $status): Appointment
    {
        if (!in_array($status, ['pending', 'confirmed', 'cancelled', 'completed'])) {
            throw new \InvalidArgumentException("Estado inválido");
        }

        $appointment->status = $status;
        $appointment->save();

        event(new AppointmentConfirmed($appointment));

        return $appointment;
    }

    //Función que devuelve los detalles de una cita
    public function getAppointmentDetails(int $appointmentId): Appointment
    {
        $userId = Auth::id();

        $appointment = Appointment::with(['services', 'promotions', 'packages', 'staff'])
            ->where('id', $appointmentId)
            ->where('user_id', $userId)
            ->firstOrFail();

        return $appointment;
    }

    //Función que devuelve los detalles de una cita para el admin
    public function getAppointmentDetailsForAdmin(int $appointmentId): Appointment
    {
        return Appointment::with(['services', 'promotions', 'packages', 'staff', 'user'])
            ->where('id', $appointmentId)
            ->firstOrFail();
    }


    //Funcion que reagenda la cita desde el admin
    public function reschedule(Appointment $appointment, array $data): void
    {
        $appointment->update([
            'appointment_date' => $data['appointment_date'],
            'appointment_time' => $data['appointment_time'],
        ]);
    }

    //Funcion que devuelve las horas no disponibles para una fecha dada y su estado
    public function getUnavailableHours(string $date): array
    {
        return Appointment::whereDate('appointment_date', $date)
            ->get(['appointment_time', 'status'])
            ->map(function ($appointment) {
                return [
                    'hour' => \Carbon\Carbon::createFromFormat('H:i:s', $appointment->appointment_time)->format('H:i'),
                    'status' => $appointment->status,
                ];
            })
            ->toArray();
    }
}
