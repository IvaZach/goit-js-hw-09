/*HTML містить розмітку форми, в поля якої користувач буде вводити
 першу затримку в мілісекундах, крок збільшення затримки для кожного
  промісу після першого і кількість промісів, яку необхідно створити. 
  Напиши скрипт, який на момент сабміту форми викликає функцію 
  createPromise(position, delay) стільки разів, скільки ввели в поле 
  amount. Під час кожного виклику передай їй номер промісу (position),
   що створюється, і затримку, враховуючи першу затримку (delay), 
   введену користувачем, і крок (step).

   Доповни код функції createPromise таким чином, щоб вона повертала 
   один проміс, який виконується або відхиляється через delay часу. 
   Значенням промісу повинен бути об'єкт, в якому будуть властивості 
   position і delay зі значеннями однойменних параметрів. 
   Використовуй початковий код функції для вибору того, що потрібно
    зробити з промісом - виконати або відхилити.
  */

import Notiflix from 'notiflix';
const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', funcSubmit);

function funcSubmit(evn) {
  evn.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });

    delay += step;
  }

  evn.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = { position, delay };
  return new Promise((res, rej) => {
    if (shouldResolve) {
      res(promise);
    } else rej(promise);
  });
}
