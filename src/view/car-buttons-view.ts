import './car-buttons-style.css';
import Car from '../car/car';
import { drive, stop } from '../car/drive';

const tuneBtnText = 'Tune';
const startBtnText = 'Start';
const removeBtnText = 'Remove';
const stopBtnText = 'Reset';
const className = 'car-button';
const classNameInactive = 'car-button inactive';

type Callback = (event: Event) => void;

const button = (btnText: string, btnClass: string, car: Car, callback: Callback): HTMLElement => {
  const btn = document.createElement('button');
  btn.textContent = btnText;
  btn.className = btnClass;
  btn.id = `${btnText}-${car.id}`;
  btn.setAttribute('data-car-id', `${car.id}`);
  btn.addEventListener('click', callback);
  return btn;
};

const tuneCallback = (event: Event): void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('tune');
  }
};

const removeCallback = (event: Event): void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('remove');
  }
};

const startCallback = async (event: Event): Promise<void> => {
  if (event.currentTarget instanceof HTMLElement) {
    const btn = event.currentTarget;
    const id = btn.dataset.carId;
    if (id) {
      console.log(`start car id=${id}`);
      btn.classList.add('inactive');
      const stopBtn = document.querySelector(`#${stopBtnText}-${id}`);
      if (stopBtn) {
        stopBtn.classList.remove('inactive');
      }
      await drive(Number(id));
    }
  }
};

const stopCallback = (event: Event): void => {
  if (event.currentTarget instanceof HTMLElement) {
    const btn = event.currentTarget;
    const id = btn.dataset.carId;
    if (id) {
      console.log('stop');
      stop(Number(id));
      btn.classList.add('inactive');
      const startBtn = document.querySelector(`#${startBtnText}-${id}`);
      if (startBtn) {
        // startBtn.addEventListener('click', startCallback);
        startBtn.classList.remove('inactive');
      }
    }
  }
};

const carButtons = (car: Car): HTMLElement => {
  const buttons = document.createElement('div');
  buttons.className = 'car-buttons';

  const title = document.createElement('div');
  title.textContent = car.name;
  title.className = 'car-buttons_title';

  buttons.append(
    title,
    button(tuneBtnText, className, car, tuneCallback),
    button(startBtnText, className, car, startCallback),
    button(removeBtnText, className, car, removeCallback),
    button(stopBtnText, classNameInactive, car, stopCallback),
  );

  return buttons;
};

export default carButtons;
