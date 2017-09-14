var express = require('express');
var app = express();
var request = require('request');
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.static('public'));

var cityList = mongoose.Schema({
    city: String,
    pictoWeather: String,
    description: String,
    maxTemp: Number,
    minTemp: Number,
    latitude: Number,
    longitude: Number
});

cityModel = mongoose.model('citydb', cityList);

app.get('/', function (req, res) {
        cityModel.find(function (err, cityList) {
            res.render('home', {cities: cityList});
        });
});

app.get('/add', function (req, res) {
    request("http://api.openweathermap.org/data/2.5/weather?q="+ req.query.city + "+&appid=7a8493c8fbae560841a4fc4b12274eed&lang=fr&units=metric", function(error, response, body) {
        var body = JSON.parse(body);

        var citydb = new cityModel ({
            city: body.name,
            description: body.weather[0].description,
            pictoWeather: "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png",
            maxTemp: body.main.temp_max,
            minTemp: body.main.temp_min,
            latitude: body.coord.lat,
            longitude: body.coord.lon
        });
        citydb.save(function (error, cityList) {
            cityModel.find(function (err, cityList) {
                res.render("home", {cities: cityList});
            });
        });
    });
});

app.get('/delete', function (req, res) {
    console.log(req.query);
    cityModel.remove({city: req.query}, function(error) {
       // console.log(req.query);
        console.log();
        cityModel.find(function (err, cityList) {
            res.render("home", {cities: cityList});
        });
    });
});

//‘db.test_users.remove({“_id”: { “$oid” : “4d513345cc9374271b02ec6c” }})’
//cityList.splice(req.query.position, 1)

app.get('/updatePosition', function (req, res) {
    //console.log(req.query.tri[0]);
    var tri = JSON.parse(req.query.tri);
    var cityListTmp = [];

    //console.log(tri);
    for (var i=0; i<tri.length; i++ ) {
        console.log("liste 1", cityList[tri[i]]);
        cityListTmp.push(cityList[tri[i]]);
        //console.log(tri[i]);
        console.log("liste 2", cityList[tri[i]]);
    }
    cityList = cityListTmp;
    res.send( {data: "hello"});
});

mongoose.connect('mongodb://guigui:guigui@ds135394.mlab.com:35394/weatherapp' , function(err) {
    console.log(err);
});


app.listen(8080, function () {
    console.log("Server listening on port 8080");
});