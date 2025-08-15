@component('mail::message')
# Nueva cita agendada

**Cliente:** {{ $appointment->user->name }}  
**Fecha:** {{ $appointment->appointment_date }}

**Servicios:**
@foreach($appointment->services as $service)
- {{ $service->name }}
@endforeach

@component('mail::button', ['url' => url('/admin/appointments/' . $appointment->id . '/details')])
Ver cita
@endcomponent

Gracias,  
{{ config('app.name') }}
@endcomponent
