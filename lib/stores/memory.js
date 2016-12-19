/**
 * Created by matri on 2016-12-16.
 */

'use strict';

/**
 * Imports
 */
const util = require('util');
const base = require('./store');

function MemoryStore() {
    base.Store.call(this);
    this.caches = {};
}

util.inherits(MemoryStore, base.Store);

/**
 * clear all data
 */
MemoryStore.prototype.clear = function () {
    let count   = this.caches.length;
    this.caches = {};
    return count;
};

/**
 * remove data by key
 */
MemoryStore.prototype.remove = function (hash, key) {
    if (!!key) {
        hash += '-' + key;
    }
    delete this.caches[hash];
};

/**
 * remove data by regex key
 */
MemoryStore.prototype.removeByRegex = function (regex) {
    for(var key in this.caches){
        if (key.match(regex)) {
            delete this.caches[key];
        }
    }
};

/**
 * 设置缓存数据
 * @param hash
 * @param key
 * @param data
 * @param ttl
 */
MemoryStore.prototype.set = function (hash, key, data, ttl) {
    if (ttl === null || ttl === undefined) {
        ttl  = data;
        data = key;
        key  = null;
    }
    if (!!key) {
        hash += '-' + key;
    }

    return new Promise((resolve, reject) => {
        let cache        = {data: data};
        cache.updateTime = Date.now();
        if (Number(ttl) > 0) {
            cache.ttl = Number(ttl);
        }
        this.caches[hash] = cache;
        resolve(data);
    });
};

/**
 * 获取缓存数据
 * @param hash
 * @param key
 * @returns {*}
 */
MemoryStore.prototype.get = function (hash, key) {
    if (!!key) {
        hash += '-' + key;
    }
    return new Promise((resolve, reject) => {
        let cache = this.caches[hash];
        if (!cache) {
            resolve(null);
            return;
        }
        let ttl = cache.ttl || 0;
        if ((Date.now() - cache.updateTime) >= ttl*1000) {
            resolve(null);
        }
        else {
            resolve(cache.data || null);
        }
    });
};

module.exports = MemoryStore;
