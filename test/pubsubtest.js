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
    db   : 6
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

    ///////////// 并发加锁测试 /////////////////
    // let update = async () => {
    //
    //     let lock = null;
    //     try {
    //         lock = await autoCache.redlock.lock('lock:redis-pot-test', 1000) // 这种写法取不到锁时会直接抛出错误
    //     } catch (error) {
    //         try {
    //             lock = await autoCache.redlock.lock('lock:redis-pot-test', 1000)
    //         } catch (e) {
    //             lock = null;
    //             console.error(e);
    //         }
    //     }
    //
    //     // 处理逻辑
    //     let roomNum = await autoCache.get('redis-pot-test') || 0;
    //     if (roomNum > 0) {
    //         roomNum--;
    //         await autoCache.set('redis-pot-test', null, roomNum, 10 * 60);
    //         console.log(roomNum);
    //     }
    //
    //     if (lock) lock.unlock();
    // };
    //
    // for (let i = 0; i < 5; i++) {
    //     update();
    //     update();
    //     update();
    //     update();
    // }

})();