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
- Modellare le relazioni tra risorse che possono essere seguite per avere 