/**
 * Created by matri on 2016-12-16.
 */
'use strict';

const MemoryStore = require('./stores/memory');

module.exports = AutoCache;

function AutoCache(opts) {
    opts               = opts || {};
    let store          = opts.store || new MemoryStore();
    let defaultTTL     = opts.ttl;
    //console.log(this);
    this.showUpdateLog = opts.showUpdateLog || false;
    this.store         = store;
    this.defaultTTL    = defaultTTL;
}

AutoCache.prototype.get = function (hash, key, callback, ttl) {
    if (!hash || typeof(hash) != 'string') {
        console.error('hash must be a string value');
    }
    
    if (typeof(key) == 'function' && !ttl) {
        ttl      = callback;
        callback = key;
        key      = '';
    }
    let self = this;
    ttl      = ttl || this.defaultTTL;
    return new Promise((resolve, reject) => {
        self.store.get(hash, key)
            .then((response) => {
                if ((!response || ttl == 0) && !!callback) {
                    //未缓存数据
                    callback((data) => {
                        if (!data) {
                            resolve();
                            return;
                        }
                        if (ttl == 0) {
                            resolve(data);
                            return;
                        }
                        let _key = hash;
                        if (key != '') {
                            _key += '-' + key;
                        }
                        //获取数据,设置缓存
                        self.store.set(hash, key, data, ttl)
                            .then((data) => {
                                if (!!data && self.showUpdateLog) {
                                    console.log('update data cache:' + _key + ' ,ttl:' + ttl);
                                }
                                resolve(data);
                            })
                            .catch((err) => {
                                console.error('set Data:' + _key + ' failed,err:' + err);
                                resolve(data);
                            });
                    });
                }
                else {
                    resolve(response);
                }
            })
            .catch((e) => {
                reject(e);
            });
    });
};

AutoCache.prototype.remove = function (hash, key) {
    return this.store.remove(hash, key);
};

AutoCache.prototype.removeByRegex = function (hash, regex) {
    return this.store.removeByRegex(hash, regex);
};

AutoCache.prototype.clear = function () {
    return this.store.clear();
};
