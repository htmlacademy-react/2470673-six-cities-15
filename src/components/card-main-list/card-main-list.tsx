import { useMemo, memo } from 'react';
import CardMain from '../card-main/card-main';
import { Card } from '../../types/card';
import { Offers } from '../../types/offer';


type CardMainListProps = {
  elementType: Card;
  offers: Offers;
  setActivePlaceCard?: (id: string | null) => void;
}

function CardMainList({elementType, setActivePlaceCard, offers}: CardMainListProps): JSX.Element {
  const className = (type : Card)=>{
    switch(type){
      case 'cities':
        return 'cities__places-list places__list tabs__content';
      case 'offers':
        return 'near-places__list places__list';
    }
  };

  const cards = useMemo(() => offers.map((offer) =>
    (<CardMain key={offer.id} offer={offer} setActivePlaceCard={setActivePlaceCard} elementType={elementType}/>)), [offers, setActivePlaceCard, elementType]);


  return (
    <div className={className(elementType)}>
      {cards}
    </div>
  );
}

const MemorizedCardMainList = memo(CardMainList);
export default MemorizedCardMainList;
