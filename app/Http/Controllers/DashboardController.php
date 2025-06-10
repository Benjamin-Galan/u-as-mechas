<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use App\Services\StatsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected StatsService $statsService;

    public function __construct(StatsService $statsService)
    {
        $this->statsService = $statsService;
    }

    public function index()
    {
        return Inertia::render('admin/dashboard/dashboard', [
            'new_clients_this_month' => $this->statsService->newClientsThisMonth(),
            'total_appointments' => $this->statsService->getTotalAppointments(),
            'monthly_revenue' => $this->statsService->monthlyRevenue(),
            'status_percentaje' => $this->statsService->appointmentStatusPercentage(),
            'monthly_earnings' => $this->statsService->monthlyEarnings(),
            'pending_appointments' => $this->statsService->pendingAppointmentsToday()
        ]);
    }

    public function hours(Request $request)
    {
        $date = $request->input('date', now()->toDateString()); // Usa hoy como predeterminado
        return response()->json([
            'occupied_hours' => $this->statsService->occupiedHours($date),
        ]);
    }
}
