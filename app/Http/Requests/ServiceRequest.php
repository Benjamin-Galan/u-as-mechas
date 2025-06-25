<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ServiceRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1|max:1440',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    

    protected function prepareForValidation(): void
    {
        // Convertir strings vacíos a null para campos opcionales
        if ($this->discount === '' || $this->discount === '0.00') {
            $this->merge(['discount' => 0]);
        }

        // Asegurar que los números sean del tipo correcto
        if ($this->price) {
            $this->merge(['price' => (float) $this->price]);
        }

        if ($this->duration) {
            $this->merge(['duration' => (int) $this->duration]);
        }

        if ($this->category_id) {
            $this->merge(['category_id' => (int) $this->category_id]);
        }
    }
}
