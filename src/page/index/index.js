/*
* @Author: Zihao Tao
* @Date:   2018-10-31 23:36:11
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-12-27 20:40:26
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

$(function() {
    // banner render
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // initilaize banner
    var $slider = $('.banner').unslider({
        dots:true
    });
    //event listener
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
});
