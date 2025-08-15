<?php

namespace App\Http\Controllers;

use App\Events\AppointmentCreated;
use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\AppointmentRescheduleRequest;
use App\Mail\NewAppointmentMail;
use App\Models\Appointment;
use App\Models\Notification;
use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\User;
use App\Services\AppointmentService;
use App\Services\StaffService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ClientAppointmentController extends Controller
{
    protected AppointmentService $appointmentService;
    protected StaffService $staffService;

    public function __construct(AppointmentService $appointmentService, StaffService $staffService)
    {
        $this->appointmentService = $appointmentService;
        $this->staffService = $staffService;
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
                ->orderBy('appointment_date', 'desc')
                ->get()
        ]);
    }

    public function store(AppointmentRequest $request)
    {
        $appointment = $this->appointmentService->store($request->validated());

        $admins = User::where('role', 'admin')->get();

        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'title' => 'Nueva cita agendada',
                'message' => $appointment->user->name . ' ha agendado una nueva cita para ' . $appointment->appointment_date->format('d/m/Y H:i'),
                'type' => 'appointment',
                'read' => false,
            ]);

            // Notificación por correo
            Mail::to($admin->email)->send(new NewAppointmentMail($appointment));
        }

        return redirect()->back()->with('success', 'Cita creada exitosamente');
    }

    public function show()
    {
        $user = Auth::user();

        return Inertia::render('client/appointments', [
            'appointments' => Appointment::with(['services', 'promotions', 'packages'])
                ->where('user_id', $user->id)
                ->latest()
                ->get()
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

    public function reschedule(AppointmentRescheduleRequest $request, Appointment $appointment)
    {
        $this->appointmentService->reschedule($appointment, $request->validated());

        return redirect()->back()->with('success', 'Cita Reagendada');
    }

    public function destroy(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        $this->appointmentService->destroy($appointment);

        return redirect()->back()->with('success', 'Cita eliminada exitosamente');
    }

    public function cancel(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        try {
            $this->appointmentService->cancel($appointment);
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        return back()->with('success', 'Cita Cancelada');
    }


    public function getUnavailableHoursForUser(Request $request)
    {
        $request->validate(['date' => 'required|date']);

        $hours = app(AppointmentService::class)
            ->getUnavailableHours($request->date);

        return response()->json(['unavailable_hours' => $hours]);
    }
}
