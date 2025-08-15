<?php

namespace App\Http\Controllers;

use App\Events\AppointmentConfirmed;
use App\Events\AppointmentCreated;
use App\Http\Requests\AppointmentRescheduleRequest;
use App\Mail\AppointmentConfirmedMail;
use App\Mail\AppointmentRescheduledMail;
use App\Models\Appointment;
use App\Models\Notification;
use App\Models\Staff;
use App\Models\User;
use App\Services\AppointmentService;
use App\Services\StaffService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminAppointmentController extends Controller
{
    protected AppointmentService $appointmentService;
    protected StaffService $staffService;

    public function __construct(AppointmentService $appointmentService, StaffService $staffService)
    {
        $this->appointmentService = $appointmentService;
        $this->staffService = $staffService;
    }

    public function index(Request $request)
    {
        $query = Appointment::with(['user', 'staff', 'services', 'promotions', 'packages']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('date')) {
            $query->whereDate('appointment_date', $request->date);
        }

        if ($request->has('sort') && in_array($request->sort, ['asc', 'desc'])) {
            $query->orderBy('appointment_date', $request->sort);
        } else {
            $query->orderBy('appointment_date', 'desc');
        }

        return Inertia::render('admin/appointments/page', [
            'appointments' => $query->paginate(10)->appends($request->query()),
        ]);
    }

    public function confirm(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        try {
            $this->appointmentService->confirm($appointment);
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        Notification::create([
            'user_id' => $appointment->user_id,
            'title' => 'Cita confirmada',
            'message' => 'Tu cita para el ' . $appointment->appointment_date->format('d/m/Y') . ' ha sido confirmada',
            'type' => 'appointment',
            'read' => false,
        ]);

        // Enviar correo al cliente en segundo plano
        Mail::to($appointment->user->email)->send(new AppointmentConfirmedMail($appointment));

        return back()->with('success', 'Cita confirmada');
    }

    public function cancel(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        try {
            $this->appointmentService->cancel($appointment);
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        Notification::create([
            'user_id' => $appointment->user_id,
            'title' => 'Cita cancelada',
            'message' => 'Tu cita para el ' . $appointment->appointment_date->format('d/m/Y') . ' fue cancelada. Consulta al administrador',
            'type' => 'appointment',
            'read' => false,
        ]);

        return back()->with('success', 'Cita Cancelada');
    }

    public function check(string $id)
    {
        $appointment = Appointment::findOrFail($id);

        try {
            $this->appointmentService->checked($appointment);
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        return back()->with('success', 'Check In realizado correctamente');
    }

    public function show(string $id)
    {
        $appointment = $this->appointmentService->getAppointmentDetails($id);

        return response()->json([
            'appointment' => $appointment,
        ]);
    }

    public function details(string $id)
    {
        $appointment = $this->appointmentService->getAppointmentDetailsForAdmin((int) $id);

        return Inertia::render('admin/appointments/details', [
            'appointment' => $appointment,
        ]);
    }

    public function reschedule(AppointmentRescheduleRequest $request, Appointment $appointment)
    {
        try {
            $this->appointmentService->reschedule($appointment, $request->validated());
        } catch (\InvalidArgumentException $e) {
            return back()->withErrors(['status' => $e->getMessage()]);
        }

        Notification::create([
            'user_id' => $appointment->user_id,
            'title' => 'Cita reagendada',
            'message' => 'Nueva cita reagendada para el '
                . $appointment->appointment_date->format('d/m/Y')
                . ' a las ' . $appointment->appointment_time . ' Consulta al administrador',
            'type' => 'appointment',
            'read' => false,
        ]);

        // Enviar correo al cliente en segundo plano
        Mail::to($appointment->user->email)->queue(new AppointmentRescheduledMail($appointment));

        return back()->with('success', 'Cita reagendada correctamente');
    }


    public function getUnavailableHours(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
        ]);

        $date = $request->input('date');
        $hours = $this->appointmentService->getUnavailableHours($date);

        return response()->json([
            'unavailable_hours' => $hours,
        ]);
    }

    //Obtener todos los estilistas disponibles
    public function getAvailableStylist()
    {
        $availableStaff = $this->staffService->getAvailableStaff();

        return response()->json([
            'available_staff' => $availableStaff,
        ]);
    }

    //Asignar un estilista a una cita si no tiene uno asignado
    public function assignStylist(Request $request, string $id)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
        ]);

        $appointment = Appointment::findOrFail($id);
        $staff = Staff::findOrFail($request->input('staff_id'));

        if ($appointment->staff_id) {
            return redirect()->back()->withErrors(['staff' => 'La cita ya tiene un estilista asignado.']);
        }

        //Validar disponibilidad en la fecha y hora especificas
        if (!$this->staffService->isAvailableAt($staff, $appointment->appointment_date, $appointment->appointment_time)) {
            return redirect()->back()->withErrors(['staff' => 'El estilista no está disponible en la fecha y hora seleccionadas.']);
        }

        $appointment->staff_id = $staff->id;
        $appointment->save();

        return redirect()->back()->with('success', 'Estilista asignado correctamente');
    }
}
