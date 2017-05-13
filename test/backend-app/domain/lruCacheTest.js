/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
const cache = require('../../../backend-app/domain/cache/lruCache')();

console.log(cache.get('k2'))