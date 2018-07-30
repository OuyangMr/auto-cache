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
Store.prototype.remove = function (key, field) {
    throw new ErrorNotImplemented();
};

/**
 * remove data by regex key
 */
Store.prototype.removeByRegex = function (regex) {
    throw new ErrorNotImplemented();
};

/**
 * publish data
 */
Store.prototype.pub = function (channel, field, data) {
    throw new ErrorNotImplemented();
};

/**
 * subscribe data
 */
Store.prototype.sub = function (channel, field) {
    throw new ErrorNotImplemented();
};

/**
 * 设置缓存数据
 * @param key
 * @param field
 * @param data
 * @param ttl
 */
Store.prototype.set = function (key, field, data, ttl) {
    throw new ErrorNotImplemented();
};

/**
 * 获取缓存数据
 * @param key
 * @param field
 * @returns {*}
 */
Store.prototype.get = function (key, field) {
    throw new ErrorNotImplemented();
};

exports.Store = Store;


