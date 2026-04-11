import { AppStates, FilterTypes } from './config';

const Hints = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information',
};

const EmptyFilterHints = {
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
  EVERYTHING: 'Click New Event to create your first point',
};

const FilterEmptyHints = {
  [FilterTypes.FUTURE]: EmptyFilterHints.FUTURE,
  [FilterTypes.PRESENT]: EmptyFilterHints.PRESENT,
  [FilterTypes.PAST]: EmptyFilterHints.PAST,
  [FilterTypes.EVERYTHING]: EmptyFilterHints.EVERYTHING,
};

const AppStateHints = {
  [AppStates.LOADING]: Hints.LOADING,
  [AppStates.ERROR]: Hints.ERROR,
};

export { FilterEmptyHints, AppStateHints };
