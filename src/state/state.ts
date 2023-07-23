import garage from '../car/garage';
import winners from '../winners/winners';
import View from './view-type';
import WinnersSortField from './winner-sort-field-type';

class State {
  private currentState;

  constructor() {
    this.currentState = {
      currentPage: 1,
      currentWinnersPage: 1,
      numOfPages: 1,
      numOfWinPages: 1,
      currentView: View.GARAGE,
      isRace: false,
      WinnersSortAsc: true,
      WinnersSortField: WinnersSortField.id,
    };
  }

  public async getNumOfPages():Promise<number> {
    const response = await garage.getCars();
    this.currentState.numOfPages = Math.ceil(response.total / 7);
    return this.currentState.numOfPages;
  }

  public async getNumOfWinPages():Promise<number> {
    const response = await winners.getWinners();
    this.currentState.numOfWinPages = Math.ceil(response.total / 10);
    return this.currentState.numOfWinPages;
  }

  public set page(value:number) {
    this.currentState.currentPage = value;
    this.save();
  }

  public get page():number {
    this.load();
    return this.currentState.currentPage;
  }

  public set winnersPage(value:number) {
    this.currentState.currentWinnersPage = value;
    this.save();
  }

  public get winnersPage():number {
    this.load();
    return this.currentState.currentWinnersPage;
  }

  public set isRace(value:boolean) {
    this.currentState.isRace = value;
  }

  public get isRace():boolean {
    return this.currentState.isRace;
  }

  public set currentView(value:View) {
    this.currentState.currentView = value;
    this.save();
  }

  public get currentView():View {
    this.load();
    return this.currentState.currentView;
  }

  public set winnersSortAsc(value:boolean) {
    this.currentState.WinnersSortAsc = value;
    this.save();
  }

  public get winnersSortAsc():boolean {
    this.load();
    return this.currentState.WinnersSortAsc;
  }

  public set winnersSortField(value:WinnersSortField) {
    this.currentState.WinnersSortField = value;
    this.save();
  }

  public get winnersSortField():WinnersSortField {
    this.load();
    return this.currentState.WinnersSortField;
  }

  private save():void {
    localStorage.setItem('savedState', JSON.stringify(this.currentState));
  }

  private load():void {
    const saved = localStorage.getItem('savedState');
    if (saved) {
      this.currentState = JSON.parse(saved);
    }
  }
}

const state = new State();

export default state;
