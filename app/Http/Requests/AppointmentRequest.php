<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'total' => 'required|numeric',
            'duration' => 'required|integer',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer',
            'items.*.type' => 'required|in:service,promotion,package',
            'items.*.price' => 'required|numeric',
            'items.*.discount' => 'required|numeric',
        ];
    }
}
