-- ---
-- Globals
-- ---

DROP DATABASE IF EXISTS qanda;

CREATE DATABASE qanda;

USE qanda;

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS `Products`;

CREATE TABLE `Products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Questions'
--
-- ---

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE `Questions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NULL DEFAULT NULL,
  `body` VARCHAR(1000) NULL DEFAULT NULL,
  `date_written` DATE NULL DEFAULT NULL,
  `asker_name` VARCHAR(60) NULL DEFAULT NULL,
  `asker_email` VARCHAR(60) NULL DEFAULT NULL,
  `reported` TINYINT NULL DEFAULT NULL,
  `helpful` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE `Answers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `question_id` INTEGER NULL DEFAULT NULL,
  `body` VARCHAR(1000) NULL DEFAULT NULL,
  `date_written` DATE NULL DEFAULT NULL,
  `answerer_name` VARCHAR(60) NULL DEFAULT NULL,
  `answerer_email` VARCHAR(60) NULL DEFAULT NULL,
  `reported` TINYINT NULL DEFAULT NULL,
  `helpful` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `answer_id` INTEGER NULL DEFAULT NULL,
  `url` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `Questions` ADD FOREIGN KEY (product_id) REFERENCES `Products` (`id`);
-- ALTER TABLE `Answers` ADD FOREIGN KEY (question_id) REFERENCES `Questions` (`id`);
-- ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Questions` (`id`,`product_id`,`body`,`date_written`,`asker_name`,`asker_email`,`reported`,`helpful`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Answers` (`id`,`question_id`,`body`,`date_written`,`answerer_name`,`answerer_email`,`reported`,`helpful`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `Photos` (`id`,`answer_id`,`url`) VALUES
-- ('','','');

-- ---
-- Load Data
-- ---

-- ---
-- Load 'Products'
--
-- ---

LOAD DATA LOCAL INFILE './csv/product_clean.csv' INTO TABLE Products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (id, name)
SET id=id, name=name;

-- UPDATE products SET name = REPLACE (name, '0', '');
-- UPDATE products SET name = REPLACE (name, '5', '');
-- UPDATE products SET name = REPLACE (name, '  ', ' ');

-- ---
-- Load 'Questions'
--
-- ---

LOAD DATA LOCAL INFILE './csv/questions_clean.csv' INTO TABLE Questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (id, product_id, body, @var1, asker_name, asker_email, reported, helpful)
SET date_written=FROM_UNIXTIME(@var1/1000);

-- DELETE FROM questions WHERE asker_email='0';

-- DELETE FROM questions WHERE NOT EXISTS (SELECT * FROM products AS t1 WHERE t1.id = questions.product_id);
ALTER TABLE `Questions` ADD FOREIGN KEY (product_id) REFERENCES `Products` (`id`);

-- ---
-- Load 'Answers'
--
-- ---

LOAD DATA LOCAL INFILE './csv/answers_clean.csv' INTO TABLE Answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (id, question_id, body, @var1, answerer_name, answerer_email, reported, helpful)
SET date_written=FROM_UNIXTIME(@var1/1000);

-- DELETE FROM questions WHERE answerer_email='0';

-- DELETE FROM answers WHERE NOT EXISTS (SELECT * FROM questions AS t1 WHERE t1.id = answers.question_id);
ALTER TABLE `Answers` ADD FOREIGN KEY (question_id) REFERENCES `Questions` (`id`);

-- ---
-- Load 'Photos'
--
-- ---

LOAD DATA LOCAL INFILE './csv/answers_photos_clean.csv' INTO TABLE Photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (id, answer_id, url)
SET id=id, answer_id=answer_id, url=url;

-- DELETE FROM photos WHERE url IS NULL;

-- DELETE FROM photos WHERE NOT EXISTS (SELECT * FROM answers AS t1 WHERE t1.id = photos.answer_id);
ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`id`);
