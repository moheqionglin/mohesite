/* Replace with your SQL commands */
use moheweb;
CREATE TABLE forums(
  id INT NOT NULL AUTO_INCREMENT COMMENT '论坛表主键',
  title VARCHAR(32) NOT NULL  COMMENT '论坛标题',
  description VARCHAR(128)  COMMENT '论坛简介',
  createdAt TIMESTAMP  NOT NULL  DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id)
);
ALTER TABLE topic ADD forumId INT not null;
ALTER TABLE topic ADD INDEX forumId_index (forumId);
ALTER TABLE forums change description introduction varchar(128);
