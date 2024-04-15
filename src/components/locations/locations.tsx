import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoutes, CITIES_LIST } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCityActive } from '../../store/offers-process/offers-process';
import { getCityActive } from '../../store/offers-process/selectors';

function Locations(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityActive = useAppSelector(getCityActive);

  function handleChangeCity (city: string) {
    dispatch(setCityActive(city));
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES_LIST.map((city) => {
            const keyValue = city;
            return (
              <li key = {keyValue} className="locations__item" data-testid="city-tab">
                <Link className={classNames('locations__item-link', 'tabs__item',
                  {'tabs__item--active': city === cityActive})}
                onClick={() => handleChangeCity(city)} to={AppRoutes.Main}
                >
                  <span>{city}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
export default Locations