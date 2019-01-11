/*
* @Author: Zihao Tao
* @Date:   2019-01-10 22:13:51
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-10 23:48:28
*/

'use strict';

var _mm = require('util/mm.js');

var _email = {
    sendConfirmation : function(data, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/api/sendEmail.do'),
            data    : {
                username: data
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    confirm : function(data, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/api/confirm.do'),
            data    : {
                username: data
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _email;