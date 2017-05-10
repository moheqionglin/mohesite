/**
 * Created by zhouwanli on 08/05/2017.
 */
'use strict';
const Sequelize = require('sequelize');
const env = process.env.MOHE_ENV || 'LOCAL';

var sequelize = null;
var config = null;
if('PROD' === env){
    config = {
        database: process.env.PRODUCTION_DB, // 使用哪个数据库
        username: process.env.PRODUCTION_USERNAME, // 用户名
        password: process.env.PRODUCTION_PASSWORD, // 口令
        host: process.env.PRODUCTION_DB_HOST, // 主机名
        port: 3306 // 端口号，MySQL默认3306
    };
}else{
    config = require('./dbConf');
}
var pswd = '' === config.password ? null : config.password;
sequelize = new Sequelize(config.database, config.username, config.password,
    {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 5,
            idle: 10000
        }
    });
module.exports = sequelize;