<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Kontak</title>
</head>
<body>
    <h2>Anda telah menerima email</h2>
    <p>Nama: {{ $emailData['name'] }}</p>
    <p>Email: {{ $emailData['email'] }}</p>
    <p>Nomor Telepon: {{ $emailData['phone'] }}</p>
    <p>Subjek: {{ $emailData['subject'] }}</p>
    <p>Pesan:</p>
    <p> {{ $emailData['message'] }}</p>
</body>
</html>