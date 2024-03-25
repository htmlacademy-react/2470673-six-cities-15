import { Navigate, useParams } from 'react-router-dom';
import { Offers, Reviews } from '../../components/types/types';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useState } from 'react';
import { nearbyOffers } from '../../moks/nearbyOff';
import Mappage from '../../components/map/map.tsx';
import CardMainList from '../../components/cardMainList/card-main-list.tsx';
import { city } from '../../moks/cityMap.ts';

type OfferPageProps={
  offers:Offers;
  reviews:Reviews;
  nearbyOffers: Offers;
  onReview:(rating:string,comment:string)=>void;
}

function OfferPage({offers,reviews,onReview}:OfferPageProps):JSX.Element{
  const params = useParams();

  const cardId = params.id;

  const selectedCard = offers.filter((offer) => offer.id === cardId)[0];

  const [nearbyCardHoverId, setNearbyCardHoverId] = useState<string | null>(null);

  function handleCardHover(nearOfferId: string | null) {
    setNearbyCardHoverId(nearOfferId);
  }

  if (!selectedCard) {
    return <Navigate to='*' />;
  }

  const {title, type, images, isPremium, rating, bedrooms, maxAdults, price, isFavorite, host, goods} = selectedCard;
  const {name, isPro, avatarUrl} = host;

  const generalOffers = [selectedCard, ...nearbyOffers];

  return(


    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">

            {images.map((url, id) => {
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
            {isPremium ?
              <div className="offer__mark">
                <span>Premium</span>
              </div>
              : ''}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className={`offer__bookmark-icon ${isFavorite ? 'offer__bookmark-button--active' : ''}`} width={31} height={33}>

                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{width:'80%'}} ></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{type}</li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>

              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) => {
                  const keyValue = good;
                  return (<li key = {keyValue} className="offer__inside-item">{good}</li>);
                })}

              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="offer__user-name">{name}</span>
                <span className="offer__user-status">{isPro ? 'Pro' : ''}</span>

              </div>
              <div className="offer__description">
                <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p>
              </div>
            </div>
            {}
            <ReviewsList reviews = {reviews} onReview = {onReview}/>

          </div>
        </div>
        <Mappage mapType={'offer'} offers={generalOffers} cardHoverId={nearbyCardHoverId} city={city}/>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <CardMainList elementType={'offers'} offers={nearbyOffers} setActivePlaceCard={handleCardHover}></CardMainList>
          </div>
        </section>
      </div>
    </main>
  );
}
export default OfferPage;

