<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminNotificationsController extends Controller
{
    public function index ()
    {
        return Inertia::render('admin/notifications/notifications', [
            'notifications' => Notification::all()
        ]);
    }

    
}
