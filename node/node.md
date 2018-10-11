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
```javascript
// Caricare la libreria per il file system
var fs = require("fs");

// Accedere al contenuto di un file in maniera sincrona
var data = fs.readFileSync("fileName", "utf8");
```

La funzione ```readFileSync``` legge il file in maniera sincrona, spesso però si desidera avere un comportamento asincrono, node.js è infatti progettato intorno al concetto di chiamate non bloccanti/asincrone.

```javascript
// Accedere al contenuto di un file in maniera asincrona
fs.readFile("fileName", "utf8", function(error, data) {
  console.log(data);
});
```

Va notato che la nel secondo esempio si utilizza una funzione anonima.

## Funzioni anonime o lambda
Una funzione anonima è una funzione dichiarata sul posto (dichiarata a runtime), caratterizzata dal fatto di non avere un nome.

## Client node: interazione con servizi online
Tipicamente l'interazione tra un server http ed un client avviene online:

1. Il browser manda una richiesta al server
2. Il server manda una risposta al client

Il client può essere uno script, invece che un browser web:
```javascript
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
```json
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

## Server node
Per creare un server node si usa il modulo ```http```. Si deve definire la porta sulla quale il server resterà in ascolto.

```javascript
var http = require('http');
var port = 3000;

var requestHandler = function(request, response) {
    console.log(request.url);
    response.end('Hello World!');
}

var server = http.createServer(requestHandler);
server.listen(port);
```

## Package Management con ```npm```

#### npm
npm è un tool che permette di gestire le dipendenze di un progetto ed automatizzare workflow di sviluppo, similmente a ```make```.

Per iniziare si utilizza:

    npm init

che genera il file ```package.json```, contentente alcune informazioni (metadati) riguardanti il nostro progetto. La struttura sarà simile a questa:

```json
{
    "name": "Nome",
    "version": "1.0.0",
    "description": "Descrizione",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "Matteo",
    "license": "ISC",
    "dependancies": {
        "nome modulo": "^1.0.0"
    }
}
```

#### Installare un modulo
Per installare un modulo esterno si utilizza:

    npm install --save 'nome modulo'

Il parametro ```--save``` indica a npm di aggiungere il modulo alle dipendenze del progetto nel file ```package.json```.

#### Disinstallare un modulo
Per disinstallare un modulo si utilizza

    npm uninstall 'nome modulo'

Si può aggiungere il parametro ```--save``` per eliminare la dipendenza dal file ```package.json```.

#### Automatizzare azioni
npm permette di automatizzare alcune azioni utilizzando la proprietà ```scripts``` del file ```package.json```. I più comuni sono: prepublish, prepare, publish, preinstall, install, ...

Si può trovare la lista completa [qui](https://docs.npmjs.com/misc/scripts "npm scripts").

### Express
Express è un web framework minimale e flessibile per lo sviluppo di applicazioni web node.js. Fornisce un robusto set di feature per le applicazioni web e mobile.

Creare un web server con Express:
```javascript
var express = require('express');
var app = express();

var port = 3000;

// Gestire le richieste GET
app.get('/', function(req, res){ 
    res.send('Hello World!');
});

app.listen(port, function() {
    console.log('Server running on port ', port);
});
```