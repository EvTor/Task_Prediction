import express from 'express';
import bodyParser from 'body-parser';
import router from './controllers/predictApi.js';
const app = express();

const API_PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(API_PORT, () => { console.log('Listening on port ' + API_PORT) });

app.use(router);

