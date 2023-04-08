const express = require("express")

const userRouter = express.Router()

userRouter.get("/",(req, res)=>{
  res.send("Chipi")
})

module.exports = userRouter