/* Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. 
Такий таймер може використовуватися у блогах та інтернет-магазинах, 
сторінках реєстрації подій, під час технічного обслуговування тощо. 

Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві 
кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу. 
Для того щоб підключити CSS код бібліотеки в проект, необхідно додати ще один 
імпорт, крім того, що описаний в документації. 

 */
import { convertMs } from './02-timer-helpers/function_convertsMs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const myInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', funcPressBtn);
startBtn.disabled = true;
const currentDay = new Date();
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i:S',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    
    funcSelectDates();
  },
};

const fp = flatpickr(myInput, options);


function funcSelectDates() {
  if (fp.selectedDates[0] < currentDay) {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

function funcPressBtn() {
  startBtn.disabled = true;
  funcTimeCalculation();
}

function funcTimeCalculation() {
  timerId = setInterval(() => {
    let dateStart = fp.selectedDates[0];
    let currDay = new Date();
    let timeDiff = dateStart - currDay;
    
    funcUpdateTimer(timeDiff);
  }, 1000);
}

let addLeadingZero = value => value.toString().padStart(2, 0);

function funcUpdateTimer(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);

  const endOfAccount = funcEndOfAccount();
  if (endOfAccount) {
    clearInterval(timerId);
    startBtn.disabled = true;
  }
}

function funcEndOfAccount() {
  return (
    dataDays.textContent === '00' &&
    dataHours.textContent === '00' &&
    dataMinutes.textContent === '00' &&
    dataSeconds.textContent === '00'
  );
}
