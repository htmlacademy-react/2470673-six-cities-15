
import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxIndex';
import { setCityActive } from '../../store/offers-process/offers-process';
import { Card } from '../../types/card';
import { Offers } from '../../types/offer';
import CardMain from '../card-data/CardMain';
import { AppRoutes } from '../const/const';


type FavoritesCardListProps = {
  city: string;
  list: Offers;
  elementType: Card;
}

function FavoritesCardList({city, list, elementType}: FavoritesCardListProps) {

  const dispatch = useAppDispatch();

  function handleCityButton (cityActive:string) {
    dispatch(setCityActive(cityActive));
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          {city && (
            <Link className="locations__item-link" to={AppRoutes.Main} onClick={() => handleCityButton(city)}>
              <span>{city}</span>
            </Link>
          )}
        </div>
      </div>
      <div className="favorites__places">
        {!!list.length &&
          list.map((offer) => (
            <CardMain
              elementType={elementType}
              offer={offer}
              key={offer.id}
            />
          ))}
      </div>
    </li>
  );
}

export default FavoritesCardList;
