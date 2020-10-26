const express = require('express');
const bodyParser = require('body-parser');
const LRUCache = require('./data-structures/LRUCache');

const app = express();
const jsonParser = bodyParser.json();
const cacheSize = 3;
const cache = new LRUCache(cacheSize);
cache.set("a", 1);
cache.set("b", 1);
cache.set("c", 1);
cache.set("d", 1);

//Firebase connection

app.get('/all', (req, res) => {
    const currentCache = cache.getAll();
    res.status(200).json(currentCache);
});

app.get('/:key', (req, res) => {
    const key = req.params.key;
    const cachedValue = cache.get(key);
    if (cachedValue) {
        res.status(200).send(cachedValue.toString());
    } else {
        res.send("Make call to database here");
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