
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { handleStars } from '../../const';
import { useFavorites } from '../../hooks/use-favourite';
import { Card } from '../../types/card';
import { Offer } from '../../types/offer';

type CardMainProps = {
  elementType: Card;
  offer: Offer;
  setActivePlaceCard?: (id: string | null) => void;
}

function CardMain({elementType, setActivePlaceCard, offer}: CardMainProps): JSX.Element {
  const options = {
    cities: {
      className: 'cities',
      width: '260',
      height: '200',
      url: 'offer/',
    },
    favorite: {
      className: 'favorites',
      width: '150',
      height: '110',
      url: '/offer/',
    },
    offers: {
      className: 'near-places',
      width: '260',
      height: '200',
      url: '/offer/',
    }
  };

  function handleMouseEnter() {
    setActivePlaceCard?.(offer.id);
  }

  function handleMouseLeave() {
    setActivePlaceCard?.(null);
  }

  const currentStatus = offer.isFavorite ? 0 : 1;

  const handleChangeFavorites = useFavorites(
    String(offer.id),
    currentStatus
  );

  return (
    <article className={`${options[elementType].className}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="card-container"
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className={`${options[elementType].className}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${options[elementType].url}${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width={options[elementType].width} height={options[elementType].height} alt="Place image" data-testid="card-lazy-image" />
        </Link>
      </div>
      <div className={`${elementType === 'favorite' ? 'favorites__card-info ' : ''}'place-card__info'`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price" data-testid="card-price-container">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleChangeFavorites}

            className={classNames('place-card__bookmark-button','button', {'place-card__bookmark-button--active' :  offer.isFavorite})}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating" data-testid="starline-container">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${handleStars(offer.rating)}`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" data-testid="card-name-title">
          <Link to={`${options[elementType].url}${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" data-testid="card-type-paragraph">{offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

export default CardMain;
