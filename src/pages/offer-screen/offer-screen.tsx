import {useParams, Navigate} from 'react-router-dom';
import {useEffect} from 'react';
import Map from '../../components/map/map.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import classNames from 'classnames';
import { AppRoutes, handleStars } from '../../const.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import OfferNameWrapper from '../../components/offer-wrapper/offer-wrapper.tsx';
import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import { fetchOfferAction, fetchReviewsAction, fetchOffersNearbyAction } from '../../store/api-actions.ts';
import { getOffersNearby, getOffersNearbyIsLoading } from '../../store/offer-nearby-process/selector.ts';
import { getOffer, getOfferIsLoading, getOfferIsNotFound } from '../../store/offer-process/selector.ts';
import { getReviews } from '../../store/review-process/selectors.ts';
import CardMainList from '../../components/card-main-list/card-main-list.tsx';

const DEFAULT_BEGIN = 0;
const MAX_IMAGES_SHOW = 6;
const NEAR_PLACES_COUNT = 3;

function OfferPage(): JSX.Element {
  const params = useParams();
  const cardId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferAction(cardId));
    dispatch(fetchReviewsAction(cardId));
    dispatch(fetchOffersNearbyAction(cardId));
  }, [cardId, dispatch]);


  const offerActive = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const cityMapActive = offerActive?.city;
  const offerIsLoading = useAppSelector(getOfferIsLoading);
  const offerIsNotFound = useAppSelector(getOfferIsNotFound);
  const nearbyOffers = useAppSelector(getOffersNearby);
  const nearbyOffersIsLoading = useAppSelector(getOffersNearbyIsLoading);

  const activeNearbyOffers = nearbyOffers.slice(DEFAULT_BEGIN, Math.min(NEAR_PLACES_COUNT, nearbyOffers.length));
  const generalOffers = [...activeNearbyOffers];
  if(offerActive) {
    generalOffers.unshift(offerActive);
  }

  if(offerIsLoading) {
    return (<Spinner />);
  }

  if(offerIsNotFound) {
    return (<Navigate to={AppRoutes.NotFound} />);
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer" data-testid="offer-page-container">
        {offerActive && !offerIsNotFound && !offerIsLoading && (
          <section className="offer" data-testid="offer-container">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offerActive.images?.length > 0 &&
                offerActive.images.slice(DEFAULT_BEGIN, Math.min(MAX_IMAGES_SHOW, offerActive.images.length))
                  .map((url, id) => {
                    const keyValue = `${id}-${url}`;
                    return (
                      <div key={keyValue} className="offer__image-wrapper">
                        <img className="offer__image" src={url} alt="Photo studio" />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offerActive.isPremium ?
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                  : ''}
                <OfferNameWrapper cardId = {cardId} offerActive = {offerActive} />
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${handleStars(offerActive.rating)}`}} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerActive.rating}</span>
                </div>
                <ul className="offer__features" data-testid="features-container">
                  <li className="offer__feature offer__feature--entire">{offerActive.type.charAt(0).toUpperCase() + offerActive.type.slice(1) }</li>
                  <li className="offer__feature offer__feature--bedrooms">
                  {offerActive.bedrooms} 
                    {
                      offerActive.bedrooms > 1 ? ' Bedrooms' : ' Bedroom'
                    }
              
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {offerActive.maxAdults}    {
                      offerActive.maxAdults > 1 ? ' Adults' : ' Adult'
                    }
                  </li>
                </ul>
                <div className="offer__price" data-testid="price-container">
                  <b className="offer__price-value">€{offerActive.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                {offerActive.goods && (
                  <div className="offer__inside">
                    <h2 className="offer__inside-title">Whats inside</h2>
                    <ul className="offer__inside-list">
                      {offerActive.goods.map((good) => {
                        const keyValue = good;
                        return (<li key = {keyValue} className="offer__inside-item">{good}</li>);
                      })}
                    </ul>
                  </div>
                )}
                <div className="offer__host">
                  <h2 className="offer__host-title" data-testid="host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {'offer__avatar-wrapper--pro' : offerActive.host.isPro})}>
                      <img
                        className="offer__avatar user__avatar"
                        src={offerActive.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    {offerActive.host?.name && (
                      <span className="offer__user-name">{offerActive.host.name}</span>
                    )}
                    {offerActive.host?.isPro && (
                      <span className="offer__user-status">Pro</span>
                    )}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {offerActive.description}
                    </p>
                  </div>
                </div>
                <ReviewsList offerId = {cardId} reviews = {reviews}/>
              </div>
            </div>
            {cityMapActive && (<Map mapType='offer' offers={generalOffers} city={cityMapActive}/>)}
          </section>
        )}
        <div className="container" data-testid="nearby-page-container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            {!nearbyOffersIsLoading && (
              <CardMainList elementType='offers' offers = {activeNearbyOffers}/>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;