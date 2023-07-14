//Installing a flatpickr module
import flatpickr from 'flatpickr';
//Import flatpickr styles
import 'flatpickr/dist/flatpickr.min.css';
//import Notlifix
import Notiflix from 'notiflix';

//add querySelectors
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const pickDateTime = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate.getTime() < options.defaultDate.getTime()) {
      alertSound.play();
      Notiflix.Report.warning(
        'Please choose a date in future'
      );
      startBtn.classList.remove('valid-date');
      startBtn.classList.add('invalid-date');
    } else {
      startBtn.classList.remove('invalid-date');
      startBtn.classList.add('valid-date');
    }
  },
};

flatpickr('input#datetime-picker', pickDateTime);

//start button event listener
startBtn.addEventListener('click', () => {
  if (targetDate && !timer) { 
      timer = setInterval(() => {
          let currentDateInMs = new Date().getTime();
          let timeDiff = targetDate.getTime() - currentDateInMs;
          if (timeDiff <= 0) {
              clearInterval(timer);
              timer = null; 
              
          }

          function getTimeRemaining(targetDateTime) {
            const nowTime = Date.now();
            const complete = nowTime >= targetDateTime;

            if (complete) {
              return {
                complete,
                seconds: 0,
                minutes: 0,
                hours: 0,
              };
            }

            const secondsRemaining = Math.floor(
              (targetDateTime - nowTime) / 1000
            );
            const hours = Math.floor(secondsRemaining / 60 / 60);
            const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
            const seconds = secondsRemaining % 60;

            return {
              complete,
              seconds,
              minutes,
              hours,
            };
          }

        //   let remainingTime = convertMs(timeDiff);
        //   const timeUnits = {
        //       days: daysSpan,
        //       hours: hoursSpan,
        //       minutes: minutesSpan,
        //       seconds: secondsSpan,
        //   };
          
          // time update
          function updateTimeSection(sectionID, timeValue) {
            const firstNumber = Math.floor(timeValue / 10) || 0;
            const secondNumber = timeValue % 10 || 0;
            const sectionElement = document.getElementById(sectionID);
            const timeSegments =
              sectionElement.querySelectorAll('.time-segment');

            updateTimeSegment(timeSegments[0], firstNumber);
            updateTimeSegment(timeSegments[1], secondNumber);
          }
          
          const countdownTimer = setInterval(() => {
            const isComplete = updateAllSegments();

            if (isComplete) {
              clearInterval(countdownTimer);
            }
          }, 1000);

        startBtn.disabled = true;
        timerIsActive = true;
        dateTimePicker.set('readOnly', true);
    }
})

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

// function updateTimeSection(sectionID, timeValue) {
//   const firstNumber = Math.floor(timeValue / 10) || 0;
//   const secondNumber = timeValue % 10 || 0;
//   const sectionElement = document.getElementById(sectionID);
//   const timeSegments = sectionElement.querySelectorAll('.time-segment');

//   updateTimeSegment(timeSegments[0], firstNumber);
//   updateTimeSegment(timeSegments[1], secondNumber);
// }

// function getTimeRemaining(targetDateTime) {
//   const nowTime = Date.now();
//   const complete = nowTime >= targetDateTime;

//   if (complete) {
//     return {
//       complete,
//       seconds: 0,
//       minutes: 0,
//       hours: 0,
//     };
//   }

//   const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
//   const hours = Math.floor(secondsRemaining / 60 / 60);
//   const minutes = Math.floor(secondsRemaining / 60) - hours * 60;
//   const seconds = secondsRemaining % 60;

//   return {
//     complete,
//     seconds,
//     minutes,
//     hours,
//   };
// }

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(new Date(targetDate).getTime());

  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);

  return timeRemainingBits.complete;
}