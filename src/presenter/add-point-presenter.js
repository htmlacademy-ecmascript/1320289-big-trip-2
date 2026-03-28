import { remove, render, RenderPosition } from '../framework/render';
import FormView from '../view/form-view';

export default class AddPointPresenter {
  #container = null;
  #callbacks = null;
  #pointService = null;
  #pointsModel = null;
  keyboardManager = null;

  #formComponent = null;
  #point = null;

  constructor(data) {
    const { container, callbacks, pointService, pointsModel, keyboardManager } =
      data;

    this.#container = container;
    this.#callbacks = callbacks;
    this.#pointService = pointService;
    this.#pointsModel = pointsModel;
    this.keyboardManager = keyboardManager;
  }

  init() {
    this.#point = this.#pointsModel.newPoint;

    const formData = this.#pointService.getFormData(this.#point);
    this.#formComponent = new FormView({
      formData,
      callbacks: this.#pointService.getFormCallbacks({
        point: this.#point,
        getFormComponent: () => this.#formComponent,
        callbacks: {
          closeForm: () => this.closeForm(),
          onPointAdd: () => this.#callbacks?.onPointAdd(),
        },
      }),
    });

    render(this.#formComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.keyboardManager.addEscHandler('new-point', () => this.closeForm());
  }

  closeForm() {
    if (!this.#formComponent) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;
    this.keyboardManager.removeEscHandler('new-point');
    this.#callbacks?.onCancel();
  }
}
