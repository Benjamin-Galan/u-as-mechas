<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    //Una categoría tiene muchos servicios
    public function services () {
        return $this->hasMany(Service::class );
    }
}
