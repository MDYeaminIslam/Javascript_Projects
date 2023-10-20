// API URL with key and parameters
const url = 'https://api.weatherapi.com/v1/forecast.json?key=507e185867ac478288d121912232010&q=Dhaka&days=5';

// DOM elements
const degree = document.getElementById('degree');
const city = document.getElementById('city');
const country = document.getElementById('country');

const dayElements = [document.getElementById('date1'), document.getElementById('date2'), document.getElementById('date3'), document.getElementById('date4'), document.getElementById('date5')];
const tempElements = [document.getElementById('temp1'), document.getElementById('temp2'), document.getElementById('temp3'), document.getElementById('temp4'), document.getElementById('temp5')];

// Fetch forecast data
fetch(url)
  .then(response => response.json())
  .then(data => {
    degree.innerHTML = String(data.current.temp_c) +"°"; // Setting current temperature
    city.innerHTML = data.location.name; // Setting city name
    country.innerHTML = data.location.country; // Setting country name

    data.forecast.forecastday.slice(0, 5).forEach((day, index) => {
      dayElements[index].innerHTML = day.date; // Setting date
      tempElements[index].innerHTML = String(day.day.avgtemp_c) + "°" +" " +"Celcius"; // Setting average temperature
    });
  })
  .catch(error => console.log(error));
