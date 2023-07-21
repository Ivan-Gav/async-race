import renderTracks from './tracks';
import garage from '../car/garage';
import renderGarageHeader from './garage-header';
import renderPaginationButtons from './pagination-buttons-view';
import state from '../state/state';

const renderGarage = async (): Promise<DocumentFragment> => {
  const garageView = document.createDocumentFragment();
  let response = await garage.getCars(state.page);
  if (!response.cars.length && state.page > 1) {
    state.page -= 1;
    response = await garage.getCars(state.page);
  }
  garageView.append(
    renderGarageHeader(response.total),
    renderTracks(response.cars),
  );
  if (response.total > 7) {
    const totalPages = Math.ceil(response.total / 7);
    garageView.append(
      renderPaginationButtons(totalPages, state.page),
    );
  }
  return garageView;
};

export default renderGarage;
