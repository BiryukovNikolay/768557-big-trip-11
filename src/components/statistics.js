import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSFERS, EVENT_TYPES} from "../const";
import {duration, formatDurationStat} from "../utils/date.js";

const PRICECOUNT = 6;
const MONEYHEIGHT = 6;
const TRANSPORTCOUNT = 4;
const TRANSPORTHEIGHT = 4;

const findTrasportEvents = (events, typeOfEvents) => {
  return events.filter((it) => {
    return typeOfEvents.some((that) => {
      return it.eventType === that.toLowerCase();
    });
  });
};

const groupEvent = (events, typeOfEvents) => {
  const transportEvents = findTrasportEvents(events, typeOfEvents);

  return typeOfEvents.map((it) => {
    return transportEvents.filter((that) => {

      return it.toLowerCase() === that.eventType;
    });
  })
  .sort((a, b) => {
    return b.length - a.length;
  });
};

const BAR_HEIGHT = 55;

const createStatisticsTemplate = () => {
  return (
    `<div class="page-body__container page-body__container--stat">
        <section class="statistics">
        <h2 class="visually-hidden">Trip statistics</h2>

        <div class="statistics__item statistics__item--money">
          <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--transport">
          <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
        </div>

        <div class="statistics__item statistics__item--time-spend">
          <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
        </div>
      </section>
    </div>`
  );
};

const renderMoneyChart = (events, moneyCtx) => {
  const quantityOfActivity = groupEvent(events, EVENT_TYPES);

  const getTotalPrice = (arr) => {
    return arr.reduce((acc, that) => {
      return acc + that.priceValue;
    }, 0);
  };

  const getTitle = (arr) => {
    if (arr.length > 0) {
      return arr[0].eventType;
    } else {
      return ``;
    }
  };


  const pricesOfType = quantityOfActivity.map((it) => {

    const totalPrice = getTotalPrice(it);
    const name = getTitle(it);
    return {
      name,
      totalPrice
    };
  }).sort((a, b) => {
    return b.totalPrice - a.totalPrice;
  }).slice(0, PRICECOUNT);


  const moneyTitles = pricesOfType.map((it) => {
    return it.name;
  });

  const moneyPrices = pricesOfType.map((it) => {
    return it.totalPrice;
  });

  moneyCtx.height = BAR_HEIGHT * MONEYHEIGHT;
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: moneyTitles,
      datasets: [{
        data: moneyPrices,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        img: `<img class="event__type-icon" width="17" height="17" src="img/icons/${moneyPrices}" alt="Event type icon">`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (events, transportCtx) => {
  const quantityOfTransport = groupEvent(events, TRANSFERS);

  const labelsName = quantityOfTransport.slice(0, TRANSPORTCOUNT).map((it) => {
    if (it.length > 0) {
      return it[0].eventType;
    } else {
      return ``;
    }
  });

  const transportCounts = quantityOfTransport.slice(0, TRANSPORTCOUNT).map((it) => {
    return it.length;
  });

  transportCtx.height = BAR_HEIGHT * TRANSPORTHEIGHT;
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: labelsName,
      datasets: [{
        data: transportCounts,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (events, timeSpendCtx) => {
  const quantityEvents = groupEvent(events, EVENT_TYPES);

  const getTotalDuration = (arr) => {
    return arr.reduce((acc, that) => {
      return acc + duration(that.dateStart, that.dateEnd);
    }, 0);
  };

  const getTitle = (arr) => {
    if (arr.length > 0) {
      return arr[0].eventType;
    } else {
      return ``;
    }
  };


  const pricesOfType = quantityEvents.map((it) => {
    const totalDuration = getTotalDuration(it);
    const name = getTitle(it);
    return {
      name,
      totalDuration
    };
  }).sort((a, b) => {
    return b.totalDuration - a.totalDuration;
  }).slice(0, 4);

  const timeTitles = pricesOfType.map((it) => {
    return it.name;
  });


  const timeDurations = pricesOfType.map((it) => {
    return it.totalDuration;
  });

  timeSpendCtx.height = BAR_HEIGHT * 4;
  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: timeTitles,
      datasets: [{
        data: timeDurations,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${formatDurationStat(val)}`
        }
      },
      title: {
        display: true,
        text: `TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export default class Statistics extends AbstractSmartComponent {
  constructor({events}) {
    super();
    this._events = events;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  show() {
    super.show();

    this.rerender(this._events);
  }

  recoveryListeners() {}

  rerender(events) {
    this._events = events;

    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();
    this._resetCharts();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);

    this._moneyChart = renderMoneyChart(this._events.getEventsAll(), moneyCtx);
    this._transportChart = renderTransportChart(this._events.getEventsAll(), transportCtx);
    this._timeSpendChart = renderTimeSpendChart(this._events.getEventsAll(), timeSpendCtx);
  }

  _resetCharts() {
    if (this._moneyChart) {
      this._moneyChart.destroy();
      this._moneyChart = null;
    }

    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeSpendChart) {
      this._timeSpendChart.destroy();
      this._timeSpendChart = null;
    }
  }
}
