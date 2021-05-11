const express = require('express');
const db = require('../db');
const morgan = require('morgan');
const router = require('./routes.js');

const app = express();


// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.get('/api/products', (req, res) => {
//   res.send([1, 2, 3]);
// });
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

