"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var geocode = require('./utils/geocode');

var forecast = require('./utils/forecast');

var app = express();
var port = process.env.PORT || 3000; // Define paths for Express config

var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); // Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // Setup static directory to serve

app.use(express["static"](publicDirectoryPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather',
    name: 'Aley Essam'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About',
    name: 'Aley Essam'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    msg: 'For any help. Please contact us!',
    title: 'Help',
    name: 'Aley Essam'
  });
});
app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    });
  }

  geocode(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    forecast(latitude, longitude, function (error, forecastData) {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('error', {
    title: '404',
    name: 'Aley Essam',
    errorMsg: 'Article is not found'
  });
});
app.get('*', function (req, res) {
  res.render('error', {
    title: '404',
    name: 'Aley Essam',
    errorMsg: 'My 404 page'
  });
});
app.listen(port, function () {
  console.log('Server is up on port ' + port);
});