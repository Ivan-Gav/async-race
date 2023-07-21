import createHtml from '../utils/create-html';
import '../styles/pagination-buttons.css';
import { singleArrow, doubleArrow } from '../assets/images/arrows-svg';
import state from '../state/state';

const firstText = doubleArrow;
const prevText = singleArrow;
const nextText = singleArrow;
const lastText = doubleArrow;

const firstCallback = ():void => {
  if (state.page !== 1) {
    state.page = 1;
    document.dispatchEvent(new CustomEvent('turn-the-page'));
  }
};

const prevCallback = ():void => {
  if (state.page > 1) {
    state.page -= 1;
    document.dispatchEvent(new CustomEvent('turn-the-page'));
  }
};

const nextCallback = async ():Promise<void> => {
  const totalPages = await state.getNumOfPages();
  if (state.page < totalPages) {
    state.page += 1;
    document.dispatchEvent(new CustomEvent('turn-the-page'));
  }
};

const lastCallback = async ():Promise<void> => {
  console.log('Show last page');
  const totalPages = await state.getNumOfPages();
  if (state.page < totalPages) {
    state.page = totalPages;
    document.dispatchEvent(new CustomEvent('turn-the-page'));
  }
};

const renderPaginationButtons = (totalPages:number, currentPage = 1):HTMLElement => {
  const paginationButtons = createHtml('section', 'pagination-buttons');

  const disabled = {
    first: currentPage === 1,
    prev: currentPage === 1,
    next: currentPage === totalPages,
    last: currentPage === totalPages,
  };

  const first = createHtml('button', 'first', undefined, firstText, firstCallback) as HTMLButtonElement;
  const prev = createHtml('button', 'prev', undefined, prevText, prevCallback) as HTMLButtonElement;
  const current = createHtml('div', 'current', undefined, `${currentPage} of ${totalPages}`);
  const next = createHtml('button', 'next', undefined, nextText, nextCallback) as HTMLButtonElement;
  const last = createHtml('button', 'last', undefined, lastText, lastCallback) as HTMLButtonElement;
  first.disabled = disabled.first;
  prev.disabled = disabled.prev;
  next.disabled = disabled.next;
  last.disabled = disabled.last;

  paginationButtons.append(first, prev, current, next, last);

  return paginationButtons;
};

export default renderPaginationButtons;
