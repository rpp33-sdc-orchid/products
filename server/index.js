const express = require('express');
const app = express();
const port = 8000;
const router = require('./router.js');
require('dotenv').config();

app.use('/products', router);

app.get('/', (req, res) => {
  console.log('We are in server!');
  res.send('test');
});






app.listen(port, () => {
  console.log(`listening at localhost: ${port}`);
});