import '../styles/main.css';
import renderGarage from './garage-view';
import renderWinners from './winners-view';
import state from '../state/state';

const renderMain = async (): Promise<HTMLElement> => {
  console.log(state.currentView);
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
    const contentWinners = await renderWinners();
    main.append(contentWinners);
  }

  return main;
};

export default renderMain;
