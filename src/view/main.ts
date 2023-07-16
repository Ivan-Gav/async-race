import '../styles/main.css';
import renderRace from './race';
import garage from '../car/garage';

const renderMain = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  const cars = await garage.cars;
  main.append(renderRace(cars));
  return main;
};

export default renderMain;
