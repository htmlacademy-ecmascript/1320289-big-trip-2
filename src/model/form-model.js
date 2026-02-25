import { POINT_TYPES } from '../common/consts';
import { destination, destinations, offersList } from '../mock/items';

export default class FormModel {
  constructor() {
    this.types = POINT_TYPES;
    this.destinations = destinations;
    this.offers = offersList;
    this.details = destination[0];
  }

  getFormDataById() {
    return {
      types: this.types,
      offers: this.offers,
      destinations: this.destinations,
      details: this.details,
    };
  }

  getEmptyFormData() {
    return {
      types: this.types,
      offers: this.offers,
      destinations: [],
      details: [],
    };
  }
}
