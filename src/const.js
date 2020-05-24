export const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
export const TRANSFERS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const ACTIVITIES = [`Check-in`, `Sightseeing`, `Restaurant`];
export const DESTINATIONS = [`Budapest`, `Amsterdam`, `Prague`, `Minsk`, `Paris`, `Berlin`, `Vienna`, `Rome`, `Madrid`, `Warszawa`, `Zagreb`];

export const OFFERS = [
  {
    "type": `Taxi`,
    "offers": [
      {
        "title": `Upgrade to a business class`,
        "price": 120
      }, {
        "title": `Choose the radio station`,
        "price": 60
      }
    ]
  },
  {
    "type": `Bus`,
    "offers": [
      {
        "title": `Upgrade to a business class`,
        "price": 20
      }, {
        "title": `Choose the place at window`,
        "price": 15
      }
    ]
  },
  {
    "type": `Train`,
    "offers": [
      {
        "title": `Clean sheets`,
        "price": 25
      },
      {
        "title": `Private place`,
        "price": 55
      },
      {
        "title": `Tea`,
        "price": 5
      }
    ]
  },
  {
    "type": `Ship`,
    "offers": [
      {
        "title": `Private place`,
        "price": 55
      },
      {
        "title": `Diner`,
        "price": 75
      }
    ]
  },
  {
    "type": `Transport`,
    "offers": []
  },
  {
    "type": `Drive`,
    "offers": [
      {
        "title": `A-class`,
        "price": 55
      },
      {
        "title": `Navigator`,
        "price": 35
      },
      {
        "title": `Insurensce`,
        "price": 70
      }
    ]
  },
  {
    "type": `Flight`,
    "offers": [
      {
        "title": `Business class`,
        "price": 35
      },
      {
        "title": `Choose comfort seats`,
        "price": 50
      },
      {
        "title": `Special meal`,
        "price": 70
      },
      {
        "title": `Add luggage`,
        "price": 30
      }
    ]
  },
  {
    "type": `Check-in`,
    "offers": [
      {
        "title": `Spa center`,
        "price": 35
      },
      {
        "title": `Pool`,
        "price": 70
      }
    ]
  },
  {
    "type": `Sightseeing`,
    "offers": []
  },
  {
    "type": `Restaurant`,
    "offers": [
      {
        "title": `Choose table`,
        "price": 35
      },
      {
        "title": `Private room`,
        "price": 70
      }
    ]
  },
];


export const FilterType = {
  EVERYTHING: `everithing`,
  FUTURE: `future`,
  PAST: `past`,
};
