<?php

namespace App\Http\Controllers;

use App\Exports\AppointmentsExport;
use App\Exports\ClientsExport;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/reports/page');
    }

    public function exportMonthlyAppointments()
    {
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();

        return Excel::download(new AppointmentsExport('all', $start, $end), 'citas_mes.xlsx');
    }

    public function exportCompletedAppointments()
    {
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();

        return Excel::download(new AppointmentsExport('completed', $start, $end), 'citas_completadas.xlsx');
    }

    public function exportCanceledAppointments()
    {
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();

        return Excel::download(new AppointmentsExport('canceled', $start, $end), 'citas_canceladas.xlsx');
    }

    public function exportEarnings()
    {
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();

        return Excel::download(new AppointmentsExport('earnings', $start, $end), 'ganancias.xlsx');
    }

    public function exportClientsAnalysis()
    {
        $start = now()->startOfMonth();
        $end = now()->endOfMonth();

        return Excel::download(new ClientsExport($start, $end), 'analisis_clientes.xlsx');
    }

    public function exportAppointmentsByDate(Request $request)
    {
        $start = $request->input('start_date') ?? now()->startOfMonth();
        $end = $request->input('end_date') ?? now()->endOfMonth();

        return Excel::download(new AppointmentsExport('all', $start, $end), 'reporte_fechas.xlsx');
    }
}
