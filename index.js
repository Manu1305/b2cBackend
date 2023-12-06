const express = require('express')
const connectDB=require("./src/db/database")
const app = express()
const cors =require('cors')
var bodyparser = require('body-parser')

app.use(cors({
    orgin:'*',
}))
app.use(bodyparser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userRouter =require('./src/routes/User')
const port =3000
app.use('/user',userRouter)
app.listen(port, () => {

    console.log("server connected on",port)
    connectDB()
   
})

