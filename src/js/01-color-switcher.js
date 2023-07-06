const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

//create random color
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}

// add eventListeners to buttons
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);


//start changing BG color and disable "Start" button
function onStart() {
  if (!intervalId) {
    intervalId = setInterval(function(){
    const currentColor = getRandomHexColor();
    document.body.style.background = currentColor;
  }, 1000);
    startBtn.disabled = true;
    console.log(currentColor);
}
}

//stop changing, enable "Start" button
function onStop() {
      startBtn.disabled = false;
      clearInterval(intervalId);
}
