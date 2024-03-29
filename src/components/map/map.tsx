import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { Marker, layerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';

import useMap from '../hooks/use-map';
import { CityMap } from '../types/types';
import { URL_MARKER_DEFAULT,URL_MARKER_CURRENT } from '../const/const';

import { Offer,Offers } from '../types/types';

type MapProps = {
  mapType: 'cities' | 'offer';
  city: CityMap;
  offers: Offers;
  cardHoverId: Offer['id'] | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


function Mappage({mapType, city, offers, cardHoverId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer, index) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        if(mapType === 'offer') {
          marker
            .setIcon(
              index === 0
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        } else {
          marker
            .setIcon(
              cardHoverId !== undefined && offer.id === cardHoverId
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, cardHoverId, mapType]);


  return (
    <section
      style={mapType === 'offer' ?
        {
          height: '100%',
          minHeight: '500px',
          width: '100%',
          minWidth: '1144px',
          margin: '0, auto'
        }
        : {height: '500px'}}
      className={`${mapType}__map map`}
      ref={mapRef}
    >
    </section>
  );

}

export default Mappage;
