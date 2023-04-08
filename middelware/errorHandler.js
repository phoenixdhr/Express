// const Boom = require("@hapi/boom")

// funcion para logear errores
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err); //*** */
}

function boomErrorHandle(err, req, res, next) {
  console.log('boomErrorHandle');
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    next(err);
  }
}

//funcion para crear un formato al error
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  }); //*** */
}

module.exports = { logErrors, errorHandler, boomErrorHandle };
