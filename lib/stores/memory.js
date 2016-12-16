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
    let count   = caches.length;
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
    delete caches[hash];
};

/**
 * remove data by regex key
 */
MemoryStore.prototype.removeByRegex = function (regex) {
    caches.forEach((key) => {
        if (regex.test(key)) {
            delete caches[key];
        }
    });
};

/**
 * 设置缓存数据
 * @param hash
 * @param key
 * @param data
 * @param ttl
 */
MemoryStore.prototype.set = function (hash, key, data, ttl) {
    if (!!key) {
        hash += '-' + key;
    }
    
    let self = this;
    return new Promise((resolve, reject) => {
        let cache        = {data: data};
        cache.updateTime = Date.now();
        if (Number(ttl) > 0) {
            cache.ttl = Number(ttl);
        }
        self.caches[hash] = cache;
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
    let self = this;
    return new Promise((resolve, reject) => {
        let cache = self.caches[hash];
        if (!cache) {
            resolve(null);
            return;
        }
        let ttl = cache.ttl || 0;
        if ((Date.now() - cache.updateTime) >= ttl) {
            resolve(null);
        }
        else {
            resolve(cache.data);
        }
    });
};

module.exports = MemoryStore;