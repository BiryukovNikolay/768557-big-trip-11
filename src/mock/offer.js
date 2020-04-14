const offerNames = [
  {
    title: `add luggage`,
    price: 30
  },
  {
    title: `switch to comfort class`,
    price: 100
  },
  {
    title: `add meal`,
    price: 15
  },
  {
    title: `chouse seats`,
    price: 5
  },
  {
    title: `travel by train`,
    price: 40
  }
];

const generateOffers = () => {
  return offerNames.slice(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
};


export {generateOffers};
