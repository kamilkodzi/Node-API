const makeUrlToLowerCase = (req, res, next) => {
  try {
    req.originalUrl = req.originalUrl.toLowerCase();
    req._parsedUrl.pathname = req._parsedUrl.pathname.toLowerCase();
    req._parsedUrl.path = req._parsedUrl.path.toLowerCase();
    req._parsedUrl.href = req._parsedUrl.href.toLowerCase();
    req._parsedUrl._raw = req._parsedUrl._raw.toLowerCase();
    req.url = req.url.toLowerCase();
  } catch (error) {
    next();
  }
  next();
};

export default makeUrlToLowerCase;
