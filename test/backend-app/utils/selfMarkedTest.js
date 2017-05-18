/**
 * Created by zhouwanli on 18/05/2017.
 */
'use strict';
const selfMarked = require('../../../backend-app/utils/selfMarked');

var a = selfMarked.marked('| 项目        | 价格   |  数量  |\n'+
    '| --------   | -----:  | :----:  |\n'+
'| 计算机     | \$1600 |   5     |\n'+
'| 手机        |   \$12   |   12   |\n'+
'| 管线        |    \$1    |  234  |', {renderer: selfMarked.render});

console.log(a)