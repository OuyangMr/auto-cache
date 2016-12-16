/**
 * Created by matri on 2016-12-16.
 */
'use strict';

const AutoCache      = require('../');
const RedisStore = AutoCache.RedisStore;

const store     = new RedisStore({
    host: '10.0.0.202',
    port: 6379,
    opts: {
        auth_pass: 'redispwd'
    },
    db  : 10
});
const autoCache = new AutoCache({store: store, ttl: 7 * 24 * 60 * 60});
//
autoCache.get('clear1', function (cb) {
        cb(11);
    }, 20)
    .then(function (data) {
        console.log(data);
    })
    .catch(function (e) {
        console.error(e);
    });

autoCache.get('clear1')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (e) {
        console.error(e);
    });

autoCache.removeByRegex('.+');
