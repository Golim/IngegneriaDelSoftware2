# Riassunto node.js

## Cos'è node.js?
node.js è una piattaforma server-side basata sul JavaScript Engine di Google Chrome.

node.js è event-driven ed usa un modello di I/O non bloccante, che lo rende molto leggero ed efficiente: perfetto per applicazioni real-time data-intensitive su dispositivi distribuiti.

## Basic scripting
##### Eseguire uno script
    node file.js

##### Hello world
    console.log("Hello world");

##### Parametri da linea di comando
Per passare dei parametri ad uno script

    node file.js 'parametro_1' 'parametro_2'

Per leggere i parametri passati si accede alla variabile globale ```process```, che contiene le informazioni riguardanti il processo corrente di node.js

    console.log(process.argv[0]);

## Caricare una libreria
    var libreria = require("nome");

## Accedere al file system
```
// Caricare la libreria per il file system
var fs = require("fs");

// Accedere al contenuto di un file in maniera sincrona
var data = fs.readFileSync("fileName", "utf8");
```

La funzione ```readFileSync``` legge il file in maniera sincrona, spesso però si desidera avere un comportamento asincrono, node.js è infatti progettato intorno al concetto di chiamate non bloccanti/asincrone.

```
// Accedere al contenuto di un file in maniera asincrona
fs.readFile("fileName", "utf8", function(error, data) {
  console.log(data);
});
```

Va notato che la nel secondo esempio si utilizza una funzione anonima.

## Funzioni anonime o lambda
Una funzione anonima è una funzione dichiarata sul posto (dichiarata a runtime), caratterizzata dal fatto di non avere un nome.

## Interazione con servizi online
Tipicamente l'interazione tra un server http ed un client avviene online:

1. Il browser manda una richiesta al server
2. Il server manda una risposta al client

Il client può essere uno script, invece che un browser web:
```
var https = require('https');

var url = "https://esempio.it";

https.get(url, function (resp) {
    var data = "";

    // I dati della risposta arrivano in uno stream
    resp.on("data", function (chunk) {
        data += chunk;
    });

    // Quando finisce lo stream
    resp.on("end", function () {
        console.log(data);
    });

}).on("error", function (err) {
    console.log("Error: " + err.message);
});
```

## JSON
JSON sta per **J**ava**S**cript **O**bject **N**otation, è una sintassi per l'archiviazione e lo scambio di dati. E' testo, scritto con la notazione degli oggetti in JavaScript.

Esempio:
```
{  
    "date":"September 11",
    "url":"https://wikipedia.org/wiki/September_11",
    "data":{  
        "Events":[  ],
        "Births":[  ],
        "Deaths":[  ]
    }
}
```

Per rendere il testo ottenuto come risposta ad una richiesta http in formato JSON si utilizza

    var obj = JSON.parse(data);
    console.log(obj.data);


