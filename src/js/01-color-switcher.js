//create random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

// add eventListeners to buttons
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

//start
function onStart() {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function onStop() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}
