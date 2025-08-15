import Echo from 'laravel-echo'

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '9d144aaac1dbead3faf7',
  cluster: 'mt1',
  forceTLS: true
});

var channel = Echo.channel('admin-notifications');
channel.listen('.appointment-created', function(data) {
  alert(JSON.stringify(data));
});