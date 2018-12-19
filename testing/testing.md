# Testing
Il testing è un processo che **esegue** il programma con l'intento di **trovare bug**. Il testing permette di mostrare la presenza di bug, ma non la loro assenza.
E' importante trovare i difetti del software il prima possibile, di modo che il loro fixing risulti più economico.

Per lo sviluppatore è difficile testare il software perché fa delle assunzioni.
Più il numero di difetti nel software è alto, più è probabile che ne esistano molti altri non rilevati.

### Test case
Un *test case* è un insieme di valori di **input**, valori attesi di **output** e **precondizioni** per eseguire un test con lo scopo di trovare errori.
Il test case **fallisce** se il risultato ottenuto è diverso da quello atteso.

#### Come progettare dei buoni test case
- I test case devono essere definiti più precisamente il possibile.
- Una buona pratica è quella di definire test case dipendenti tra loro in successione, di modo che l'output di uno funga da input per un successivo.
- Cercare di catturare i casi limite.
- Definire test case per ogni requisito (per ogni user story).
- Definire test che hanno buona probabilità di individuare nuovi difetti, piuttosto che test che mostrano che il programma funziona correttamente.
- Definire test riproducibili.
- Definire test case sia per input validi che invalidi.

### Tipologie di testing
- **Unit** testing: testa una funzionalità in un contesto isolato. Molto spesso è fatto dallo sviluppatore.
- **Integration** testing: prende una serie di funzioni, già singolarmente testate, e le testa combinate.
- **System** testing: testa se il sistema nel suo insieme raggiunge i suoi obiettivi.

### Obiettivi del testing
- Testare le performance del software mettendolo in situazioni limite
- Sicurezza
- Usabilità
- Affidabilità
- **Accettazione**: un test condotto per determinare se i requisiti di un contratto sono soddisfatti
- **Regressione**: condurre un test su una nuova implementazione di un componente.

## Black box testing
E' un metodo di testing del software che esamina le funzionalità di un'applicazione, senza guardare alle sue strutture interne o il funzionamento. Non c'è bisogno di avere accesso o conoscere il codice sorgente.

### Partizionamento per equivalenza
Dividere tutti i possibili input in classi in modo che:
- ci sia un numero finito di classi di partizionamento
- si possa assumere che:
    - il programma si comporta analogamente per gli input della stessa classe
    - un test con un valore rappresentativo da una classe sia sufficiente
    - se il test rappresentativo rileva un errore, allora tutti gli altri test della classe rileveranno lo stesso errore.

### Confini
E' importante testare le condizioni ai loro confini, con valori confine sia in input che in output.

## White box testing
E' un metodo che testa le strutture di codice interne ed il funzionamento dell'applicazione, non le sue funzionalità. Il tester sceglie input che causano l'esecuzione di specifici percorsi attraverso il codice.

Definisce quanti test è opportuno fare.

### Compertura di test
E' la quantità di codice sorgente che viene testato dai casi di test.

#### Copertura di funzioni e dichiarazioni
Percentuale di funzioni o dichiarazioni del codice sorgente che vengono eseguite dai casi di test.

#### Copertura dei branch
La copertura di ogni risultato delle valutazioni delle condizioni. *Esempio*:

```javascript
function foo(x, y){
    if (x == 0)
        y += 1;
    if (y == 0)
        x += 1;
}


foo(0, -1);
```
Ha una copertura delle dichiarazioni del 100%, ma una copertura dei branch del 50%.

#### Copertura dei loop
Ogni loop viene eseguito 0 volte, una volta e più di una volta. I confini delle condizioni dei loop sono molto spesso una fonte di bug.

#### Copertura delle condizioni decisionali modificate
E' richiesta per sistemi safety-critical.
E' composta dalla copertura dei branch, stabilisce che ogni termine coinvolto in una decisione assume ogni risultato possibile e stabilisce che ogni termine usato in una decisione influenza indipendentemente il suo risultato. Risulta necessaria quando si hanno espressioni booleane complicate, la cui tabella della verità è grande.

#### Copertura dei percorsi
**Percorso**: sequenza di decisioni fatte da operatori nel programma.

Questa copertura si interessa del come si arriva ad un determinato pezzo di codice.

#### Copertura dei valori di confine
Quando un programma dipende da un certo range numerico e quando un programma ha comportamenti diversi in base a dei numeri in un range, allora è necessario testare il codice con numeri prossimi ai confini.

*Esempio*:
```javascript
if(A or (B and C))
```
1. Si testa sia con A falsa, che con A vera, mantenendo B e C fissi in modo che A sia decisiva (Es: B falsa e C vera).
2. Mantenendo A falsa si provano le combinazioni di B e C:
    - B falsa e C vera o B vera e C falsa
    - B vera e C vera

## Testing con Jest

#### Installazione
Jest è uno strumento che permette di testare codice JavaScript. Per **installare** Jest si utilizza:

    npm install --save-dev jest

#### Configurazione
Una volta che jest è stato installato si deve modificare il file `package.json` come segue:

```javascript
"scripts":{
    "test":"jest"
}
```

e si deve aggiungere, sempre al file `package.json`:
```javascript
"jest": {
    "verbose": true,
    "collectCoverage": true
}
```

#### Utilizzo
I file, per essere testati con jest, devono essere dei moduli, per questo si deve aggiungere ad ogni file `module.export`:

```javascript
function sum(a, b) {
    return a + b;
}

module.exports = sum;
```

Il nome dei file è molto importante, se si vuole testare un file chiamato `file.js`, si deve creare un file `file.test.js`, contenente il codice dei test:

```javascript
const modulo = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Per lanciare il test si utilizza il comando

    npm test
