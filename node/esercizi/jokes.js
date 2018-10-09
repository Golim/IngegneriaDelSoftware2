var http = require('http');

var url = "http://api.icndb.com/jokes/random";

http.get(url, function (resp) {
    var data = "";

    resp.on("data", function (chunk) {
        data += chunk;
    });

    resp.on("end", function () {
        var obj = JSON.parse(data);
        console.log(obj.value["joke"]);
    });

}).on("error", function (err) {
    console.log("Error: " + err.message);
});