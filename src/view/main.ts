import '../styles/main.css';
import renderRace from './race';
import Garage from '../car/garage';

const renderMain = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  const garage = new Garage();
  const cars = await garage.cars;
  main.append(renderRace(cars));
  return main;
};

export default renderMain;
