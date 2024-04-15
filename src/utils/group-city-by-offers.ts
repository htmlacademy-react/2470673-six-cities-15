import { Offers } from "../types/offer";

type GroupByCity = {
  [key: string]: Offers;
};

export function groupByCityOffers(list: Offers) {
  const groupedList: GroupByCity = {};

  list.forEach((item) => {
    const cityName = item.city.name;

    if (cityName) {
      if (!groupedList[cityName]) {
        groupedList[cityName] = [];
      }

      groupedList[cityName].push(item);
    }
  });


}