function getLastWorkdayOfMonth(year, month) {
  let lastDay = new Date(year, month + 1, 0);
  while (lastDay.getDay() === 0 || lastDay.getDay() === 6) {
    lastDay.setDate(lastDay.getDate() - 1);
  }
  return new Date(year, lastDay.getMonth(), lastDay.getDate(), 11); // Возвращаем 11 утра
}

function getNextTargetDate() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();

  // Проверяем оставшиеся месяцы в году
  for (; month < 12; month++) {
    let lastWorkday = getLastWorkdayOfMonth(year, month);
    if (now < lastWorkday) {
      return lastWorkday;
    }
  }

  // Если все месяцы прошли, переходим к следующему году
  return getLastWorkdayOfMonth(year + 1, 0);
}

let previousTime = { days: -1, hours: -1, minutes: -1, seconds: -1 };
let targetDate = getNextTargetDate(); // Целевая дата для обратного отсчета

function updateTimerBlock(id, value) {
  const element = document.getElementById(id);
  const formattedValue = value < 10 ? '0' + value : value;
  element.textContent = formattedValue;  // Обновляем текст непосредственно
}

function updateCountdown() {
  const now = new Date();
  let totalTime = targetDate - now;

  // Если обратный отсчет завершен, обновляем целевую дату
  if (totalTime < 0) {
    targetDate = getNextTargetDate();
    totalTime = targetDate - now;
  }

  // Вычисляем дни, часы, минуты и секунды
  const seconds = Math.floor(totalTime / 1000) % 60;
  const minutes = Math.floor(totalTime / 1000 / 60) % 60;
  const hours = Math.floor(totalTime / 1000 / 60 / 60) % 24;
  const days = Math.floor(totalTime / 1000 / 60 / 60 / 24);

  // Обновляем DOM для каждого компонента времени
  updateTimerBlock('seconds', seconds);
  updateTimerBlock('minutes', minutes);
  updateTimerBlock('hours', hours);
  updateTimerBlock('days', days);
}
document.getElementById('whenButton').addEventListener('click', function() {
  const messageElement = document.getElementById('message');
  // Для основной анимации
  messageElement.classList.add('ticker-animation');
  // Для современной анимации
  // messageElement.classList.add('modern-animation');
});



// Обновление при загрузке и каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById('whenButton').addEventListener('click', function() {
  const messageElement = document.getElementById('message');
  messageElement.style.display = 'block';
  setTimeout(function() {
    messageElement.style.display = 'none';
  }, 2000);
});
