<?php

namespace App\Exports;

use App\Models\Appointment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClientsExport implements FromCollection, WithHeadings
{
    protected $start;
    protected $end;

    public function __construct($start = null, $end = null)
    {
        $this->start = $start;
        $this->end = $end;
    }

    public function collection()
    {
        $appointments = Appointment::with('user')
            ->whereBetween('appointment_date', [$this->start, $this->end])
            ->get();

        // Agrupar por usuario y calcular datos
        return collect(
            $appointments->groupBy(fn($a) => $a->user_id)->map(function($group) {
                $user = $group->first()->user;
                $firstAppointment = $user?->appointments()->orderBy('appointment_date')->first();
                $isNew = $firstAppointment && $firstAppointment->appointment_date >= now()->startOfMonth();

                return [
                    'Cliente' => $user?->name ?? 'Desconocido',
                    'Citas este mes' => $group->count(),
                    'Total gastado' => $group->sum('total_price'),
                    'Nuevo Cliente' => $isNew ? 'Sí' : 'No',
                ];
            })
        );
    }

    public function headings(): array
    {
        return ['Cliente', 'Citas este mes', 'Total gastado', 'Nuevo Cliente'];
    }
}
