/**
 * Created by matri on 2016-12-16.
 */
'use strict';

require ('should');

const AutoCache = require ('../');
const autoCache = new AutoCache ();


describe ("memory cache test", function () {
    this.timeout (10000);
    
    describe ("set test", function () {
        
        it ("set cachedata[object] set shoud be  success", function (done) {
            let data = {id: 123, name: 'matriq'};
            autoCache.set ('memorytest', data, 5)
                .then (result => {
                    data.should.be.equal (result);
                    done();
                }).catch (e => {
            });
        });
    });
    
    describe ("get test", function () {
        it ("get cachedata[null] shoud be  null", function () {
            autoCache.get ('memorytest1', function (cb) {
                    cb (null);
                }, 5)
                .then (result => {
                    (null === result).should.be.true ();
                })
                .catch (e => {
                    console.error (e);
                    (null === result).should.be.true ();
                });
        });
        it ("get cachedata[12345] shoud be  12345", function () {
            autoCache.get ('memorytest2', function (cb) {
                    cb ({id: 12345});
                }, 5)
                .then (result => {
                    (result != true).should.be.true ();
                    result.id.should.be.equal (12345);
                })
                .catch (e => {
                    console.error (e);
                    (null === result).should.be.true ();
                });
        });
        it ("get cachedata not set shoud be  null", function () {
            autoCache.get ('memorytest3')
                .then (result => {
                    (null === result).should.be.true ();
                })
                .catch (e => {
                    console.error (e);
                    (null === result).should.be.true ();
                });
        });
        
        autoCache.set ('memorytest4', '12345', 5)
            .then (result => {
                console.log (result);
            }).catch (e => {
        });
        
        it ("get cachedata[12345] set shoud be  12345 after 3s", function (done) {
            setTimeout (function () {
                autoCache.get ('memorytest4')
                    .then (result => {
                        (null != result).should.be.true ();
                        result.should.be.equal ('12345');
                        done ();
                    })
                    .catch (e => {
                        console.error (e);
                        (null === result).should.be.true ();
                        done ();
                    });
            }, 3 * 1000);
        });
        
        autoCache.set ('memorytest5', '12345', 5)
            .then (result => {
            }).catch (e => {
        });
        it ("get cachedata[12345] set shoud be  null after 6s", function (done) {
            setTimeout (function () {
                autoCache.get ('memorytest5')
                    .then (result => {
                        console.log (result);
                        (null === result).should.be.true ();
                        done ();
                    })
                    .catch (e => {
                        console.error (e);
                        (null === e).should.be.true ();
                        done ();
                    });
            }, 6 * 1000);
        });
        
    });
    
});