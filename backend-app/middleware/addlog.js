/**
 * Created by zhouwanli on 18/04/2017.
 */
'use strict';
const log4js = require('log4js');

var initLog = function(server){
    log4js.configure('log4js.json', { reloadSecs: 300, cwd: __dirname });
    server.use(log4js.connectLogger(log4js.getLogger("app"), { level: 'auto' }));
}

module.exports = initLog;