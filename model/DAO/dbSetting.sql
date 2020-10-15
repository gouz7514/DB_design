/********************************
* 	     Database Design        *
*         TEAM: KIMCHI          *
* first create by HoCheol, Nam  *
*       c.date: 2020.10.08      *
*   email: hcnam@dankook.ac.kr  *
*  MySQL based Scheme design   
********************************/
/********************************
* edit by :                      
* date    :                      
* email   :                      
* comment :                      
*********************************/ 

# Create Schema for project
DROP DATABASE IF EXISTS `kimchi`;
CREATE DATABASE `kimchi`;

# create user table
DROP TABLE IF EXISTS `kimchi`.`user`;
CREATE TABLE `kimchi`.`user` (
  `id` VARCHAR(15) NOT NULL,
  `password` VARCHAR(32) NOT NULL, # md5
  `nickname` VARCHAR(20) NOT NULL,
  `name` VARCHAR(14) NOT NULL,
  `email` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC));
  
insert into `kimchi`.`user`(`id`, `password`, `nickname`, `name`, `email` )
values 
('admin','P@ssw0rd','관리자임','관리자', 'aaaa@gmail.com');

# create show_info table
DROP TABLE IF EXISTS `kimchi`.`show_info`;
CREATE TABLE `kimchi`.`show_info` (
  `show_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `country` VARCHAR(50) NULL,
  `data_added` DATE NULL,
  `release_year` INT NOT NULL,
  `duration`  VARCHAR(45) NOT NULL,
  `poster` VARCHAR(50) NULL, # path of poster img 
  PRIMARY KEY (`show_id`),
  UNIQUE INDEX `show_id_UNIQUE` (`show_id` ASC));
  
# create director table
DROP TABLE IF EXISTS `kimchi`.`director`;
CREATE TABLE `kimchi`.`director` (
  `director_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birth` VARCHAR(20) NULL,
  `death` VARCHAR(20) NULL,
  `description` BLOB(2000) NULL,
  PRIMARY KEY (`director_id`),
  UNIQUE INDEX `director_id_UNIQUE` (`director_id` ASC));
  
# create director table
DROP TABLE IF EXISTS `kimchi`.`actor`;
CREATE TABLE `kimchi`.`actor` (
  `actor_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birth` VARCHAR(20) NULL,
  `death` VARCHAR(20) NULL,
  `description` BLOB(2000) NULL,
  PRIMARY KEY (`actor_id`),
  UNIQUE INDEX `actor_id_UNIQUE` (`actor_id` ASC));
  
# create director relation table
DROP TABLE IF EXISTS `kimchi`.`show_director`;
CREATE TABLE `kimchi`.`show_director` (
  `show_id` INT NOT NULL,
  `director_id` INT NOT NULL,
  PRIMARY KEY (`show_id`,`director_id`),
  CONSTRAINT `FK_SHOW_ID_SHOWDIRECTOR`
    FOREIGN KEY (`show_id`) REFERENCES `kimchi`.`show_info` (`show_id`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_DIRECTOR_ID_SHOWDIRECTOR`
    FOREIGN KEY (`director_id`) REFERENCES `kimchi`.`director` (`director_id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create actor relation table
DROP TABLE IF EXISTS `kimchi`.`show_actor`;
CREATE TABLE `kimchi`.`show_actor` (
  `show_id` INT NOT NULL,
  `actor_id` INT NOT NULL,
  PRIMARY KEY (`show_id`,`actor_id`),
  CONSTRAINT `FK_SHOW_ID_SHOWACTOR`
    FOREIGN KEY (`show_id`) REFERENCES `kimchi`.`show_info` (`show_id`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ACTOR_ID_SHOWACTOR`
    FOREIGN KEY (`actor_id`) REFERENCES `kimchi`.`actor` (`actor_id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create board table
DROP TABLE IF EXISTS `kimchi`.`board`;
CREATE TABLE `kimchi`.`board` (
  `article_no` INT NOT NULL AUTO_INCREMENT,
  `show_id` INT NOT NULL,
  `user_id` CHAR(15) NOT NULL,
  `title` CHAR(40) NOT NULL,
  `body` BLOB(2000) NOT NULL,
  `rating` FLOAT NOT NULL,
  `like` INT default 0,
  PRIMARY KEY (`article_no`),
  CONSTRAINT `FK_USER_ID_BOARD`
    FOREIGN KEY (`user_id`) REFERENCES `kimchi`.`user` (`id`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_SHOW_ID_BOARD`
    FOREIGN KEY (`show_id`) REFERENCES `kimchi`.`show_info` (`show_id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create comment table
DROP TABLE IF EXISTS `kimchi`.`comment`;
CREATE TABLE `kimchi`.`comment` (
  `commnet_no` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(15) NOT NULL,
  `article_no` INT NOT NULL,
  `comment` CHAR(200) NOT NULL,
  PRIMARY KEY (`commnet_no`),
  CONSTRAINT `FK_ARTICLE_NO_COMMENT`
    FOREIGN KEY (`article_no`) REFERENCES `kimchi`.`board` (`article_no`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USER_ID_COMMENT`
    FOREIGN KEY (`user_id`) REFERENCES `kimchi`.`user` (`id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create like table 
DROP TABLE IF EXISTS `kimchi`.`like`;
CREATE TABLE `kimchi`.`like` (
  `article_no` INT NOT NULL,
  `user_id` CHAR(15) NOT NULL,
  PRIMARY KEY (`article_no`, `user_id`),
  CONSTRAINT `FK_ARTICLE_NO_LIKE`
    FOREIGN KEY (`article_no`) REFERENCES `kimchi`.`board` (`article_no`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USER_ID_LIEK`
    FOREIGN KEY (`user_id`) REFERENCES `kimchi`.`user` (`id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

  