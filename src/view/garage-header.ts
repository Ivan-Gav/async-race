import createHtml from '../utils/create-html';
import '../styles/garage-header.css';

const renderGarageHeader = (qty: number, page: number):HTMLElement => {
  let headerContent = '';
  if (qty === 0) {
    headerContent = 'No Cars in the Garage';
  } else if (qty <= 7) {
    headerContent = `Total Cars in the Garage: ${qty}`;
  } else {
    const from = (7 * (page - 1) + 1);
    const to = Math.min(qty, (7 * page));
    headerContent = `Total Cars in the Garage: ${qty}<br>
    Cars in this Race: from ${from} to ${to}`;
  }

  const garageHeader = createHtml('section', 'garage-header', undefined, headerContent);
  return garageHeader;
};

export default renderGarageHeader;
