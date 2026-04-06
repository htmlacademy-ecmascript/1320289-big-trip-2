const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UpdateTypes = {
  MAJOR: 'major',
  MINOR: 'minor',
};

const AppStates = {
  ERROR: 'error',
  LOADING: 'loading',
  READY: 'ready',
};

const FormModes = {
  UPDATE: 'update',
  CREATE: 'create',
};

const DateTypes = {
  FROM: 'dateFrom',
  TO: 'dateTo',
};

const EntityStates = {
  DISABLED: 'disabled',
  SAVING: 'saving',
  DELETING: 'deleting',
  READY: 'ready',
};

const ApiSettings = {
  AUTHORIZATION: 'Basic gq6e9j3erl7TY',
  URL: 'https://22.objects.htmlacademy.pro/big-trip',
};

const TimeLimits = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 1000,
};

export {
  SortTypes,
  FilterTypes,
  UpdateTypes,
  AppStates,
  FormModes,
  DateTypes,
  EntityStates,
  ApiSettings,
  TimeLimits,
};
