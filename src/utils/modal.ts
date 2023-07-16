import '../styles/modal.css';
import createHtml from './createHtml';
import carSVG from '../view/car-svg';

// const modalHtml = `
// <h2>Create Car</h2>
// <button class="button close-button">🗙</button>
// <form id="edit-car" method="dialog">
//   <label>Model <input type="text" v></label>
//   <label>Color <input type="color"></label>
//   <button class="button" type="submit">Create car</button>
// </form>
// `;

// const formHtml = `
//   <input type="text" placeholder="Model" value="Mitsubishi EVO"'>
//   <label>Color <input type="color" value="#ff0000"></label>
//   <button class="button" type="submit">Create car</button>
// `;

// const headerText = 'Create Car';
// const carName = 'Mitsubishi EVO';
// const carColor = '#ff0000';

const renderModal = (header = 'Create Car', carName = 'Dodge Viper', carColor = '#ff0000'):HTMLDialogElement => {
  const modal = createHtml('dialog', 'modal', 'car-edit-form') as HTMLDialogElement;
  // modal.innerHTML = modalHtml;

  const closeModal = ():void => {
    modal.close();
  };

  const modalContainer = createHtml('div', 'modal-container');
  const modalHeader = createHtml('h2', 'modal-header', undefined, header);
  const closeBtn = createHtml('button', 'modal-close-btn', undefined, '🗙', closeModal);
  const editForm = createHtml('form', undefined, 'edit-car');

  const modelInput = createHtml('input', undefined, 'model-input');
  modelInput.setAttribute('type', 'text');
  modelInput.setAttribute('value', carName);
  const colorInput = createHtml('input', undefined, 'color-input');
  colorInput.setAttribute('type', 'color');
  colorInput.setAttribute('value', carColor);

  const submitBtn = createHtml('button', 'modal-submit-btn', undefined, 'Submit');

  editForm.append(modelInput, colorInput, submitBtn);

  const carPic = carSVG.replace('id="path2853" style="fill:#ffffff"', `id="path2853" style="fill:${carColor}"`);

  const carImage = createHtml('div', 'carFormImg', undefined, carPic);

  colorInput.addEventListener('input', () => {
    if (colorInput instanceof HTMLInputElement) {
      const newColor = colorInput.value;
      carImage.innerHTML = carImage.innerHTML.replace(/id="path2853" style="fill:#\w*"/, `id="path2853" style="fill:${newColor}"`);
    }
  });

  modalContainer.append(modalHeader, closeBtn, editForm, carImage);
  modal.append(modalContainer);

  return modal;
};

export default renderModal;
