const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

  
function onStart() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
document.body.style.background = getRandomHexColor();
}, 1000);
}

function onStop() {
      startBtn.disabled = false;
      clearInterval(intervalId);
}