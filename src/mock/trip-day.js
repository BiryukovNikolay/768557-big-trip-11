export const getPoints = (events) => {
  return [...new Set(events.map((it) => {
    return it.dateStart.getDate();
  }))];
};
