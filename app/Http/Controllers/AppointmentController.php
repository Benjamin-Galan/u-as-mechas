<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\AppointmentRescheduleRequest;
use App\Http\Requests\ChangeAppointmentStatusRequest;
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
                ->orderBy('appointment_date', 'desc')
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

        return redirect()->back()->with('success', 'Cita eliminada exitosamente');
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


    public function admin(Request $request)
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

    public function changeStatus(ChangeAppointmentStatusRequest $request, string $id)
    {
        $appointment = Appointment::findOrFail($id);

        try {
            $updated = $this->appointmentService->updateStatus($appointment, $request->status);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

        return redirect()->back()->with('success', 'Estado actualizado');
    }

    public function reschedule(AppointmentRescheduleRequest $request, Appointment $appointment)
    {
        $this->appointmentService->reschedule($appointment, $request->validated());

        return redirect()->back()->with('success', 'Cita Reagendada');
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
}
