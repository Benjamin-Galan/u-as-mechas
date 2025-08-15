<?php

use App\Http\Controllers\AdminAppointmentController;
use App\Http\Controllers\AdminNotificationsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientAppointmentController;
use App\Http\Controllers\ClientDashboardController;
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

        Route::get('admin/appointments', [AdminAppointmentController::class, 'index'])->name('appointments');
        Route::delete('admin/appointments/{id}', [AdminAppointmentController::class, 'destroy'])->name('appointments.destroy');

        // Funciones
        Route::patch('/admin/appointments/{id}/confirm', [AdminAppointmentController::class, 'confirm'])
            ->name('appointments.confirm');

        Route::patch('/admin/appointments/{id}/cancel', [AdminAppointmentController::class, 'cancel'])
            ->name('appointments.cancel');

        Route::patch('/admin/appointments/{id}/check', [AdminAppointmentController::class, 'check'])
            ->name('appointments.check');

        Route::get('admin/appointments/{id}/details', [AdminAppointmentController::class, 'details'])->name('appointments.details');
        Route::get('/admin/appointments/{id}/reschedule', [AdminAppointmentController::class, 'show'])->name('appointments.show');
        Route::patch('/admin/appointments/{appointment}/reschedule', [AdminAppointmentController::class, 'reschedule']);
        Route::get('/admin/appointments/unavailable-hours', [AdminAppointmentController::class, 'getUnavailableHours']);
        Route::get('/admin/appointments/available-staff', [AdminAppointmentController::class, 'getAvailableStylist'])->name('appointments.available-staff');
        Route::post('/admin/appointments/{id}/assign-stylist', [AdminAppointmentController::class, 'assignStylist'])->name('appointments.assign-stylist');

        Route::get('admin/notifications', [AdminNotificationsController::class, 'index'])->name('notifications');

        Route::prefix('admin/categories')->group(function () {
            Route::post('/', [CategoryController::class, 'store'])->name('categories.store');
            Route::put('/{category}', [CategoryController::class, 'update'])->name('categories.update');
            Route::delete('/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
        });

        Route::prefix('admin/reports')->group(function () {
            Route::get('/', [ReportsController::class, 'index'])->name('reports');
            Route::get('monthly', [ReportsController::class, 'exportMonthlyAppointments']);
            Route::get('completed', [ReportsController::class, 'exportCompletedAppointments']);
            Route::get('canceled', [ReportsController::class, 'exportCanceledAppointments']);
            Route::get('earnings', [ReportsController::class, 'exportEarnings']);
            Route::get('clients', [ReportsController::class, 'exportClientsAnalysis']);
            Route::get('by-date', [ReportsController::class, 'exportAppointmentsByDate']);
        });
    });

    Route::middleware(['role:cliente'])->group(function () {
        Route::get('client/dashboard', [ClientDashboardController::class, 'index'])->name('client.dashboard'); // Cambiar la ruta para que coincida con la estructura de carpetas

        Route::get('client/services', [ClientAppointmentController::class, 'index']);

        Route::get('client/appointments', [ClientAppointmentController::class, 'show'])->name('appointments');
        Route::post('client/appointments', [ClientAppointmentController::class, 'store']);

        Route::get('client/notifications', [NotificationsController::class, 'index'])->name('client.notifications');
        Route::delete('client/notifications/{id}', [NotificationsController::class, 'destroy'])
            ->name('notifications.destroy');
        Route::patch('client/notifications/{id}/status', [NotificationsController::class, 'update'])
            ->name('notifications.read');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
