const express = require('express');
const fs = require('fs/promises');
const pg = require('pg');

const port = 3000;
const app = express();
const pool = new pg.Pool({
    user: 'serviceuser',
    password: 'serviceuser',
    host: '127.0.0.1',
    port: 5432,
    database: 'catfactdb'
});

function loadFactsFromFile() {
    return fs.readFile('resources/catfacts.json')
        .then(factBuffer => factBuffer.toString())
        .catch(error => {
            console.log('Error when trying to read file:' + JSON.stringify(error));
        })
}

function writeFactsToFile(facts) {
    return fs.writeFile('resources/catfacts.json', JSON.stringify(facts))
        .catch(error => {
            console.log('Error when trying to write file:' + JSON.stringify(error));
        });
}

function loadFactsFromDb() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM facts', (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function addFactToDb(fact) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO facts VALUES ($1)', [fact], (err, res) => {
            if(err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`--> Received ${req.method} on ${req.originalUrl}`);
    next();
});


// routes / actions / handlers
app.get('/', (req, res) => {
    res.send('Welcome to our TUT service')
});

app.get('/facts', (req, res) => {
    loadFactsFromFile()
        .then(facts => {
            let parsedFacts = JSON.parse(facts);
            if(req.query.maxlength) {
                const filteredFacts = parsedFacts.filter(fact => fact.length < Number(req.query.maxlength));
                res.send(JSON.stringify(filteredFacts));
            } else {
                res.send(facts);
            }
        });
});

app.post('/fact', (req, res) => {
    let newFacts = [];
    loadFactsFromFile()
        .then(facts => {
            newFacts = JSON.parse(facts);
            return newFacts;
        })
        .then(parsedFacts => {
            newFacts.push({
                fact: req.body.fact,
                length: req.body.fact.length
            });
            return writeFactsToFile(newFacts);
        })
        .then(() => {
            console.log('done adding new fact');
            res.send();
        })
});

app.get('/db/fact', (req, res) => {
    loadFactsFromDb()
        .then(dbResult => {
            res.send(dbResult.rows);
        })
        .catch(error => {
            console.log(`Error while trying to read from db: ${error}`);
            res.status(500).send();
        });
});

app.post('/db/fact', (req, res) => {
    addFactToDb(JSON.stringify(req.body.fact))
        .then(() => {
            res.send();
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
