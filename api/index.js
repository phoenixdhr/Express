const express = require('express');
const cors =require("cors")
const {
  logErrors,
  errorHandler,
  boomErrorHandle,
} = require('./middelware/errorHandler');


const routerApi = require('./router/indexRouter');
//console.clear();

const app = express();
const port = process.env.PORT || 3000;



//midelware nativo de express para recibir informacion en json
app.use(express.json());

// const whitelist = ["http://localhost:5500"]
// const options ={
//                   origin: (origin, callback)=>{
//                     if (whitelist.includes(origin)) {
//                       callback(null,true)
//                     } else {
//                       callback(new Error("acceso no permitido"))
//                     }
//                   }
//               }

app.use(cors({
  origin: ["http://localhost:5501"]
}))



//Rutas que manejan solicitudes
routerApi(app);



app.use(logErrors);
app.use(boomErrorHandle);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listen Activo!');
});

//http://localhost:3000/apiV1/productos
