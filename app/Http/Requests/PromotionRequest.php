<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromotionRequest extends FormRequest
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'type' => 'required|string|in:general,individual,mixed',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'subtotal' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'services' => 'nullable|string', // Como viene JSON stringificado
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        // Si services viene como string, lo decodificamos para validación adicional
        if ($this->has('services') && is_string($this->services)) {
            $services = json_decode($this->services, true);
            
            if (is_array($services)) {
                // Validar estructura de cada servicio
                foreach ($services as $service) {
                    if (!isset($service['service_id']) || !is_numeric($service['service_id'])) {
                        throw new \InvalidArgumentException('Cada servicio debe tener un service_id válido');
                    }
                }
            }
        }
    }
}
