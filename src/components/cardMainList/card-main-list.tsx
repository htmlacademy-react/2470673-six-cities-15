import CardMain from '../card-data/CardMain';
import { Card } from '../types/types';
import { Offers } from '../types/types';


type CardMainlistProps = {
  elementType: Card;
  offers: Offers;
  setActivePlaceCard?: (id: string | null) => void;
}

function CardMainlist({ elementType, setActivePlaceCard, offers }: CardMainlistProps) {
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

export default CardMainlist;
