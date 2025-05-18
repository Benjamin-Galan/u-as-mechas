<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'discount', 'duration', 'image', 'category_id'];

    //Un servicio pertenece a una categoría
    public function category () 
    {
        return $this->belongsTo(Category::class);
    }

    public function appointments ()
    {
        return $this->belongsToMany(Service::class, 'appointment_service')
                    ->withPivot(['price', 'discount_applied', 'promotionId'])
                    ->withTimestamps();
    }

    public function promotion ()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_service');
    }

    // public function calculateTotal()
    // {
    //     $total = 0;

    //     //Iterar sobre los servicios de la cita
    //     foreach ($this->services as $service) {
    //         $total += ($service->pivot->price - $service->pivot->discount_applied);
    //     }
    // }

}
