import moment from "moment";

export const requestTime = (req, res, next) => {
  req.requestTime = moment().format("YYYY-MM-DD hh:mm:ss");
  next();
};
