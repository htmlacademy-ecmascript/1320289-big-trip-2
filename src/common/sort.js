import dayjs from 'dayjs';
import { FilterTypes, SortTypes } from './config';

const SortComparators = {
  [SortTypes.DAY]: {
    comparator: null,
    isDisabled: false,
  },
  [SortTypes.EVENT]: {
    comparator: null,
    isDisabled: true,
  },
  [SortTypes.TIME]: {
    comparator: (pointA, pointB) =>
      dayjs(pointB.dateTo).diff(pointB.dateFrom) -
      dayjs(pointA.dateTo).diff(pointA.dateFrom),
    isDisabled: false,
  },
  [SortTypes.PRICE]: {
    comparator: (pointA, pointB) => pointB.basePrice - pointA.basePrice,
    isDisabled: false,
  },
  [SortTypes.OFFERS]: {
    comparator: (pointA, pointB) => pointB.offers.length - pointA.offers.length,
    isDisabled: false,
  },
};

const FilterPredicates = {
  [FilterTypes.EVERYTHING]: () => true,
  [FilterTypes.FUTURE]: (point) => dayjs().isBefore(point.dateFrom, 'D'),
  [FilterTypes.PRESENT]: (point) =>
    (dayjs(point.dateFrom).isBefore(dayjs(), 'D') ||
      dayjs(point.dateFrom).isSame(dayjs(), 'D')) &&
    (dayjs(point.dateTo).isAfter(dayjs(), 'D') ||
      dayjs(point.dateTo).isSame(dayjs(), 'D')),
  [FilterTypes.PAST]: (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D'),
};

export { SortComparators, FilterPredicates };
