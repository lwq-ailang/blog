package com.wu.core.result.impl;

import com.wu.core.result.ResponseInterface;

/**
 * 一个数据如果有多种形态，可以试用面向想对象的方式来替代，那就是：枚举
 * 为什么不是类呢？因为枚举具名，类不能该名字
 * 其实枚举是：它一种特殊的类。它是可以定义别的名称来调用自身的构造函数的类。
 */

/**
 * 枚举类用来实现统一返回的接口，可以自定义返回结果内容
 */
public enum ResponseCode implements ResponseInterface {

    // TODO：什么是枚举：他是一种特殊得类，是一种可以具名调用自身构造函数得类。
    // 除非你状态管理是一个定义这样是没问题
    SUCCESS(200, "成功!", ""),
    USERNAME_EMPTY(701, "用户名不允许为空", "username"),
    PASSWORD_EMPTY(702, "密码不允许为空", "password");

    private final int status;
    private final String msg;
    private final String field;

    ResponseCode(int status, String msg, String field) {
        this.status = status;
        this.msg = msg;
        this.field = field;
    }

    @Override
    public int getStatus() {
        return status;
    }

    @Override
    public String getMsg() {
        return msg;
    }

    @Override
    public String getField() {
        return field;
    }


}
