/* Напиши скрипт, який після натискання кнопки «Start», р
аз на секунду змінює колір фону <body> на випадкове значення, 
використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна 
кольору фону повинна зупинятися. Враховуй, що на кнопку «Start» 
можна натиснути нескінченну кількість разів. Зроби так, щоб доки 
зміна теми запущена, кнопка «Start» була неактивною (disabled).*/

const bodyEl = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', funcStart);
stopButton.addEventListener('click', funcStop);

let intervalId = null;
stopButton.disabled = true;
function funcStart(evt) {
  intervalId = setInterval(startChangeColor, 1000);
  stopButton.disabled = false;
  startButton.disabled = true;
}

function funcStop(evt) {
  stopChangeColor();
  stopButton.disabled = true;
}

const startChangeColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

function stopChangeColor() {
  clearTimeout(intervalId);
  startButton.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
