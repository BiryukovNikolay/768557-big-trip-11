export const getDays = (eventList) => {
  const pointsDays = [];
  eventList.forEach(
      function (it) {
        const date = {};
        date.day = it.dateStart.getDate();
        date.month = it.dateStart.getMonth();
        pointsDays.push(date);
      }
  );
  return pointsDays;
};

export const getPoints = (days) => {
  const points = [];
  days.forEach((it) => {
    points.push(it.day);
  }
  );
  return [...new Set(points)].sort();
};

const getEventsInPoint = (events, dateDate) => {
  const event = events.filter((it) => {
    return it.dateStart.getDate() === dateDate;
  });
  return event;
};


export const getComfortEvents = (events) => {
  const days = getDays(events);
  const points = getPoints(days);
  const comfortEventsList = {};
  points.forEach((it, i) => {
    comfortEventsList[i + 1] = getEventsInPoint(events, it);
  });
  return comfortEventsList;
};
