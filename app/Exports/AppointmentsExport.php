<?php

namespace App\Exports;

use App\Models\Appointment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AppointmentsExport implements FromCollection, WithHeadings
{
    protected $type;
    protected $start;
    protected $end;

    public function __construct($type = 'all', $start = null, $end = null)
    {
        $this->type = $type;
        $this->start = $start;
        $this->end = $end;
    }

    public function collection()
    {
        $query = Appointment::with(['user', 'services', 'staff']);

        if ($this->start && $this->end) {
            $query->whereBetween('appointment_date', [$this->start, $this->end]);
        }

        switch ($this->type) {
            case 'completed':
                $query->where('status', 'completed');
                break;
            case 'canceled':
                $query->where('status', 'canceled');
                break;
            case 'earnings':
                $query->where('status', 'completed');
                break;
            case 'clients':
                // Este caso lo manejaremos en otra función si es necesario
                break;
            default:
                break;
        }

        return $query->get()->map(function ($a) {
            return [
                'ID' => $a->id,
                'Cliente' => $a->user->name ?? 'Sin usuario',
                'Staff' => $a->staff->name ?? 'Sin staff',
                'Fecha' => $a->appointment_date->format('Y-m-d'),
                'Hora' => $a->appointment_time,
                'Estado' => $a->status,
                'Total' => $a->total_price,
                'Servicios' => $a->services->pluck('name')->join(', '),
            ];
        });
    }

    public function headings(): array
    {
        return ['ID', 'Cliente', 'Staff', 'Fecha', 'Hora', 'Estado', 'Total', 'Servicios'];
    }
}
