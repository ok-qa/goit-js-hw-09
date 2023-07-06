const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

//create random color
const currentColor = () => {
  const getRandomHexColor = Math.floor(Math.random() * 0xffffff).toString(16);
};

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
// }

// add eventListeners to buttons
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);


//start changing BG color and disable "Start" button
function onStart() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
document.body.style.background = currentColor;
  }, 1000);
  console.log('current color', currentColor);
}


//stop changing, "Start" button enabled
function onStop() {
      startBtn.disabled = false;
      clearInterval(intervalId);
}
