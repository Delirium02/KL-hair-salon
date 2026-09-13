document.getElementById('year').textContent = new Date().getFullYear();

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var todayName = days[new Date().getDay()];

document.querySelectorAll('.hours-list tr').forEach(function (row) {
  var label = row.querySelector('td').textContent.trim().toLowerCase();
  row.classList.toggle('current-day', label === todayName);
});

var openOrClosed = document.querySelector('.open-or-closed');
var hours = {
  monday: { open: '09:00', close: '17:30' },
  tuesday: { open: '09:00', close: '17:30' },
  wednesday: { open: '09:00', close: '17:30' },
  thursday: { open: '09:00', close: '19:00' },
  friday: { open: '09:00', close: '17:30' },
  saturday: { open: '09:00', close: '17:30' },
  sunday: { open: '10:00', close: '15:00' }
};
function isOpenNow() {
  var now = new Date();
  var today = days[now.getDay()];
  var tomorrow = days[(now.getDay() + 1) % 7];
  var currentTime = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
  var openTime = hours[today].open;
  var closeTime = hours[today].close;

  var [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  var [openHours, openMinutes] = openTime.split(':').map(Number);
  var [closeHours, closeMinutes] = closeTime.split(':').map(Number);

  var currentTimeInMinutes = currentHours * 60 + currentMinutes;
  var openTimeInMinutes = openHours * 60 + openMinutes;
  var closeTimeInMinutes = closeHours * 60 + closeMinutes;

  return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
}

if (isOpenNow()) {
  openOrClosed.textContent = 'Open now.';
} else {
  openOrClosed.textContent = 'Closed now.';
}