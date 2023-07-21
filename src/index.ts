import './styles/global.css';
import renderHeader from './view/header';
import renderMain from './view/main';

const body = document.querySelector('body');

if (body) {
  body.innerHTML = '';
  body.append(renderHeader());
  renderMain().then((main) => {
    body.append(main);
  });
}
