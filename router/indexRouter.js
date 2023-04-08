const express = require("express")
const productsRouter = require('./productsRouter');
const userRouter = require("./userRouter")
const categoryRouter = require("./categoryRouter")

function routerApi(app) {
  const apiV = express.Router()
  app.use("/apiV1",apiV)

  apiV.use('/productos', productsRouter);
  apiV.use("/user", userRouter)
  apiV.use("/category",categoryRouter)


}

module.exports = routerApi;
