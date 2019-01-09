/*
* @Author: Zihao Tao
* @Date:   2019-01-08 12:48:00
* @Last Modified by:   Zihao Tao
* @Last Modified time: 2019-01-09 01:05:18
*/
'use strict';
require('./index.css');
var _user = require('service/user-service.js');
var _coupon = require('service/coupon-service.js');
var _mm = require('util/mm.js');

// Error reminder of table
var formError = {
    show : function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var usernameError = {
    show : function(errMsg) {
        $('#error-username').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-username').hide().find('.err-msg').text('');
    }
};

var passwordError = {
    show : function(errMsg) {
        $('#error-password').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-password').hide().find('.err-msg').text('');
    }
};

var passwordConfirmError = {
    show : function(errMsg) {
        $('#error-password-confirm').show().find('.err-msg').text(errMsg);
    },
    hide: function() {
        $('#error-password-confirm').hide().find('.err-msg').text('');
    }
};

// logic of page
var page = {
    init: function() {
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
// login
        // click log in
        $('#login-submit').click(function() {
            _this.loginSubmit();
        });
        // if click enter, submit
        $('.user-content').keyup(function(e) {
            // 13 is enter's keyCode
            if(e.keyCode === 13) {
                 _this.loginSubmit();
            }
        });

// register
        // verify username
        $('#register-username').blur(function() {
            var username = $.trim($(this).val());
            // if username is blank, no validation
            if(!username) {
                return;
            }
            _user.checkUsername(username, function(res) {
                usernameError.hide();
            }, function(errMsg) {
                usernameError.show(errMsg);
            });
        });
        // verify password
        $('#register-password').blur(function() {
            var password = $.trim($(this).val());
            var passwordConfirm = $.trim($('#password-confirm').val());
            if(password.length < 6) {
                passwordError.show('Password is too short.'); 
            } else {
                passwordError.hide();
            }
            if(passwordConfirm.length > 0) {
                if(password === passwordConfirm) {
                    passwordConfirmError.hide();
                } else {
                    passwordConfirmError.show('Must match the previous entry');
                }
            }
        });
        // verify password confirmation
        $('#password-confirm').blur(function() {
            var password = $.trim($('#register-password').val());
            var passwordConfirm = $.trim($(this).val());
            if(password === passwordConfirm) {
                passwordConfirmError.hide();
            } else {
                passwordConfirmError.show('Must match the previous entry');
            }
        });
        // click sign up
        $('#register-submit').click(function() {
            _this.registerSubmit();
        });
        // if click enter, submit
        $('.user-content').keyup(function(e) {
            // 13 is enter's keyCode
            if(e.keyCode === 13) {
                 _this.registerSubmit();
            }
        });
    },
    // submit table 
    loginSubmit: function() {
        var loginFormData = {
            username: $.trim($('#login-username').val()),
            password: $.trim($('#login-password').val())
        },
        // result of table validation
        validateResult = this.loginFormValidate(loginFormData);
        // return seccess
        if(validateResult.status) {
            _user.login(loginFormData, function(res) {
                $('.info').show();
                $('.login').hide();
            }, function(errMsg) {
                formError.show(errMsg);
            });
        } else {
            // error reminder
            formError.show(validateResult.msg);
        }
    },
    // table validation
    loginFormValidate: function(loginFormData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(loginFormData.username, 'require')) {
            result.msg = 'Username cannot be blank.';
            return result;
        }
        if(!_mm.validate(loginFormData.password, 'require')) {
            result.msg = 'Password cannot be blank.';
            return result;
        }
        result.status = true;
        result.msg = 'Verified';
        return result;
    },
    // submit table 
    registerSubmit: function() {
        var registerFormData = {
            username: $.trim($('#register-username').val()),
            password: $.trim($('#register-password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        },
        // result of table validation
        validateResult = this.registerFormValidate(registerFormData);
        // return seccess
        if(validateResult.status) {
            _user.register(registerFormData, function(res) {
                $('.register').hide();
                $('.login').show();
                _coupon.addDefaultCoupon(function(res){
                    console.log("Add Default Coupon");
                }, function(errMsg){
                    console.log("Cannot Add Default Coupon");
                });
            }, function(errMsg) {
                usernameError.show(errMsg);
            });
        } else {
            // error reminder
            usernameError.show(validateResult.msg);
        }
    },
    // table validation
    registerFormValidate: function(registerFormData) {
        var result = {
            status: false,
            msg: ''
        };
        if(!_mm.validate(registerFormData.username, 'require')) {
            result.msg = 'Username cannot be blank.';
            return result;
        }
        if(!_mm.validate(registerFormData.password, 'require')) {
            result.msg = 'Password cannot be blank.';
            return result;
        }
        if(registerFormData.password.length < 6) {
            result.msg = 'Password is too short.';
            return result;
        }
        if(registerFormData.password !== registerFormData.passwordConfirm) {
            result.msg = 'Confirmation does not match password.';
            return result;
        }
        if(!_mm.validate(registerFormData.phone, 'phone')) {
            result.msg = 'The phone number does not look right.';
            return result;
        }
        if(!_mm.validate(registerFormData.email, 'email')) {
            result.msg = 'The email does not look right.';
            return result;
        }
        if(!_mm.validate(registerFormData.question, 'require')){
            result.msg = 'Security quesiton cannot be blank.';
            return result;
        }
        if(!_mm.validate(registerFormData.answer, 'require')) {
            result.msg = 'Answer of security quesiton cannot be blank.';
            return result;
        }
        result.status = true;
        result.msg = 'Verified';
        return result;
    }
};

$(function() {
    page.init();
});