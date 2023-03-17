const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
    renderForm(res, null);
})

router.post('/weatherSearch', (req, res, next) => {
    const response = getWeather(req.body.city)
    response.then(data => renderForm(res, data))
        .catch(error => console.log(error))
})

function renderForm(res, weatherResponse) {
    if (weatherResponse !== null) {
        if (weatherResponse.cod == 400){console.log('ERROR')}
        else {
            res.render('form', {weatherResponse: weatherResponse.weather[0].description, cityName: weatherResponse.name, temp: weatherResponse.main.temp});
        }
    }
    else {
        res.render('form', {weatherResponse: null});
    }
}

async function getWeather(name) {
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&APPID=9581e38eae9390c82ece6c4d09f43b8f&units=imperial";
    try {
        const response = await fetch(URL);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

async function getWeather2(name) {
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&APPID=9581e38eae9390c82ece6c4d09f43b8f&units=imperial";
    return fetch(URL)
        .then(response => response.json())
        .catch(error => console.log(error))
}


router.get('/weather', (req, res, next) => {
    getWeather("Boston").then(data => {
        res.json(data)
    })
})






module.exports = router;