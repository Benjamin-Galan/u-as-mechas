<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class Package extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name',
        'description',
        'image',
        'discount',
        'subtotal',
        'total',
        'is_active'
    ];

    //Un paquete puede tener muchos servicios
    public function services()
    {
        return $this->belongsToMany(Service::class, 'package_service');
    }

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'appointment_service')
            ->withPivot(['price', 'discount_applied'])
            ->withTimestamps();
    }
}
