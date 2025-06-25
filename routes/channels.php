<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('admin.notifications', function ($user) {
    return $user->role === 'admin';
});

Broadcast::channel('client.notifications', function ($user) {
    return $user->role === 'cliente';
});

