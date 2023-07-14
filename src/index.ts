import './styles/global.css';
import './styles/race.css';
// import Car from './car/car';
import createRace from './view/track';
import Garage from './car/garage';

// const garageURL = 'http://127.0.0.1:3000/garage';

const garage = new Garage();

const body = document.querySelector('body');

// const newCar = new Car('Kia', '#4dff00');
// console.log(`Created new car ${newCar.name} with id=${newCar.id}`);
// newCar.updateCar('Kia Rio', '#ff0000');

garage.cars.then((cars) => {
  console.log(cars);
  if (body) {
    body.innerHTML = '';
    body.append(createRace(cars));
  }
}).then(() => {
  garage.deleteCar(6);
});
