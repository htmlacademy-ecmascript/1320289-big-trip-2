import { NEW_POINT, POINT_TYPES } from '../common/consts';
import { destinations, items, offersList } from '../mock/data';

export default class PointsModel {
  #types = [];
  #destinations = [];
  #offers = [];
  #points = [];
  #newPoint = {};

  init() {
    this.#types = POINT_TYPES;
    this.#destinations = destinations;
    this.#offers = offersList;
    this.#points = items;
    this.#newPoint = NEW_POINT;
  }

  get points() {
    return this.#points;
  }

  get newPoint() {
    return this.#newPoint;
  }

  get types() {
    return this.#types;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getPointById(id) {
    return this.#points.find((point) => point.id === id);
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getOffersById(type, targetIds) {
    const offersByType = this.getOffersByType(type);

    return offersByType.filter((offer) =>
      targetIds.find((id) => offer.id === id),
    );
  }

  getDestinationById(id) {
    return this.#destinations.find((dest) => dest.id === id);
  }
}
