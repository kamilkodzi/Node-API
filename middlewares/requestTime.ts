import moment from "moment";

const requestTime = (req, res, next) => {
  req.requestTime = moment().format("YYYY-MM-DD hh:mm:ss");
  next();
};

const convertTimeToLocalServerTimeZone = (date: Date): string => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss").toString();
};

export = {
  requestTime,
  convertTimeToLocalServerTimeZone,
};
