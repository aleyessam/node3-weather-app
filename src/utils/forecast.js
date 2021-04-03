const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=877ff3605cfa7dda673bdacb0c7b9ae0`

    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
         } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
        callback(undefined, body.weather[0].description +' It is currently ' + body.main.temp + ' degrees out.')
        }
    })
}

module.exports = forecast