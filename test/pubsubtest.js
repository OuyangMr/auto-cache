'use strict';

const AutoCache  = require('../');
const RedisStore = AutoCache.RedisStore;

const store     = new RedisStore({
    host : '114.55.27.236',
    port : 6779,
    opts : {
        auth_pass: 'test1231'
    },
    scope: 'demo',
    db   : 10
});
const autoCache = new AutoCache({
    store: store,
    ttl  : 24 * 60 * 60
});

(async () => {

    autoCache.sub('city1001', (data, channel) => {
        console.log(data.city + ' is great');
        console.log(channel);
    });
    autoCache.sub('city:*', (data, channel) => {
        console.log(data.city + ' is');
        console.log(channel);
    });

    setTimeout(() => {
        autoCache.pub('city', 1002, {city: 'ttttsss'});
        autoCache.pub('city1001', {city: 'ttttsss222'});
    }, 100);

})();