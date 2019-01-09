/*
* @Author: Zihao Tao
* @Date:   2018-11-06 20:35:36
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2018-12-28 11:01:21
*/
'use strict';
require('./index.css');

// nav
var nav = {
    init : function(){
        this.bindEvent();
        return this;
    },

    bindEvent : function(){
        // login click event
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $(".js-store").hover(function(){
            $(".store").show();
        }, function(){
            $(".store").hide();
        });

        $(".store").hover(function(){
            $(".store").show();
        }, function(){
            $(".store").hide();
        });

        $(".js-about").hover(function(){
            $(".about").show();
        },function(){
            $(".about").hide();
        });

        $(".about").hover(function(){
            $(".about").show();
        },function(){
            $(".about").hide();
        });
        
        $(".js-partner").hover(function(){
            $(".partner").show();
        },function(){
            $(".partner").hide();
        });

        $(".partner").hover(function(){
            $(".partner").show();
        },function(){
            $(".partner").hide();
        });

        $(".js-media").hover(function(){
            $(".media").show();
        },function(){
            $(".media").hide();
        });

        $(".media").hover(function(){
            $(".media").show();
        },function(){
            $(".media").hide();
        });
        
        $(".js-campaigns").hover(function(){
            $(".campaigns").show();
        },function(){
            $(".campaigns").hide();
        });

        $(".campaigns").hover(function(){
            $(".campaigns").show();
        },function(){
            $(".campaigns").hide();
        });
    },
};

module.exports = nav.init();