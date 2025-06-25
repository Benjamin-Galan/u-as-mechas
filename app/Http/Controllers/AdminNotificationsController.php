<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminNotificationsController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->query('filter', 'unread'); // read, unread, all
        $type = $request->query('type', 'all'); // Valor por defecto si no viene en la URL
        // appointment, cancelation, null

        $query = Notification::query();

        if ($filter === 'read') {
            $query->where('read', true);
        } elseif ($filter === 'unread') {
            $query->where('read', false);
        }

        if ($type === 'all') {
            $query->whereIn('type', ['appointment', 'cancelation']);
        } elseif (in_array($type, ['appointment', 'cancelation'])) {
            $query->where('type', $type);
        }

        $notifications = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/notifications/notifications', [
            'notifications' => $notifications,
            'filter' => $filter,
            'type' => $type,
        ]);
    }
}
