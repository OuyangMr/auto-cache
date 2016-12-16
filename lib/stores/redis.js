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
RedisStore.prototype.clear = function () {
    this.dbUtils.keys('*', (err, keys) => {
        if (!!err) {
            console.error(err);
        }
        else {
            this.dbUtils.del(keys, (err, result) => {
                if (!!err) {
                    console.error(err);
                }
            });
        }
    });
};

/**
 * remove data by key
 */
RedisStore.prototype.remove = function (hash, key) {
    return new Promise((resolve, reject) => {
        if (!!key) {
            this.dbClient.del(hash, (err, res) => {
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
            this.dbClient.hset(hash, key, '', (err, res) => {
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
 */
RedisStore.prototype.removeByRegex = function (regex) {
    this.dbClient.hkeys(regex, (err, keys) => {
        if (!!err) {
            console.error(err);
        }
        else if (keys.length > 0) {
            this.dbClient.del(keys, (err, result) => {
                if (!!err) {
                    console.error(err);
                }
            });
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
RedisStore.prototype.set = function (hash, key, data, ttl) {
    if (ttl === null || ttl === undefined) {
        ttl  = data;
        data = key;
        key  = null;
    }
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        if (!!key) {
            this.dbClient.hset(hash, key, data || '', (err, res) => {
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
            this.dbClient.set(hash, data || '', (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        }
        this.dbClient.expire(hash, ttl);
    });
};

/**
 * 获取缓存数据
 * @param hash
 * @param key
 * @returns {*}
 */
RedisStore.prototype.get = function (hash, key) {
    return new Promise((resolve, reject) => {
        if (!!key) {
            this.dbClient.hget(hash, key, (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    let data = JSON.parse(res);
                    resolve(data || null);
                }
            });
        }
        else {
            this.dbClient.get(hash, (err, res) => {
                if (!!err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    let data = JSON.parse(res);
                    resolve(data || null);
                }
            });
        }
    });
};

module.exports = RedisStore;