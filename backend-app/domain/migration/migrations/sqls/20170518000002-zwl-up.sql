/* Replace with your SQL commands */
use moheweb;
ALTER TABLE forums ADD relateCollectionId INT ;
ALTER TABLE forums ADD INDEX relatec_index (relateCollectionId);
