/*
* @Author: Zihao Tao
* @Date:   2019-01-08 22:50:30
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-08 23:16:49
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _coupon = require('service/coupon-service.js');
var _mm = require('util/mm.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.obload();
        this.bindEvent();
    },
    obload: function() {
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
    },
    // load list
    loadList: function() {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam;
        _coupon.couponList(listParam, function(res) {
            console.log(res);
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            _mm.errorTips(errMsg);
        });
    }, 
    // load pagination info
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.render($.extend({}, pageInfo, {
                container:$('.pagination'), 
                onSelectPage: function(pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadList();
                }
            }));
    }
};
$(function() {
    page.init();

})