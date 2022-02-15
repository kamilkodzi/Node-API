import moment from "moment";

const requestTime = (req, res, next) => {
  req.requestTime = moment().format("YYYY-MM-DD hh:mm:ss");
  next();
};

export default requestTime;
