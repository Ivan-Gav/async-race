import '../styles/car-buttons-style.css';
import Car from '../car/car';
import { drive, stop } from '../car/drive';
import garage from '../car/garage';
import { Modal } from '../utils/modal';

const tuneBtnText = 'Tune';
const startBtnText = 'Start';
const removeBtnText = 'Remove';
const stopBtnText = 'Reset';
const className = 'car-button';
const classNameInactive = 'car-button inactive';

type Callback = (event: Event) => void;

const button = (
  btnText: string,
  btnClass: string,
  car: Car,
  callback: Callback,
): HTMLElement => {
  const btn = document.createElement('button');
  btn.textContent = btnText;
  btn.className = btnClass;
  btn.id = `${btnText}-${car.id}`;
  btn.setAttribute('data-car-id', `${car.id}`);
  btn.addEventListener('click', callback);
  return btn;
};

const tuneCallback = async (event: Event): Promise<void> => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('open tune modal');
    const btn = event.currentTarget;
    const id = Number(btn.dataset.carId);
    if (id) {
      const car = await garage.getCar(id);
      const modal = new Modal('Edit Car', car.name, car.color, id);
      modal.setTuneCallback();
      const carEditModal = modal.renderModal('car-edit-modal');
      const currentModal = document.querySelector('#car-edit-modal');
      if (currentModal) {
        currentModal.replaceWith(carEditModal);
      } else {
        const header = document.querySelector('header');
        header?.append(carEditModal);
      }
      carEditModal.showModal();
    }
  }
};

const removeCallback = async (event: Event): Promise<void> => {
  if (event.currentTarget instanceof HTMLElement) {
    const btn = event.currentTarget;
    const id = btn.dataset.carId;
    if (id) {
      await garage.deleteCar(Number(id));
      const track = document.querySelector(`#t${id}`);
      track?.remove();
    }
  }
};

const startCallback = async (event: Event): Promise<void> => {
  if (event.currentTarget instanceof HTMLElement) {
    const btn = event.currentTarget;
    const id = btn.dataset.carId;
    if (id) {
      console.log(`start car id=${id}`);
      // btn.classList.add('inactive');
      // const stopBtn = document.querySelector(`#${stopBtnText}-${id}`);
      // if (stopBtn) {
      //   stopBtn.classList.remove('inactive');
      // }
      try {
        await drive(Number(id));
      } catch (error) {
        console.log(`car id=${id} broke down`);
      }
    }
  }
};

const stopCallback = (event: Event): void => {
  const btn = event.currentTarget;
  if (btn instanceof HTMLElement) {
    const id = btn.dataset.carId;
    if (id) {
      console.log('stop');
      stop(Number(id));
      // btn.classList.add('inactive');
      // const startBtn = document.querySelector(`#${startBtnText}-${id}`);
      // if (startBtn) {
      // startBtn.addEventListener('click', startCallback);
      // startBtn.classList.remove('inactive');
      // }
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
