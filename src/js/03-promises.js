import Notiflix from 'notiflix';

//form and inputs
const form = document.querySelector('form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmit);

// promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  let delayValue = parseInt(inputDelay.value);
  const stepValue = parseInt(inputStep.value);
  const amountValue = parseInt(inputAmount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    const startPosition = i + 1;
    const startDelay = delayValue + startPosition * stepValue;
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
}
