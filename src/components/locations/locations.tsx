import { useAppDispatch,useAppSelector } from '../hooks/reduxIndex';
import { setCityActive,setChangeMap } from '../store/offers-process/offers-process';
import { citiesList } from '../const/const';
import { setOffers } from '../store/offers-process/offers-process';
import { getCityActive } from '../store/offers-process/selectors';


function Locations(): JSX.Element {
  const cityActive = useAppSelector(getCityActive);
  const dispatch = useAppDispatch();

  function changeCity (city: string) {

    dispatch(setCityActive(city));
    dispatch(setOffers());
    dispatch(setChangeMap());
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesList.map((city) => {
            const keyValue = city;
            return (
              <li key = {keyValue} className="locations__item">
                <a className={`locations__item-link tabs__item ${city === cityActive ? 'tabs__item--active' : ''}`}
                  onClick={() => changeCity(city)} href="#"
                >
                  <span>{city}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
