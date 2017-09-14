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
        var body = JSON.parse(body); //on passe le string en objet
        /*console.log(req.query.city);
        console.log(body.name);
        console.log(body.weather[0].id)
        console.log(body);*/
        cityList.push({
            city: body.name,
            description: body.weather[0].description,
            pictoWeather: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
            maxTemp: body.main.temp_max,
            minTemp: body.main.temp_min,
            latitude: body.coord.lat,
            longitude: body.coord.lon
        });
        res.render("home", {cities: cityList});
    });
    //console.log(cityList);
});

app.get('/delete', function (req, res) {
    cityList.splice(req.query.position, 1);
    res.render('home', {cities: cityList});
});

app.get('/updatePosition', function (req, res) {
    //console.log(req.query.tri[0]);
    var tri = JSON.parse(req.query.tri);
    var cityListTmp = [];



    for (var i=0; i<tri.length; i++ ) {
        //console.log(cityList[tri[i]]);
        cityListTmp.push(cityList[tri[i]]);
    }
    cityList = cityListTmp;
    res.send( {data: "hello"});
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});