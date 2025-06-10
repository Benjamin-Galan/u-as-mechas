<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentHistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('client/appointments', [
            'appointments' => Appointment::with(['services', 'promotions', 'packages'])
                ->where('user_id', $user->id)
                ->latest()
                ->get()
        ]);
    }
}
