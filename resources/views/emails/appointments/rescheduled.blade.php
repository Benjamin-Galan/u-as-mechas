@component('mail::message')
# Cita Reagendada

Hola {{ $appointment->user->name }},

Tu cita ha sido reagendada con éxito.

**Nueva fecha:** {{ $appointment->appointment_date->format('d/m/Y') }}  
**Nueva hora:** {{ $appointment->appointment_time }}

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
