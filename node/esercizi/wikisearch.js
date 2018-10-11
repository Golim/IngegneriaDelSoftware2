var parameters = process.argv;

if (parameters.length !== 3) {
    console.log("Usage: node wikisearch.js \"input\"");
} else {
    var ricerca = parameters[2];
    ricerca = ricerca.toString().replace(' ', '%20')

    var https = require('https');

    var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + ricerca + "&format=json";

    https.get(url, function (resp) {
        var data = "";

        resp.on("data", function (chunk) {
            data += chunk;
        });

        resp.on("end", function () {
            var obj = JSON.parse(data);
            console.log("Trovati %s risultati, ecco i primi 5:", obj.query.searchinfo.totalhits);
            var res = parseInt(obj.query.searchinfo.totalhits, 10);
            if (res > 5)
                res = 5;

                console.log(res);
            for (var i = 0; i < res; i++) {
                console.log("\nRisultato %d:\n%s", (i + 1), obj.query.search[i].title);
            }
        });

    }).on("error", function (err) {
        console.log("Error: " + err.message);
    });
}