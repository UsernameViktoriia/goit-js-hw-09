const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

btnStop.setAttribute('disabled', 'disabled');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// const color = getRandomHexColor();

const onClickStart = () => {
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled', 'disabled');
};
const onClickStop = () => {
  clearInterval(timerId);
  btnStop.setAttribute('disabled', 'disabled');
  btnStart.removeAttribute('disabled', 'disabled');
};

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);
