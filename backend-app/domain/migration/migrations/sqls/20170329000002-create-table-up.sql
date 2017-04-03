/* Replace with your SQL commands */
/*CREATE DATABASE moheweb DEFAULT CHARSET utf8 COLLATE utf8_general_ci;*/
use moheweb;
/*创建user表, role是ADMIN的时候,共管理员登录,默认是USER*/
CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT COMMENT '用户表主键',
  name VARCHAR(32) NOT NULL  COMMENT '用户名/昵称',
  password VARCHAR(64)  COMMENT '加密密码',
  role VARCHAR(16)  DEFAULT 'USER' COMMENT '目前两种简单角色: ADMIN, USER',
  createdAt TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  INDEX(name),
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
  user_id INT NOT NULL COMMENT '作者',
  title  VARCHAR(32) NOT NULL  COMMENT '书名/连载教程名/日志标题(限长32个中文字符带标点符号)',
  introduction VARCHAR(128) NOT NULL  COMMENT '引言(展示缩略图旁边,限长128个中文字符代表点符号)',
  image VARCHAR (128) NOT NULL  COMMENT '封面图片',
  content TEXT NOT NULL  COMMENT '正文',
  read_count INT NOT NULL  COMMENT '查看个数',
  type VARCHAR(16) NOT NULL  COMMENT 'collections类型(BOOK : 跟我读书, SERIALIZE : 连载教程, BLOG : 编程日志)',
  parent_id INT NOT NULL COMMENT '自关联ID,父id为-1代表顶层文章,最大只支持三级标题',
  key_word VARCHAR (256) NOT NULL COMMENT 'SEO 优化',
  createdAt TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX(user_id),
  INDEX(title),
  INDEX(read_count),
  INDEX(type),
  INDEX(parent_id)
);
/*
  每篇文章下面的观点,或者在 [墨荷问答] 中单独创建topic
   > 而且一旦发表完观点,不允许修改和删除
*/
CREATE TABLE topic(
  id INT NOT NULL AUTO_INCREMENT  COMMENT '主键',
  user_id INT NOT NULL COMMENT '作者',
  source_id INT COMMENT '来源可以是 [跟我读书]/[连载教程]/[编程日志]中的文章(此时source_id指向 collections),也可以是[墨荷问答] 里的(此时source_id为空)',
  title  VARCHAR(32) NOT NULL  COMMENT '书名/连载教程名/日志标题(限长32个中文字符带标点符号)',
  content VARCHAR(1024) NOT NULL COMMENT '观点内容,最长1024',
  createdAt TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX(source_id),
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
  createdAt TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (topic_id) REFERENCES topic(id),
  INDEX(user_id)
);
