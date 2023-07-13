import './styles/global.css';
import './styles/race.css';
// import Car from './car/car';
import createRace from './view/track';
import Garage from './car/garage';

// const garageURL = 'http://127.0.0.1:3000/garage';
// const engineURL = 'http://127.0.0.1:3000/engine';

const garage = new Garage();

// type Engine = {
//   velocity: number;
//   distance: number;
// };

// const animateDrive = (id: number, time: number): void => {
//   const car = document.querySelector(`#c${id}`);
//   if (car instanceof HTMLElement) {
//     car.classList.add('drive');
//     car.style.setProperty('--drive-time', `${time}s`);
//   }
// };

// const startEngine = async (id: number): Promise<Engine> => {
//   const status = 'started';
//   const request = await fetch(`${engineURL}?id=${id}&status=${status}`, {
//     method: 'PATCH',
//   });
//   const engine = await request.json();
//   return engine;
// };

// const stopEngine = async (id: number): Promise<Engine> => {
//   const status = 'stopped';
//   const request = await fetch(`${engineURL}?id=${id}&status=${status}`, {
//     method: 'PATCH',
//   });
//   const engine = await request.json();
//   return engine;
// };

// const drive = async (id: number): Promise<void> => {
//   const status = 'drive';
//   const startTime = Date.now();
//   const engine = await startEngine(id);
//   console.log(`engine started with speed = ${engine.velocity}`);
//   const time = Math.round(engine.distance / (engine.velocity * 10)) / 100;
//   animateDrive(id, time);
//   const trip = await fetch(`${engineURL}?id=${id}&status=${status}`, {
//     method: 'PATCH',
//   });
//   console.log(trip);
//   // const finish = await trip.json();
//   // console.log(finish);
//   const seconds = (Date.now() - startTime) / 1000;
//   if (trip.ok) {
//     console.log(`Car id=${id} stopped in ${seconds} seconds`);
//   } else {
//     const message = await trip.text();
//     console.log(message);
//   }
//   await stopEngine(id);
// };

// drive(2);

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
