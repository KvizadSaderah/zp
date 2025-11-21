// Проверка, является ли дата российским праздником
function isRussianHoliday(date) {
  const month = date.getMonth();
  const day = date.getDate();

  // Новогодние каникулы (1-8 января)
  if (month === 0 && day >= 1 && day <= 8) return true;

  // День защитника Отечества (23 февраля)
  if (month === 1 && day === 23) return true;

  // Международный женский день (8 марта)
  if (month === 2 && day === 8) return true;

  // Праздник Весны и Труда (1 мая)
  if (month === 4 && day === 1) return true;

  // День Победы (9 мая)
  if (month === 4 && day === 9) return true;

  // День России (12 июня)
  if (month === 5 && day === 12) return true;

  // День народного единства (4 ноября)
  if (month === 10 && day === 4) return true;

  return false;
}

function getLastWorkdayOfMonth(year, month) {
  let lastDay = new Date(year, month + 1, 0);
  // Пропускаем выходные и праздники
  while (lastDay.getDay() === 0 || lastDay.getDay() === 6 || isRussianHoliday(lastDay)) {
    lastDay.setDate(lastDay.getDate() - 1);
  }
  return new Date(year, month, lastDay.getDate(), 11); // Возвращаем 11 утра
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
  const button = this;
  const messageElement = document.getElementById('message');

  // Запускаем анимацию
  messageElement.classList.add('ticker-animation');

  // Блокируем кнопку на 3 секунды
  button.disabled = true;
  setTimeout(function() {
    button.disabled = false;
  }, 3000);

  // Сброс анимации после её завершения
  messageElement.addEventListener('animationend', function() {
    messageElement.classList.remove('ticker-animation');
  });
});




// Обновление при загрузке и каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);

