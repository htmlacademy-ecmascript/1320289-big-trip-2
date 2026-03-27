import AbstractView from '../framework/view/abstract-view';

const getButtonTemplate = (isLoading) => {
  const isDisabled = isLoading ? 'disabled' : '';

  return `
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled}>New event</button>
  `;
};

export default class AddPointView extends AbstractView {
  #isLoading = false;
  #handleClick = null;

  constructor({ isLoading, onClick }) {
    super();
    this.#isLoading = isLoading;
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return getButtonTemplate(this.#isLoading);
  }

  #clickHandler = () => {
    this.#handleClick();
  };
}
