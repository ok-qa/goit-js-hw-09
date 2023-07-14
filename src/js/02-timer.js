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
picker('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(chosenDate) {
    const targetDate = chosenDate[0];

    if (targetDate) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  },
});

startBtn.addEventListener('click', () => {
  const targetDate = picker.value;
  const timeDifference = calculateTimeDifference(targetDate);

  if (timeDifference) {
    startCountdown(timeDifference);
    startButton.disabled = true;
  }
});


const interval = 1000;





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

function startCountdown(time) {
  let { days, hours, minutes, seconds } = time;

    const countdownInterval = setInterval(() => {
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
            Notiflix.Notify.success('Countdown finished!');
            return;
        }

        seconds--;

        if (seconds < 0) {
            seconds = 59;
            minutes--;

            if (minutes < 0) {
                minutes = 59;
                hours--;

                if (hours < 0) {
                    hours = 23;
                    days--;
                }
            }
        }

        //daysValue.textContent = addLeadingZero(days);
        //hoursValue.textContent = addLeadingZero(hours);
        //minutesValue.textContent = addLeadingZero(minutes);
        //secondsValue.textContent = addLeadingZero(seconds);
    }); //, 1000);

  function updateTimeSection(sectionID, timeValue) {
    const firstNumber = Math.floor(timeValue / 10) || 0;
    const secondNumber = timeValue % 10 || 0;
    const sectionElement = document.getElementById(sectionID);
    const timeSegments = sectionElement.querySelectorAll('.time-segment');

    updateTimeSegment(timeSegments[0], firstNumber);
    updateTimeSegment(timeSegments[1], secondNumber);
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

    const secondsRemaining = Math.floor((targetDateTime - nowTime) / 1000);
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

  function updateAllSegments() {
    //const timeRemainingBits = getTimeRemaining(new Date(targetDate).getTime());

    updateTimeSection('seconds', timeRemainingBits.seconds);
    updateTimeSection('minutes', timeRemainingBits.minutes);
    updateTimeSection('hours', timeRemainingBits.hours);

    return timeRemainingBits.complete;
  }

  const countdownTimer = setInterval(() => {
    const isComplete = updateAllSegments();

    if (isComplete) {
      clearInterval(countdownTimer);
    }
  }, interval);

  updateAllSegments();
}