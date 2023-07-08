import { Car } from '../car/car';

// const carsArray = [
//   { name: 'Tesla', color: '#e6e6fa', id: 1 },
//   { name: 'BMW', color: '#fede00', id: 2 },
//   { name: 'Mersedes', color: '#6c779f', id: 3 },
//   { name: 'Ford', color: '#ef3c40', id: 4 },
//   { name: 'Kia', color: '#4dff00', id: 5 },
//   { id: 6, name: 'Toyota', color: '#ff9b00' },
// ];

const createTrack = (auto: Car): HTMLElement => {
  const track = document.createElement('div');
  track.className = 'track';

  const car = document.createElement('div');
  car.className = 'car';
  if (auto.id) car.id = auto.id.toString();
  car.title = auto.name;
  car.style.backgroundColor = auto.color;

  track.append(car);
  return track;
};

const createRace = (carsArray: Car[]): HTMLElement => {
  const race = document.createElement('div');
  race.className = 'race';
  carsArray.forEach((car) => {
    race.append(createTrack(car));
  });
  return race;
};

export default createRace;
