/* Replace with your SQL commands */
/*CREATE DATABASE moheweb DEFAULT CHARSET utf8 COLLATE utf8_general_ci;*/

USE moheWeb;
DROP TABLE catalog ;
ALTER TABLE collections ADD parent_id INT ;
ALTER TABLE collections ADD INDEX parent_id_index (parent_id);
