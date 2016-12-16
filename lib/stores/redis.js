/**
 * Created by matri on 2016-12-16.
 */

'use strict';

/**
 * Imports
 */
const util  = require('util');
const redis = require('redis');
const base  = require('./store');

function RedisStore(opts) {
    base.Store.call(this);
    let db       = opts.db || 0;
    let dbClient = redis.createClient(opts.port, opts.host, opts.opts);
    dbClient.select(db, (error, data) => {
        if (!!error) {
            console.error(error);
        }
    });
    
    this.db       = db;
    this.dbClient = dbClient;
}

util.inherits(RedisStore, base.Store);

/**
 * clear all data
 */
//RedisStore.prototype.clear = function () {
//
//};

/**
 * remove data by key
 */
RedisStore.prototype.remove = function (hash, key) {
    let self = this;
    return new Promise((resolve, reject) => {
        if (!!key) {
            self.dbClient.del(hash, (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        else {
            self.dbClient.hset(hash, key, '', (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
    });
};

/**
 * remove data by regex key
 // */
//RedisStore.prototype.removeByRegex = function (regex) {
//    caches.forEach((key) => {
//        if (regex.test(key)) {
//            delete caches[key];
//        }
//    });
//};

/**
 * 设置缓存数据
 * @param hash
 * @param key
 * @param data
 * @param ttl
 */
RedisStore.prototype.set = function (hash, key, data, ttl) {
    let self = this;
    return new Promise((resolve, reject) => {
        if (!!key) {
            self.dbClient.hset(hash, key, data || '', (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        else {
            self.dbClient.set(hash, data || '', (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        self.dbClient.expire(hash, ttl);
    });
};

/**
 * 获取缓存数据
 * @param hash
 * @param key
 * @returns {*}
 */
RedisStore.prototype.get = function (hash, key) {
    let self = this;
    return new Promise((resolve, reject) => {
        if (!!key) {
            self.dbClient.hget(hash, key, (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        else {
            self.dbClient.get(hash, (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
    });
};

module.exports = RedisStore;