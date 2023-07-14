//Installing a flatpickr module
import flatpickr from 'flatpickr';
//Import flatpickr styles
import 'flatpickr/dist/flatpickr.min.css';

//add querySelectors
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

//initialize picker
const picker = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < picker.defaultDate.getTime()) {
      Notiflix.Report.warning(
        'Sorry, it is not a valid date',
        'Please chose a date in the future',
        'OK'
      );
      startBtn.classList.remove('valid-date');
      startBtn.classList.add('invalid-date');
    } else {
      startBtn.classList.remove('invalid-date');
      startBtn.classList.add('valid-date');
    }
  },
};

//chose date and time 
flatpickr('input#datetime-picker', picker);

let targetDate = null;
let timer = null;
const interval = 1000;

startBtn.addEventListener('click', () => {
  if (targetDate && !timer) {
    timer = setInterval(() => {
      let currentDateInMs = new Date().getTime();
      let timeDiff = targetDate.getTime() - currentDateInMs;
      if (timeDiff <= 0) {
        clearInterval(timer);
        timer = null;

        let reloadIcon = document.querySelector('.reload-icon');
        if (reloadIcon) {
          document.body.removeChild(reloadIcon);
        }

        return;
      }

      let remainingTime = convertMs(timeDiff);
      const timeUnits = {
        days: daysSpan,
        hours: hoursSpan,
        minutes: minutesSpan,
        seconds: secondsSpan,
      };

      // Оновлення відображення часу на сторінці
      Object.keys(timeUnits).forEach(unit => {
        timeUnits[unit].textContent = String(remainingTime[unit]).padStart(
          2,
          '0'
        );
      });

      startBtn.style.display = 'none';
    }, interval);
  }
});

// Функція для перетворення мілісекунд в дні, години, хвилини, та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}