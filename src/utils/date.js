import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

export const duration = (dateStart, dateEnd) => {
  const timeStart = moment(dateStart);
  const timeEnd = moment(dateEnd);
  return Math.abs(timeStart.diff(timeEnd));
};

export const formatDuration = (dateStart, dateEnd) => {
  if (momentDurationFormatSetup) {
    return moment.duration(duration(dateStart, dateEnd), `milliseconds`).format(`d[D] h[H] m[M]`);
  }
  return ``;
};

export const formatDurationStat = (dur) => {
  if (momentDurationFormatSetup) {
    return moment.duration(dur, `milliseconds`).format(`d[D] h[H] m[M]`);
  }
  return ``;
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDateIso = (date) => {
  return moment(date, `YYYY/MM/DD hh:mm`, false).format();
};

export const formatDate = (date) => {
  return moment(date).format(`DD\MM\YY`);
};

export const formatISO = (date) => {
  return moment(date).format();
};

export const formatDayMonth = (date) => {
  return moment(date).format(`D MMM`);
};

export const formatDayMonthYear = (date) => {
  return moment(date).format(`D MMM YYYY`);
};

export const formatMonthDay = (date) => {
  return moment(date).format(`MMM D`);
};

export const formatMonth = (date) => {
  return moment(date).format(`MMM`);
};

export const formatDay = (date) => {
  return moment(date).format(`D`);
};

export const dateDiff = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b);
};
