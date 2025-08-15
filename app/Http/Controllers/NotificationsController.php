<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    use AuthorizesRequests;

    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function index(Request $request)
    {
        $user = Auth::user();

        if ($user && $user->role === 'cliente') {
            $query = Notification::where('user_id', $user->id);

            // Obtener el filtro desde la URL, por ejemplo: ?filter=read o ?filter=unread o ?filter=all
            $filter = $request->query('filter', 'unread'); // por defecto 'all'

            if ($filter === 'read') {
                $query->where('read', true);
            } elseif ($filter === 'unread') {
                $query->where('read', false);
            }
            // Si es 'all', no se agrega condición extra

            $notifications = $query->latest()->paginate(10)->withQueryString();

            return Inertia::render('client/notifications/notifications', [
                'notificationsList' => $notifications,
                'filter' => $filter // opcional para saber qué filtro está activo en el front
            ]);
        }
    }

    //Actualizar el estado de la notificación
    public function update(Request $request, $id)
    {
        $request->validate([
            'read' => 'required|boolean|in:1,true',
        ]);

        $notification = Notification::findOrFail($id);

        try {
            $this->notificationService->markAsRead($notification);
            return redirect()->back()->with('success', 'Estado actualizado');
        } catch (ValidationException $e) {
            return redirect()->back()->with('error', 'No actualizado');
        }
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);

        $notification->delete();

        return redirect()->back()->with('success', 'Notificación eliminada correctamente.');
    }

    public function markAsRead(Notification $notification)
    {
        $this->authorize('update', $notification);

        $notification->update(['read' => true]);

        return redirect()->back()->with('success', 'Notificación marcada como leída.');
    }
}
