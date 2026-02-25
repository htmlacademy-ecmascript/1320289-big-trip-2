import BaseComponent from '../../common/base-component';

const getEventTypeTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>`;

const getDestinationTemplate = (destination) => `
    <option value="${destination}"></option>
  `;

const getOfferTemplate = ({ title, price }) => {
  const name = title.split(' ').at(-1);

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}">
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const getPhotoTemplate = (src, description) => `
  <img class="event__photo" src="${src}" alt="${description}">
`;

const getContent = ({ types, destinations, offers, description, pictures }) => {
  const typesTemplate = types
    .map((type) => getEventTypeTemplate(type))
    .join('');

  const destinationsDemplate = destinations
    .map((destination) => getDestinationTemplate(destination))
    .join('');

  const CHOOSEN_TYPE = 'flight';

  const currentOffers = offers.find((offer) => offer.type === CHOOSEN_TYPE);

  const offersTemplate = currentOffers.offers
    .map((offer) => getOfferTemplate(offer))
    .join('');

  const photosTemplate = pictures
    .map((picture) => getPhotoTemplate(picture.src, picture.description))
    .join('');

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsDemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photosTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
`;
};

export default class FormView extends BaseComponent {
  constructor({ types = [], destinations = [], offers = [], details = {} }) {
    super();

    const { description = '', pictures = [] } = details;

    this.destinations = destinations;
    this.types = types;
    this.offers = offers;
    this.description = description;
    this.pictures = pictures;
  }

  getTemplate() {
    return getContent({
      types: this.types,
      destinations: this.destinations,
      offers: this.offers,
      description: this.description,
      pictures: this.pictures,
    });
  }
}
