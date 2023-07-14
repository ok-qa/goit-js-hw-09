//Installing a flatpickr module
import flatpickr from 'flatpickr';
//Import flatpickr styles
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

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
        days: dataDays,
        hours: dataHours,
        minutes: dataMinutes,
        seconds: dataSeconds,
      };

      // time update
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

// converts ms to appropriate data
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




//visual
function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector('.segment-display');
  const segmentDisplayTop = segmentDisplay.querySelector(
    '.segment-display__top'
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    '.segment-display__bottom'
  );

  const segmentOverlay = segmentDisplay.querySelector('.segment-overlay');
  const segmentOverlayTop = segmentOverlay.querySelector(
    '.segment-overlay__top'
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    '.segment-overlay__bottom'
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if (
    parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener('animationend', finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener(
    'animationend',
    finishAnimation
  );
}
function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;
  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll('.time-segment');

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}