/**
 * Created by matri on 2016-12-16.
 */
'use strict';

require('should');

const AutoCache  = require('../');
const RedisStore = AutoCache.RedisStore;

const store     = new RedisStore({
    host: '10.0.0.202',
    port: 6379,
    opts: {
        auth_pass: 'redispwd'
    },
    db  : 10
});
const autoCache = new AutoCache({
    store: store,
    ttl  : 24 * 60 * 60
});


describe("redis test", function () {
    this.timeout(10000);
    describe("get test", function () {
        it("get cachedata[null] shoud be  null", function () {
            autoCache.get('redistest1', function (cb) {
                    cb(null);
                }, 5)
                .then(result => {
                    (null === result).should.be.true();
                })
                .catch(e => {
                    console.error(e);
                    (null === result).should.be.true();
                });
        });
        it("get cachedata[12345] shoud be  12345", function () {
            autoCache.get('redistest2', function (cb) {
                    cb({id: 12345});
                }, 5)
                .then(result => {
                    (result != true).should.be.true();
                    result.id.should.be.equal(12345);
                })
                .catch(e => {
                    console.error(e);
                    (null === result).should.be.true();
                });
        });
        it("get cachedata not set shoud be  null", function () {
            autoCache.get('redistest3')
                .then(result => {
                    (null === result).should.be.true();
                })
                .catch(e => {
                    console.error(e);
                    (null === result).should.be.true();
                });
        });
        
        autoCache.set('redistest4', '12345', 5)
            .then(result => {
                console.log(result);
            }).catch(e => {
        });
        it("get cachedata[12345] set shoud be  12345 after 3s", function (done) {
            setTimeout(function () {
                autoCache.get('redistest4')
                    .then(result => {
                        (null != result).should.be.true();
                        result.should.be.equal('12345');
                        done();
                    })
                    .catch(e => {
                        console.error(e);
                        (null === result).should.be.true();
                        done();
                    });
            }, 2 * 1000);
        });
        
        autoCache.set('redistest5', '12345', 5)
            .then(result => {
            }).catch(e => {
        });
        it("get cachedata[12345] set shoud be  null after 6s", function (done) {
            setTimeout(function () {
                autoCache.get('redistest5')
                    .then(result => {
                        console.log(result);
                        (null === result).should.be.true();
                        done();
                    })
                    .catch(e => {
                        console.error(e);
                        (null === e).should.be.true();
                        done();
                    });
            }, 6 * 1000);
        });
        
    });
});