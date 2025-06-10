<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@uñasymechassalon.es'; // Tu correo de Hostinger
    $mail->Password   = 'My$tr0ngPa55w0rd!'; // Tu contraseña real del buzón
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Usa SSL
    $mail->Port       = 465;

    // Remitente y destinatario
    $mail->setFrom('info@uñasymechassalon.es', 'Uñas y Mechas');
    $mail->addAddress('begalan@outlook.es', 'Cliente');

    // Contenido del mensaje
    $mail->isHTML(true);
    $mail->Subject = 'Correo de prueba desde PHPMailer';
    $mail->Body    = '¡Este es un mensaje de prueba enviado desde <b>PHPMailer</b> usando Hostinger SMTP!';
    $mail->AltBody = 'Este es un mensaje de prueba enviado desde PHPMailer usando Hostinger SMTP.';

    $mail->send();
    echo '✅ Mensaje enviado correctamente.';
} catch (Exception $e) {
    echo "❌ Error al enviar: {$mail->ErrorInfo}";
}
