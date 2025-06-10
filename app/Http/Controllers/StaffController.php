<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffRequest;
use App\Models\Staff;
use App\Services\StaffService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    protected StaffService $staffService;

    public function __construct(StaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index()
    {
        return Inertia::render('admin/staff/staff', [
            'members' => Staff::all()
        ]);
    }

    public function store(StaffRequest $request)
    {
        $this->staffService->store($request->validated());

        return redirect()->back()->with('success', 'Nuevo miembro creado exitosamente');
    }

    public function update(StaffRequest $request, string $id)
    {
        $staff = Staff::findOrFail($id);
        $this->staffService->update($staff, $request->validated());

        return redirect()->back()->with('success', 'Miembro Actualizado exitosamente');
    }

    public function destroy(string $id)
    {
        $staff = Staff::findOrFail($id);
        $this->staffService->destroy($staff);

        return redirect()->back()->with('success', 'Miembro Elimiado exitosamente');
    }
}
