<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\User;

class StatsService
{
    public function newClientsThisMonth()
    {
        return strval(
            User::where('role', 'cliente')
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count()
        );
    }

    public function getTotalAppointments()
    {
        return Appointment::count();
    }

    public function monthlyRevenue()
    {
        return Appointment::where('status', 'completed')
            ->whereMonth('appointment_date', now()->month)
            ->whereYear('appointment_date', now()->year)
            ->sum('total_price');
    }

    //Porcentajes de citas (Completadas, Canceladas y Pendientes)
    public function appointmentStatusPercentage()
    {
        $totalAppointments = Appointment::whereMonth('appointment_date', now()->month)
            ->whereYear('appointment_date', now()->year)
            ->count();

        if ($totalAppointments === 0) {
            return ['completed' => 0, 'cancelled' => 0, 'pending' => 0];
        }

        return [
            'completed' => $completed = Appointment::where('status', 'completed')
                ->whereMonth('appointment_date', now()->month)
                ->whereYear('appointment_date', now()->year)
                ->count(),

            'cancelled' => $cancelled = Appointment::where('status', 'cancelled')
                ->whereMonth('appointment_date', now()->month)
                ->whereYear('appointment_date', now()->year)
                ->count(),

            'pending' => $pending = Appointment::where('status', 'pending')
                ->whereMonth('appointment_date', now()->month)
                ->whereYear('appointment_date', now()->year)
                ->count(),
            'sum' => $completed + $cancelled + $pending
        ];
    }

    public function monthlyEarnings()
    {
        return Appointment::where('status', 'completed')
            ->selectRaw('YEAR(appointment_date) as year, MONTH(appointment_date) as month, SUM(total_price) as earnings')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();
    }

    public function pendingAppointmentsToday()
    {
        return Appointment::where('status', 'confirmed')
            ->whereDate('appointment_date', now()->toDateString())
            ->select(['id', 'appointment_date', 'appointment_time', 'total_price', 'status', 'user_id', 'staff_id'])
            ->with(['user:id,name', 'staff:id,name'])
            ->get();
    }

    public function occupiedHours($date)
    {
        return Appointment::wehereDate('appointment_date', $date)
            ->pluck('appointment_time')
            ->toArray();
    }
}
