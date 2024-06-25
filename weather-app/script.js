"use strict";
var api_key = "1a15aa335cb129220a4a70728c773f06";
var api_key_url = "https://api.openweathermap.org/data/2.5/weather?q=";

function weatherchange(city) {
    fetch(api_key_url + city + `&appid=${api_key}&units=metric`).then(function (res) {
        return res.json();
    })
        .then(function (data) {
            document.getElementById('sky').textContent = `${data.weather[0].description}`;
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            document.getElementById('min_temp').textContent = `${data.main.temp} °C`;
            document.getElementById('humidity').textContent = `${data.main.humidity} %`;
            document.getElementById('wind').textContent = `${data.wind.speed} km/h`;
        })
        .catch(error => console.error('Error fetching weather data:', error));
};

var searchbox = document.getElementById("search_input");
var search_btn = document.getElementById("search_btn");

search_btn.addEventListener("click", () => {
    weatherchange(searchbox.value);
    let iframe = document.createElement("iframe")
    iframe.src = "https://www.google.com/maps/embed/v1/place?q=" + searchbox.value + "&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
    document.getElementById("map").append(iframe)
});