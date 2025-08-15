<?php

namespace App\Notifications;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ConfirmedAppointment extends Notification
{
    use Queueable;

    protected $appointment;
    protected $status;

    /**
     * Create a new notification instance.
     */
    public function __construct(Appointment $appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast']; // guarda y emite en tiempo real
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => "Cita confirmada",
            'message' => "Tu cita para el {$this->appointment->appointment_date} a las {$this->appointment->appointment_time} ha sido confirmada",
            'appointment_id' => $this->appointment->id,
        ];
    }


    public function toDatabase($notifiable)
    {
        return [
            'title' => "Cita confirmada",
            'message' => "Tu cita para el {$this->appointment->appointment_date} a las {$this->appointment->appointment_time} ha sido confirmada",
            'appointment_id' => $this->appointment->id,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id, // id de la notificación
            'appointment_id' => $this->appointment->id,
            'message' => "Tu cita para el {$this->appointment->appointment_date} a las {$this->appointment->appointment_time} ha sido confirmada",
            'status' => 'confirmed',
            'at' => now()->toISOString(),
        ]);
    }
}
