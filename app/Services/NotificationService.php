<?php

namespace App\Services;

use App\Models\Notification;
use Illuminate\Validation\ValidationException;

class NotificationService
{
    public function markAsRead(Notification $notification): Notification
    {
        if ($notification->read) {
            throw ValidationException::withMessages([
                'read' => 'La notificación ya está marcada como leída.'
            ]);
        }

        $notification->read = true;
        $notification->save();

        return $notification;
    }
}
