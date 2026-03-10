import { render, replace } from '../framework/render';
import FormView from '../view/form-view';
import HintView from '../view/hint-view';
import PointView from '../view/point-view';

export default class PointManager {
  #currentOpenForm = null;
  #keyboardManager = null;

  constructor(keyboardManager) {
    this.#keyboardManager = keyboardManager;
  }

  createPointView(pointData, callbacks) {
    const { onEditClick, onFavoriteClick } = callbacks;

    return new PointView({
      pointData,
      onEditClick,
      onFavoriteClick,
    });
  }

  createFormView(formData, callbacks) {
    const { onFormSubmit, onFormDecline } = callbacks;

    return new FormView({
      formData,
      onFormSubmit,
      onFormDecline,
    });
  }

  openForm({ formComponent, pointComponent }) {
    this.closeCurrentForm();

    replace(formComponent, pointComponent);

    this.#keyboardManager.addEscHandler(pointComponent.id, () => {
      this.closeCurrentForm();
    });

    this.#currentOpenForm = {
      form: formComponent,
      point: pointComponent,
      close: () => {
        replace(pointComponent, formComponent);
        this.#keyboardManager.removeEscHandler(pointComponent.id);
        this.#currentOpenForm = null;
      },
    };
  }

  closeCurrentForm() {
    if (this.#currentOpenForm) {
      this.#currentOpenForm.close();
      this.#currentOpenForm = null;
    }
  }

  renderHint(message, container) {
    container.innerHTML = '';
    render(new HintView({ message }), container);
  }
}
