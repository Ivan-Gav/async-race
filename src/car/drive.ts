import state from '../state/state';
import Car from './car';
import garage from './garage';
import winners from '../winners/winners';

const engineURL = 'http://127.0.0.1:3000/engine';

type Engine = {
  velocity: number;
  distance: number;
};

type RaceWinner = {
  id: number;
  time: number;
};

let carsStorage:Car[] = [];

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
  const raceBtn = document.querySelector('#race-menu-item');
  startBtn?.classList.add('inactive');
  raceBtn?.classList.add('inactive');
  resetBtn?.classList.remove('inactive');
};

const resetCarButtons = (id: number): void => {
  const startBtn = document.querySelector(`#Start-${id}`);
  const resetBtn = document.querySelector(`#Reset-${id}`);
  const raceBtn = document.querySelector('#race-menu-item');
  startBtn?.classList.remove('inactive');
  resetBtn?.classList.add('inactive');
  const startButtons = document.querySelectorAll('[id^="Start"]');
  let allCarsSteady = true;
  startButtons.forEach((button) => {
    if (button.classList.contains('inactive')) allCarsSteady = false;
  });
  if (allCarsSteady) raceBtn?.classList.remove('inactive');
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

const showFinishMessage = (winner?:RaceWinner):void => {
  let message = '';
  let carColor = '#ff5100';
  if (winner) {
    const winnerCar = carsStorage.find((car) => car.id === winner.id);
    if (winnerCar) {
      message = `The winner is&nbsp;&nbsp;&nbsp;<span>${winnerCar.name}</span><br> with the result&nbsp;&nbsp;&nbsp;<span>${winner.time}</span>&nbsp;&nbsp;&nbsp;seconds!`;
      carColor = winnerCar.color;
    }
  } else {
    message = 'There is no winner - all the cars broke down!';
  }
  const messageBox = document.querySelector('#finish-message');
  if (messageBox instanceof HTMLElement) {
    messageBox.innerHTML = message;
    messageBox.style.setProperty('--car-color', carColor);
    messageBox.classList.add('show');
  }
};

const resetRace = async (event:Event):Promise<void> => {
  const raceBtn = event.currentTarget as HTMLElement;
  raceBtn.classList.add('inactive');
  state.isRace = false;
  const response = await garage.getCars(state.page);
  carsStorage = response.cars;
  const arrOfCars:Promise<void>[] = [];
  carsStorage.forEach(async (car) => {
    arrOfCars.push(stop(car.id));
  });
  await Promise.all(arrOfCars);
  raceBtn.classList.remove('inactive');
  raceBtn.innerHTML = '<span>Start Race</span>';
  raceBtn.removeEventListener('click', resetRace);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  raceBtn.addEventListener('click', startRace);
  const messageBox = document.querySelector('#finish-message');
  if (messageBox) {
    messageBox.classList.remove('show');
  }
};

async function startRace(event:Event):Promise<void> {
  const raceBtn = event.currentTarget as HTMLElement;
  raceBtn.classList.add('inactive');
  state.isRace = true;
  const response = await garage.getCars(state.page);
  carsStorage = response.cars;
  const arrOfDrivingCars:Promise<RaceWinner>[] = [];
  carsStorage.forEach(async (car) => {
    arrOfDrivingCars.push(drive(car.id));
  });
  try {
    const winner = await Promise.any(arrOfDrivingCars);
    showFinishMessage(winner);
    winners.addWinner(winner.id, winner.time);
  } catch (error) {
    showFinishMessage();
  }

  raceBtn.classList.remove('inactive');
  raceBtn.innerHTML = '<span>Reset Race</span>';
  raceBtn.removeEventListener('click', startRace);
  raceBtn.addEventListener('click', resetRace);

  try {
    await Promise.all(arrOfDrivingCars);
    state.isRace = false;
  } catch (error) {
    // do nothing
  }
}

export { startRace, drive, stop };
