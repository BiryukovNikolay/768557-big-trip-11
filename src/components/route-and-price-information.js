import {MONTH_NAMES} from "../const";
const getAllPoinsts = (points) => {
  const allPoints = [];
  points.forEach((it) => {
    it.forEach((part) => {
      allPoints.push(part);
    });
  });
  return allPoints;
};


export const createRouteAndPriceInformationTemplate = (events) => {
  const pointsInDay = Object.values(events);
  const allPoints = getAllPoinsts(pointsInDay);

  const startDay = allPoints[0];
  const middleDay = allPoints[Math.floor(allPoints.length / 2)];
  const lastDay = allPoints[allPoints.length - 1];

  const startLocation = startDay.destination;
  const middleLocation = middleDay.destination;
  const lastLocation = lastDay.destination;

  const startDate = startDay.dateStart.getDate();
  const startMonth = MONTH_NAMES[startDay.dateStart.getMonth()];
  const endDay = lastDay.dateStart.getDate();
  const endMonth = MONTH_NAMES[lastDay.dateStart.getMonth()];

  const fullPrice = allPoints.reduce((acc, it) => acc + it.priceValue, 0);


  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startLocation}&mdash;${allPoints.length > 3 ? ` ... ` : `${middleLocation}`} &mdash; ${lastLocation}</h1>
        <p class="trip-info__dates">${startMonth} ${startDate}&nbsp;&mdash;&nbsp;${endMonth === startMonth ? `` : `${endMonth}`}${endDay}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
      </p>
    </section>`
  );
};
