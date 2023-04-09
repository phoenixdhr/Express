
const express = require('express');


const categoryRouter = express.Router()


categoryRouter.get("/",(req,res)=>{
    res.send("User Send")
})


module.exports = categoryRouter