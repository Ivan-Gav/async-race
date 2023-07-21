import Callback from './callback-type';

const createHtml = (
  tag: string,
  className?: string,
  id?: string,
  innerHtml?: string,
  clickCallback?: Callback,
): HTMLElement => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (id) element.id = id;
  if (innerHtml) element.innerHTML = innerHtml;
  if (clickCallback) {
    element.addEventListener('click', clickCallback);
  }
  return element;
};

export default createHtml;
