import { remove, render, replace } from '../framework/render';
import FormView from '../view/form-view';
import PointView from '../view/point-view';

export default class PointPresenter {
  #pointService = null;
  #callbacks = null;
  #container = null;
  #keyboardManager = null;

  #pointComponent = null;
  #formComponent = null;
  #point = null;
  #isOpenForm = false;

  constructor({ container, callbacks, pointService, keyboardManager }) {
    this.#callbacks = callbacks;
    this.#pointService = pointService;
    this.#container = container;
    this.#keyboardManager = keyboardManager;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#createComponents();

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#container.contains(prevFormComponent.element)) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }

  destroy() {
    this.resetView();
    remove(this.#pointComponent);
    remove(this.#formComponent);
  }

  resetView() {
    this.#close();
  }

  getPointComponent() {
    return this.#pointComponent;
  }

  #createComponents() {
    this.#createPointComponent();
    this.#createFormComponent();
  }

  #createPointComponent() {
    const pointData = this.#pointService.getPointData(this.#point);

    this.#pointComponent = new PointView({
      pointData,
      callbacks: {
        ...this.#callbacks,
        onEditClick: () => {
          this.#callbacks?.onEditClick();
          this.#open();
        },
      },
    });
  }

  #createFormComponent() {
    const formData = this.#pointService.getFormData(this.#point);

    const formCallbacks = this.#pointService.getFormCallbacks({
      point: this.#point,
      getFormComponent: () => this.#formComponent,
      callbacks: {
        close: () => this.#close(),
      },
    });

    this.#formComponent = new FormView({
      formData,
      callbacks: formCallbacks,
    });
  }

  #open() {
    replace(this.#formComponent, this.#pointComponent);

    this.#keyboardManager.addEscHandler(this.#pointComponent.id, () => {
      this.#close();
    });

    this.#isOpenForm = true;
  }

  #close() {
    if (!this.#isOpenForm) {
      return;
    }

    const prevFormComponent = this.#formComponent;

    this.#createFormComponent();

    replace(this.#pointComponent, prevFormComponent);
    remove(prevFormComponent);

    this.#keyboardManager.removeEscHandler(this.#pointComponent.id);
    this.#isOpenForm = false;
  }
}
