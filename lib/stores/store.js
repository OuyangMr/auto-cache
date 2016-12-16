/**
 * Created by matri on 2016-12-16.
 */

'use strict';

function Store() {
    /**
     * Module dependencies.
     * @private
     */
    
}


/**
 * clear all data
 */
Store.prototype.clear = function () {
    throw new ErrorNotImplemented();
};

/**
 * remove data by key
 */
Store.prototype.remove = function (hash, key) {
    throw new ErrorNotImplemented();
};

/**
 * remove data by regex key
 */
Store.prototype.removeByRegex = function (regex) {
    throw new ErrorNotImplemented();
};

/**
 * 设置缓存数据
 * @param hash
 * @param key
 * @param data
 * @param ttl
 */
Store.prototype.set = function (hash, key, data, ttl) {
    throw new ErrorNotImplemented();
};

/**
 * 获取缓存数据
 * @param hash
 * @param key
 * @returns {*}
 */
Store.prototype.get = function (hash, key) {
    throw new ErrorNotImplemented();
};

exports.Store = Store;


