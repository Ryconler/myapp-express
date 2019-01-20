$(function () {
    'use strict';
    /*唯一暴露给外部的全局构造器，专门根据值和规则判断是否有效*/
    window.Validator=function (val,rule) {
        this.validate_maxlength=function () {
            return val.length<=rule.maxlength
        }
        this.validate_pattern=function () {
            var reg=new RegExp(rule.pattern)
            return reg.test(val)
        }
        this.validate_required=function () {
            var real=$.trim(val)
            if(!real&&real!==0)
                return false
            return true
        }
    }
    // var v=new Validator('啊',{
    //     maxlength:5,
    //     pattern:"^[a-zA-Z0-9]*$",
    // })
    // console.log(v.validate_maxlength())
})