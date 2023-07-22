import '../styles/header.css';
import createHtml from '../utils/create-html';
import { modal } from '../utils/modal';
import { startRace } from '../car/drive';
import generateCars from '../car/generate-cars';
import state from '../state/state';
import garage from '../car/garage';
import View from '../state/view-type';

const generate = (): void => {
  console.log('Button Generate Cars pressed');
  generateCars();
};

// const goToWinners = (): void => {
//   if (state.currentView === 'GARAGE') {
//     state.currentView = View.WINNERS;
//     document.dispatchEvent(new CustomEvent('change-view'));
//     console.log('Change view to WINNERS');
//   }
// };

// const goToGarage = (): void => {
//   if (state.currentView === 'WINNERS') {
//     state.currentView = View.GARAGE;
//     document.dispatchEvent(new CustomEvent('change-view'));
//     console.log('Change view to GARAGE');
//   }
// };

modal.setCreateCallback();
const carCreateModal = modal.renderModal('car-create-modal');

const createCar = (): void => {
  carCreateModal.showModal();
};

// const renderHeader = (): HTMLElement => {
//   const header = createHtml('header');

//   const nav = createHtml('nav', 'navbar');
//   const ulNavbar = createHtml('ul');
//   const garageMenuItem = createHtml(
//     'li',
//     undefined,
//     'garage-menu-item',
//     '<span>Garage</span>',
//     goToGarage,
//   );
//   const ulGarage = createHtml('ul');
//   const createCarMenuItem = createHtml(
//     'li',
//     'menu-item_nested',
//     'create-car-item',
//     '<span>Create Car</span>',
//     createCar,
//   );
//   const generateCarsMenuItem = createHtml(
//     'li',
//     'menu-item_nested',
//     'generate-cars-item',
//     '<span>Generate Cars</span>',
//     generate,
//   );
//   const raceMenuItem = createHtml(
//     'li',
//     undefined,
//     'race-menu-item',
//     '<span>Start Race</span>',
//     startRace,
//   );
//   const winnersMenuItem = createHtml(
//     'li',
//     undefined,
//     'winners-menu-item',
//     '<span>Hall of Fame</span>',
//     goToWinners,
//   );

//   if (state.currentView === 'GARAGE') {
//     garageMenuItem.classList.add('selected');
//     winnersMenuItem.classList.remove('selected');
//   } else {
//     winnersMenuItem.classList.add('selected');
//     garageMenuItem.classList.remove('selected');
//   }

//   ulGarage.append(createCarMenuItem, generateCarsMenuItem);
//   garageMenuItem.append(ulGarage);
//   ulNavbar.append(garageMenuItem, raceMenuItem, winnersMenuItem);
//   nav.append(ulNavbar);
//   header.append(nav);

//   header.append(carCreateModal);

//   const checkOneCarProblem = async (): Promise<void> => {
//     const response = await garage.getCars(state.page);
//     if (response.cars.length === 1 && state.currentView === 'GARAGE') {
//       raceMenuItem.classList.add('inactive');
//     } else {
//       raceMenuItem.classList.remove('inactive');
//     }
//   };

//   document.addEventListener('turn-the-page', checkOneCarProblem);

//   return header;
// };

// export default renderHeader;

class Header {
  private garageMenuItem;

  private ulGarage;

  private createCarMenuItem;

  private generateCarsMenuItem;

  private raceMenuItem;

  private winnersMenuItem;

  constructor() {
    this.garageMenuItem = createHtml(
      'li',
      undefined,
      'garage-menu-item',
      '<span>Garage</span>',
      () => this.goToGarage(),
    );
    this.ulGarage = createHtml('ul');
    this.createCarMenuItem = createHtml(
      'li',
      'menu-item_nested',
      'create-car-item',
      '<span>Create Car</span>',
      createCar,
    );
    this.generateCarsMenuItem = createHtml(
      'li',
      'menu-item_nested',
      'generate-cars-item',
      '<span>Generate Cars</span>',
      generate,
    );
    this.raceMenuItem = createHtml(
      'li',
      undefined,
      'race-menu-item',
      '<span>Start Race</span>',
      startRace,
    );
    this.winnersMenuItem = createHtml(
      'li',
      undefined,
      'winners-menu-item',
      '<span>Hall of Fame</span>',
      () => this.goToWinners(),
    );
  }

  public render(): HTMLElement {
    const header = createHtml('header');
    const nav = createHtml('nav', 'navbar');
    const ulNavbar = createHtml('ul');

    if (state.currentView === 'GARAGE') {
      this.garageMenuItem.classList.add('selected');
      this.winnersMenuItem.classList.remove('selected');
    } else {
      this.winnersMenuItem.classList.add('selected');
      this.garageMenuItem.classList.remove('selected');
    }

    this.ulGarage.append(this.createCarMenuItem, this.generateCarsMenuItem);
    this.garageMenuItem.append(this.ulGarage);
    ulNavbar.append(this.garageMenuItem, this.raceMenuItem, this.winnersMenuItem);
    nav.append(ulNavbar);
    header.append(nav);

    header.append(carCreateModal);

    document.addEventListener('turn-the-page', this.checkOneCarProblem);

    return header;
  }

  private async checkOneCarProblem(): Promise<void> {
    const response = await garage.getCars(state.page);
    if (response.cars.length === 1 && state.currentView === 'GARAGE') {
      this.raceMenuItem.classList.add('inactive');
    } else {
      this.raceMenuItem.classList.remove('inactive');
    }
  }

  private goToWinners(): void {
    if (state.currentView === 'GARAGE') {
      this.garageMenuItem.classList.remove('selected');
      this.winnersMenuItem.classList.add('selected');
      this.raceMenuItem.classList.add('inactive');
      state.currentView = View.WINNERS;
      document.dispatchEvent(new CustomEvent('change-view'));
      console.log('Change view to WINNERS');
    }
  }

  private goToGarage(): void {
    if (state.currentView === 'WINNERS') {
      this.garageMenuItem.classList.add('selected');
      this.winnersMenuItem.classList.remove('selected');
      if (!state.isRace) this.raceMenuItem.classList.remove('inactive');
      state.currentView = View.GARAGE;
      document.dispatchEvent(new CustomEvent('change-view'));
      console.log('Change view to GARAGE');
    }
  }
}

const header = new Header();

export default header;
