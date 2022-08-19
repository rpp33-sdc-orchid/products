# Orchid API - products
API service for products in a e-commerce website. This projects consists of a Nginx load balancer, a Node/Express server, and a PostgreSQL database. All three are deployed to AWS EC2 instances. This API endpoint has been optimized to handle product level traffic, verified by load testing.

## Technologies

- Server
  - Node.js, Express
- Test Suite
  - Jest, SuperTest, K6.io, Loader.io
- Database
  - PostgreSQL
- Other techniques
  - Newrelic, Ngnix, Redis, AWS_EC2, AWS_AMI, PM2

## Milestones

-   [x] **May 07** Share with friends
-   [x] **Apr 28** Scale the application
-   [x] **Apr 23** Service deploy to AWS, Benchmark
-   [x] **Apr 16** Stress-test
-   [x] **Apr 09** Complete API routes
-   [x] **Apr 05** Initialize API server
-   [x] **Mar 24** Initialize DBMS technology
-   [x] **Mar 15** Start developing process


## Usage

### How to install / run locally

1. Start a Postgres Database
```sh
# Launch Postgress in the terminal
brew services start postgresql
```

2. Set up the Node/Express server
```sh
$ cd server
$ npm install
$ cp .env.sample .env
```
```env
# Update the database PG variables
PGUSER = <username>
PGHOST = <host>
PGDATABASE = <database>
PGPASSWORD = <password>

# Update the REDIS_URL variable
REDIS_URL = redis://:products@<host>:6379
```

3. Start the Node/Express server
```sh
$ npm run start
$ npm run test
```


## API End Points

### Product Information

Returns all product level information for a specified product id.

`GET /products/:product_id`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
{
	"id": 11,
	"name": "Air Minis 250",
	"slogan": "Full court support",
	"description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
	"category": "Basketball Shoes",
	"default_price": "0",
	"features": [
  	{
			"feature": "Sole",
			"value": "Rubber"
		},
  	{
			"feature": "Material",
			"value": "FullControlSkin"
		},
  	// ...
	],
}
```

### Product Styles

Returns the all styles available for the given product.

`GET /products/:product_id/styles`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
{
	"product_id": "1",
	"results": [
  	{
			"style_id": 1,
			"name": "Forest Green & Black",
			"original_price": "140",
			"sale_price": "0",
			"default?": 1,
			"photos": [
  			{
					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_1_photo_number.jpg"
				},
  			{
					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_1_photo_number.jpg"
				}
  			// ...
			],
		"skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
			//...
            	}
	},
  {
		"style_id": 2,
		"name": "Desert Brown & Tan",
		"original_price": "140",
		"sale_price": "0",
		"default?": 0,
		"photos": [
  			{
					"thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
			],
		"skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
			//...
            	}
	},
  // ...
}
```



### Related Products

Returns the id's of products related to the product specified.

`GET /products/:product_id/related`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
[
  2,
  3,
  8,
  7
],
```

## More Tools

- [k6](https://k6.io/)
  - Local Load testing
  - Cloud load testing
  - Run tests:
  `$ k6 run resources/k6-tests/k6-script.js`

- [Loader.io](https://loader.io/)
  - Cloud load testing

