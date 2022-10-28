import Notiflix from 'notiflix';

const formEL = document.querySelector('.form');
const firstDelay = document.querySelector('[name="delay"]');
const delay = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

formEL.addEventListener('submit', e => {
  e.preventDefault();
  let delayStep = Number(firstDelay.value);
  for (let number = 1; number <= Number(amount.value); number += 1) {
    createPromise(number, delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayStep += Number(delay.value);
  }
});

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
