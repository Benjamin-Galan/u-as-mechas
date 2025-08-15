<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ClientDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Total de citas del cliente
        $totalAppointments = Appointment::where('user_id', $user->id)->count();

        // Citas próximas (estado confirmado o pendiente)
        $upcomingAppointments = Appointment::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'confirmed'])
            ->whereDate('appointment_date', '>=', now())
            ->count();

        // Citas canceladas
        $cancelledAppointments = Appointment::where('user_id', $user->id)
            ->where('status', 'cancelled')
            ->count();

        // Total gastado por el cliente
        $totalSpent = Appointment::where('user_id', $user->id)
            ->with(['services', 'promotions', 'packages'])
            ->get()
            ->sum(function ($appointment) {
                $servicesTotal = $appointment->services->sum('price');
                $promotionsTotal = $appointment->promotions->sum('price');
                $packagesTotal = $appointment->packages->sum('price');
                return $servicesTotal + $promotionsTotal + $packagesTotal;
            });

        return Inertia::render('client/dashboard', [
            'totalAppointments' => $totalAppointments,
            'upcomingAppointments' => $upcomingAppointments,
            'cancelledAppointments' => $cancelledAppointments,
            'totalSpent' => $totalSpent,
        ]);
    }
}
