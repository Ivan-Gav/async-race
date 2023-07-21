import '../styles/main.css';
import renderGarage from './garage-view';

const renderMain = async (): Promise<HTMLElement> => {
  const main = document.createElement('main');
  let content = await renderGarage();
  main.append(content);
  document.addEventListener('turn-the-page', async () => {
    main.innerHTML = '';
    content = await renderGarage();
    main.append(content);
  });
  return main;
};

export default renderMain;
