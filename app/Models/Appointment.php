<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $casts = [
        'appointment_date' => 'datetime',
        'scheduled_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    protected $fillable = [
        'user_id',
        'staff_id',
        'appointment_date',
        'appointment_time',
        'status',
        'total_price',
        'secure_token',
        'notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'appointment_service');
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'appointment_promotion')
            ->with('services');
    }

    public function packages()
    {
        return $this->belongsToMany(Package::class, 'appointment_package')
            ->with('services');
    }

    public function servicesWithDetails()
    {
        return $this->services()->with(['category', 'promotions', 'packages']);
    }
}
