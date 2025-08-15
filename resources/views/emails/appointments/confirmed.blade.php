@component('mail::message')
# Cita confirmada

Hola {{ $appointment->user->name }},  

Tu cita ha sido confirmada con éxito.

**Fecha:** {{ $appointment->appointment_date->format('d/m/Y') }}  
**Hora:** {{ $appointment->appointment_date }}  

**Servicios:**
@foreach($appointment->services as $service)
- {{ $service->name }}
@endforeach

@component('mail::button', ['url' => url('/client/appointments')])
Ver mis citas
@endcomponent

Gracias por confiar en nosotros,  
{{ config('app.name') }}
@endcomponent
