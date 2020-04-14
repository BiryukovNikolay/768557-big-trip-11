const generateEvent = () => {
  return {};
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};


export {generateEvent, generateEvents};
