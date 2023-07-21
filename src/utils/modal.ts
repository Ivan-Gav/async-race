import '../styles/modal.css';
import createHtml from './create-html';
import carSVG from '../assets/images/car-svg';
import garage from '../car/garage';

class Modal {
  public header;

  public carName;

  public carColor;

  public modalHeader;

  public editForm;

  public modelInput;

  public colorInput;

  constructor(
    header = 'Create Car',
    carName = 'Zapor Legend',
    carColor = '#ff0000',
    carId = 0,
  ) {
    this.header = header;
    this.carName = carName;
    this.carColor = carColor;
    this.modalHeader = createHtml('h2', 'modal-header', undefined, this.header);
    this.modelInput = this.buildModelInput();
    this.colorInput = this.buildColorInput();
    this.editForm = this.buildForm(carId);
  }

  public renderModal(modalId: string): HTMLDialogElement {
    const modal = createHtml('dialog', 'modal', modalId) as HTMLDialogElement;
    const closeModal = (): void => modal.close();
    const modalContainer = createHtml('div', 'modal-container');
    const closeBtn = createHtml(
      'button',
      'modal-close-btn',
      undefined,
      '🗙',
      closeModal,
    );
    const carPic = carSVG.replace(
      'id="path2853" style="fill:#ffffff"',
      `id="path2853" style="fill:${this.carColor}"`,
    );
    const carImage = createHtml('div', 'carFormImg', undefined, carPic);
    this.colorInput.addEventListener('input', () => {
      const newColor = this.colorInput.value;
      carImage.innerHTML = carImage.innerHTML.replace(
        /id="path2853" style="fill:#\w*"/,
        `id="path2853" style="fill:${newColor}"`,
      );
    });
    modalContainer.append(this.modalHeader, closeBtn, this.editForm, carImage);
    modal.append(modalContainer);
    return modal;
  }

  public setCreateCallback(): void {
    this.editForm.addEventListener('submit', () => {
      garage.createCar(this.modelInput.value, this.colorInput.value);
    });
  }

  public setTuneCallback(): void {
    this.editForm.addEventListener('submit', (event: Event) => {
      const form = event.currentTarget;
      if (form instanceof HTMLElement) {
        const id = Number(form.id.replace('f', ''));
        if (id) {
          garage.updateCar(
            id,
            this.modelInput.value,
            this.colorInput.value,
          );
        }
      }
    });
  }

  private buildModelInput(): HTMLInputElement {
    const modelInput = createHtml('input', undefined, 'model-input');
    modelInput.setAttribute('type', 'text');
    modelInput.setAttribute('value', this.carName);
    modelInput.setAttribute('maxlength', '18');
    return modelInput as HTMLInputElement;
  }

  private buildColorInput(): HTMLInputElement {
    const colorInput = createHtml('input', undefined, 'color-input');
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('value', this.carColor);
    return colorInput as HTMLInputElement;
  }

  private buildForm(carId = 0): HTMLFormElement {
    const editForm = createHtml('form', 'edit-car', `f${carId}`);
    // editForm.setAttribute('method', 'dialog');
    const submitBtn = createHtml(
      'button',
      'modal-submit-btn',
      undefined,
      'Submit',
    );
    editForm.append(this.modelInput, this.colorInput, submitBtn);
    return editForm as HTMLFormElement;
  }
}

const modal = new Modal();

export { modal, Modal };
