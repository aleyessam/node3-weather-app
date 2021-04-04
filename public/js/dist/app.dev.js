"use strict";

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2'); // messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch("/weather?address=".concat(location)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});