import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import {Marker, layerGroup} from 'leaflet';
import {useRef, useEffect, memo} from 'react';

import useMap from '../../hooks/use-map';
import { City } from '../../types/City';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';

import {Offer, Offers} from '../../types/offer';

type MapProps = {
  mapType: 'cities' | 'offer';
  city: City;
  offers: Offers;
  cardHoverId?: Offer['id'] | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [20, 40]
});


function Map({mapType, city, offers, cardHoverId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer, index) => {
        if (offer) {
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
        }
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [city, map, offers, cardHoverId, mapType]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city, offers, mapType]);

  return (
    <section
      className={`${mapType}__map map`}
      ref={mapRef}
      data-testid="map-section"
    >
    </section>
  );
}

const MemorizedMap = memo(Map);
export default MemorizedMap;