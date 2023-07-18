// import Car from './car';

const engineURL = 'http://127.0.0.1:3000/engine';

type Engine = {
  velocity: number;
  distance: number;
};

type RaceWinner = {
  id: number;
  time: number;
};

const animateDrive = (id: number, time: number): void => {
  const car = document.querySelector(`#c${id}`);
  if (car instanceof HTMLElement) {
    car.classList.add('drive');
    car.style.setProperty('--drive-time', `${time}s`);
  }
};

const stopDrivingAnimation = (id: number): void => {
  const car = document.querySelector(`#c${id}`);
  if (car instanceof HTMLElement) {
    const computedStyle = window.getComputedStyle(car);
    const left = computedStyle.getPropertyValue('left');
    car.style.left = left;
    car.classList.remove('drive');
  }
};

const setCarButtonsForDrive = (id: number): void => {
  const startBtn = document.querySelector(`#Start-${id}`);
  const resetBtn = document.querySelector(`#Reset-${id}`);
  startBtn?.classList.add('inactive');
  resetBtn?.classList.remove('inactive');
};

const resetCarButtons = (id: number): void => {
  const startBtn = document.querySelector(`#Start-${id}`);
  const resetBtn = document.querySelector(`#Reset-${id}`);
  startBtn?.classList.remove('inactive');
  resetBtn?.classList.add('inactive');
};

const resetCarView = (id: number): void => {
  const car = document.querySelector(`#c${id}`);
  if (car instanceof HTMLElement) {
    car.classList.remove('drive');
    car.style.left = '';
  }
};

const startEngine = async (id: number): Promise<Engine> => {
  const status = 'started';
  const request = await fetch(`${engineURL}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const engine = await request.json();
  return engine;
};

const stopEngine = async (id: number): Promise<Engine> => {
  const status = 'stopped';
  const request = await fetch(`${engineURL}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const engine = await request.json();
  return engine;
};

const stop = async (id: number): Promise<void> => {
  await stopEngine(id);
  resetCarView(id);
  resetCarButtons(id);
};

const drive = async (id: number): Promise<RaceWinner> => {
  const status = 'drive';
  const engine = await startEngine(id);
  console.log(`engine ${id} started with speed = ${engine.velocity}`);
  const time = Math.round(engine.distance / (engine.velocity * 10)) / 100;
  setCarButtonsForDrive(id);
  animateDrive(id, time);
  const trip = await fetch(`${engineURL}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  console.log(trip);
  if (!trip.ok) {
    const message = await trip.text();
    console.log(message);
    stopDrivingAnimation(id);
    throw new Error(message);
  }
  console.log(`Car id=${id} stopped in ${time} seconds`);
  return { id, time };
};

export { drive, stop, RaceWinner };
