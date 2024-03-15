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
