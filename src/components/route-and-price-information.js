import {MONTH_NAMES} from "../const";
const sortByDate = (events) => {
  const copyEvents = events.slice();
  copyEvents.sort((a, b) => {
    return a.dueDateStart.getTime() - b.dueDateStart.getTime();
  }
  );
  return copyEvents;
};


export const createRouteAndPriceInformationTemplate = (events) => {
  const sortEvents = sortByDate(events);
  const startLocation = sortEvents[0].destination;
  const middleLocation = sortEvents[1].destination;
  const lastLocation = sortEvents[sortEvents.length - 1].destination;
  const startDay = sortEvents[0].dueDateStart.getDate();
  const startMonth = MONTH_NAMES[sortEvents[0].dueDateStart.getMonth()];
  const endDay = sortEvents[sortEvents.length - 1].dueDateStart.getDate();
  const endMonth = MONTH_NAMES[sortEvents[sortEvents.length - 1].dueDateStart.getMonth()];
  const fullPrice = sortEvents.reduce((acc, it) => acc + it.priceValue, 0);


  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${startLocation}&mdash;${sortEvents.length > 3 ? ` ... ` : `${middleLocation}`} &mdash; ${lastLocation}</h1>
        <p class="trip-info__dates">${startMonth} ${startDay}&nbsp;&mdash;&nbsp;${endMonth === startMonth ? `` : `${endMonth}`}${endDay}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${fullPrice}</span>
      </p>
    </section>`
  );
};
