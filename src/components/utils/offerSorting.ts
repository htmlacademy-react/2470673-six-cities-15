import { Offers } from '../types/types';
import { SortType } from '../const/const';

export function offersSorting(type: SortType, list: Offers) {
  switch (type) {
    case SortType.LowToHigh:
      return list.sort((a, b) => a.price - b.price);
    case SortType.HighToLow:
      return list.sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return list.sort((a, b) => b.rating - a.rating);
    default:
      return list;
  }
}
