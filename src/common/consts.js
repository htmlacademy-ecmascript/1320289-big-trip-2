const SORTS = [
  {
    name: 'day',
    disabled: false,
  },
  {
    name: 'event',
    disabled: true,
  },
  {
    name: 'time',
    disabled: false,
  },
  {
    name: 'price',
    disabled: false,
  },
  {
    name: 'offers',
    disabled: true,
  },
];

const FILTERS = [
  {
    name: 'everything',
    checked: true,
  },
  {
    name: 'future',
    checked: false,
  },
  {
    name: 'present',
    checked: false,
  },
  {
    name: 'past',
    checked: false,
  },
];

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TIME = {
  MS_IN_MIN: 6e4,
  SEC_IN_MIN: 6e1,
  HRS_IN_DAY: 24,
};

const FORMAT_TIME = {
  MD: 'MMM DD',
  H: 'HH:mm',
};

export { SORTS, FILTERS, POINT_TYPES, TIME, FORMAT_TIME };
