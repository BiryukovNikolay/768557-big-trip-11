export const getDays = (eventList) => {
  const pointsDays = [];
  eventList.forEach(
      function (it) {
        const date = {};
        date.day = it.dueDateStart.getDate();
        date.month = it.dueDateStart.getMonth();
        pointsDays.push(date);
      }
  );
  return pointsDays;
};

export const getPoints = (days) => {
  const points = [];
  days.forEach(
      function (it) {
        points.push(it.day);
      }
  );
  return new Set(points);
};
