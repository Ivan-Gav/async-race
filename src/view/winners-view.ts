import createHtml from '../utils/create-html';
import winners from '../winners/winners';
import state from '../state/state';
import Winner from '../winners/winner';
import garage from '../car/garage';
import getCarImage from './car-img';
import '../styles/winners.css';
import renderPaginationButtons from './pagination-buttons-view';
import WinnersSortField from '../state/winner-sort-field-type';

const renderWinnersHeader = (qty: number, page: number): HTMLElement => {
  let headerContent = '';
  if (qty === 0) {
    headerContent = 'No Winners yet. Run the Race first.';
  } else if (qty <= 10) {
    headerContent = `Total Winners on the list: ${qty}`;
  } else {
    const from = 10 * (page - 1) + 1;
    const to = Math.min(qty, 10 * page);
    headerContent = `Total Winners on the list: ${qty}<br>
    Winners on this page: from ${from} to ${to}`;
  }

  const winnersHeader = createHtml(
    'section',
    'winners-header',
    undefined,
    headerContent,
  );
  return winnersHeader;
};

const tabHeadCallback = (event: Event): void => {
  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    const param = target.id === 'tab-head-wins' ? WinnersSortField.wins : WinnersSortField.time;
    if (state.winnersSortField === param) {
      state.winnersSortAsc = !state.winnersSortAsc;
    } else {
      state.winnersSortField = WinnersSortField[param];
      state.winnersSortAsc = true;
    }
    document.dispatchEvent(new CustomEvent('turn-winners-page'));
  }
};

const renderWinners = async (winnersArr: Winner[]): Promise<HTMLElement> => {
  const output = createHtml('div', 'winners-table');

  const tabHeadNr = createHtml('div', 'winner-table-header', 'tab-head-nr', 'Number');
  const tabHeadCar = createHtml('div', 'winner-table-header', 'tab-head-car', 'Car');
  const tabHeadWins = createHtml('div', 'winner-table-header', 'tab-head-wins', 'Number of wins', tabHeadCallback);
  const tabHeadTime = createHtml('div', 'winner-table-header', 'tab-head-time', 'Best result (sec)', tabHeadCallback);
  if (state.winnersSortField === 'wins') {
    const addClass = state.winnersSortAsc ? 'asc' : 'desc';
    tabHeadWins.classList.add(addClass);
  }
  if (state.winnersSortField === 'time') {
    const addClass = state.winnersSortAsc ? 'asc' : 'desc';
    tabHeadTime.classList.add(addClass);
  }
  output.append(tabHeadNr, tabHeadCar, tabHeadWins, tabHeadTime);

  const carsResponse = await garage.getAllCars();
  const carsArray = carsResponse.cars;
  winnersArr.forEach(async (winner, i) => {
    const car = carsArray.find((item) => item.id === winner.id);
    const nr = createHtml('div', 'winner-table-nr', undefined, `${(state.winnersPage - 1) * 10 + i + 1}`);
    const img = createHtml('div', 'winner-table-img', undefined);
    const model = createHtml('div', 'winner-table-model', undefined);
    const wins = createHtml('div', 'winner-table-wins', undefined, `${winner.wins}`);
    const time = createHtml('div', 'winner-table-time', undefined, `${winner.time}`);
    if (car) {
      img.innerHTML = getCarImage(car.name, car.color);
      model.innerHTML = car.name;
    }
    output.append(nr, img, model, wins, time);
  });

  return output;
};

const renderWinnersView = async (): Promise<DocumentFragment> => {
  const winnersView = document.createDocumentFragment();
  const order = state.winnersSortAsc ? 'ASC' : 'DESC';
  let response = await winners.getWinners(state.winnersPage, 10, state.winnersSortField, order);
  if (!response.winners.length && state.winnersPage > 1) {
    state.winnersPage -= 1;
    response = await winners.getWinners(state.winnersPage);
  }
  winnersView.append(
    renderWinnersHeader(response.total, state.winnersPage),
    await renderWinners(response.winners),
  );
  if (response.total > 10) {
    const totalPages = Math.ceil(response.total / 10);
    winnersView.append(renderPaginationButtons(totalPages, state.winnersPage));
  }
  return winnersView;
};

export default renderWinnersView;
