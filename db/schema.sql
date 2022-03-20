-- DROP DATABASE IF EXISTS sdc_products;
-- CREATE DATABASE sdc_products;

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS styles CASCADE;

CREATE TABLE styles (
  style_id SERIAL,
  product_id INT NOT NULL,
  name TEXT,
  original_price INT,
  sale_price INT,
  "defaults?" BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
  photo_id SERIAL,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  url TEXT,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE skus (
  skus_id SERIAL,
  style_id INT NOT NULL,
  quantity TEXT,
  size VARCHAR(10),
  PRIMARY KEY (skus_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE features (
  feature_id SERIAL,
  product_id INT NOT NULL,
  feature TEXT,
  value TEXT,
  PRIMARY KEY (feature_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

DROP TABLE IF EXISTS related CASCADE;

CREATE TABLE related (
  related_id SERIAL,
  product_id INT NOT NULL,
  related_product_id INT,
  PRIMARY KEY (related_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);


-- ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
-- ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
