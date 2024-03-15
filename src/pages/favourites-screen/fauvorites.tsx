import CardPlace from '../../components/card-data/card-place';

function Favourites():JSX.Element{
  return(
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <CardPlace></CardPlace>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
export default Favourites;
