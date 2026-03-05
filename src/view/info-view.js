import AbstractView from '../framework/view/abstract-view';

const getContentTemplate = ({ title, description, cost }) => `
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>
      <p class="trip-info__dates">${description}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>
`;

export default class InfoView extends AbstractView {
  #title = null;
  #description = null;
  #cost = null;

  constructor({ title, description, cost }) {
    super();
    this.#title = title;
    this.#description = description;
    this.#cost = cost;
  }

  get template() {
    return getContentTemplate({
      title: this.#title,
      description: this.#description,
      cost: this.#cost,
    });
  }
}
