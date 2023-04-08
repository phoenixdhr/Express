const Boom = require('@hapi/boom');

// el "schema" que viene por "Joi", tiene una propiedad llamada "validate()"

//schema: creado con "Joi" representa los valores que puede tomar las variables
//params: representa "query parmaetros", "url parametros", "body" que vienen en la solicitud "req"

function validatorHandler(schema, params) {

  return (req,res,next)=>{
    const data = req[params]
    const {error} = schema.validate(data,{abortEarly:false})

    if(error){
      next(Boom.badRequest(error))  
    }
    else{
      next()
    }

  }
}


module.exports = validatorHandler