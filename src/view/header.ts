import '../styles/header.css';
import createHtml from '../utils/createHtml';
import { modal } from '../utils/modal';
import garage from '../car/garage';
import { drive, stop, RaceWinner } from '../car/drive';
import Car from '../car/car';

const generateCars = ():void => {
  console.log('Button Generate Cars pressed');
};

let carsStorage:Car[] = [];

const showFinishMessage = (winner?:RaceWinner):void => {
  let message = '';
  if (winner) {
    const winnerName = carsStorage.find((car) => car.id === winner.id)?.name;
    message = `The winner is ${winnerName} <br> with the result ${winner.time} seconds!`;
  } else {
    message = 'There is no winner - all the cars broke down!';
  }
  const messageBox = document.querySelector('#finish-message');
  if (messageBox) {
    messageBox.innerHTML = message;
    messageBox.classList.add('show');
  }
};

const resetRace = async (event:Event):Promise<void> => {
  const raceBtn = event.currentTarget as HTMLElement;
  raceBtn.classList.add('inactive');
  carsStorage = await garage.cars;
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
  carsStorage = await garage.cars;
  const arrOfDrivingCars:Promise<RaceWinner>[] = [];
  carsStorage.forEach(async (car) => {
    arrOfDrivingCars.push(drive(car.id));
  });
  try {
    const winner = await Promise.any(arrOfDrivingCars);
    showFinishMessage(winner);
  } catch (error) {
    showFinishMessage();
  }

  raceBtn.classList.remove('inactive');
  raceBtn.innerHTML = '<span>Reset Race</span>';
  raceBtn.removeEventListener('click', startRace);
  raceBtn.addEventListener('click', resetRace);
}

const goToWinners = ():void => {
  console.log('Button Hall of Fame pressed');
};

const renderHeader = ():HTMLElement => {
  const header = createHtml('header');
  modal.setCreateCallback();
  const carCreateModal = modal.renderModal('car-create-modal');

  const createCar = (): void => {
    carCreateModal.showModal();
  };

  const nav = createHtml('nav', 'navbar');
  const ulNavbar = createHtml('ul');
  const garageMenuItem = createHtml('li', undefined, 'garage-menu-item', '<span>Garage</span>');
  const ulGarage = createHtml('ul');
  const createCarMenuItem = createHtml('li', 'menu-item_nested', 'create-car-item', '<span>Create Car</span>', createCar);
  const generateCarsMenuItem = createHtml('li', 'menu-item_nested', 'generate-cars-item', '<span>Generate Cars</span>', generateCars);
  const raceMenuItem = createHtml('li', undefined, 'race-menu-item', '<span>Start Race</span>', startRace);
  const winnersMenuItem = createHtml('li', undefined, 'winners-menu-item', '<span>Hall of Fame</span>', goToWinners);

  ulGarage.append(createCarMenuItem, generateCarsMenuItem);
  garageMenuItem.append(ulGarage);
  ulNavbar.append(garageMenuItem, raceMenuItem, winnersMenuItem);
  nav.append(ulNavbar);
  header.append(nav);

  header.append(carCreateModal);

  return header;
};

export default renderHeader;
