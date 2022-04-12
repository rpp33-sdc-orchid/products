require('dotenv').config();
const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../server/router.js');
const home = process.env.API_URL;

app.use('/products', router);


describe('Test on test suite setup', () => {

  test('should return the message when connect to home page', async () => {
    const response = await request(home)
      .get('/')
      .catch((err) => console.log('err on home page', err));

    expect(response.status).toBe(200);
    expect(response.text).toBe('test');
  });
});


describe('Test on GET/products API end point', () => {

  test('should get product lists from API without query', async () => {
    const result = await request(app)
      .get('/products')
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products', err));

    expect(result.status).toBe(200);
    expect(Array.isArray(result._body)).toBe(true);
    expect(result._body.length).toBe(5);
  });

  test('should get product lists from API with specific query page and count', async () => {
    const result = await request(app)
      .get('/products')
      // .set('Authorization', API_KEY)
      .query({page: 1, count: 10})
      .catch((err) => console.log('err on TEST GET/products', err));

    expect(result.status).toBe(200);
    expect(Array.isArray(result._body)).toBe(true);
    expect(result._body.length).toBe(10);
  });

});

describe('Test on GET/products/:product_id API end point', () => {

  const testProductId = 100000;
  const errorProductId = 0;

  test('should get product information from API', async () => {
    const result = await request(app)
      .get(`/products/${testProductId}`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id', err));

    expect(result.status).toBe(200);
    expect(result._body.id).toBe(testProductId);
    expect(Array.isArray(result._body.features)).toBe(true);
  });

  test('should not get product information from API for invalid id', async () => {
    const result = await request(app)
      .get(`/products/hello`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id', err));

    expect(result.status).toBe(500);
    expect(result.text).toBe('Error getting product info');
  });

});

describe('Test on GET/products/:product_id/styles API end point', () => {

  const testProductId = 100000;

  test('should get styles from API', async () => {
    const result = await request(app)
      .get(`/products/${testProductId}/styles`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id/styles', err));

    expect(result.status).toBe(200);
    expect(result._body.product_id).toBe(testProductId);
    expect(Array.isArray(result._body.results)).toBe(true);
  });

  test('should not get style from API for invalid id', async () => {
    const result = await request(app)
      .get(`/products/hello/styles`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id/styles', err));

    expect(result.status).toBe(500);
    expect(result.text).toBe('Error getting product styles');
  });

});

describe('Test on GET/products/:product_id/related API end point', () => {

  const testProductId = 100000;
  const errorProductId = 0;

  test('should get related products from API', async () => {
    const result = await request(app)
      .get(`/products/${testProductId}/related`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id/related', err));

    expect(result.status).toBe(200);
    expect(Array.isArray(result._body)).toBe(true);
  });

  test('should send empty array to the server when id is invalid', async () => {
    const result = await request(app)
      .get(`/products/${errorProductId}/related`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id/related', err));

    expect(result.status).toBe(200);
    expect(Array.isArray(result._body)).toBe(true);
    expect(result._body.id).toBeUndefined();
  });

  test('should not get related product information from API for invalid id', async () => {
    const result = await request(app)
      .get(`/products/hello/related`)
      // .set('Authorization', API_KEY)
      .catch((err) => console.log('err on TEST GET/products/:product_id/related', err));

    expect(result.status).toBe(500);
    expect(result.text).toBe('Error getting related product');
  });
});