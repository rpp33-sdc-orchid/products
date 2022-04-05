-- DROP DATABASE IF EXISTS sdc_products;
-- CREATE DATABASE sdc_products;


-- -- products
-- DROP TABLE IF EXISTS products CASCADE;

-- CREATE TABLE products (
--   id SERIAL,
--   name TEXT NOT NULL,
--   slogan TEXT,
--   description TEXT,
--   category TEXT,
--   default_price INT,
--   PRIMARY KEY (id)
-- );

-- COPY products (id, name, slogan, description, category, default_price)
-- FROM '/Users/elainecheng/Documents/products/clean_data/product.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- products


-- -- styles
-- DROP TABLE IF EXISTS styles CASCADE;

-- CREATE TABLE styles (
--   style_id SERIAL,
--   product_id INT NOT NULL,
--   name TEXT,
--   sale_price TEXT,
--   original_price TEXT ,
--   defaults BOOLEAN DEFAULT TRUE,
--   PRIMARY KEY (style_id)
-- );

-- COPY styles (style_id, product_id, name, sale_price, original_price, defaults)
-- FROM '/Users/elainecheng/Documents/products/clean_data/styles.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- styles


-- -- photos
-- DROP TABLE IF EXISTS photos CASCADE;

-- CREATE TABLE photos (
--   photo_id SERIAL,
--   style_id INT NOT NULL,
--   thumbnail_url TEXT,
--   url TEXT,
--   PRIMARY KEY (photo_id)
-- );

-- COPY photos (photo_id, style_id, thumbnail_url, url)
-- FROM '/Users/elainecheng/Documents/products/clean_data/photos.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- photos


-- -- skus
-- DROP TABLE IF EXISTS skus CASCADE;

-- CREATE TABLE skus (
--   skus_id SERIAL,
--   style_id INT NOT NULL,
--   size VARCHAR(10),
--   quantity INT,
--   PRIMARY KEY (skus_id)
-- );

-- COPY skus (skus_id, style_id, size, quantity)
-- FROM '/Users/elainecheng/Documents/products/clean_data/skus.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- skus


-- -- features
-- DROP TABLE IF EXISTS features CASCADE;

-- CREATE TABLE features (
--   feature_id SERIAL,
--   product_id INT NOT NULL,
--   feature TEXT,
--   value TEXT,
--   PRIMARY KEY (feature_id)
-- );

-- COPY features (feature_id, product_id, feature, value)
-- FROM '/Users/elainecheng/Documents/products/clean_data/features.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- features


-- -- related
-- DROP TABLE IF EXISTS related CASCADE;

-- CREATE TABLE related (
--   related_id SERIAL,
--   product_id INT NOT NULL,
--   related_product_id INT,
--   PRIMARY KEY (related_id)
-- );

-- COPY related (related_id, product_id, related_product_id)
-- FROM '/Users/elainecheng/Documents/products/clean_data/related.csv'
-- WITH DELIMITER ',' CSV HEADER;
-- -- related


-- -- foreign keys
-- ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE photos ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
-- ALTER TABLE skus ADD FOREIGN KEY (style_id) REFERENCES styles (style_id);
-- ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE related ADD FOREIGN KEY (product_id) REFERENCES products (id);

-- DROP INDEX idx_style;
-- DROP INDEX idx_feature;
-- DROP INDEX idx_related_product;
-- DROP INDEX idx_photo;
-- DROP INDEX idx_sku;

-- CREATE INDEX idx_style ON styles(product_id);
-- CREATE INDEX idx_feature ON features(product_id);
-- CREATE INDEX idx_related_product ON related(product_id);
-- CREATE INDEX idx_photo ON photos(style_id);
-- CREATE INDEX idx_sku ON skus(style_id);

