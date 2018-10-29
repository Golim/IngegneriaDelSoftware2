# API

## Fondamenti del Web

### Componenti chiave architetturali

- **URI**: identificazione
- **HTTP**: interazione
- **HTML**, **XML**, **JSON**, ...: formattazione dei documenti standardizzata.

## Rappresentare risorse
Una risorsa può avere diverse rappresentazioni. Tali rappresentazioni possono essere in diversi formati: HTML, XML, JSON, ...

# API
Le **A**pplication **P**rogramming **I**nterface, specificano come un componente software comunica con altri. Generalmente sono corredate di una **documentazione** che spiega come usarle.

### Web API
In particolare, le Web API specificano come un'applicazione comunica con altre applicazioni attraverso il Web (HTTP, URI, XML, ...).

### Servizi Web
Sono simili alle Web API. Sono costruiti sui principi di progettazione e sulle componenti del web. Forniscono delle **operazioni** e permettono lo **scambio di dati** strutturati in formati standard (JSON, XML, ...).

## Caratteristiche delle API

#### Semplicità
E' importante mantenere le API più semplici il possibile. Ogni sviluppatore deve combattere la propria tendenza ad aggiungere complessità innecessaria, anche se pensa che possa aiutare. Fornire più modi per fare qualcosa è un'aggiunta inutile di complessità.

#### Fornire astrazioni utili
I dettagli dell'API devono essere nascosti all'utente, lasciando solo il necessario. All'utente devono essere presentate delle astrazioni.

#### Consistenza
Le stesse cose devono avere lo stesso nome ovunque e lo stile dei nomi deve essere comune.

#### Seguire il principio del "Least Astonishment"
Un sistema si deve comportare in modo consistente con come l'utente si aspetta che si comporti. L'utente non deve rimanere sorpreso dal modo in cui il programma si comporta.

#### Pensare alle API come prodotto
Non si deve pensare che l'utente, essendo anch'esso un programmatore, conosca quello che conosciamo noi. Le API devono essere sviluppate ponendosi nei panni dell'utente.

## Architettura orientata ai servizi
Ogni modulo del programma è organizzato in termini di servizi che operano indipendentemente ed interagiscono con altri servizi tramite API.

Pensare in termini di API aiuta a pensare in termini di esporre le proprie funzionalità come un **servizio** alle persone. I servizi sono essenzialmente programmi accessibili tramite API, tipicamente tramite `http`.

Si deve sviluppare il proprio programma in termini di funzioni che vengono offerte agli altri come servizi e si devono documentare le API bene abbastanza da permettere agli utenti di capire come usarle correttamente.

## API RESTfull

### Principi di progettazione

#### 1) Indirizzabilità
Un'applicazione indirizzabile:
- espone gli aspetti interessanti del dataset come risorse
- espone un URI per ogni pezzo di informazione che potrebbe servire

**Risorsa**: qualsiasi cosa che sia abbastanza importante da essere referenziato come una cosa. Generalmente è qualcosa di cui si vuole fornire informazioni e che può essere rappresentato come una serie di bit. Una risorsa deve avere almeno un nome (URI), che deve essere descrittivo.

Esempio:

    SI: http://example.com/movies
    NO: http://example.com/overview.php?list=all,type=movie

#### 2) Interfacce uniformi
Lo stesso insieme di interfacce si deve applicare a tutte le risorse: un piccolo insieme di **metodi** applicato ad un grande insieme di **risorse**.

###### HTTP CRUD
- **C**reate: POST o PUT
- **R**ead: GET
- **U**pdate: PUT
- **D**elete: DELETE

###### Comportamento sicuro ed idemponente
- **GET**, **HEAD**: metodi sicuri possono essere ignorati o ripetuti senza effetti server-side.
- **PUT**, **DELETE**: metodi idemponenti possono essere ripetuti senza effetti collaterali.
- **POST**: metodi non sicuri e non idemponenti devono essere trattati con cura.

**Idemponenza**: proprietà di una funzione il cui risultato, se applicata molteplici volte, è uguale al risultato derivante da una singola applicazione.

###### Semantica di **POST**
POST **crea** una nuova risorsa, il cui URI viene deciso dal **server**. Essendo non idemponente, una sequenza di due o più richieste POST ha essetti server-side.

###### Semantica di **PUT**
PUT **crea** una nuova risorsa, il cui URI viene deciso dal **client**. PUT è idemponente, quindi multiple richieste PUT non hanno effetti collaterali.

PUT **aggiorna** una risorsa preesistente.
Se la richiesta PUT va male:
- Errore **5xx** o **4xx**: si può semplicemente ripetere la richiesta.
- Errore **409**: indica un conflitto.
- Erroe **417**: il server non accetta la rappresentazione della risorsa, deve essere fixata.

###### Semantica di **GET**
GET **recupera** la rappresentazione di una risorsa. E' un metodo sicuro ed idemponente che non ha effetti collaterali e non cambia lo stato della risorsa.

###### Semantica di DELETE
DELETE rende la risorsa non più accessibile, non significa necessariamente che viene fisicamente cancellata. Essendo idemponente, se va male si può semplicemente riprovare.

#### 3) Connettività
Nei servizi RESTfull le rappresentazioni delle risorse sono ipermediali: possono contenere link ad altre risorse.

#### 4) Assenza di stato
Ogni richiesta HTTP viene eseguita in un'isolazione completa. Per questo ogni richiesta deve contenere tutte le informazioni per soddisfarla.

### Progettazione di servizi RESTfull

#### Metodologie di progettazione
- Identificare e nominare le risorse che saranno pubblicate dal servizio.
- Modellare le relazioni tra risorse che possono essere seguite per avere maggiori dettagli al riguardo.
- Definire "buoni" URI per indirizzare le risorse.
- Progettare e documentare le rappresentazioni delle risorse.

##### URL
Devono essere semplici ed intuitivi. Sì ai nomi, No ai verbi.

Esempio:

    SI: /actors
    NO: /getAllActors

E' bene prevedere 2 URL per risorsa:

    /actors      // collezione di attori
    /actors/1234 // specifico elemento della collezione

Il livello dell'URL non dovrebbe essere troppo profondo.

Per **filtrare** le risorse si utilizza il `?`. Esempio

    /actors?gender=male&age=50


### Gestire gli errori
Per comunicare un errore si utilizzano i codici HTTP.

Basilari:
- **200** OK
- **400** Bad Request
- **500** Internal Server Error

Specifici:
- **201** Created
- **304** Not modified
- **401** Unauthorized
- **403** Forbidden

I messaggi nel body della risposta HTTP devono essere più dettagliati il possibile. E' una buona prassi inserire nella risposta un messaggio per lo sviluppatore ed uno per l'utente, oltre ad un codice prestabilito riguardante l'errore.

### Versioning
Un'API deve sempre avere un numero di versione. E' consigliabile mantenere almeno una versione precedente attiva.


Sintassi consigliata: numero di versione nel primo elemento del path, con prefisso `v`. Esempio: `/v1/actors`

### Pagination
E' quasi sempre una cattiva idea ritornare tutte le risorse disponibili. Nei metadati si può includere il numero totale di risorse nella rappresentazione. E' consigliabile utilizzare limiti ed offset: `/movies?limit=20&offset=0`

### Sottodominio per le API
Le richieste API dovrebbero essere consolidate tramite un sottodominio. Esempio: `api.example.com`

## Documentare le API con `apiary.io`

