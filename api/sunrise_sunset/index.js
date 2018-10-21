var https = require('https');

var KEY = "eMKrrKGjAppIVAcuXL1NYqWIWEGbMVtR";

var city = "Merano";
var country = "IT";

if(process.argv.length < 4){
    console.log("Usage:   node index.js City   Country");
    console.log("Example: node index.js Merano IT");
    console.log("Default is Merano, IT\n\n");
} else {
    city = process.argv[2];
    country = process.argv[3];
}

var lat;
var lng;


var url = "https://www.mapquestapi.com/geocoding/v1/address?key=" + KEY +
    "&inFormat=kvp&outFormat=json&location=" + city +
    "%2C" + country;

https.get(url, function (resp) {
    var data = "";

    resp.on("data", function (chunk) {
        data += chunk;
    });

    resp.on("end", function () {
        var obj = JSON.parse(data);

        //console.log(obj);
        lat = (obj.results[0].locations[0].latLng.lat);
        lng = (obj.results[0].locations[0].latLng.lng);

        console.log(obj.results[0].providedLocation.location + " [lat: " + lat + ", lng: " + lng + "]");

        url = "https://api.sunrise-sunset.org/json?lat=" + lat + "&lng=" + lng;

        https.get(url, function (resp) {
            var data = "";

            resp.on("data", function (chunk) {
                data += chunk;
            });

            resp.on("end", function () {
                var obj = JSON.parse(data);

                console.log("sunrise "+obj.results.sunrise);
                console.log("sunset  "+obj.results.sunset);
            });

        }).on("error", function (err) {
            console.log("Error: " + err.message);
        });

    });

}).on("error", function (err) {
    console.log("Error: " + err.message);
});