import {store} from '../store/index';
import { AuthorizationStatuss,SortType } from '../const/const';
import { UserConnect } from './user';
export type UserProcess = {
  authorizationStatus: AuthorizationStatuss;
  user: UserConnect | null;
};

export type ErrorMessageProcess = {
  errorMessage: string | null;
};

export type ReviewsProcess = {
  reviews: Reviews;
  reviewsIsLoading: boolean;
  reviewsIsNotFound: boolean;
};

export type OfferProcess = {
  offer: Offer | null;
  offerIsLoading: boolean;
  offerIsNotFound: boolean;
};

export type OffersNearbyProcess = {
  offersNearby: Offers;
  offersNearbyIsLoading: boolean;
  offersNearbyIsNotFound: boolean;
};

export type OffersProcess = {
  cityActive: string;
  city: City;
  sortType: SortType;
  allOffers: Offers;
  offers: Offers;
  offersIsLoading: boolean;
  offersIsNotFound: boolean;
};

export type favoritesProcess = {
  favorites: Offers;
  favoritesIsLoading: boolean;
  favoritesIsNotFound: boolean;
};
export type City = {
    name: string;
    location: Location;
  };
export type CityList = {
    Paris: string;
    Cologne: string;
    Brussels: string;
    Amsterdam: string;
    Hamburg: string;
    Dusseldorf: string;
  };
export type Host = {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
import { FavoritesTriggerUpdate } from '../const/const';

export type FavoriteData = {
    offerId: string;
    status: number;
    triggerUpdate: FavoritesTriggerUpdate;
  };
export type CommentData = {
    id: string;
    comment: string;
    rating: number;
  };
export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
  };
export type AuthData = {
    login: string;
    password: string;
  };
export type UserData = {
    email: string;
    token: string;
  };
export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    rating: number;
    bedrooms: number;
    maxAdults: number;
    isPremium: boolean;
    isFavorite: boolean;
    description: string;
    previewImage: string;
    images: string[];
    location: Location;
    city: City;
    host: Host;
    goods: string[];
  };

export type Review = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
  };
export type User = {
    avatarUrl: string;
    isPro: boolean;
    name: string;
  };


export type Offers = Offer[];
export type Card = 'cities' | 'favorite' | 'offers';

export type CityMap = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}
export type Point = {
  title: string;
  lat: number;
  lng: number;
}

export type State = ReturnType<typeof store.getState>;
export type Reviews = Review[];
export type AppDispatch = typeof store.dispatch;
