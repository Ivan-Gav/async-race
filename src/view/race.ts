import Car from '../car/car';
import carButtons from './car-buttons-view';
import carSVG from './car-svg';
import '../styles/race.css';

const createTrack = (auto: Car): HTMLElement => {
  const track = document.createElement('div');
  track.className = 'track';

  const car = document.createElement('div');
  car.className = 'car';
  if (auto.id) {
    car.id = `c${auto.id}`;
    track.id = `t${auto.id}`;
  }
  car.title = auto.name;
  let carImage = carSVG;
  carImage = carImage.replace('id="path2853" style="fill:#ffffff"', `id="path2853" style="fill:${auto.color}"`);
  carImage = carImage.replace('<title id="title3968">Car - Top View</title>', `<title id="title3968">${auto.name}</title>`);
  car.innerHTML = carImage;

  const road = document.createElement('div');
  road.className = 'road';
  road.append(car);

  track.append(
    carButtons(auto),
    road,
  );
  return track;
};

const renderRace = (carsArray: Car[]): HTMLElement => {
  const race = document.createElement('div');
  race.className = 'race';
  carsArray.forEach((car) => {
    race.append(createTrack(car));
  });
  return race;
};

export default renderRace;
