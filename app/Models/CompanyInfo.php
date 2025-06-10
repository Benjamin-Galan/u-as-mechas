<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    use HasFactory;

    protected $table = 'company_info';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'about',
        'address',
        'lat',
        'long',
        'work_days',
        'social_links',
        'policies',
    ];

    protected $casts = [
        'work_days' => 'array',
        'social_links' => 'array',
    ];
}
