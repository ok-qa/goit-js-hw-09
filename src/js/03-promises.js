import Notiflix from 'notiflix';

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');
  

  function createPromise(position, delay) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
        } else {
          // Reject
          reject({ position, delay });
        }
      }, delay);
    });
  }

    document
      .querySelector('.form')
      .addEventListener('submit', function (event) {
        event.preventDefault();
        const delayValue = Number(delayInput.value);
        const stepValue = Number(stepInput.value);
        const amountValue = Number(amountInput.value);

        for (let i = 1; i <= amountValue; i += 1) {
          createPromise(i, delayValue)
            .then(({ position, delay }) => {
              Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              Notify.failure(`Rejected promise ${position} in ${delay}ms`);
            });

          delayValue += stepValue;
        }
      });


