/*
* @Author: Zihao Tao
* @Date:   2018-11-06 21:04:25
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-08 21:23:37
*/
'use strict';
require('./index.css');
require('../email/index.js');
var _display = require('service/display-service.js');
var _mm = require('util/mm.js');
// header

var header = {
    init : function(){
        this.bindEvent();
        this.onload();
    },
    onload: function() {
        // popup
        _display.popup(function(res) {

            }, function(errMsg) {
                _display.setCookie(function(res) {
                    $('.m').show();
                    $('.mail').hide();
                });
            });
    },
    bindEvent : function(){
        var _this = this;
        $('.mail').click(function() {
            $('.m').show();
            $('.mail').hide();
            _this.unScroll();
        });

        $('.fa-times').click(function() {
            $('.m').hide();
            $('.mail').show();
            _this.scroll();
        });

        $('.login-link').click(function() {
            $('.register').hide();
            $('.login').show();
        });
        
        $('.register-link').click(function() {
            $('.login').hide();
            $('.register').show();
        });
        
    
    },
    unScroll : function() {
        $('body').css('overflow','hidden');
    },
    scroll : function() {
        $('body').css('overflow','scroll');
    }
};
header.init();