import '../styles/main.css';
import renderGarage from './garage-view';
import renderWinners from './winners-view';
import state from '../state/state';

const renderMain = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  if (state.currentView === 'GARAGE') {
    let content = await renderGarage();
    main.append(content);
    document.addEventListener('turn-the-page', async () => {
      main.innerHTML = '';
      content = await renderGarage();
      main.append(content);
    });
  } else {
    let contentWinners = await renderWinners();
    main.append(contentWinners);
    document.addEventListener('turn-winners-page', async () => {
      main.innerHTML = '';
      contentWinners = await renderWinners();
      main.append(contentWinners);
    });
  }

  return main;
};

export default renderMain;
