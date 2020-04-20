export const getPoints = (events) => {
  return [...new Set(events.map((it) => {
    return new Intl.DateTimeFormat(`en-GB`).format(it.dateStart);
  }))];
};
