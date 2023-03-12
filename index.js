const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const predict = require('./predict');

const API_PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(API_PORT, () => { console.log('Listening on port ' + API_PORT) });

app.get("/", (req, res) => {
    res.send("Please POST data to /predict to use this API");
    console.log("Please POST data to /predict to use this API");
});

app.post('/predict', (req, res) => {
    const result = predict(req.body);
    res.send(result);
});
