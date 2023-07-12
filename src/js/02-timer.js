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
let timerIsActive = false;


//initialize flatpickr for date-time choosing
const dateTimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(pickedDates) {
    const endDate = pickedDates[0];
    const currentDate = new Date();

    if (!endDate || endDate < currentDate) {
      window.alert('Please choose the date in the future!');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

//Event Listener for the Start-button
startBtn.disabled = true;
startBtn.addEventListener('click', function () { 
    if (!timerIsActive) { 
        const endDate = dateTimePicker.pickedDates[0];
        const currentDate = new Date();
        let timeDifference = endDate.getTime() - currentDate.getTime();
        const interval = setInterval(function () {
            timeDifference -= 1000;
            updateTimer(timeDifference);
            if (timeDifference <= 0) {
                clearInterval(interval);
                timerIsActive = false;
                dateTimePicker.set('readOnly', false);
            }
        }, 1000);

        startBtn.disabled = true;
        timerIsActive = true;
        dateTimePicker.set('readOnly', true);
    }
})

//timer update
function updateTimer(timeDifference) {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);

    if (timeDifference <= 0) { 
      dataDays.textContent = '00';
    dataHours.textContent = '00';
    dataMinutes.textContent = '00';
        dataSeconds.textContent = '00';
    }
}

// convert milliseconds to the appropriate parameters
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

// add leading Zero
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}