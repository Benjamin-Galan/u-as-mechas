<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'description', 'price', 'discount', 'duration', 'image', 'category_id'];

    //Un servicio pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class, 'appointment_service')
            ->withPivot(['price', 'discount_applied'])
            ->withTimestamps();
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_service')
            ->withPivot('individual_price', 'individual_discount', 'is_bogo')
            ->withTimestamps();
    }

    //Un servicio puede pertenecer a muchos paquetes
    public function packages()
    {
        return $this->belongsToMany(Package::class, 'package_service');
    }
}
