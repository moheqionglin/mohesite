/* Replace with your SQL commands */
/*CREATE DATABASE moheweb DEFAULT CHARSET utf8 COLLATE utf8_general_ci;*/
use moheweb;
/*创建user表, role是ADMIN的时候,共管理员登录,默认是USER*/
/*1.0版本 用户权限只支持单权限,2.0扩展用户权限*/
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT COMMENT '用户表主键',
  email VARCHAR(64) NOT NULL UNIQUE COMMENT '注册用户邮箱',
  name VARCHAR(32) NOT NULL  COMMENT '用户名/昵称',
  password VARCHAR(64)  COMMENT '加密密码',
  image VARCHAR(128) NOT NULL COMMENT '用户头像',
  role VARCHAR(16) NOT NULL COMMENT '目前两种简单角色: ADMIN, GUEST',
  createdAt TIMESTAMP  NOT NULL  COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(name),
  INDEX(email),
  INDEX(role)
);
/*创建集合, 跟我读书>每本书就是一个集合, 连载教程>每个教程就是一个集合*/
/*创建集合, 每个集合文章内容,最多支持 三级标题*/
/* parent_id = -1 type = 'BOOK' [跟我读书 二级导航]
   parent_id = -1 type = 'SERIALIZE' [连载教程 二级导航]
   parent_id = -1 type = 'BLOG' [编程日志 二级导航]
*/
CREATE TABLE collections(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '表主键',
  title  VARCHAR(32) NOT NULL  COMMENT '书名/连载教程名/日志标题(限长32个中文字符带标点符号)',
  introduction VARCHAR(128) NOT NULL  COMMENT '引言(展示缩略图旁边,限长128个中文字符代表点符号)',
  image VARCHAR (128) NOT NULL  COMMENT '封面图片',
  content TEXT NOT NULL  COMMENT '正文',
  read_count INT NOT NULL  COMMENT '查看个数',
  collection_type VARCHAR(16) NOT NULL  COMMENT 'collections类型(BOOK : 跟我读书, SERIALIZE : 连载教程, BLOG : 编程日志)',
  parent_id INT NOT NULL COMMENT '自关联ID,父id为-1代表顶层文章,最大只支持三级标题',
  key_word VARCHAR (256) NOT NULL COMMENT 'SEO 优化',
  status TINYINT(1) NOT NULL DEFAULT '1'  COMMENT '状态1 or 0',
  createdAt TIMESTAMP  NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(title),
  INDEX(read_count),
  INDEX(collection_type),
  INDEX(parent_id),
  INDEX(status)
);
/*
  每篇文章下面的观点,或者在 [墨荷问答] 中单独创建topic
   > 而且一旦发表完观点,不允许修改和删除
*/
CREATE TABLE topic(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键',
  user_id INT NOT NULL COMMENT '作者',
  collection_id INT COMMENT '来源可以是 [跟我读书]/[连载教程]/[编程日志]中的文章(此时source_id指向 collections),也可以是[墨荷问答] 里的(此时source_id为空)',
  title  VARCHAR(32) NOT NULL  COMMENT '书名/连载教程名/日志标题(限长32个中文字符带标点符号)',
  content VARCHAR(1024) NOT NULL COMMENT '观点内容,最长1024',
  createdAt TIMESTAMP  NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(collection_id),
  INDEX(user_id)
);
/*
  topic 表的评论, 评论不可嵌套评论
*/
CREATE TABLE topic_comment(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键',
  user_id INT NOT NULL COMMENT '作者',
  topic_id INT NOT NULL COMMENT 'topic 外键',
  content VARCHAR(1024) NOT NULL COMMENT '评论内容,最长1024',
  createdAt TIMESTAMP  NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(user_id),
  INDEX(topic_id)
);
/*
  topic 表的评论, 评论不可嵌套评论
*/
CREATE TABLE authentication_tokens(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键',
  userId INT NOT NULL COMMENT '用户 ID',
  localToken VARCHAR(37) NOT NULL COMMENT 'local token',
  expiresAt TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '超期时间',
  oauth2AuthId VARCHAR(100) NOT NULL COMMENT 'oauth2 认证ID',
  oauth2AuthToken VARCHAR(128) COMMENT 'oauth2 认证token',
  oauthProvider VARCHAR(10) COMMENT 'oauth2 认证机构 weibo/weixin',
  createdAt TIMESTAMP  NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(userId),
  INDEX(localToken)
);
