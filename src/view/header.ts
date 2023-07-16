import '../styles/header.css';
import createHtml from '../utils/createHtml';
import renderModal from '../utils/modal';

// const headerHtml = `
// <nav class="navbar">
//   <ul>
//     <li id="garage-menu-item"><span>Garage</span>
//       <ul>
//         <li id="create-car-item" class="menu-item_nested"><span>Create Car</span></li>
//         <li id="generate-cars-item" class="menu-item_nested"><span>Generate Cars</span></li>
//       </ul>
//     </li>
//     <li id="race-menu-item"><span>Race</span></li>
//     <li id="winners-menu-item"><span>Hall of Fame</span></li>
//   </ul>
// </nav>
// `;

const generateCars = ():void => {
  console.log('Button Generate Cars pressed');
};

const startRace = ():void => {
  console.log('Button Start Race pressed');
};

const goToWinners = ():void => {
  console.log('Button Hall of Fame pressed');
};

const renderHeader = ():HTMLElement => {
  const header = createHtml('header');
  // header.innerHTML = headerHtml;
  const carCreateModal = renderModal();

  const createCar = (): void => {
    console.log('Button Create Car pressed');
    carCreateModal.showModal();
  };

  const nav = createHtml('nav', 'navbar');
  const ulNavbar = createHtml('ul');
  const garageMenuItem = createHtml('li', undefined, 'garage-menu-item', '<span>Garage</span>');
  const ulGarage = createHtml('ul');
  const createCarMenuItem = createHtml('li', 'menu-item_nested', 'create-car-item', '<span>Create Car</span>', createCar);
  const generateCarsMenuItem = createHtml('li', 'menu-item_nested', 'generate-cars-item', '<span>Generate Cars</span>', generateCars);
  const raceMenuItem = createHtml('li', undefined, 'race-menu-item', '<span>Race</span>', startRace);
  const winnersMenuItem = createHtml('li', undefined, 'winners-menu-item', '<span>Hall of Fame</span>', goToWinners);

  ulGarage.append(createCarMenuItem, generateCarsMenuItem);
  garageMenuItem.append(ulGarage);
  ulNavbar.append(garageMenuItem, raceMenuItem, winnersMenuItem);
  nav.append(ulNavbar);
  header.append(nav);

  const body = document.querySelector('body');
  body?.append(carCreateModal);

  return header;
};

export default renderHeader;
