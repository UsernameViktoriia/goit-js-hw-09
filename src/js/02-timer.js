import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const valueDays = document.querySelector('span[data-days]');
const valueHours = document.querySelector('span[data-hours]');
const valueMinutes = document.querySelector('span[data-minutes]');
const valueSeconds = document.querySelector('span[data-seconds]');
let startDate = 0;

btnStart.setAttribute('disabled', 'disabled');

const setDate = ({ days, hours, minutes, seconds }) => {
  valueDays.textContent = addLeadingZero(days);
  valueHours.textContent = addLeadingZero(hours);
  valueMinutes.textContent = addLeadingZero(minutes);
  valueSeconds.textContent = addLeadingZero(seconds);
};
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function onTimer() {
  const ms = startDate - Date.now();
  if (ms > 0) {
    const daysTimer = convertMs(ms);
    setDate(daysTimer);
  } else {
    return true;
  }
}
const onClickStart = () => {
  onTimer();
  btnStart.setAttribute('disabled', 'disabled');
  input.setAttribute('disabled', 'disabled');
  const timerId = setInterval(() => {
    const isStop = onTimer();
    if (isStop) {
      clearInterval(timerId);
    }
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startDate = selectedDates[0];

      btnStart.removeAttribute('disabled', 'disabled');
      btnStart.addEventListener('click', onClickStart);
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
