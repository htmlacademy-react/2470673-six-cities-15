export const Setting = {
  PlacesCount:312
};
export enum AppRoutes{
  Layout='/layout',
  Main='/',
  Login='/login',
  Offer='/offer/:id',
  Favorites='/favorites'
}
export enum AuthorizationStatus{
  Auth='Auth',
  NoAuth='NoAuth',
  Unknown='Unknown'
}

export const handleStars = (width: number) => `${String(Math.round(width) * 20)}%`;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const citiesList: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
