var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

var cityList = [
    {city: "Lyon", pictoWeather:"nuageux", description:"nuageux", maxTemp:"26 °C", minTemp:"17 °C"},
    {city: "Paris", pictoWeather:"ciel dégagé", description:"dégagé", maxTemp:"24.3 °C", minTemp:"13.2 °C"},
    {city: "Marseille", pictoWeather:"ciel sombre", description:"sombre", maxTemp:"22.4 °C", minTemp:"14 °C"}
];

app.get('/', function (req, res) {
    res.render('home', {cities: cityList});
});

app.get('/add', function (req, res) {
    cityList.push(req.query);
    res.render("home", {cities: cityList});
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});