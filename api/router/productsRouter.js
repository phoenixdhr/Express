const express = require('express');
const ProductService = require('../service/productsService');
const validatorHandler = require("../middelware/validatorHandler")
const {schemaCreate, schemaUpdate, schemaGet, nSchema} = require("../schema/productSchema");



const productsRouter = express.Router();
const listProducts = new ProductService()


//USO DE QUERY PARAMETROS EN LA RUTA /PRODUCTOS
productsRouter.get('/', validatorHandler(nSchema,"query"), async (req, res, next) => {
  const { limits } = req.query;
  const n = parseInt(limits,10)

  try {
      if (limits) {
        const UntilProducts = listProducts.limitProducts(n)
        res.status(200).json(UntilProducts );
      } else {
        const allProducts = await listProducts.getArrayProducts()
        res.status(200).json(allProducts)
      }
  } catch (error) {
       next(error)
  }

});

//USO DE QUERY PARAMETROS EN LA RUTA /PRODUCTOS (RUTA ESTATICA)
productsRouter.get('/filter', (req, res) => {
  res.send('Holi desde filter');
});

//USO DE URL PARAMETROS EN LA RUTA /PRODUCTOS  (RUTA DINAMICA)
productsRouter.get('/:ID', validatorHandler(schemaGet,"params"), (req, res, next ) => {
  const {ID} = req.params;

  try {
    const productID_Json = listProducts.findOne(ID)
    res.status(200).send(productID_Json);
  }

  catch (error) {
    next(error)
  }

});

productsRouter.post('/',validatorHandler(schemaCreate, "body") , (req, res, next) => {
  const body = req.body;

  try {
    const newElement = listProducts.create(body)
    res.status(201).json(newElement)
  } catch (error) {
    next(error)
  }
});



productsRouter.put('/:ID',
  validatorHandler(schemaGet,"params"),
  validatorHandler(schemaCreate,"body"),
  async (req, res,next) => {

      const body = req.body;
      const { ID } = req.params;

      try {
        const response = listProducts.updatePUT(body, ID)
        res.status(200).json(response)

      } catch (error) {
        next(error)
      }

});



productsRouter.patch("/:ID",
  validatorHandler(schemaGet,"params"),
  validatorHandler(schemaUpdate,"body"),
  async (req,res,next)=>{

      const body = req.body;
      const { ID } = req.params;

      try {
        const response = listProducts.updatePATCH(body, ID)
        res.status(200).json(response)
      }
      catch (error) {
        next(error)
      }

})


productsRouter.delete("/:ID", validatorHandler(schemaGet,"params"),  async (req,res,next)=>{
  const {ID} = req.params

  try {
    const response = listProducts.delete(ID)
    res.status(200).json({response})
  }
  catch (error) {
    next(error)
  }
})

module.exports = productsRouter;
