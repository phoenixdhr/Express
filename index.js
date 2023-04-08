const express = require('express');
const {
  logErrors,
  errorHandler,
  boomErrorHandle,
} = require('./middelware/errorHandler');

const cors =require("cors")

const routerApi = require('./router/indexRouter');
//console.clear();

const app = express();
const port = 3000;

const whitelist = ["http://localhost:5500", "http://localhost:9000","http://localhost:5500/front.html"]

const options ={
                  origin: (origin,callback)=>{
                    if (whitelist.includes(origin)) {
                      callback(null,true)
                    } else {
                      callback(new Error("acceso no permitido"))
                    }
                  }
              }

app.use(cors(options))

//midelware nativo de express para recibir informacion en json
app.use(express.json());

app.listen(port, () => {
  console.log('Listen Activo!');
});

//Rutas que manejan solicitudes
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandle);
app.use(errorHandler);

//http://localhost:3000/apiV1/productos
