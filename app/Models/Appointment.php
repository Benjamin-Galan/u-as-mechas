<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'staff_id', 'appointment_date', 'status',
        'total_price', 'secure_token', 'notes'
    ];

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function staff ()
    {
        return $this->belongsTo(Staff::class);
    }

    public function services ()
    {
        return $this->belongsToMany(Service::class, 'appointment_service')
                    ->withPivot(['price', 'discount', 'promotionId'])
                    ->withTimestamps();
    }
}
