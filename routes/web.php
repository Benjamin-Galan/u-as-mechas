<?php

use App\Http\Controllers\AdminNotificationsController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentHistoryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StaffController;
use App\Models\Category;
use App\Models\Promotion;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:admin'])->group(function () {
        Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('dashboard/hours', [DashboardController::class, 'hours'])->name('dashboard.hours');

        // Resto de rutas admin...
        Route::get('admin/services', [ServiceController::class, 'index'])->name('services');
        Route::post('services', [ServiceController::class, 'store'])->name('services.store');
        Route::put('services/{id}', [ServiceController::class, 'update'])->name('services.update');
        Route::delete('services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');

        Route::get('promotions', [PromotionController::class, 'index'])->name('promotions');
        Route::post('promotions', [PromotionController::class, 'store'])->name('promotions.store');
        Route::put('promotions/{id}', [PromotionController::class, 'update'])->name('promotions.update');
        Route::delete('promotions/{id}', [PromotionController::class, 'destroy'])->name('promotions.destroy');

        Route::get('packages', [PackageController::class, 'index'])->name('packages');
        Route::post('packages', [PackageController::class, 'store'])->name('packages.store');
        Route::put('packages/{id}', [PackageController::class, 'update'])->name('packages.update');
        Route::delete('packages/{id}', [PackageController::class, 'destroy'])->name('packages.destroy');

        Route::get('staff', [StaffController::class, 'index'])->name('staff');
        Route::post('staff', [StaffController::class, 'store'])->name('staff.store');
        Route::put('staff/{id}', [StaffController::class, 'update'])->name('staff.update');
        Route::delete('staff/{id}', [StaffController::class, 'destroy'])->name('staff.destroy');

        Route::resource('categories', CategoryController::class);

        Route::get('admin/notifications', [AdminNotificationsController::class, 'index'])->name('notifications');

        Route::get('admin/appointments', [AppointmentController::class, 'admin'])->name('appointments');
        Route::post('admin/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
        Route::put('admin/appointments/{id}', [AppointmentController::class, 'update'])->name('appointments.update');
        Route::delete('admin/appointments/{id}', [AppointmentController::class, 'destroy'])->name('appointments.destroy');
        Route::patch('/admin/appointments/{id}/status', [AppointmentController::class, 'changeStatus']);

        Route::get('admin/appointments/{id}/details', [AppointmentController::class, 'details'])->name('appointments.details');

        Route::get('/admin/appointments/{id}/reschedule', [AppointmentController::class, 'show'])->name('appointments.show');
        Route::patch('/admin/appointments/{appointment}/reschedule', [AppointmentController::class, 'reschedule']);
        Route::get('/admin/appointments/unavailable-hours', [AppointmentController::class, 'getUnavailableHours']);

        Route::get('/admin/reports', [ReportsController::class, 'index'])->name('reports');
    });

    Route::middleware(['role:cliente'])->group(function () {
        Route::get('client/dashboard', function () {
            return Inertia::render('client/dashboard');
        })->name('client.dashboard'); // Cambiar la ruta para que coincida con la estructura de carpetas

        Route::get('client/services', [AppointmentController::class, 'index']);
        Route::post('client/appointments', [AppointmentController::class, 'store']);
        Route::get('client/appointments', [AppointmentHistoryController::class, 'index'])->name('appointments');

        Route::get('client/notifications', [NotificationsController::class, 'index'])->name('client.notifications');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
