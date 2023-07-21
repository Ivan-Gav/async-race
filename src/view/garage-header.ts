import createHtml from '../utils/create-html';
import '../styles/garage-header.css';

const renderGarageHeader = (qty: number):HTMLElement => {
  const headerContent = `There are <span>${qty}</span> Cars in the Garage`;
  const garageHeader = createHtml('section', 'garage-header', undefined, headerContent);
  return garageHeader;
};

export default renderGarageHeader;
