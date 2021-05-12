const express = require('express');
const db = require('../db');
const router = require('./routes.js');

const app = express();

app.use(express.json());

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

