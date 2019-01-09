/*
* @Author: Zihao Tao
* @Date:   2019-01-08 13:28:00
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-08 20:24:11
*/
'use strict';

var _mm = require('util/mm.js');

var _display = {
    // user login
    popup : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/display/popup.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    setCookie : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/display/setCookie.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _display;