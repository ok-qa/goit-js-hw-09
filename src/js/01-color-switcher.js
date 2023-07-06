const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId;

//get color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}


//add eventListener to the button to start changing BG color
// and disable "Start" button
startBtn.addEventListener('click', function() {
  if(intervalId) {
    intervalId = setInterval(function () {
      const currentColor = getRandomHexColor();
      document.body.style.background = currentColor;
    }, 1000);
    startBtn.disabled = true;
  }
});

//add eventListener to the "Stop" button to stop changing,
//enable "Start" button
stopBtn.addEventListener('click', function() {
  clearInterval(intervalId);
  intervalId = undefined;
  startBtn.disabled = false;
});
