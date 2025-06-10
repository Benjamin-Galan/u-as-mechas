<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationsController extends Controller
{
    public function index ()
    {
        return Inertia::render('client/notifications', [
            'notifications' => Notification::all()
        ]);
    }
}
