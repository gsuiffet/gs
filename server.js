var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');
app.use(express.static('public'));

var cityList = [
    //{city: "Lyon", pictoWeather:"nuageux", description:"nuageux", maxTemp:"26", minTemp:"17"},
    //{city: "Paris", pictoWeather:"ciel dégagé", description:"dégagé", maxTemp:"24.3", minTemp:"13.2"},
    //{city: "Marseille", pictoWeather:"ciel sombre", description:"sombre", maxTemp:"22.4", minTemp:"14"}
];

app.get('/', function (req, res) {
    res.render('home', {cities: cityList});
});

app.get('/add', function (req, res) {
    request("http://api.openweathermap.org/data/2.5/weather?q="+ req.query.city + "+&appid=7a8493c8fbae560841a4fc4b12274eed&lang=fr&units=metric", function(error, response, body) {
        var body = JSON.parse(body); //affiche l'objet
    /*console.log(req.query.city);
        console.log(body.name);
        console.log(body.weather[0].icon);
        console.log(body.weather[0].description);
        console.log(body.main.temp_min);
        console.log(body.main.temp_max);
        console.log(body);
        console.log(body.weather[0].id)*/
        cityList.push({
            city: body.name,
            description: body.weather[0].description,
            pictoWeather: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
            maxTemp: body.main.temp_max,
            minTemp: body.main.temp_min
        });
        res.render("home", {cities: cityList});
    });
    console.log(cityList);
});

app.get('/delete', function (req, res) {
    cityList.splice(req.query.position, 1);
    res.render('home', {cities: cityList});
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});