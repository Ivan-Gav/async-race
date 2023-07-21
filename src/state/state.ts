import garage from '../car/garage';

class State {
  private currentPage;

  public numOfPages;

  constructor() {
    this.currentPage = 1;
    this.numOfPages = 1;
  }

  public async getNumOfPages():Promise<number> {
    const response = await garage.getCars();
    this.numOfPages = Math.ceil(response.total / 7);
    return this.numOfPages;
  }

  public set page(value:number) {
    this.currentPage = value;
    const savedState = this.currentPage.toString();
    localStorage.setItem('savedState', savedState);
  }

  public get page():number {
    const savedState = localStorage.getItem('savedState');
    if (savedState) {
      this.currentPage = Number(savedState);
    }
    return this.currentPage;
  }
}

const state = new State();

export default state;
