# Esame

## Come fare
1. Setup di un repository su github.
2. Creare un'app su heroku e collefarla al repository appena creato.
3. Clonare il repository.
4. Inizializzare il repository con `npm init`
5. Installare le dipendenze desiderate con `npm install --save dipendenza`, tra cui `jest` per il testing
6. Aggiungere lo script per il test al file `package.json`.
```javascript
"scripts":{
    "test":"jest"
}

"jest": {
    "verbose": true,
    "collectCoverage": true
}
```

7. Sviluppare il codice ed i casi di test.