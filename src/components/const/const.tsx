import { CityList, City } from '../types/types';

export const Setting = {
  PlacesCount:312
};
export enum AppRoutes{
  Layout='/layout',
  Main='/',
  Login='/login',
  Offer='/offer/:id',
  Favorites='/favorites',
  NotFound = '*'
}
export enum AuthorizationStatuss{
  Auth='Auth',
  NoAuth='NoAuth',
  Unknown='Unknown'
}
export const DEFAULT_LOCATION: City = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
} as const;

export const handleStars = (width: number) => `${String(Math.round(width) * 20)}%`;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export const CITY_LIST: CityList = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const citiesList = [CITY_LIST.Paris, CITY_LIST.Cologne, CITY_LIST.Brussels, CITY_LIST.Amsterdam, CITY_LIST.Hamburg, CITY_LIST.Dusseldorf];

export const DEFAULT_CITY = CITY_LIST.Paris;

export const PRIVATE_ROUTES: readonly string[] = ['/favorites'];

export enum NameSpace {
  Offer = 'OFFER',
  OffersNearby = 'OFFERSNEARBY',
  ErrorMessage = 'ERRORMESSAGE',
  Favorites = 'FAVORITES',
  User = 'USER',
  Reviews = 'REVIEWS',
  Offers = 'OFFERS',
}



export enum FavoritesTriggerUpdate {
  Offers = 'UpdateOffers',
  Offer = 'UpdateOffer',
  Favorites = 'UpdateFavorites',
  Nearby = 'UpdateNearby',
}

export enum ApiRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout'
}
export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}
export const TIMEOUT_SHOW_ERROR = 2000;
export const DEFAULT_SORT = SortType.Popular;
