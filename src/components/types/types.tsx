
export type City = {
    name: string;
    location: Location;
  };
export type Host = {
    name: string;
    isPro: boolean;
    avatarUrl: string;
  };
export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
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
export type Reviews = Review[];
export type Offers = Offer[];
