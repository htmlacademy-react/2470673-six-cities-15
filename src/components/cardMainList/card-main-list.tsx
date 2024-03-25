import CardMain from '../card-data/CardMain';
import { Card } from '../types/types';
import { Offers } from '../types/types';


type GeneralCardListProps = {
  elementType: Card;
  offers: Offers;
  setActivePlaceCard?: (id: string | null) => void;
}

function CardMainList({ elementType, setActivePlaceCard, offers }: GeneralCardListProps) {
  return (
    <>
      {
        offers.map((offer) => (
          <CardMain
            elementType={elementType}
            offer={offer}
            key={offer.id}
            setActivePlaceCard={setActivePlaceCard}
          />
        ))
      }
    </>
  );
}

export default CardMainList;
