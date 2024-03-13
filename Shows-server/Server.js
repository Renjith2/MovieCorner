const express = require('express')
const app =express()
var cors=require('cors')
app.use(cors())
const useRoute=require('./routes/userRoute')
app.use(express.json())
app.use('/api/user',useRoute)
 
require('dotenv').config()
const dbConfig=require('./config/dbConfig') 

const movieROute=require('./routes/movieRoute')
app.use('/api/movie' , movieROute)
 
const theatreRoute = require('./routes/theatreRoute')
app.use('/api/theatres' , theatreRoute)


const bookingroute = require('./routes/bookingRoute')
app.use("/api/bookings", bookingroute);

const upcomingRoute = require('./routes/upcomingRoute')
app.use("/api/upcoming", upcomingRoute);


 
app.listen(8089,(req,res)=>{
    console.log("Sever is Running")    
})