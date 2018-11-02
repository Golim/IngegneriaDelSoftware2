# Testing

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