import Car from '../car/car';
import carButtons from './car-buttons-view';
import carSVG from './car-svg';
import '../styles/race.css';
import createHtml from '../utils/createHtml';

const createTrack = (auto: Car): HTMLElement => {
  const track = createHtml('div', 'track');

  const car = createHtml('div', 'car');
  if (auto.id) {
    car.id = `c${auto.id}`;
    track.id = `t${auto.id}`;
  }
  car.title = auto.name;
  let carImage = carSVG;
  carImage = carImage.replace('id="path2853" style="fill:#ffffff"', `id="path2853" style="fill:${auto.color}"`);
  carImage = carImage.replace('<title id="title3968">Car - Top View</title>', `<title id="title3968">${auto.name}</title>`);
  car.innerHTML = carImage;

  const road = createHtml('div', 'road');
  road.append(car);

  track.append(
    carButtons(auto),
    road,
  );
  return track;
};

const renderRace = (carsArray: Car[]): HTMLElement => {
  const race = createHtml('div', 'race');
  carsArray.forEach((car) => {
    race.append(createTrack(car));
  });
  race.append(createHtml('div', undefined, 'finish-message'));
  return race;
};

export default renderRace;
