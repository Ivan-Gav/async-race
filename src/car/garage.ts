import Car from './car';

class Garage {
  private garageURL = 'http://127.0.0.1:3000/garage';

  public async getCars(page = 1, limit = 7): Promise<{ total:number, cars:Car[] }> {
    const response = await fetch(`${this.garageURL}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    const total = Number(response.headers.get('X-Total-Count'));
    return { total, cars };
  }

  public async getCar(id: number): Promise<Car> {
    const response = await fetch(`${this.garageURL}/${id}`);
    const result = await response.json();
    const car = Object.assign(result, Car);
    return car;
  }

  public async createCar(name: string, color: string): Promise<void> {
    const car = {
      name,
      color,
    };
    const response = await fetch(this.garageURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const addedCar = await response.json();
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
        document.dispatchEvent(new CustomEvent('turn-the-page'));
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
    const response = await fetch(`${this.garageURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (response.ok) {
      const updatedCar = await response.json();
      console.log('Car successfully updated with following data:');
      console.log(updatedCar);
    } else {
      console.log('Car update failure!');
    }
  }
}

const garage = new Garage();

export default garage;
