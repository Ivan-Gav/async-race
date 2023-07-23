import createHtml from '../utils/create-html';
import '../styles/pagination-buttons.css';
import { singleArrow, doubleArrow } from '../assets/images/arrows-svg';
import state from '../state/state';

const firstText = doubleArrow;
const prevText = singleArrow;
const nextText = singleArrow;
const lastText = doubleArrow;

enum PageProp {
  page = 'page',
  winnersPage = 'winnersPage',
}

const getPageProp = ():PageProp => {
  if (state.currentView === 'GARAGE') {
    return PageProp.page;
  }
  return PageProp.winnersPage;
};

const getEventProp = ():string => {
  if (state.currentView === 'GARAGE') {
    return 'turn-the-page';
  }
  return 'turn-winners-page';
};

const getNumberOfPages = async ():Promise<number> => {
  if (state.currentView === 'GARAGE') {
    return state.getNumOfPages();
  }
  return state.getNumOfWinPages();
};

const firstCallback = ():void => {
  const pageProp = getPageProp();
  if (state[pageProp] !== 1) {
    state[pageProp] = 1;
    document.dispatchEvent(new CustomEvent(getEventProp()));
  }
};

const prevCallback = ():void => {
  const pageProp = getPageProp();
  if (state[pageProp] > 1) {
    state[pageProp] -= 1;
    document.dispatchEvent(new CustomEvent(getEventProp()));
  }
};

const nextCallback = async ():Promise<void> => {
  const pageProp = getPageProp();
  const totalPages = await getNumberOfPages();
  if (state[pageProp] < totalPages) {
    state[pageProp] += 1;
    document.dispatchEvent(new CustomEvent(getEventProp()));
  }
};

const lastCallback = async ():Promise<void> => {
  const pageProp = getPageProp();
  const totalPages = await getNumberOfPages();
  if (state[pageProp] < totalPages) {
    state[pageProp] = totalPages;
    document.dispatchEvent(new CustomEvent(getEventProp()));
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
