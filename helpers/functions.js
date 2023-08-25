function errorHandler(fn) {
  return async (req, res, next) => {
    try {
      return await fn(req, res);
    }
    catch (err) {
      console.error(err);
      return res.boom.badImplementation();
    }
  }
}

module.exports = { errorHandler };