'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();



const server = express();
server.use(cors());

const weatHerData = require('./data/weather.json')

let PORT = process.env.PORT;
console.log(PORT);


server.get('/', (request, response) => {
    response.send('home')
})


class Forecast {
    constructor(data, description) {
        this.data = data;
        this.description = description;
    }
}

server.get('/test', (request, response) => {
    response.send('api working')
})


// localhost:3001/getWeater?searchQuery= 
server.get('/getWeater', (request, response) => {
    let searchQuery = request.query.searchQuery;
    let data_weather = weatHerData .find((iteam) => {
        if (iteam.city_name.toLowerCase() === searchQuery.toLowerCase()) {
            return iteam
        }
    })
    let newArray = data_weather.data.map(element => {
        return new Forecast(element.datetime, element.weather.description)
    })
    response.send(newArray)
})


server.get('*', (request, response) => {
    response.send('404')
})

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})