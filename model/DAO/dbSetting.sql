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

USE `kimchi`;

# create user table
DROP TABLE IF EXISTS `kimchi`.`user`;
CREATE TABLE `kimchi`.`user` (
  `id` VARCHAR(15) NOT NULL,
  `password` VARCHAR(128) NOT NULL, # SHA512
  `nickname` VARCHAR(20) NOT NULL,
  `name` VARCHAR(14) NOT NULL,
  `email` VARCHAR(50) NULL,
  `salt` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC));
  
## add administrator and test user.
insert into `kimchi`.`user`
values
('admin', '8671769cbee084cf21e2854f38f751211ae94c35273763665003dbe2ef50b205bab0497f13feeeb19c9f448c17f8118094ac6a0765e59ee10ef9bded7213aa8d', 
'관리자', '관리자', 'admin@신김치.com', '746643562609'),
('user', 'dfee98a3c20ae10f8bd7159c9b50d491b0f01237bd83848f5f5f14dbb72ac8fe770b0a9d2de3ee046c0bea245d66ba60835bc762bf679596ab63370275e986ff', 
'테스트 유저', '테스트 유저', 'test@kimchi.com', '1524977164622');

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
  `poster` VARCHAR(100) NULL, # path of poster img 
  `description` TEXT NULL,
  PRIMARY KEY (`show_id`),
  UNIQUE INDEX `show_id_UNIQUE` (`show_id` ASC));
  
# create director table
DROP TABLE IF EXISTS `kimchi`.`director`;
CREATE TABLE `kimchi`.`director` (
  `director_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birth` VARCHAR(20) NULL,
  `death` VARCHAR(20) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`director_id`),
  UNIQUE INDEX `director_id_UNIQUE` (`director_id` ASC))ENGINE=InnoDB AUTO_INCREMENT=0;
  
# create director table
DROP TABLE IF EXISTS `kimchi`.`actor`;
CREATE TABLE `kimchi`.`actor` (
  `actor_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `birth` VARCHAR(20) NULL,
  `death` VARCHAR(20) NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`actor_id`),
  UNIQUE INDEX `actor_id_UNIQUE` (`actor_id` ASC))ENGINE=InnoDB AUTO_INCREMENT=0;
  
# create director relation table
DROP TABLE IF EXISTS `kimchi`.`show_director`;
CREATE TABLE `kimchi`.`show_director` (
  `show_id` INT NOT NULL,
  `director_id` INT NOT NULL default 0,
  PRIMARY KEY (`show_id`,`director_id`),
  CONSTRAINT `FK_SHOW_ID_SHOWDIRECTOR`
    FOREIGN KEY (`show_id`) REFERENCES `kimchi`.`show_info` (`show_id`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_DIRECTOR_ID_SHOWDIRECTOR`
    FOREIGN KEY (`director_id`) REFERENCES `kimchi`.`director`(`director_id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create actor relation table
DROP TABLE IF EXISTS `kimchi`.`show_actor`;
CREATE TABLE `kimchi`.`show_actor` (
  `show_id` INT NOT NULL,
  `actor_id` INT NOT NULL default 0,
  PRIMARY KEY (`show_id`,`actor_id`),
  CONSTRAINT `FK_SHOW_ID_SHOWACTOR`
    FOREIGN KEY (`show_id`) REFERENCES `kimchi`.`show_info`(`show_id`)
		ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ACTOR_ID_SHOWACTOR`
    FOREIGN KEY (`actor_id`) REFERENCES `kimchi`.`actor`(`actor_id`)
		ON DELETE CASCADE ON UPDATE CASCADE);

# create board table
DROP TABLE IF EXISTS `kimchi`.`board`;
CREATE TABLE `kimchi`.`board` (
  `article_no` INT NOT NULL AUTO_INCREMENT,
  `show_id` INT NOT NULL,
  `user_id` CHAR(15) NOT NULL,
  `title` CHAR(40) NOT NULL,
  `body` TEXT NOT NULL,
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
        

DROP PROCEDURE IF EXISTS SearchWithTitle;
DELIMITER //
 CREATE PROCEDURE SearchWithTitle(IN str VARCHAR(100))
   BEGIN
	SELECT `article_no`, `title`, `user_id`
    FROM `kimchi`.`board` 
    WHERE `show_id` IN (SELECT `show_id` 
						FROM `kimchi`.`show_info` 
						WHERE `title` LIKE str);
   END //
DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteLike;
DELIMITER //
 CREATE PROCEDURE DeleteLike(IN uid VARCHAR(15), IN ano INT)
   BEGIN
	DECLARE err INT default '0'; 
    DECLARE continue handler for SQLEXCEPTION set err = -1; 
    
    START TRANSACTION;
		DELETE FROM `kimchi`.`like` WHERE article_no = ano AND user_id = uid; 
		UPDATE `kimchi`.`board` SET `like` = `like` - 1 WHERE article_no = ano;
	IF err < 0 THEN 
		ROLLBACK; 
	ELSE 
		COMMIT; 
	END IF;
   END //
DELIMITER ;

DROP PROCEDURE IF EXISTS AddLike;
DELIMITER //
 CREATE PROCEDURE AddLike(IN uid VARCHAR(15), IN ano INT)
   BEGIN
	DECLARE err INT default '0'; 
    DECLARE continue handler for SQLEXCEPTION set err = -1; 

    START TRANSACTION;
		INSERT INTO `kimchi`.`like` VALUES (ano, uid); 
		UPDATE `kimchi`.`board` SET `like` = `like` + 1 WHERE article_no = ano;
	IF err < 0 THEN 
		ROLLBACK; 
	ELSE 
		COMMIT; 
	END IF;
   END //
DELIMITER ;

