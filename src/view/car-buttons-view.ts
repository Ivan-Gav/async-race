import './car-buttons-style.css';

type Callback = (event: Event) => void;

const button = (btnText:string, btnClass: string, callback: Callback):HTMLElement => {
  const btn = document.createElement('button');
  btn.textContent = btnText;
  btn.className = btnClass;
  btn.addEventListener('click', callback);
  return btn;
};

const tuneCallback = (event:Event):void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('tune');
  }
};

const removeCallback = (event:Event):void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('remove');
  }
};

const startCallback = (event:Event):void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('start');
  }
};

const stopCallback = (event:Event):void => {
  if (event.currentTarget instanceof HTMLElement) {
    console.log('stop');
  }
};

const carButtons = (name:string):HTMLElement => {
  const buttons = document.createElement('div');
  buttons.className = 'car-buttons';

  const title = document.createElement('div');
  title.textContent = name;
  title.className = 'car-buttons_title';

  buttons.append(
    title,
    button('Tune', 'car-button', tuneCallback),
    button('Start', 'car-button', startCallback),
    button('Remove', 'car-button', removeCallback),
    button('Stop', 'car-button', stopCallback),
  );

  return buttons;
};

export default carButtons;
