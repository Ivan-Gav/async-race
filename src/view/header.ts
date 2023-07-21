import '../styles/header.css';
import createHtml from '../utils/create-html';
import { modal } from '../utils/modal';
import { startRace } from '../car/drive';
import generateCars from '../car/generate-cars';
import state from '../state/state';
import garage from '../car/garage';

const generate = ():void => {
  console.log('Button Generate Cars pressed');
  generateCars();
};

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
  const generateCarsMenuItem = createHtml('li', 'menu-item_nested', 'generate-cars-item', '<span>Generate Cars</span>', generate);
  const raceMenuItem = createHtml('li', undefined, 'race-menu-item', '<span>Start Race</span>', startRace);
  const winnersMenuItem = createHtml('li', undefined, 'winners-menu-item', '<span>Hall of Fame</span>', goToWinners);

  ulGarage.append(createCarMenuItem, generateCarsMenuItem);
  garageMenuItem.append(ulGarage);
  ulNavbar.append(garageMenuItem, raceMenuItem, winnersMenuItem);
  nav.append(ulNavbar);
  header.append(nav);

  header.append(carCreateModal);

  const checkOneCarProblem = async ():Promise<void> => {
    const response = await garage.getCars(state.page);
    if (response.cars.length === 1) {
      raceMenuItem.classList.add('inactive');
    } else {
      raceMenuItem.classList.remove('inactive');
    }
  };

  document.addEventListener('turn-the-page', checkOneCarProblem);

  return header;
};

export default renderHeader;
