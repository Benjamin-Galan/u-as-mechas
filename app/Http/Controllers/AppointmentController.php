<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Models\Appointment;
use App\Models\CompanyInfo;
use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\User;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index()
    {
        $userId = Auth::id();

        return Inertia::render('client/services', [
            'services' =>  Service::all(),
            'promotions' => Promotion::with('services')->get(),
            'packages' => Package::with('services')->get(),
            'appointments' => Appointment::with(['services', 'promotions', 'packages'])
                ->where('user_id', $userId)
                ->get()
        ]);
    }


    public function store(AppointmentRequest $request)
    {
        $appointment = $this->appointmentService->store($request->validated());

        return response()->json([
            'message' => 'Cita creada correctamente',
            'appointment' => $appointment
        ]);
    }

    public function update(AppointmentRequest $request, string $id)
    {
        $appointment = Appointment::findOrFail($id);
        $updated = $this->appointmentService->update($appointment, $request->validated());

        return response()->json([
            'message' => 'Cita actualizada correctamente',
            'appointment' => $updated
        ]);
    }

    public function destroy(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        $this->appointmentService->destroy($appointment);

        return response()->json([
            'message' => 'Cita eliminada correctamente'
        ]);
    }

    public function admin()
    {
        return Inertia::render('admin/appointments/appointments', [
            'appointments' => Appointment::with(['user', 'staff', 'services', 'promotions', 'packages'])
                ->paginate(10), // Paginación con 10 registros por página
        ]);
    }
}
