import Car from './car';

class Garage {
  private garageURL = 'http://127.0.0.1:3000/garage';

  public cars;

  constructor() {
    this.cars = this.getCars();
  }

  private async getCars(): Promise<Car[]> {
    const request = await fetch(this.garageURL);
    const output = await request.json();
    return output;
  }

  public async getCar(id: number): Promise<Car> {
    const request = await fetch(`${this.garageURL}/${id}`);
    const result = await request.json();
    const car = Object.assign(result, Car);
    return car;
  }

  public async createCar(name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    const request = await fetch(this.garageURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const addedCar = await request.json();
    console.log(addedCar);
  }

  public async deleteCar(id: number): Promise<void> {
    try {
      const delResponse = await fetch(`${this.garageURL}/${id}`, {
        method: 'DELETE',
      });
      if (delResponse.ok) {
        console.log(`Car with id=${id} deleted, and here are the rest:`);
        const res = await fetch(this.garageURL);
        const out = await res.json();
        console.log(out);
      } else {
        console.log(`There's no car with id=${id} to delete\n
      The only cars you have are:`);
        const res = await fetch(this.garageURL);
        const out = await res.json();
        console.log(out);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async updateCar(id: number, name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    const request = await fetch(`${this.garageURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (request.ok) {
      const updatedCar = await request.json();
      console.log('Car successfully updated with following data:');
      console.log(updatedCar);
    } else {
      console.log('Car update failure!');
    }
  }
}

const garage = new Garage();

export default garage;
