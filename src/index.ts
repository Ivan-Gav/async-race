import './styles/race.css';
import { Car } from './car/car';
import createRace from './view/track';

const url = 'http://127.0.0.1:3000/garage';

// get cars from server

const getCars = async (): Promise<Car[]> => {
  const request = await fetch(url);
  const output = await request.json();
  return output;
};

const body = document.querySelector('body');

getCars().then((cars) => {
  console.log(cars);
  if (body) {
    body.innerHTML = '';
    body.append(createRace(cars));
  }
});

// create car
// const newCar = {
//   name: 'Kia',
//   color: '#4dff00',
// };

// const createCar = async (car: Car): Promise<void> => {
//   const request = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(car),
//   });
//   if (request.ok) {
//     const addedCar = await request.json();
//     console.log(addedCar);
//   } else {
//     console.log('Something went wrong!');
//   }
// };

// createCar(newCar);

// update car

// const carToUpdate = {
//   id: 6,
//   name: 'Toyota',
//   color: '#ff9b00',
// };

// const updateCar = async (car:Car): Promise<void> => {
//   const request = await fetch(`${url}/${car.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(car),
//   });
//   if (request.ok) {
//     const updatedCar = await request.json();
//     console.log('Car successfully updated with following data:');
//     console.log(updatedCar);
//   } else {
//     console.log('Car update failure!');
//   }
// };

// updateCar(carToUpdate);

// delete car

// const deleteCar = async (idToDel: number): Promise<void> => {
//   try {
//     const delResponse = await fetch(`${url}/${idToDel}`, {
//       method: 'DELETE',
//     });
//     if (delResponse.ok) {
//       console.log(`Car with id=${idToDel} deleted, and here are the rest:`);
//       const res = await fetch(url);
//       const out = await res.json();
//       console.log(out);
//     } else {
//       console.log(`There's no car with id=${idToDel} to delete\n
//       The only cars you have are:`);
//       const res = await fetch(url);
//       const out = await res.json();
//       console.log(out);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// deleteCar(7);
