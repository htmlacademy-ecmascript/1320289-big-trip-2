import AbstractView from '../framework/view/abstract-view';

const getContentTemplate = () => '<ul class="trip-events__list"><ul>';

export default class ListView extends AbstractView {
  get template() {
    return getContentTemplate();
  }
}
