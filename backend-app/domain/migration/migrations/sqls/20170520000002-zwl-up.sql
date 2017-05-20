/* Replace with your SQL commands */
use moheweb;
ALTER TABLE collections DROP parent_id;
ALTER TABLE collections ADD catalogNum VARCHAR(14) NOT NULL  COMMENT '共14位 类型01  文章类型 图书ID 001, 一级目录 001, 二级目录 001, 三级目录 001';
ALTER TABLE collections ADD INDEX catalogNum_index (catalogNum);
ALTER TABLE forums DROP relateCollectionId;
ALTER TABLE forums ADD relateCatalogNum VARCHAR(14) NOT NULL  COMMENT '共11位  文章类型 图书ID 000, 一级目录 000, 二级目录 000, 三级目录 000';
ALTER TABLE forums ADD INDEX relateCN_index (relateCatalogNum);

CREATE TABLE catalog(
  catalogNum VARCHAR(14) NOT NULL  COMMENT '共14位 类型01  文章类型 图书ID 001, 一级目录 001, 二级目录 001, 三级目录 001',
  title VARCHAR(32) NOT NULL  COMMENT '文章标题->目录标题',
  introduction VARCHAR(128) NOT NULL COMMENT '文章简介->目录简介',
  collection_type VARCHAR(16) NOT NULL  COMMENT 'collections类型(BOOK : 跟我读书, SERIALIZE : 连载教程, BLOG : 编程日志)',
  displayOrder INT NOT NULL COMMENT '显示顺序',
  articleId INT NOT NULL COMMENT '文章id',
  createdAt TIMESTAMP  NOT NULL  DEFAULT '0000-00-00 00:00:00' COMMENT '创建时间',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  COMMENT '创建时间',
  PRIMARY KEY(catalogNum),
  INDEX(displayOrder),
  INDEX(articleId)
);

