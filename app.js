const express = require('express');
const bodyParser = require('body-parser');
const LRUCache = require('./data-structures/LRUCache');
const database = require('./firebase');

const app = express();
const jsonParser = bodyParser.json();
const cacheSize = 3;
const cache = new LRUCache(cacheSize);

app.get('/all', (req, res) => {
    const currentCache = cache.getAll();
    res.status(200).json(currentCache);
});

app.get('/:key', (req, res) => {
    const key = req.params.key;
    const cachedValue = cache.get(key);
    if (cachedValue !== null) {
        res.status(200).send(cachedValue.toString());
    } else {
        database.ref('/' + key).once('value').then(dbRes => {
            const value = dbRes.val();
            if (value === null) {
                res.status(404).send('Not found in database');
            } else {
                cache.set(key, value);
                res.status(200).send(value.toString());
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send();
        });
    }
});

app.post('/add', jsonParser, (req, res) => {
    const key = req.body.key;
    const value = req.body.value;
    cache.set(key, value);
    res.status(201).json({ key, value });
});

app.delete('/:key', (req, res) => {
    const key = req.params.key;
    const deleted = cache.remove(key);
    if (deleted) {
        res.status(200).send();
    } else {
        res.status(204).send();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});