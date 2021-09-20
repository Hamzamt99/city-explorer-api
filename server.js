'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const searchQuery = require('./data/weather.json')

const PORT = process.env.PORT;
server.use(cors());


server.get('/',(req,res)=>{
    res.status(200).send('home route')
})


server.get('/test',(request,response)=>{
    response.send('api server is working')
})

server.get('/getWeather',(req,res)=>{
  

    let dayweather = req.query.weatherday;
    console.log(req.query);
    console.log(req.query.weatherday)
    let day = searchQuery.data.find((item)=>{
        if(item.data === dayweather) {
            return item
        }
        
    })
    console.log('day weather',day)
    res.send(day)

})


server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})