<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'image', 'type', 'value', 'start_date', 'end_date', 'is_active', 'min_quantity', 'second_item_discount'];

    public function services ()
    {
        return $this->belongsToMany(Service::class, 'promotion_service');
    }
}
