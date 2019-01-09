/*
* @Author: Zihao Tao
* @Date:   2019-01-08 22:36:13
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-08 23:10:34
*/
'use strict';

var _mm = require('util/mm.js');

var _coupon = {
    // user login
    addDefaultCoupon : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/coupon/addDefaultCoupon.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    couponList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/coupon/couponList.do'),
            method  : 'POST',
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _coupon;