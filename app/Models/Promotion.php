<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'type', 'start_date', 'end_date', 'is_active', 'subtotal', 'total'];

    public function services()
    {
        return $this->belongsToMany(Service::class)
            ->withPivot('individual_price', 'individual_discount', 'is_bogo')
            ->withTimestamps();
    }

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'appointment_service')
            ->withPivot(['price', 'discount_applied'])
            ->withTimestamps();
    }
}
