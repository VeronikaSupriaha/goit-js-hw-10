import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let pickedTime;
const startBtn = document.querySelector(`[data-start]`);
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedTime = selectedDates[0];
    startBtn.disabled = false;
    if (pickedTime < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        position: 'topCenter',
      });
      startBtn.disabled = true;
    }
  },
};
const input = document.querySelector('#datetime-picker');
flatpickr(input, options);

const timer = document.querySelector(`.field`);
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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
let intervalId;

startBtn.addEventListener(`click`, () => {
  startBtn.disabled = true;
  input.disabled = true;
  const initTime = Date.now();
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const difference = pickedTime - currentTime;
    const timeObject = convertMs(difference);
    document.querySelector(`[data-days]`).textContent = addLeadingZero(
      timeObject.days
    );
    document.querySelector(`[data-hours]`).textContent = addLeadingZero(
      timeObject.hours
    );
    document.querySelector(`[data-minutes]`).textContent = addLeadingZero(
      timeObject.minutes
    );
    document.querySelector(`[data-seconds]`).textContent = addLeadingZero(
      timeObject.seconds
    );
    if (difference < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
});
