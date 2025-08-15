<?php

namespace App\Services;

use App\Models\Staff;

class StaffService
{
    public function store(array $data)
    {
        if (isset($data)) {
            $staff = Staff::create($data);
        }

        return $staff;
    }

    public function update(Staff $staff, array $data)
    {
        $staff->update($data);
        return $staff;
    }

    public function destroy(Staff $staff)
    {
        return $staff->delete();
    }

    //Verificar el estado de disponibilidad de un estilista
    public function isAvailable(Staff $staff): bool
    {
        return $staff->status === true;
    }

    //Mostrar todos los estilistas disponibles
    public function getAvailableStaff() {
        return Staff::where('available', true)->get();
    }

    //Verificar disponibilidad de un estilista en una fecha y hora especificas
    public function isAvailableAt(Staff $staff, string $date, string $time): bool
    {
        return !$staff->appointments()
            ->where('appointment_date', $date)
            ->where('appointment_time', $time)
            ->exists();
    }
}
