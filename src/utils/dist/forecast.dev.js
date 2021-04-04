"use strict";

var request = require('request');

var forecast = function forecast(latitude, longitude, callback) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=".concat(latitude, "&lon=").concat(longitude, "&units=imperial&appid=877ff3605cfa7dda673bdacb0c7b9ae0");
  request({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.weather[0].description + ' It is currently ' + body.main.temp + ' degrees out. Minimun temperature is ' + body.main.temp_min + ' While Maximum temperature is ' + body.main.temp_max);
    }
  });
};

module.exports = forecast;