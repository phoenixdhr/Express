const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(1);
const limits = Joi.number().integer().min(1)
const imagen = Joi.string().uri()

const schemaCreate = Joi.object({
  nombre: nombre.required(),
  price: price.required(),
  imagen: imagen.required()
});

const schemaUpdate = Joi.object({
  nombre:nombre,
  price:price,
  imagen:imagen
})

const schemaGet = Joi.object({
  ID:id.required()
})


const nSchema = Joi.object({
  limits:limits
})


module.exports = {schemaCreate, schemaUpdate, schemaGet, nSchema }