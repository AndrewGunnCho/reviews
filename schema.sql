DROP TABLE characteristics_review;
DROP TABLE characteristics;
DROP TABLE photos;
DROP TABLE reviews;


CREATE TABLE reviews (
 id BIGSERIAL,
 product_id INTEGER,
 rating INTEGER,
 date BIGINT,
 summary VARCHAR,
 body VARCHAR,
 recommend BOOLEAN,
 reported BOOLEAN,
 reviewer_name VARCHAR,
 reviewer_email VARCHAR,
 response VARCHAR,
 helpfulness INTEGER
);


CREATE INDEX product_id ON reviews (product_id);


CREATE TABLE photos (
 id BIGSERIAL,
 review_id INTEGER,
 url VARCHAR
);


CREATE INDEX review_id ON photos (review_id);


CREATE TABLE characteristics (
 id BIGSERIAL,
 product_id INTEGER,
 name VARCHAR
);


-- ALTER TABLE characteristics ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);
-- ALTER TABLE characteristics ADD INDEX product_id (product_id);

CREATE TABLE characteristics_review (
 id BIGSERIAL,
 characteristic_id INTEGER,
 review_id INTEGER,
 value INTEGER
);


CREATE INDEX characteristic_id ON characteristics_review (characteristic_id);


ALTER TABLE photos ADD CONSTRAINT photos_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);
ALTER TABLE characteristics_review ADD CONSTRAINT characteristics_review_characteristic_id_fkey FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);
ALTER TABLE characteristics_review ADD CONSTRAINT characteristics_review_review_id_fkey FOREIGN KEY (review_id) REFERENCES reviews(id);