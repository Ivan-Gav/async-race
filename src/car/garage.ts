import Car from './car';
import winners from '../winners/winners';

class Garage {
  private garageURL = 'http://127.0.0.1:3000/garage';

  public async getCars(page = 1, limit = 7): Promise<{ total:number, cars:Car[] }> {
    const response = await fetch(`${this.garageURL}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    const total = Number(response.headers.get('X-Total-Count'));
    return { total, cars };
  }

  public async getAllCars(): Promise<{ total:number, cars:Car[] }> {
    const response = await fetch(this.garageURL);
    const cars = await response.json();
    const total = Number(response.headers.get('X-Total-Count'));
    return { total, cars };
  }

  public async getCar(id: number): Promise<Car> {
    const response = await fetch(`${this.garageURL}/${id}`);
    const result = await response.json();
    const car = result as Car;
    return car;
  }

  public async createCar(name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    await fetch(this.garageURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  public async deleteCar(id: number): Promise<void> {
    try {
      const delResponse = await fetch(`${this.garageURL}/${id}`, {
        method: 'DELETE',
      });
      if (delResponse.ok) {
        await winners.deleteWinner(id);
        document.dispatchEvent(new CustomEvent('turn-the-page'));
      }
    } catch (error) {
      // do nothing
    }
  }

  public async updateCar(id: number, name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    await fetch(`${this.garageURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }
}

const garage = new Garage();

export default garage;
