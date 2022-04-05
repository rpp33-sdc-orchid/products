require('dotenv').config();
const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../server/router.js');

app.use('/products', router);


describe('Test on test suite setup', () => {
  app.get('/', (req, res) => {
    res.send('test');
  });

  test('should return the message when connect to home page', async () => {
    const response = await request(app)
      .get('/')
      .catch((err) => console.log('err on home page', err));

    expect(response.status).toBe(200);
    expect(response.text).toBe('test');
  });
});


describe('Test on API end points', () => {

  const testProductId = 1;

  test('should get product lists from API', async () => {
    const result = await request(app)
      .get('/products')
      // .set('Authorization', API_KEY)
      .query({page: 1, count: 5})
      .catch((err) => console.log('err on GET/products', err));

    expect(result.status).toBe(200);
  });

  test('should get product information from API', async () => {
    const result = await request(app)
      .get(`/products/${testProductId}`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on GET/products/:product_id', err));

    expect(result.status).toBe(200);
  });

  //TODO: write get style test

  test('should get related products from API', async () => {
    const result = await request(app)
      .get(`/products/${testProductId}/related`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on GET/products/:product_id/related', err));

    expect(result.status).toBe(200);
  });


});