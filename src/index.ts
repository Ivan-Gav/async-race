import './styles/global.css';
import header from './view/header';
import renderMain from './view/main';

const body = document.querySelector('body');

if (body) {
  body.innerHTML = '';
  body.append(header.render());
  let main:HTMLElement;
  renderMain().then((renderedMain) => {
    main = renderedMain;
  }).then(() => body.append(main));

  document.addEventListener('change-view', () => {
    main.remove();
    renderMain().then((renderedMain) => {
      main = renderedMain;
    }).then(() => body.append(main));
  });
}
