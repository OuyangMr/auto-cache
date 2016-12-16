/**
 * Created by matri on 2016-12-16.
 */
'use strict';

let AutoCache = require('../');
let autoCache = new AutoCache();
autoCache.test();
autoCache.test();
AutoCache = require('../');
autoCache.test();
autoCache = new AutoCache();
autoCache.test();
//
autoCache.get('clear1', function (cb) {
        cb(11);
    }, 5)
    .then(function (data) {
        console.log('get cache data:' + data);
    })
    .catch(function (e) {
        console.error(e);
    });

autoCache.get('clear1')
    .then(function (data) {
        console.log('get cache data:');
    })
    .catch(function (e) {
        console.error(e);
    });